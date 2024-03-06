<template>
  <div class="ion-no-padding">
    <h3 v-html="title" class="ion-margin-start"></h3>
    <IonItemDivider style="margin-top: 0px; min-height: 2px !important;"/>
    <data-table 
      :rows="rows"
      :columns="columns" 
      :actions-buttons="actionBtns" 
      :row-actions-buttons="rowBtns"
      :config="{ showSubmitButton: false }"
      color="light"
    >
    </data-table>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, ref } from 'vue';
import { Option } from '@/interfaces';
import { getCsvExportBtn, getPdfExportBtn } from '@/utils/exports';
import { toDisplayGenderFmt, parseARVNumber, sanitizeStr } from '@/utils/common';
import useFacility from '@/composables/useFacility';
import { toDisplayFmt } from "@/utils/his_date";
import { IonItemDivider} from "@ionic/vue";

import { 
  ActionButtonInterface, 
  DataTable, 
  RowActionButtonInterface, 
  TableColumnInterface, 
} from '@uniquedj95/vtable'
import { Patient } from 'emr-api-client';
import { chunk } from '@/utils/arrays';
import { toastWarning } from '@/utils/toasts';
import { eye } from 'ionicons/icons';
import { modal } from '@/utils/modal';
import router from '@/router';
import { DrilldownData } from './ReportTable.vue';

const props = defineProps({
  title: {
    type: String,
    default: "Drill down table",
  },
  data: {
    type: Object as PropType<DrilldownData>,
    required: true
  },
  customColumns: {
    type: Array as PropType<Array<TableColumnInterface>>,
    required: false,
  },
  rowParser: {
    type: Function as PropType<(data: DrilldownData) => Promise<Array<any>>>,
    required: false
  },
  reportType: {
    type: String,
    default: "",
  },
  period: {
    type: String,
    default: "",
  },
  quarter: {
    type: Object as PropType<Option>,
    default: () => ({}),
  },
});

const rows = ref<Array<any>>([])
const filename = computed(() => sanitizeStr(`
  ${ props.reportType } 
  ${ useFacility().facilityName.value } 
  ${ props.title.replace(props.reportType, "") } 
  ${ props.period || props.quarter.label || toDisplayFmt() }
`));

const columns = computed<Array<TableColumnInterface>>(() => props.customColumns ?? [
  { path: "identifier", label: "ARV Number", preSort: parseARVNumber, initialSort: true },
  { path: "birthdate", label: "Date of Birth", formatter: toDisplayFmt },
  { path: "gender", label: "Gender", formatter: toDisplayGenderFmt },
]);

const rowBtns: Array<RowActionButtonInterface> = [{
  icon: eye,
  action: (row) => router.push(`/patient/${row['person_id']}`)
}]

const actionBtns = computed<ActionButtonInterface[]>(() => {
  return [
    { label: "close", action: modal.hide, color: "danger" },
    getCsvExportBtn(filename.value, props.quarter?.label, props.period),
    getPdfExportBtn(filename.value, false, props.quarter?.label, props.period),
  ]
})

onMounted(async () => {
  if(typeof props.rowParser === "function") {
    return rows.value = await props.rowParser(props.data);
  }
  const patientIds = props.data.row[props.data.column.path]
  chunk<number>(patientIds, 100).forEach(async (ids) => {
    const res = await Patient.getAll(ids)
    if(!res.ok) return toastWarning(res.errorMessage ?? 'Unable to load patient data'); 
    rows.value = res.data ?? [];
  })

})
</script>
