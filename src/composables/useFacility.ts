import { ref } from "vue";

interface Facility {
  name: string;
  id: number;
};

const facility = ref<Facility>({
  name: "Mimosa Facility",
  id: 413
});

export default function useFacility() {
  return {
    facility,
  }
}
