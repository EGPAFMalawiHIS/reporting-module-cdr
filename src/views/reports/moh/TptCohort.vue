<template>
  <report-table
    title="MoH TPT Cohort Report"
    report-type="MoH"
    :columns="columns"
    :rows="rows"
    :period="period"
    show-indices
    use-date-range-filter
    :drill-title="drilldownTitleBuilder"
    @generate="fetchData"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable, { DrilldownData } from "@/components/ReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { toastWarning } from "@/utils/toasts";
import { toDisplayGenderFmt } from "@/utils/common";
import { TptReportService } from "@/services/tpt_report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "age_group", label: "Age Group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  { label: "Initiated ART", path: "initiated_art", drillable: true },
  { label: "Initiated TPT", path: "started_tpt", drillable: true },
  { label: "Completed TPT", path: "completed_tpt", drillable: true },
  { label: "Died", path: "died", drillable: true },
  { label: "Defaulted", path: "defaulted", drillable: true },
  { label: "Stopped ART", path: "stopped", drillable: true },
  { label: "TO", path: "transfer_out", drillable: true },
  { label: "Confirmed TB", path: "confirmed_tb", drillable: true },
  { label: "Pregnant", path: "pregnant", drillable: true }
];

async function fetchData({ dateRange }: Record<string, any>) {
  await loader.show();
  try {
    const report = new TptReportService()
    report.setStartDate(dateRange.startDate)
    report.setEndDate(dateRange.endDate)
    period.value = report.getDateIntervalPeriod()
    rows.value = await report.getCohort();
  } catch (error) {
    toastWarning("Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}

function drilldownTitleBuilder (data: DrilldownData) {
  return `${data.row.age_group} ${data.column.label} ${data.row.gender}s`;
}

</script>