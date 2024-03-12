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
import useFacility, { Facility } from '@/composables/useFacility';

const { facility } = useFacility();
const locationsOptions: Array<Facility> = [
  { name: "Test Location 1", uuid: "", id: 1 },
  { name: "Test Location 2", uuid: "", id: 2 },
  { name: "Test Location 3", uuid: "", id: 3 },
  { name: "Test Location 4", uuid: "", id: 4 },
  { name: "Test Location 1", uuid: "", id: 11 },
  { name: "Test Location 2", uuid: "", id: 10 },
  { name: "Test Location 3", uuid: "", id: 8 },
]

function handleFilter(e: Event) {
  console.log((e.target as HTMLInputElement).value);
}

function onSelectHandler (value: number) {
  const f = locationsOptions.find(l => l.id === value)
  if(f) facility.value = f;
}
</script>

<template>
  <ion-item id="location-filter" button lines="none">
    <span style="font-size: 14px; margin-right: 5px;">{{ `Location: ${ facility.name }` }}</span> 
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
        <ion-item v-for="location of locationsOptions" :key="location.name" @click="onSelectHandler(location.id)" button >
          <ion-label>{{ location.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>