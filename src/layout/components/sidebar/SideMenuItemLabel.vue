<template>
  <ion-icon v-if="icon" :icon="icon" slot="start"></ion-icon>
  <img v-else-if="img" :src="resolveImage(img)" class="ion-margin-end icon" />
  <ion-label>{{ title }}</ion-label>
</template>

<script setup lang="ts">
import { resolveImage } from "@/utils/image";
import { IonIcon, IonLabel } from "@ionic/vue";
import { computed } from "vue";
import { RouteRecordRaw } from "vue-router";

const props = defineProps<{item: RouteRecordRaw; }>();
const title = computed(() => `${props.item.meta?.title ?? props.item.name ?? props.item.path}`);
const img = computed(() => props.item.meta?.img as string | undefined)
const icon = computed(() => props.item.meta?.icon as string | undefined)
</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
}
</style>