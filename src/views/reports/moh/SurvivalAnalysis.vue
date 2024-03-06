<template>
  <report-table
    title="MoH Survival Analysis Report"
    report-type="MoH"
    :columns="columns"
    :rows="rows"
    :quarter="quarter"
    useQuarterFilter
    use-secure-export
    :custom-filters="customFilters"
    :filename="filename"
    @generate="fetchData"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable from "@/components/ReportTable.vue";
import { CustomFilterInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { toastWarning } from "@/utils/toasts";
import { AGE_GROUP, SurvivalAnalysisReportService } from "@/services/survival_analysis_report_service";
import { Option } from "@/interfaces";

const quarter = ref();
const ageGroup = ref();
const rows = ref<any[]>([]);
const filename = ref("MoH Survival Analysis Report")
const columns: TableColumnInterface[] = [
  { path: "quarter", label: "Reg Cohort", initialSort: true, initialSortOrder: 'asc', preSort: (v) => parseInt(v.split(' ')[1]) },
  { path: "interval", label: "Interval (Months)" },
  { path: "subGroup", label: "Sub group" },
  { path: "total", label: "Total Reg (database)" },
  { path: "totalConfirmed", label: "Total Reg (Confirmed)" },
  { path: "alive", label: "Alive" },
  { path: "died", label: "Died" },
  { path: "defaulted", label: "Defaulted" },
  { path: "stopped", label: "Stopped" },
  { path: 'transferred', label: "Transferred out" },
  { path: "unknown", label:"Unknown" }
];

const customFilters = computed<CustomFilterInterface[]>(() => [{
  id: "ageGroup",
  type: "select",
  label: "Sub Group:",
  value: ageGroup.value,
  options: Object.values(AGE_GROUP).map(age => ({ label: age.match(/Women/i) ? 'Option B+': age, value: age })),
}])

async function fetchData({ quarter, ageGroup }: Record<string, Option>, regenerate = false) {
  await loader.show();
  try {
    const report = new SurvivalAnalysisReportService();
    report.setRegenerate(regenerate);
    report.setQuarter(quarter.value as string);
    report.setAgeGroup(ageGroup.value as AGE_GROUP);
    rows.value= await report.generateReport();
    filename.value = `MoH Survival Analysis (${ ageGroup.value }) Report`
  } catch (error) {
    toastWarning("Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}

</script>