<template>
  <report-table
    title="PEPFAR TX ML Report"
    subtitle="Clients that were Alive and on treatment before the reporting period and 
    their “next appointment date / drug runout” date falls within the reporting period. 
    30 or more days have gone between their appointment date and the end of the 
    reporting period without any clinical dispensation visit"
    report-type="PEPFAR"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    showIndices
    @generate="fetchData"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable from "@/components/ReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { AGE_GROUPS } from "@/constants";
import { get, toDisplayGenderFmt } from "@/utils/common";
import { TxReportService, TX_ML_INDICATORS } from "@/services/tx_report_service";
import { toastWarning } from "@/utils/toasts";
import { uniq } from "@/utils/arrays";
import { MaternityData } from "@/services/report_service";

const period = ref("-");
const report = new TxReportService();
const males = ref<Array<any>>([]);
const females = ref<Array<any>>([]);
const aggregates = ref<Array<any>>([]);
const rows = computed(() => [
  ...females.value, 
  ...males.value,
  ...aggregates.value
]);
const columns: TableColumnInterface[] = [
  { path: "ageGroup", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  ...TX_ML_INDICATORS.map(indicator => ({ 
    path: indicator, 
    label: indicator, 
    drillable: true 
  })),
]

function buildRow (data: Record<string, any>, gender: string, ageGroup: string) {
  const defaultRow: Record<string, any>= { gender, ageGroup }
  return TX_ML_INDICATORS.reduce((row, indicator: string, index: number) => {
    return { ...row, [indicator]: get(data, `${ageGroup}.${gender}[${index}]`, [])}
  }, defaultRow);
}

function getAggregatedTxMLMaleData (cohort: Record<string, any>) {
  const data: Record<string, any> = { gender: "Male", 'ageGroup': "All" }
  for (const indicator of TX_ML_INDICATORS) {
      data[indicator] = aggregateTxML(cohort, 'M', indicator)
  }
  return data;
}

function aggregateTxML(cohort: Record<string, any>, gender: 'M' | 'F', indicator: string): Array<any> {
  return Object.values(cohort).reduce((patients: any, c: any) => {
    return c[gender] ? [...c[gender][TX_ML_INDICATORS.indexOf(indicator)], ...patients] : patients
  }, []) as Array<any>
}

async function buildMaternityStatusRows(data: Record<string, any>) {
  const aggregated = TX_ML_INDICATORS.reduce((aggregated: any, indicator: string) => [
    ...aggregated,
    { indicator, data: aggregateTxML(data, 'F', indicator) },
  ], [])

  const allFemales = aggregated.reduce((totals: any, cur: any) => [...totals, ...cur.data], [])
                              .map(({pateint_id}: any) => pateint_id);

  const maternalStatus = await report.getMaternalStatus(uniq(allFemales) as Array<number>) as MaternityData
  const allPregnant = maternalStatus?.FBf.concat(maternalStatus?.FP) ?? []

  for (const gender of ['FP', 'FNP', 'FBf']) {
    const tmp: Record<string, any> = { gender, 'ageGroup': 'All' }
    for (const indicator of TX_ML_INDICATORS) {
      tmp[indicator] = aggregated
        .reduce((all: any, i: any) => i.indicator === indicator ? [...all, ...i.data] : all, [])
        .filter((p: any) => gender === 'FNP' 
          ? !allPregnant.includes(p.patient_id) 
          : maternalStatus[gender as keyof MaternityData].includes(p.patient_id))
    }
    aggregates.value.push(tmp)
  }
}

async function fetchData({dateRange}: Record<string, any>) {
  try {
    await loader.show()
    males.value = [];
    females.value = [];
    aggregates.value = [];
    report.setStartDate(dateRange.startDate);
    report.setEndDate(dateRange.endDate);
    period.value = report.getDateIntervalPeriod();
    const data: any = await report.getTxMlReport();
    for (const ageGroup of AGE_GROUPS) {
      males.value.push(buildRow(data, "Male", ageGroup));
      females.value.push(buildRow(data, "Female", ageGroup));
    }
    aggregates.value.push(getAggregatedTxMLMaleData(data));
    await buildMaternityStatusRows(data);
  } catch (error) {
    toastWarning("ERROR! Unable to load report data");
  }
  await loader.hide();
}
</script>