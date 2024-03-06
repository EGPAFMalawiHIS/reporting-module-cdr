<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/vue';
import NavbarItem from "./navbarItem.vue";
import { ref } from 'vue';

const location = ref("All");
const locationsOptions = [
  { label: "All", action: () => location.value = "All" },
  { label: "Test Location 1", action: () => location.value = "Test Location 1" },
  { label: "Test Location 2", action: () => location.value = "Test Location 2" },
  { label: "Test Location 3", action: () => location.value = "Test Location 3" },
  { label: "Test Location 4", action: () => location.value = "Test Location 4" },
]
</script>

<template>
  <ion-header class="toolbar-size">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide></ion-menu-button>
      </ion-buttons>
      <ion-title>CDR Reporting App</ion-title>
      <ion-buttons slot="end" size="large">
        <navbar-item :label="`Location: ${ location }`" :items="locationsOptions"></navbar-item>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>