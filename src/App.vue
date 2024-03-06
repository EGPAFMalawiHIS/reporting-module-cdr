<script setup lang="ts">
import { IonApp } from '@ionic/vue';
import useAppInfo from './composables/appInfo';
import 'nprogress/nprogress.css'
import nprogress from "nprogress";
import { computed, defineAsyncComponent, ref } from 'vue';
import { alertConfirmation } from './utils/alerts';
import { useRoute } from 'vue-router';
import useFacility from './composables/useFacility';
import ApiClient from "@/api";

const ConnectionError = defineAsyncComponent(() => import("@/components/ConnectionError.vue"));

const route = useRoute();
const { loadApiVersion, loadAppVersions } = useAppInfo();
const { setLocation } = useFacility();

const healthCheckInterval = ref<NodeJS.Timeout | null>(null);
const isNotConfigPage = computed(() => route.name !== "Network Settings")

loadApiVersion();
loadAppVersions();
setLocation();

nprogress.configure({ 
  easing: 'ease', 
  speed: 330, 
  trickleSpeed: 8
})

function startHealthCheck () {
  if(!healthCheckInterval.value) {
    healthCheckInterval.value = setInterval(() => {
      if(isNotConfigPage.value) ApiClient.apiOk();
    }, 10000);
  }
}

function stopHealthCheck () {
  clearInterval(healthCheckInterval.value as any);
  healthCheckInterval.value = null;
  alertConfirmation('Do you want to refresh the page?', {
    header: 'API connection is back'
  }).then(confirm => confirm && location.reload());
}

ApiClient.on("beforeRequest", () => nprogress.start());

ApiClient.on("afterRequest", async () => {
  if(healthCheckInterval.value) stopHealthCheck();
  nprogress.done();
});

ApiClient.on("serverClash", () => startHealthCheck());
</script>

<template>
  <ion-app>
    <router-view />
    <ConnectionError v-if="!!healthCheckInterval && isNotConfigPage" />
  </ion-app>
</template>