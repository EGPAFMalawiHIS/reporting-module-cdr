<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/vue';
import LocationFilter from './LocationFilter.vue';
</script>

<template>
  <ion-header class="toolbar-size">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide></ion-menu-button>
      </ion-buttons>
      <ion-title>CDR Reporting App</ion-title>
      <ion-buttons slot="end" size="large">
        <location-filter />
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>