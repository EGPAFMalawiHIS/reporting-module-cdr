<template>
  <report-table
    title="MoH Viral Load Report"
    report-type="MoH"
    :columns="columns"
    :rows="rows"
    :period="period"
    show-indices
    use-date-range-filter
    :custom-filters="customFilters"
    @generate="fetchData"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable from "@/components/ReportTable.vue";
import { CustomFilterInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { toastWarning } from "@/utils/toasts";
import { REGIMENS } from "@/constants";
import { ViralLoadReportService } from "@/services/viral_load_report_service";

const rows = ref<any[]>([]);
const minVL = ref<number>();
const maxVL = ref<number>();
const period = ref("-");

const columns: TableColumnInterface[] = [
  { path: "ageGroup", label: "Age Group" },
  ...REGIMENS.map(regimen => ({ path: regimen, label: regimen })),
  { path: "N/A", label: "Uknown" }
]

const customFilters = computed<CustomFilterInterface[]>(() => [
  { id: "minVL", placeholder: "Min Viral Load", type: "number", value: minVL.value, required: false },
  { id: "maxVL", placeholder: "Max Viral Load", type: "number", value: maxVL.value, required: false },
]);

async function fetchData(filters: Record<string, any>) {
  await loader.show();
  try {
    minVL.value = filters.minVL;
    maxVL.value = filters.maxVL;
    const report = new ViralLoadReportService();
    report.setStartDate(filters.dateRange.startDate);
    report.setEndDate(filters.dateRange.endDate);
    period.value = report.getDateIntervalPeriod();
    rows.value = await report.getViralLoad({ from: minVL.value, to: maxVL.value });
  } catch (error) {
    toastWarning("Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}

</script>