<template>
  <ion-card style="padding: 0 !important">
    <ion-card-header style="border-bottom: 1px solid #c2c2c2; font-weight: 500; color: #000;">
      <ion-card-title v-html="title"></ion-card-title>
      <ion-card-subtitle v-html="subtitle" v-if="subtitle" style="color:#818181;"></ion-card-subtitle>
      <ion-card-subtitle v-if="totalClients">Total Clients: {{ totalClients }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content class="ion-no-padding" style="min-height: 45vh;">
      <data-table 
        :rows="rows"
        :async-rows="asyncRows" 
        :columns="tableColumns" 
        :actions-buttons="actionBtns" 
        :row-actions-buttons="rowActionButtons" 
        :custom-filters="filters" 
        :config="{ showIndices }"
        @custom-filter="onCustomFilter"
        color="light"
      >
        <template v-for="(_, name) in $slots" #[name]="{ filter }">
          <slot :name="name" :filter="{ filter }"></slot>
        </template>
        <template #dateRange>
          <vue-date-picker 
            v-model="dateRange" 
            placeholder="Select date range"
            :partial-range="false"
            :enable-time-picker="false"
            :format="toDisplayRangeFmt"
            multi-calendars
            auto-apply
            text-input
            range 
          />
        </template>
        <template #datePicker>
          <vue-date-picker
            v-model="pickerDate" 
            :enable-time-picker="false"
            model-type="dd/MMM/yyyy"
            placeholder="select date"
            auto-apply
            text-input
          />
        </template>
      </data-table>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { Option } from '@/interfaces';
import { getCsvExportBtn, getPdfExportBtn } from '@/utils/exports';
import { isEmpty, sanitizeStr } from '@/utils/common';
import useFacility from '@/composables/useFacility';
import { getReportQuarters, toDisplayRangeFmt } from "@/utils/his_date";
import VueDatePicker from '@vuepic/vue-datepicker';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from "@ionic/vue";

import { 
  ActionButtonInterface, 
  CustomFilterInterface, 
  DataTable, 
  RowActionButtonInterface, 
  TableColumnInterface, 
} from '@uniquedj95/vtable'
import { toastWarning } from '@/utils/toasts';
import { sync } from 'ionicons/icons';

const emit = defineEmits<{
  (e: "generate", filters: Record<string, any>, rebuildCache: boolean): void,
}>();

const props = defineProps({
  title: {
    type: String,
    default: "Report",
  },
  subtitle: {
    type: String,
    default: "",
  },
  period: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  quarter: {
    type: Object as PropType<Option>,
    default: () => ({}),
  },
  totalClients: {
    type: Number,
    default: 0,
  },
  columns: {
    type: Array as PropType<TableColumnInterface[]>,
    default: () => [],
  },
  rows: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  asyncRows: {
    type: Function as PropType<() => Promise<any[]>>,
  },
  actionButtons: {
    type: Array as PropType<ActionButtonInterface[]>,
    default: () => [],
  },
  rowActionButtons: {
    type: Array as PropType<RowActionButtonInterface[]>,
    default: () => [],
  },
  canExportCsv: {
    type: Boolean,
    default: true,
  },
  canExportPDF: {
    type: Boolean,
    default: true,
  },
  useSecureExport: {
    type: Boolean,
    default: false,
  },
  showRefreshButton: {
    type: Boolean,
    default: true,
  },
  useDateRangeFilter: {
    type: Boolean,
    default: false,
  },
  useQuarterFilter: {
    type: Boolean,
    default: false,
  },
  useDateFilter: {
    type: Boolean,
    default: false,
  },
  customFilters: {
    type: Array as PropType<CustomFilterInterface[]>,
    default: () => [],
  },
  showIndices: {
    type: Boolean,
    default: false
  },
  filename: {
    type: String,
    default: "",
  },
  reportType: {
    type: String,
    default: "",
  },
});

const dateRange = ref<Array<string>>([]);
const pickerDate = ref("");
const filterValues = ref({} as Record<string, any>);
const filename = computed(() => sanitizeStr(`
  ${props.reportType} 
  ${useFacility().facility.value.name } 
  ${(props.filename || props.title).replace(props.reportType, "")} 
  ${props.period ? props.period : props.date }
`));

const thStyles = { maxWidth: "68px !important" };
const tableColumns = computed(() => props.columns.map(column => ({
  ...column,
  thStyles: {...thStyles, ...column.thStyles },
  tdStyles: {...thStyles, ...column.tdStyles },
})))

const filters = computed<CustomFilterInterface[]>(() => {
  const f = [...props.customFilters];
  if(props.useDateRangeFilter) {
    f.push({
      id: "dateRange",
      label: "Date Range",
      type: "dateRange",
      slotName: "dateRange",
      gridSize: 6,
      value: {
        start: props.period.split("-")[0],
        end: props.period.split("-")[1],
      },
    })
  } else if(props.useQuarterFilter) {
    f.push({
      id: "quarter",
      label: "Quarter:",
      type: "select",
      value: props.quarter,
      options: getReportQuarters(10).map(q => ({ 
        label: q.name, 
        value: q.name, 
        other: q 
      })),
    })
  } else if (props.useDateFilter) {
    f.push({
      id: "date",
      label: "Date",
      type: "date",
      slotName: "datePicker",
      value: props.date,
    })
  }
  return f;
})

const actionBtns = computed<ActionButtonInterface[]>(() => {
  const btns = [...props.actionButtons];
  if (props.canExportCsv) btns.push(getCsvExportBtn(filename.value, props.quarter?.label, props.period));
  if (props.canExportPDF) btns.push(getPdfExportBtn(filename.value, props.useSecureExport, props.quarter?.label, props.period));
  if(props.showRefreshButton) btns.push(getRefreshBtn());
  return btns;
})

function getRefreshBtn (): ActionButtonInterface {
  return { 
    label: "Refresh/Rebuild", 
    icon: sync,
    color: 'primary', 
    action: () => {
      if(isEmpty(filterValues.value)) return toastWarning("Invalid filters");
      emit("generate", filterValues.value, true);
    } 
  }
}

function hasValidFilterValues (values: Record<string, any>) {
  return filters.value.every(f => {
    if (f.required === false) return true;
    if (isEmpty(values[f.id])) return false;
    if (typeof values[f.id] === 'object') {
      return Object.values(values[f.id]).every(Boolean);
    }
    return true;
  })
}

function onCustomFilter (values: Record<string, any>) {
  if ("dateRange" in values) {
    if(isEmpty(dateRange.value) || dateRange.value.length < 2) return toastWarning("Invalid date range")
    values.dateRange = {
      startDate: dateRange.value[0],
      endDate: dateRange.value[1]
    }
  }

  if("date" in values) {
    if(isEmpty(pickerDate.value)) return toastWarning("Invalid date")
    values.date = pickerDate.value 
  }

  if (hasValidFilterValues(values)) {
    filterValues.value = values;
    return emit("generate", values, false);
  }
  toastWarning("Invalid filters")
}
</script>