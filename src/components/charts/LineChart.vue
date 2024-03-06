<template>
  <ion-card style="height: 100%;">
    <ion-card-content>
      <apex-chart 
        width="100%" 
        :height="height" 
        type="line" 
        :options="chartOptions" 
        :series="series" 
        @markerClick="onPointSelection"
      />
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import { IonCard, IonCardContent } from "@ionic/vue";
import ApexChart from "vue3-apexcharts"
import { getPlaceholderChart, mergeOptions, LineChartOptions } from "../../utils/charts";

const props = defineProps({
  series: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  options: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  height: {
    type: [String, Number],
    default: 560
  },
  placeholder: {
    type: String,
    default: "Loading data..."
  }
})

const emit = defineEmits(["pointSelection"]);

const chartOptions = computed(() => mergeOptions({
  ...LineChartOptions,
  noData: getPlaceholderChart(props.placeholder)
}, props.options));

const onPointSelection = (e: any, c: any, { dataPointIndex, seriesIndex }: any) => {
  emit("pointSelection", dataPointIndex, seriesIndex <= 0 ? 0 : seriesIndex)
}
</script>