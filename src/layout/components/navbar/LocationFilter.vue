<template>
  <ion-item id="location-filter" button lines="none">
    <span style="font-size: 14px; margin-right: 5px;">{{ `Location: ${ facility.name }` }}</span> 
    <ion-icon :icon="caretDown"></ion-icon>
  </ion-item>
  <ion-popover trigger="location-filter" trigger-action="click" v-if="facilities?.length">
    <ion-header >
      <ion-item>
        <ion-searchbar 
          placeholder="Search location" 
          class="ion-no-padding"
          @ion-input="handleFilter"
        />
      </ion-item>
    </ion-header>
    <ion-content style="max-height: 350px;">
      <ion-list>
        <ion-item v-for="location of resultSet.slice(0, 10)" :key="location.name" @click="onSelectHandler(location.id)" button >
          <ion-label>{{ location.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

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
  popoverController,
} from '@ionic/vue';
import useFacility, { Facility } from '@/composables/useFacility';
import { onMounted, ref, watch } from 'vue';

const { facility, loadFacilities } = useFacility();
const facilities = ref<Array<Facility>>([]);
const resultSet = ref<Array<Facility>>([]);

async function handleFilter(e: Event) {
  const filter = (e.target as HTMLInputElement).value;
  // facilities.value = facilities.value = await loadFacilities(filter);
  // use fazy search on facilities value based on input
  const result = facilities.value.filter(facility => facility.name.toLowerCase().includes(filter.toLowerCase()));
  // result set should always be 10 or less
  resultSet.value = result.length > 10 ? result.slice(0, 10) : result;
}

function onSelectHandler (value: number) {
  const selectedFacility = facilities.value.find(facility => facility.id === value);
  if(selectedFacility) facility.value = selectedFacility;
  popoverController.getTop().then(v => v && popoverController.dismiss());
}

onMounted(async () => facilities.value = await loadFacilities());
// watch for changes in facilities
watch(facilities, (newVal) => resultSet.value = newVal);
</script>