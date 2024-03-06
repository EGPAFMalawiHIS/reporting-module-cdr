import { ApiCore } from "emr-api-client";
import { computed, ref } from "vue";

const facilityName = ref("");
const facilityUUID = ref("");
const district = ref("");

async function setLocation(){
  const res = await ApiCore.getJson<any>('/locations/current_facility');
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
