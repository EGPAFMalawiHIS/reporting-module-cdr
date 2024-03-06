<template>
  <ion-card style="padding: 0 !important">
    <ion-card-header style="border-bottom: 1px solid #c2c2c2; font-weight: 500; color: #000;">
      <ion-card-title >MoH Cohort Report</ion-card-title>
    </ion-card-header>
    <ion-card-content class="ion-no-padding" style="min-height: 45vh;">
      <ion-grid>
        <ion-row>
          <ion-col size="2">
            <v-select 
              v-model="quarter"
              :options="quarters"
              placeholder="Select Quarter"
            />
          </ion-col>
          <ion-col size="3" v-if="useCustomQuarter">
            <vue-date-picker 
              v-model="dateRange" 
              placeholder="Select date range"
              :partial-range="false"
              :enable-time-picker="false"
              :format="toDisplayRangeFmt"
              multi-calendars
              auto-apply
              text-input
              range 
            />
          </ion-col>
          <ion-col :size="useCustomQuarter ? '7' : '10'">
            <ion-button class="ion-float-right" color="primary" @click="toCSV" >CSV</ion-button>
            <ion-button class="ion-float-right" color="primary" @click="printSpec" >PDF</ion-button>
            <ion-button class="ion-float-right" color="secondary" @click="goDisagreggatedReport" :disabled="hasInvalidFilters || isEmpty(indicators)">Disaggregated</ion-button>
            <ion-button class="ion-float-right" color="warning" @click="fetchData(true)">Fresh Report</ion-button>
            <ion-button class="ion-float-right" color="success" @click="fetchData()">Archived Report</ion-button>
          </ion-col>

        </ion-row>
        <ion-row class="his-card">
          <ion-col size="12" :key="componentKey" id="report-content">
            <cohort-v :indicators="indicators" style="font-weight: 600" />
            <cohort-h :reportparams="period" />
            <cohort-ft @onClickIndicator="onDrilldown" :indicators="indicators" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { loader } from "@/utils/loader";
import { modal } from "@/utils/modal";
import CohortH from "./CohortHeader.vue";
import CohortV from "./CohortValidator.vue"
import CohortFt from "./CohortFooter.vue"
import { IonCol, IonRow, IonGrid, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from "@ionic/vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import VueDatePicker from '@vuepic/vue-datepicker';
import { useRouter } from "vue-router";
import { isEmpty, parseARVNumber, toDisplayGenderFmt } from "@/utils/common";
import { toastWarning } from "@/utils/toasts";
import { toDisplayRangeFmt, getReportQuarters, toDisplayFmt } from "@/utils/his_date";
import { CohortReportService } from "@/services/cohort_report_service";
import PatientDrillTable from '@/components/PatientDrillTable.vue';
import { parameterizeUrl } from "@/utils/url";
import { exportToCSV } from "@/utils/exports";
import useFacility from "@/composables/useFacility";
import VSelect from "vue-select";

const router = useRouter();
const componentKey = ref(0);
const quarter = ref();
const period = ref<string>('');
const dateRange = ref<string[]>([]);
const indicators = ref({} as Record<string, any>);
const cohort = ref({} as Record<string, any>);
const report = new CohortReportService();
const useCustomQuarter = computed(() => /custom/i.test(quarter.value?.label));
const hasInvalidFilters = computed(() => {
  if(isEmpty(quarter.value)) return true;
  if(useCustomQuarter.value && isEmpty(dateRange.value)) return true;
  return false;
}); 

const quarters: any[] = [
  {label: "Custom", value: "Custom"},
  ...getReportQuarters(10).map(q => ({
    label: q.name,
     value: q.name, 
     other: q
  }))
]

watch(useCustomQuarter, (isCustom) => {
  if(isCustom) dateRange.value = [];
})

function goDisagreggatedReport() {
  if (!hasInvalidFilters.value) {
    router.push(parameterizeUrl('/reports/moh/disaggregated', {
      'start_date': report.startDate,
      'end_date': report.endDate,
      'quarter': quarter.value.label
    }));
  } else {
    toastWarning('Please select a period');
  }
}
    
function onDrilldown(indicator: string) {
  const customColumns: TableColumnInterface[] = [
    { path: "arv_number", label: "ARV Number", preSort: parseARVNumber, initialSort: true },
    { path: "given_name", label: "First Name", exportable: false },
    { path: "family_name", label: "Last Name", exportable: false },
    { path: "birthdate", label: "Date of Birth", formatter: toDisplayFmt },
    { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
    { path: "outcome", label: "Outcome" }
  ];
  const indicatorData = cohort.value.find((i: any) => i.name === indicator)
  return modal.show(PatientDrillTable, {
    data: {},
    title: indicatorData['indicator_name'] || "Drill down",
    customColumns,
    rowParser: () => report.getCohortDrillDown(indicatorData.id),
    reportType: "MoH",
    period: period.value,
    quarter: quarter.value 
  });
}

const setReportPeriod = (quarter: string, startDate: string, endDate: string) => {
  report.setQuarter(quarter);
  report.setStartDate(startDate);
  report.setEndDate(endDate);
}

/**
 * Transform indicators from array to a simple key value pair object
*/ 
const toIndicators = (params: any) => {
  return params.reduce((data: Record<string, number>, indicator: any) => {
    data[indicator.name] = parseInt(indicator.contents)
    return data
  }, {})
}

async function fetchData (regenerate = false) {
  if(hasInvalidFilters.value) {
    return toastWarning("Please select report period");
  }

  loader.show();
  let data: any = {};
  indicators.value = {};
  cohort.value = {};
  report.setRegenerate(regenerate);

  if(useCustomQuarter.value) {
    setReportPeriod(quarter.value, dateRange.value[0], dateRange.value[1]);
    period.value = `Custom ${report.getDateIntervalPeriod()}`;
    data = report.datePeriodRequestParams();
  } else {
    setReportPeriod(quarter.value?.label, quarter.value?.other.start, quarter.value?.other.start);
    period.value = quarter.value?.label;
    data = report.qaurterRequestParams();
  }

  const response = await report.requestCohort(data);
  if (response?.ok || response.httpStatusResponse === 204) {
    const interval = setInterval(async () => {
      data.regenerate = false
      const res = await report.requestCohort(data);
      if (res?.httpStatusResponse === 200) {
        const cohortData = res.data;
        cohort.value = cohortData.values
        indicators.value = toIndicators(cohortData.values)
        loader.hide();
        clearInterval(interval)
        componentKey.value++;
      }
    }, 3000)
  }
}

function printSpec() {
  const printW = open('', '', 'width:1024px, height:768px')
  const content = document.getElementById('report-content')
  if (content && printW) {
    printW.document.write(`
        <html>
          <head>
            <title>Print Cohort</title>
            <link rel="stylesheet" media="print" href="/assets/css/cohort.css" />
          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `)
      setTimeout(() => { printW.print(); printW.close() }, 3500)
  }
}

function toCSV () {
  const columns = [
    { label: "Indicator", path: "indicator" },
    { label: "Value", path: "value" },
  ];
  const rows = Object.entries(indicators.value).map(([indicator, value]) => ({
    indicator,
    value
  }))
  const filename = `MOH ${useFacility().facilityName.value } cohort report ${period.value}`
  exportToCSV({ columns, rows, filename })
}
</script>

<style>
.box {
  border-color: #a3a3a3;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
  font-size: large;
  height: 44px;
}

select {
  background-color: white;
  border: none; 
}
</style>