<script setup lang="ts">
import { caretDown } from 'ionicons/icons';
import { 
  IonPopover, 
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/vue';

defineProps<{
  label: string;
  items?: Array<{
    label: string;
    icon?: string;
    action: () => void;
  }>;
}>();
</script>

<template>
  <ion-item :id="label" button lines="none">
    <span style="font-size: 14px; margin-right: 5px;">{{ label }}</span> 
    <ion-icon :icon="caretDown" v-if="items?.length"></ion-icon>
  </ion-item>
  <ion-popover :trigger="label" trigger-action="click" v-if="items?.length" dismissOnSelect>
    <ion-content style="width: max-content;">
      <ion-list>
        <ion-item v-for="item of items" :key="item.label" @click="item.action" button >
          <ion-icon v-if="item.icon" :icon="item.icon" slot="start" style="margin-right: 1rem;"></ion-icon>
          <ion-label>{{ item.label }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>