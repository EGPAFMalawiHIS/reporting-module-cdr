<template>
  <ion-card color="">
    <ion-card-content>
      <ion-card-subtitle class="text-sm">{{ label }}</ion-card-subtitle>
      <ion-card-title style="font-size: x-large; font-weight: bold;">
        <ion-spinner v-if="isLoading" name="bubbles" :color="color" />
        <count-to :end="value" v-else />
      </ion-card-title>
      <ion-icon :icon="icon" :color="color" v-if="icon" class="ion-float-right ion-margin-top"></ion-icon>
      <img :src="resolveImage(img)" v-if="img" class="ion-float-right ion-margin-top" />
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import { IonCard, IonCardTitle, IonCardSubtitle, IonSpinner, IonCardContent, IonIcon } from "@ionic/vue";
import CountTo from "./CountTo.vue";
import { resolveImage } from "@/utils/image";

defineProps({
  value: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  img: {
    type: String,
  },
  color: {
    type: String,
    default: 'light'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});


</script>

<style scoped>

ion-icon {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 1rem;
  font-size: 28px;
  opacity: .9;
}

ion-img {
  width: 3rem;
  height: 3rem;
}
</style>