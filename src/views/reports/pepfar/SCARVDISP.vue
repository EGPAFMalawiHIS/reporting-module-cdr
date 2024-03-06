<template>
  <report-table
    title="PEPFAR SC ARV Dispensation Report"
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
import { ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable from "@/components/ReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { toastWarning } from "@/utils/toasts";
import { RegimenReportService } from "@/services/regimen_report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "name", label: "ARV drug category" },
  { path: "dispensations", label: "# of bottles (units) dispensed", drillable: true },
]

async function fetchData({dateRange}: Record<string, any>) {
  try {
    await loader.show();
    const report = new RegimenReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      rows.value = await report.getSCReport()
  } catch (error) {
    toastWarning("ERROR! Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}
</script>