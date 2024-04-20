<template>
  <report-table
    title="PEPFAR Disaggregated Report"
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
import { DisaggregatedReportService } from "@/services/disagregated_report_service";
import { AGE_GROUPS, REGIMENS } from "@/constants";
import { toDisplayGenderFmt, get, isEmpty } from "@/utils/common";
import { difference, swapAdjacentItems } from "@/utils/arrays";
import { toastWarning } from "@/utils/toasts";

const report = new DisaggregatedReportService()
let cohortData = {} as Record<string, any>;
const period = ref("-");
const females = ref<Array<any>>([]);
const males = ref<Array<any>>([]);
const maternals = ref<Array<any>>([]);
const rows = computed(() => [...females.value, ...males.value, ...maternals.value]);
    
const columns: TableColumnInterface[] = [
  { path: "ageGroup", label: "Age Group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  { path: "txCurr", label: "TX curr (receiving ART)", drillable: true },
  ...REGIMENS.map(r => ({ path: r, label: r, drillable: true })),
  { path: "N/A", label: "Unknown", drillable: true },
  { path: "total", label: "Total", drillable: true },
]

const getRegimenRow = async (gender: string) => {
  if(/fp|fbf/i.test(gender)) {
    report.setAgeGroup("All");
    report.setGender(gender);
  }
  const row: Record<string, any> = {}
  const distribution = await report.getRegimenDistribution()
  for (const regimen of [...REGIMENS, 'N/A']) {
    const data = get(distribution, regimen, [])
    row[regimen] = data
  }
  row.total = Object.values(row).reduce((acc, val) => acc.concat(val), [])
  return row
}

const aggregate = (rows: Array<any>, gender: string) => {
  const row = rows.reduce((acc: any, curr: any) => {
    for  (const indicator in curr) {
      if(indicator in acc) acc[indicator] = acc[indicator].concat(curr[indicator])
      else acc[indicator] = curr[indicator]
    }
    return acc
  }, {})
  return {...row, ageGroup: "All", gender}
}

const buildTotalMalesRow = () => {
  males.value.push(aggregate(males.value, "Male"))
}

const setFemaleNotPregnantRow = () => {
  const all = aggregate(females.value, "Female");
  const fpFbf = aggregate(maternals.value, "Female")

  const fnpTD = (column: string) => difference(all[column], fpFbf[column]);

  const fnpRegimensRow = () => {
    const row: Record<string, any> = {}
    for (const regimen of [...REGIMENS, 'N/A']) {
      row[regimen] = fnpTD(regimen)
    }
    return row
  }

  maternals.value.push({
    'ageGroup': "All",
    gender: "FNP",
    txCurr: fnpTD('txCurr'),
    ...fnpRegimensRow(),
    total: fnpTD('total'),
  })
}

const buildRowData = async (gender: "F" | "M" | "FP" | "FBf", ageGroup: string) => {
  report.setGender(gender === "FP" ? "pregnant" : gender === "FBf" ? "breastfeeding" : toDisplayGenderFmt(gender));
  report.setAgeGroup(ageGroup);

  if(!(ageGroup in cohortData)) {
    const data = await report.getCohort()
    report.setRebuildOutcome(false);
    cohortData[ageGroup] = !isEmpty(data) ? data[ageGroup] : {}
  }

  return {
    gender,
    txCurr: get(cohortData, `${ageGroup}.${gender.charAt(0)}.tx_curr`, []),
    ageGroup: /pregnant|breastfeeding/i.test(ageGroup) ? "All" : ageGroup,
    ...(await getRegimenRow(gender)),
  };
};

const buildMaleFemalesRows = async () => {
  for (const ageGroup of AGE_GROUPS) {
    males.value.push({ ...(await buildRowData("M", ageGroup)) });
    females.value.push({ ...(await buildRowData("F", ageGroup)) });
  }
};

const buildFpFBfRows = async () => {
  for (const group of ["Pregnant", "Breastfeeding"]) {
    const gender = group === "Pregnant" ? "FP" : "FBf";
    maternals.value.push({ ...(await buildRowData(gender, group)) });
  }
};

const fetchData =  async ({ dateRange }: any, regenerate=true) => {
  males.value = [];
  females.value = [];
  maternals.value = [];
  cohortData = {};
  report.setStartDate(dateRange.startDate)
  report.setEndDate(dateRange.endDate)
  report.setRebuildOutcome(regenerate)
  report.setQuarter("pepfar")     
  period.value = report.getDateIntervalPeriod()
  
  if(!period.value.split('-').some(Boolean)) {
    return toastWarning("Select report period");
  }
  
  await loader.show()
  if(!await report.isInitialized()) {
    toastWarning("Unable to initialize report");
    return loader.hide();
  };

  await buildMaleFemalesRows();
  buildTotalMalesRow();
  await buildFpFBfRows();
  setFemaleNotPregnantRow()
  swapAdjacentItems(maternals.value, 1); // swap fnp and fbf rows
  await loader.hide();
}
</script>