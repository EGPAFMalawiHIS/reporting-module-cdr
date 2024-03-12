import { ref } from "vue";

export interface Facility {
  name: string;
  uuid: string;
  id: number;
};

const facility = ref<Facility>({
  name: "Mimosa Facility",
  uuid: "",
  id: 413
});

export default function useFacility() {
  return {
    facility,
  }
}
