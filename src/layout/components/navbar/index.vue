<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/vue';
import navbarItem from './navbarItem.vue';
import useFacility from "@/composables/useFacility";
import { personCircle, exit, lockClosed} from "ionicons/icons";
import { useRouter } from 'vue-router';
import { ApiCore } from 'emr-api-client';

const { facilityName } = useFacility();
const router = useRouter();

const userMenuItems = [
  {
    label: "Edit Profile",
    action: () => console.log("Profile"),
    icon: personCircle
  },
  {
    label: "Change Password",
    action: () => console.log("Profile"),
    icon: lockClosed
  },
  {
    label: "Logout",
    action: () => {
      ApiCore.logout();
      router.push("/login");
    },
    icon: exit
  }
]
</script>

<template>
  <ion-header class="toolbar-size">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide></ion-menu-button>
      </ion-buttons>
      <ion-title>{{ facilityName }}</ion-title>
      <ion-buttons slot="end" size="large">
        <navbar-item :label="ApiCore.username ?? ''" :items="userMenuItems"></navbar-item>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>