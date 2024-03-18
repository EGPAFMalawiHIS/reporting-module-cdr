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
import useVBoxValidator from "@/composables/useVBoxValidator";
import { TableColumnInterface } from "@uniquedj95/vtable"
import { PropType, onMounted } from "vue";
import { modal } from "@/utils/modal";

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

const { errors, validateReport } = useVBoxValidator();

onMounted(() => validateReport(props.columns, props.rows));
</script>