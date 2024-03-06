<template>
  <div id="consistency_check">
    <div v-for="(text, index) in reportConsistency" :key="index">
      {{text}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import useCohortValidator from '@/composables/useCohortValidator';
import { isEmpty } from '@/utils/common';
import { PropType, computed } from 'vue';

const props = defineProps({
  indicators: {
    type: Object as PropType<Record<string, number>>,
    default: () => ({})
  }
})

const reportConsistency = computed(() => {
  if(isEmpty(props.indicators)) return [];
  return useCohortValidator(props.indicators)
});
</script>

<style scoped>
div {
    width: 100%;
    text-align: left;
    padding-left: 5px;
}
#consistency_check div {
    color: red;
    padding-bottom: 10px;
}
</style>