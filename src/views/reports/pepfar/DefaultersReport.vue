<template>
  <report-table
    :title="title"
    report-type="PEPFAR"
    :columns="columns"
    :row-action-buttons="rowActionBtns"
    :rows="rows"
    :period="period"
    use-date-range-filter
    use-secure-export
    @generate="fetchData"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { loader } from "@/utils/loader";
import ReportTable from "@/components/ReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { toDisplayGenderFmt, parseARVNumber } from "@/utils/common";
import { toDisplayFmt } from "@/utils/his_date";
import router from "@/router";
import { DefaulterReportService } from "@/services/defaulter_report_service";
import { toastWarning } from "@/utils/toasts";

const period = ref("-");
const rows = ref<Array<any>>([]);
const title = ref("PEPFAR Defaulters List Report");
const columns: TableColumnInterface[] = [
  { path: "arv_number", label: "ARV Number", preSort: parseARVNumber, initialSort: true },
  { path: "given_name", label: "First name", exportable: false },
  { path: "family_name", label: "Last name", exportable: false },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
  { path: "birthdate", label: "Date of Birth", formatter: toDisplayFmt },
  { path: "current_age", label: "Age (At reporting)"},
  { path: "defaulter_date", label: "Defaulted Date", formatter: toDisplayFmt }
]

const rowActionBtns: RowActionButtonInterface[] = [{ 
  label: "Select", 
  action: (r) => router.push(`/emc/patient/${r['person_id']}`) 
}];

async function fetchData({ dateRange }: Record<string, any>) {
  await loader.show()
  const report = new DefaulterReportService()
  report.setStartDate(dateRange.startDate)
  report.setEndDate(dateRange.endDate)
  period.value = report.getDateIntervalPeriod()
  try {
    rows.value = await report.getDefaulters()
    title.value = `PEPFAR Defaulters List Report <b>(${rows.value.length} Defaulters)</b>`
  } catch (error) {
    toastWarning("Unable to load report data");
  }
  await loader.hide();
}

</script>