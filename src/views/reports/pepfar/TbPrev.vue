<template>
  <report-table
    title="PEPFAR TB Prev Report"
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
import { TbPrevReportService } from "@/services/tb_prev_report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "ageGroup", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  { path: "3hp_started_new_on_art", label: "3HP Started New on ART", drillable: true },
  { path: "6h_started_new_on_art", label: "6H Started New on ART", drillable: true },
  { path: "3hp_started_previously_on_art", label: "3HP Started Previously on ART", drillable: true },
  { path: "6h_started_previously_on_art", label: "6H Started Previously on ART", drillable: true },
  { path: "3hp_completed_new_on_art", label: "3HP Completed New on ART", drillable: true },
  { path: "6h_completed_new_on_art", label: "6H Completed New on ART", drillable: true },
  { path: "3hp_completed_previously_on_art", label: "3HP Completed Previously on ART", drillable: true },
  { path: "6h_completed_previously_on_art", label: "6H Completed Previously on ART", drillable: true },
]

async function fetchData({dateRange}: Record<string, any>) {
  try {
    await loader.show();
    const report = new TbPrevReportService()
    report.setStartDate(dateRange.startDate)
    report.setEndDate(dateRange.endDate)
    period.value = report.getDateIntervalPeriod()
    const cohort: any = await report.getTBPrevReport()
    rows.value = report.buildReportData(cohort);
    rows.value.push(report.getAggregatedMaleData(cohort))
    rows.value.push(...(await report.getAggregatedMaternalStatus(cohort)))
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