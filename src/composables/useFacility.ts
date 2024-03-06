import apiClient from "@/api";;
import { computed, ref } from "vue";

const facilityName = ref("");
const facilityUUID = ref("");
const district = ref("");

async function setLocation(){
  const res = await apiClient.getJson<any>('/locations/current_facility');
  if(res.ok) {
    facilityName.value = res.data.name;
    facilityUUID.value = res.data.uuid;
    district.value = res.data.district;
  }
}

const isInvalidFacility = computed(() => !facilityName.value || !facilityUUID.value || !district.value);

export default function useFacility() {
  return {
    facilityName,
    facilityUUID,
    district,
    isInvalidFacility,
    setLocation,
  }
}
