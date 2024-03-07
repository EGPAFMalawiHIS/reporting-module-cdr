<template>
  <report-table
    title="TPT New Initiation Report"
    report-type="MoH"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    showIndices
    @generate="fetchData"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable from "@/components/ReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { toDisplayGenderFmt } from "@/utils/common";
import { toastWarning } from "@/utils/toasts";
import { TPT_INITIATION_INDICATORS, TptReportService } from "@/services/tpt_report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const report = new TptReportService();
const columns: TableColumnInterface[] = [
  { path: "location", label: "District" },
  { path: "ageGroup", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  ...Object.entries(TPT_INITIATION_INDICATORS).map(([path, label]) => ({ path, label })),
]

async function fetchData({dateRange}: Record<string, any>) {
  try {
    await loader.show();
    report.setStartDate(dateRange.startDate)
    report.setEndDate(dateRange.endDate);
    period.value = report.getDateIntervalPeriod();
    const data = await report.getTptNewInitiations();
    rows.value = [
      ...data.F.rows,
      ...data.M.rows,
      { ageGroup: 'All', gender: 'Male', ...data.M.aggregate },
      ...await report.getMaternityRows(data.F.aggregate, Object.keys(TPT_INITIATION_INDICATORS))
    ];
  } catch (error) {
    toastWarning("ERROR! Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}
</script>