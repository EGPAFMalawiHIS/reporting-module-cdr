<template>
  <ion-card class="ion-no-padding">
    <ion-card-header>
      <ion-card-title>Report Validation: {{ reportName }}</ion-card-title>
      <ion-button slot="end" @click="modal.hide">x</ion-button>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item v-for="(error, index) of errors" :key="index" lines="none">
          <ion-label>{{ error }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonList, IonItem, IonLabel } from "@ionic/vue";
import { TableColumnInterface } from "@uniquedj95/vtable"
import { toCsvString } from "@/utils/exports";
import { PropType, onMounted, ref } from "vue";
import { VBoxResult } from "@/interfaces/vbox";
import { modal } from "@/utils/modal";
import ApiClient from "@/api";



const props = defineProps({
  reportName: {
    type: String,
    required: true
  },
  rows: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<Array<TableColumnInterface>>,
    default: () => []
  }
});

const errors = ref<Array<string>>([]);

function toErrorStrings (results: Array<VBoxResult>){
  return results.map(result => result.table.message.replace("cum_", "Cumulative").replace("_", " "));
}

async function validateReport() {
  const data = toCsvString({ columns: props.columns, rows: props.rows, filename: "", appendFooter: false });
  const results = await ApiClient.postJson<Array<VBoxResult>>('validate_data', { data }, {}, "http://localhost:4001");
  errors.value = toErrorStrings(results);
}

onMounted(() => validateReport());
</script>