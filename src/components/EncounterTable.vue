<template>
  <ion-card style="height: 100%;">
    <ion-card-content>
      <ion-card-title class="ion-padding-start ion-padding-bottom text-sm" style="font-weight: 800;">Encounters created today</ion-card-title>
      <data-table :rows="rowData" :columns="columns" color="light" :config="config" :loading="isLoading" />
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { DataTable, TableColumnInterface, TableConfigInterface } from '@uniquedj95/vtable';
import { IonCard, IonCardContent, IonCardTitle } from '@ionic/vue';
import { PropType } from 'vue';

const config: TableConfigInterface = {
  showSearchField: false,
  showIndices: false,
  showSubmitButton: false,
  pagination: {
    enabled: false
  }
}

const thStyles = { maxWidth: "78px !important", fontSize: 'var(--font-size-sm)'};
const columns: Array<TableColumnInterface> = [
  { path: "encounter", label: "Encounter Name", thStyles, tdStyles: thStyles },
  { path: "female", label: "Female", thStyles, tdStyles: thStyles },
  { path: "male", label: "Male", thStyles, tdStyles: thStyles },
  { path: "me", label: "Me", thStyles, tdStyles: thStyles},
  { path: "facility", label: "Facility", thStyles, tdStyles: thStyles }
]

defineProps({
  rowData: {
    type: Array as PropType<Array<any>>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false
  },
});

</script>