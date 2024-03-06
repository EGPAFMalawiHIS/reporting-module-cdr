<template>
  <report-table
    title="PEPFAR VL Coverage Report"
    report-type="PEPFAR"
    :columns="columns"
    :rows="rows"
    :period="period"
    :drill-title="drilldownTitleBuilder"
    useDateRangeFilter
    showIndices
    @generate="fetchData"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable, { DrilldownData } from "@/components/ReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { toDisplayGenderFmt } from "@/utils/common";
import { toastWarning } from "@/utils/toasts";
import { VL_COVERAGE_INDICATORS, ViralLoadReportService } from "@/services/viral_load_report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const report = new ViralLoadReportService();
const columns: TableColumnInterface[] = [
  { path: "ageGroup", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  ...Object.entries(VL_COVERAGE_INDICATORS).map(([path, label]) => ({
    path,
    label,
    drillable: true
  })),
]

async function fetchData({dateRange}: Record<string, any>) {
  try {
    await loader.show();
    report.setStartDate(dateRange.startDate)
    report.setEndDate(dateRange.endDate);
    period.value = report.getDateIntervalPeriod();
    const data = await report.getVLCoverage();
    rows.value = [
      ...data.F.rows,
      ...data.M.rows,
      { 
        ...data.M.aggregate,
        ageGroup: 'All', 
        gender: 'Male' 
      },
      ...await report.getMaternityData(data.F.aggregate, Object.keys(VL_COVERAGE_INDICATORS))
    ];
  } catch (error) {
    toastWarning("ERROR! Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}

function drilldownTitleBuilder (data: DrilldownData) {
  return `${data.column.label} | ${data.row.ageGroup} | ${toDisplayGenderFmt(data.row.gender)}s`
}
</script>