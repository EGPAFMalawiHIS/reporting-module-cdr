<template>
  <report-table
    title="PEPFAR SC ARV Dispensation Report"
    report-type="PEPFAR"
    :columns="columns"
    :rows="rows"
    :period="period"
    :drill-columns="drillColumns"
    :drill-title="drilldownTitleBuilder"
    :drill-row-parser="drillRowParser"
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
import { parseARVNumber, toDisplayGenderFmt } from "@/utils/common";
import { toastWarning } from "@/utils/toasts";
import { RegimenReportService } from "@/services/regimen_report_service";
import { toDisplayFmt } from "@/utils/his_date";

const period = ref("-");
const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "name", label: "ARV drug category" },
  { path: "dispensations", label: "# of bottles (units) dispensed", drillable: true },
]

const drillColumns: Array<TableColumnInterface> = [
  { path: "arvNumber", label: "ARV Number", preSort: parseARVNumber, initialSort: true },
  { path: "name", label: "Drug" },
  { path: "quantity", label: "Quantity"},
  { path: "date", label: "Date", formatter: toDisplayFmt }
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

function drilldownTitleBuilder (data: DrilldownData) {
  return `${data.row.name}`
}

function drillRowParser(data: DrilldownData) {
  return data.row.dispensations.map(([name, quantity, date, arvNumber]: Array<any>) => ({
    name,
    quantity,
    date,
    arvNumber
  }))
}
</script>