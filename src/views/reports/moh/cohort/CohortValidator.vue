<template>
  <div id="consistency_check">
    <div v-for="(text, index) in reportConsistencies" :key="index">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  reportConsistencies: {
    type: Array as PropType<Array<string>>,
    default: () => []
  }
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