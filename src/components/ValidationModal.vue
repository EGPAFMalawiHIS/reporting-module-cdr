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
import { PropType, onMounted } from "vue";
import { modal } from "@/utils/modal";
import useFacility, { Facility } from "@/composables/useFacility";

const props = defineProps({
  reportName: {
    type: String,
    required: true
  },
  reportType: {
    type: String as PropType<"PEPFAR" | "MoH" | "Clinic">,
    default: "PEPFAR"
  },
  rawData: {
    type: String,
    required: true
  }
});

const { errors, validateReport } = useVBoxValidator();
const { facility } = useFacility();

onMounted(() => validateReport({
  rawData: props.rawData,
  reportName: props.reportName,
  reportType: props.reportType,
  facility: facility.value as Facility,
}));
</script>