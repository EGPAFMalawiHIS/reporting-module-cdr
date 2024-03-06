<template>
  <report-table
    title="PEPFAR TX TB Report"
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
import { TX_TB_INDICATORS, TxReportService, TxTbIndicatorData, TxTbReportData, TxTbRowData } from "@/services/tx_report_service";
import { toastWarning } from "@/utils/toasts";
import { AggregatedReportData, Gender } from "@/services/report_service";

const period = ref("-");
const rows = ref<any[]>([]);
const report = new TxReportService();
const columns: TableColumnInterface[] = [
  { path: "ageGroup", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  ...Object.entries(TX_TB_INDICATORS).map(([path, label]) => ({ path, label, drillable: true })),
]

function aggregateData(data: TxTbReportData) {
  const result: AggregatedReportData<TxTbRowData> = { 
    M: { rows: [], aggregate: {} as TxTbIndicatorData }, 
    F: { rows: [], aggregate: {} as TxTbIndicatorData } 
  }

  Object.entries(data).forEach(([ageGroup, currentItem]) => {
    if (ageGroup !== 'Unknown') {
      Object.entries(currentItem).forEach(([g, indicators]) => {
        const gender = g as Gender;
        result[gender].rows.push({ ageGroup, gender, ...indicators });
        Object.entries(indicators).forEach(([indicator, values]) => {
          result[gender].aggregate[indicator] = [
            ...result[gender].aggregate[indicator] ?? [],
            ...values
          ];
        });
      })
    }
  });
  return result;
};

async function fetchData({dateRange}: Record<string, any>, rebuildOutcome: boolean) {
  try {
    await loader.show();
    report.setStartDate(dateRange.startDate)
    report.setEndDate(dateRange.endDate);
    period.value = report.getDateIntervalPeriod();
    const data = await report.getTxTbReport(rebuildOutcome);
    const aggregated = aggregateData(data); 
    rows.value = [
      ...aggregated.F.rows,
      ...aggregated.M.rows,
      { ageGroup: 'All', gender: 'Male', ...aggregated.M.aggregate },
      ...await report.getMaternityData(aggregated.F.aggregate, Object.keys(TX_TB_INDICATORS))
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