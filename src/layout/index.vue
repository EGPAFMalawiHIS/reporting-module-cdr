<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import SideMenu from "./components/sidebar/index.vue";
import TopMenu from "./components/navbar/index.vue";
</script>

<template>
  <side-menu type="overlay"/>
  <ion-page id="main-content">
    <top-menu />
    <ion-content color="light">
      <div style="background-color: #fafafa; height: 100%;">
        <router-view style="overflow:auto; padding-left: 1rem;" />
      </div>
    </ion-content>
  </ion-page>
</template>
