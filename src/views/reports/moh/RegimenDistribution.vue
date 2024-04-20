<template>
  <report-table
    title="MoH Regimen Distribution By Weight Report"
    report-type="MoH"
    useDateRangeFilter
    showIndices
    :columns="columns"
    :rows="rows"
    :period="period"
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
import { RegimenReportService } from "@/services/regimen_report_service";
import { REGIMEN_WEIGHT_DISTRIBUTION } from "@/constants";

const period = ref("-");
const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "weight", label: "Weight Band" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  ...REGIMEN_WEIGHT_DISTRIBUTION.map(r => ({ path: r, label: r })),
  { path: "N/A", label: "Unknown" },
  { path: "total", label: "Total" },
];

async function fetchData({dateRange}: Record<string, any>, rebuildCache = false) {
  try {
    await loader.show();
    const report = new RegimenReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      rows.value = await report.getRegimensByWeight()
  } catch (error) {
    toastWarning("ERROR! Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}

</script>