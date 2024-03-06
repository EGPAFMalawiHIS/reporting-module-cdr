<script setup lang="ts">
import { IonButton } from "@ionic/vue"

const refresh = () => location.reload()
</script>

<template>
  <div id="api-error" class="his-card">
    <p>
      Unable to connect to API. 
      Please check: 
      <ul :style="{listStyle:'none'}"> 
        <li> Check the HIS-Core configuration file </li>
        <li> Your configuration </li>
        <li> The service is running </li>
        <li> Your network cable is ok </li>
      </ul> 
    </p>
    <ion-button color="warning" router-link="/settings/host"> 
      New Config
    </ion-button>
    <ion-button @click="refresh" color="warning"> 
      Refresh
    </ion-button>
  </div>
</template>

<style scoped>
#api-error {
  bottom: 0;
  position: absolute;
  background: red;
  color: white;
  font-weight: bold;
  width: 50vw;
  bottom: 30px; /* Position Y halfway in */
  left: 50%; /* Position X halfway in */
  transform: translate(-50%,-50%); /* Move it halfway back(x,y) */
  text-align: center;
  z-index: 40;
}
</style>