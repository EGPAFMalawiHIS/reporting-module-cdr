<template>
  <report-table
    title="Moh Regimen Report"
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
import { toDisplayFmt } from "@/utils/his_date";
import { RegimenReportService } from "@/services/regimen_report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "identifier", label: "ARV#" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  { path: "dob", label: "DOB", formatter: toDisplayFmt},
  { path: "drugName", label: "Drug Name"},
  { path: "dispensationDate", label: "Date", formatter: toDisplayFmt},
  { path: "packSize", label: "Pack size"},
  { path: "packSizes", label: "Total pack"},
  { path: "quantity", label: "Total pills"},
  { path: "vlResult", label: "Latest VL result"},
  { path: "vlResultDate", label: "Latest VL date", formatter: toDisplayFmt},
]

async function fetchData({dateRange}: Record<string, any>, rebuildCache = false) {
  try {
    await loader.show();
    const report = new RegimenReportService()
    report.setStartDate(dateRange.startDate)
    report.setEndDate(dateRange.endDate)
    period.value = report.getDateIntervalPeriod()
    rows.value = await report.getRegimenDispensationReport(rebuildCache)
  } catch (error) {
    toastWarning("ERROR! Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}

</script>