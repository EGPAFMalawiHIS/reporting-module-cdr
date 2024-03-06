<template>
  <report-table
    title="MoH TX CURR MMD Report"
    subtitle="Clients that are alive and on treatment in the reporting period and the difference in days between their clinical dispensation visit and 
      next appointment / drug-runout date is: 3 months (1 - 89 days), 3-5 months (90-179 days), 6+ months (180 or more days)"
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
import { computed, ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable from "@/components/ReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { AGE_GROUPS } from "@/constants";
import { parseAgeGroup } from "@/utils/common";
import { TxReportService } from "@/services/tx_report_service";
import { toastWarning } from "@/utils/toasts";

const period = ref("-");
const males = ref<Array<any>>([]);
const females = ref<Array<any>>([]);
const rows = computed(() => [...females.value, ...males.value]);
const columns: TableColumnInterface[] = [
  { path: "ageGroup", label: "Age group", thStyles: { minWidth: "150px !important" }},
  { path: "gender", label: "Gender", thStyles: { minWidth: "110px !important" }},
  { path: "underThree", label: "# of clients on <3 months of ARVs", drillable: true, thStyles: { minWidth: "350px !important" }},
  { path: "betweenThreeAndFive", label: "# of clients on 3 - 5 months of ARVs", drillable: true, thStyles: { minWidth: "350px !important" }},
  { path: "overSix", label: "# of clients on >= 6 months of ARVs", drillable: true, thStyles: { minWidth: "350px !important" }},
];

function buildRow (data: Record<string, any>, gender: string, ageGroup: string) {
  const defaultRow = { 
    gender, 
    ageGroup, 
    underThree: [] as Array<number>, 
    betweenThreeAndFive: [] as Array<number>, 
    overSix: [] as Array<number>
  }

  return Object.entries(data[gender] ?? {}).reduce((row, [patientId, { prescribed_days }]: any) => {
    if (prescribed_days < 90) row.underThree.push(patientId);
    else if (prescribed_days >= 90 && prescribed_days <= 150) row.betweenThreeAndFive.push(patientId);
    else if (prescribed_days > 150) row.overSix.push(patientId);
    return row;
  }, defaultRow);
}

async function fetchData({dateRange}: Record<string, any>) {
  try {
    await loader.show()
    males.value = [];
    females.value = [];
    const report = new TxReportService();
    report.setReportType('moh')
    report.setStartDate(dateRange.startDate);
    report.setEndDate(dateRange.endDate);
    period.value = report.getDateIntervalPeriod();
    for (const ageGroup of AGE_GROUPS) {
      const [minAge, maxAge] = parseAgeGroup(ageGroup);
      const data = await report.getTxCurrMMDReport(minAge, maxAge);
      males.value.push(buildRow(data, "Male", ageGroup));
      females.value.push(buildRow(data, "Female", ageGroup));
      report.setInitialize(false)
    }
  } catch (error) {
    toastWarning("ERROR! Unable to load report data");
    console.error(error);
  }
  await loader.hide();
}
</script>