import { ref } from "vue";

const facilityName = ref("");


export default function useFacility() {
  return {
    facilityName,
  }
}
