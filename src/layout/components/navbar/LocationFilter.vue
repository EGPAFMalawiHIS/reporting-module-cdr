<script setup lang="ts">
import { caretDown } from 'ionicons/icons';
import { 
  IonPopover, 
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonSearchbar,
  IonHeader,
} from '@ionic/vue';
import useFacility from '@/composables/useFacility';

const { facilityName } = useFacility();
const locationsOptions = [
  { label: "Test Location 1 sdygdw sdfvweui sdiubweh ", value: "Test Location 1" },
  { label: "Test Location 2", value: "Test Location 2" },
  { label: "Test Location 3", value: "Test Location 3" },
  { label: "Test Location 4", value: "Test Location 4" },
  { label: "Test Location 1", value: "Test Location 1" },
  { label: "Test Location 2", value: "Test Location 2" },
  { label: "Test Location 3", value: "Test Location 3" },
  { label: "Test Location 4", value: "Test Location 4" },
  { label: "Test Location 1", value: "Test Location 1" },
  { label: "Test Location 2", value: "Test Location 2" },
  { label: "Test Location 3", value: "Test Location 3" },
  { label: "Test Location 4", value: "Test Location 4" },
]

function handleFilter(e: Event) {
  console.log((e.target as HTMLInputElement).value);
}

function onSelectHandler (value: string) {
  facilityName.value = value;
}
</script>

<template>
  <ion-item id="location-filter" button lines="none">
    <span style="font-size: 14px; margin-right: 5px;">{{ `Location: ${ facilityName }` }}</span> 
    <ion-icon :icon="caretDown"></ion-icon>
  </ion-item>
  <ion-popover trigger="location-filter" trigger-action="click" v-if="locationsOptions?.length">
    <ion-header >
      <ion-item>
        <ion-searchbar 
          placeholder="Search location" 
          class="ion-no-padding"
          @ion-input=""
        />
      </ion-item>
    </ion-header>
    <ion-content style="max-height: 350px;">
      <ion-list>
        <ion-item v-for="location of locationsOptions" :key="location.label" @click="onSelectHandler(location.value)" button >
          <ion-label>{{ location.label }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>