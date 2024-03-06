<script setup lang="ts">
import { IonApp } from '@ionic/vue';
import useAppInfo from './composables/appInfo';
import 'nprogress/nprogress.css'
import nprogress from "nprogress";
import { computed, defineAsyncComponent, ref } from 'vue';
import { alertConfirmation } from './utils/alerts';
import { useRoute, useRouter } from 'vue-router';
import { ApiCore, ClientError } from 'emr-api-client';
import useFacility from './composables/useFacility';

const ConnectionError = defineAsyncComponent(() => import("@/components/ConnectionError.vue"));

const route = useRoute();
const router = useRouter();
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

ApiCore.interceptRequest = (req) => {
  nprogress.start();
  return req
}

ApiCore.interceptResponse = (_req, res) => {
  nprogress.done();

  if(!res.ok) {
    if (res.clientErrorType === ClientError.NO_CONNECTION) startHealthCheck();
    if (res.clientErrorType === ClientError.AUTHENTICATION_ERROR) router.push("/login");
  } else if(healthCheckInterval.value) {
    stopHealthCheck();
  }

  return res;
}

function startHealthCheck () {
  if(!healthCheckInterval.value) {
    healthCheckInterval.value = setInterval(() => {
      if(isNotConfigPage.value) ApiCore.apiOk();
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
</script>

<template>
  <ion-app>
    <router-view />
    <ConnectionError v-if="!!healthCheckInterval && isNotConfigPage" />
  </ion-app>
</template>