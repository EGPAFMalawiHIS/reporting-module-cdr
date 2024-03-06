<script setup lang="ts">
import SideMenuItem from './SideMenuItem.vue';
import { resolveImage } from '@/utils/image';
import { routes } from "@/router";
import { 
  IonMenu, 
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel
} from '@ionic/vue';
</script>

<template>
  <ion-menu menu-id="app-menu" content-id="main-content" auto-hide>
    <ion-header>
      <ion-toolbar>
        <ion-item lines="none"> 
          <ion-thumbnail slot="start"> 
            <img :src="resolveImage('aids.png')" class="logo" alt="HIV Electronic Mastercard App logo"/>
          </ion-thumbnail>
          <ion-label>E-MASTERCARD</ion-label>
        </ion-item>
        <ion-label class="ion-margin-start">HIV Electronic Mastercard App</ion-label>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <keep-alive>
        <ion-list>
          <side-menu-item v-for="(item, i) of routes" :key="i" :item="item" :parent-path="item.path"/>
        </ion-list>
      </keep-alive>
    </ion-content>
  </ion-menu>
</template>