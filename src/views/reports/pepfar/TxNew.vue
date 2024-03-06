<template>
  <report-table
    title="PEPFAR TX New Report"
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
import { TxReportService } from "@/services/tx_report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const report = new TxReportService();
const columns: TableColumnInterface[] = [
  { path: "age_group", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  { path: "cd4_less_than_200", label: "Tx new CD4 < 200", drillable: true },
  { path: "cd4_greater_than_equal_to_200", label: "Tx new CD4 >= 200", drillable: true },
  { path: "cd4_unknown_or_not_done", label: "Tx new CD4 Unknown", drillable: true },
  { path: "transfer_in", label: "Transfer-ins", drillable: true },
]

async function fetchData({dateRange}: Record<string, any>, rebuildOutcome: boolean) {
  try {
    await loader.show();
    report.setStartDate(dateRange.startDate)
    report.setEndDate(dateRange.endDate);
    period.value = report.getDateIntervalPeriod();
    rows.value = await report.getTxNewReport(rebuildOutcome);
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