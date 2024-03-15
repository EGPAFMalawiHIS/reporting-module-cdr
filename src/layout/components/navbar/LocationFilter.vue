<template>
  <ion-item id="location-filter" button lines="none">
    <span style="font-size: 14px; margin-right: 5px;">{{ `Location: ${ facility?.name ?? 'select facility'}` }}</span> 
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
        <ion-item v-for="location of facilities" :key="location.name" @click="onSelectHandler(location.id)" button >
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
import { isEmpty } from '@/utils/common';

const { facility, loadFacilities } = useFacility();
const facilities = ref<Array<Facility>>([]);

async function handleFilter(e: Event) {
  const filter = (e.target as HTMLInputElement).value;
  facilities.value = facilities.value = await loadFacilities(filter);
}

function onSelectHandler (value: number) {
  const selectedFacility = facilities.value.find(facility => facility.id === value);
  if(selectedFacility) facility.value = selectedFacility;
  popoverController.getTop().then(v => v && popoverController.dismiss());
}

watch(facilities, facilities => {
  if(!isEmpty(facilities)) facility.value = facilities[0];
})

onMounted(async () => facilities.value = await loadFacilities());
</script>