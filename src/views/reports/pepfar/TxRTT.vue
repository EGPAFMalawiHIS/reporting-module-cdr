<template>
  <report-table
    title="PEPFAR TX RTT Report"
    subtitle="Clients that have their clinical dispensation visit falling 
      in the reporting period and there is a difference of 30 or more days 
      between their visit date and their previous appointment date / runout date"
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
import { TxReportService } from "@/services/tx_report_service";
import { toastWarning } from "@/utils/toasts";
import { AggregatedReportData } from "@/services/report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const report = new TxReportService();
const columns: TableColumnInterface[] = [
  { path: "ageGroup", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  { path: "cd4_less_than_200", label: "CD4 <200", drillable: true },
  { path: "cd4_greater_than_or_equal_to_200", label: "CD4 >=200", drillable: true },
  { path: "unknown_cd4_count", label: "Unknown CD4", drillable: true },
  { path: "not_eligible_for_cd4", label: "Not Eligible for CD4", drillable: true },
  { path: "returned_less_than_3_months", label: "Returned <3 mo", drillable: true },
  { path: "returned_greater_than_3_months_and_less_than_6_months", label: "Returned 3-5 mo", drillable: true },
  { path: "returned_greater_than_or_equal_to_6_months", label: "Returned 6+ mo", drillable: true },
]

function getDisaggregatedData(data: Array<any>) {
  const defaultData: AggregatedReportData = { M: { rows: [], aggregate: {} }, F: { rows: [], aggregate: {} } }

  return data.reduce((result: AggregatedReportData, currentItem: any) => {
    if (currentItem.age_group !== 'Unknown') {
      const gender = currentItem.gender as keyof AggregatedReportData
      result[gender].rows.push(currentItem);
      result[gender].aggregate = Object.keys(currentItem).reduce((aggregate: any, key: string) => {
        return Array.isArray(currentItem[key])
          ? { ...aggregate, [key]: [...(aggregate[key] || []), ...currentItem[key]] }
          : aggregate;
      }, result[gender].aggregate);
    }

    return result;
  }, defaultData);
};

async function fetchData({dateRange}: Record<string, any>) {
  try {
    await loader.show();
    report.setStartDate(dateRange.startDate)
    report.setEndDate(dateRange.endDate);
    period.value = report.getDateIntervalPeriod();
    const data: any = await report.getTxRttReport();
    const disaggregated = getDisaggregatedData(data);
    rows.value = [
      ...disaggregated.F.rows,
      ...disaggregated.M.rows,
      { ageGroup: 'All', gender: 'Male', ...disaggregated.M.aggregate },
      ...await report.getMaternityData(disaggregated.F.aggregate, Object.keys(disaggregated.F.aggregate))
    ];
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