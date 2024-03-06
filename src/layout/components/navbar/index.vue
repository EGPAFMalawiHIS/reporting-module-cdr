<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/vue';
import useFacility from "@/composables/useFacility";

const { facilityName } = useFacility();
</script>

<template>
  <ion-header class="toolbar-size">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide></ion-menu-button>
      </ion-buttons>
      <ion-title>{{ facilityName }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>