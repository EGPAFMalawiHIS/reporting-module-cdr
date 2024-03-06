<template>
  <div id="containter">
    <h1 class="ion-padding-start">
      Dashboard
      <ion-button class="ion-margin-end ion-float-right" @click="refresh" :disabled="isLoading">
        Refresh
      </ion-button>
    </h1>
    <ion-grid>
      <ion-row>
        <ion-col size-md="3">
          <box-card label="Total Visits" :value="totalVisits" :icon="statsChart" color="success" :is-loading="!visits" />
        </ion-col>
        <ion-col size-md="3">
          <box-card label="Missed Appointments" :value="missedAppointments?.length ?? 0" :icon="calendar" color="danger" :is-loading="!missedAppointments" />
        </ion-col>
        <ion-col size-md="3">
          <box-card label="Appointments Due" :value="appointmentsDue?.length ?? 0" :icon="alarm" color="secondary" :is-loading="!appointmentsDue" />
        </ion-col>
        <ion-col size-md="3">
          <box-card label="Due For VL" :value="dueForVL?.length ?? 0" :icon="time" color="secondary" :is-loading="!dueForVL" />
        </ion-col>
        <ion-col size-md="3">
          <box-card label="Defaulter (this quarter)" :value="defaulters?.length ?? 0" :icon="clipboard" color="danger" :is-loading="!defaulters" />
        </ion-col>
        <ion-col size-md="3">
          <box-card label="Patients on DTG" :value="patientsOnDTG?.length ?? 0" :icon="medkit" color="primary" :is-loading="!patientsOnDTG" />
        </ion-col>
        <ion-col size-md="3">
          <box-card label="Tx Curr (30 Days)" :value="txCurrent30?.length ?? 0" :icon="people" color="primary" :is-loading="!txCurrent30" />
        </ion-col>
        <ion-col size-md="3">
          <box-card label="Tx Curr (60 Days)" :value="txCurrent60?.length ?? 0" :icon="people" color="primary" :is-loading="!txCurrent60" />
        </ion-col>
      </ion-row>
      <ion-row class=" ion-margin-bottom">
        <ion-col size-md="6">
          <line-chart :series="visitsChartSeries" :options="visitsChartOptions" :placeholder="chartPlaceholderText" />
        </ion-col>
        <ion-col size-md="6">
          <encounter-table :row-data="encounters ?? []" :is-loading="!encounters" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import BoxCard from '@/components/BoxCard.vue';
import { IonButton, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { computed  } from 'vue';
import LineChart from "@/components/charts/LineChart.vue"
import { statsChart, alarm, calendar, people, time, clipboard, medkit } from "ionicons/icons"
import EncounterTable from '@/components/EncounterTable.vue';
import useDashboardStats from '@/composables/useDashboardStats';

const {
  visits,
  missedAppointments,
  appointmentsDue,
  dueForVL,
  defaulters,
  patientsOnDTG,
  txCurrent30,
  txCurrent60,
  encounters,
  isLoading,
  refresh,
} = useDashboardStats();

const chartPlaceholderText = computed(() => visits ? "No Data" : "Loading data...");
const totalVisits = computed(() => visits.value?.complete.concat(visits.value.complete).reduce((sum, num) => sum += num, 0) ?? 0);

const visitsChartOptions = computed(() => ({
  title: {
    text: "Complete / incomplete visits",
    align: "left",
  },
  xaxis: {
    categories: visits.value?.dates ?? [],
    tickAmount: 30,
    labels: {
      show: true,
      rotate: -75,
    }
  },
}))

const visitsChartSeries = computed(() => [
  {
    name: "Complete Visits",
    data: visits.value?.complete ?? [],
  },
  {
    name: "Incomplete Visits",
    data: visits.value?.incomplete ?? [],
  },
]);

</script>
