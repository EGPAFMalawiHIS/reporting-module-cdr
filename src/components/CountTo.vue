<template>
  <span>{{ counter }}</span>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
  end: {
    type: Number,
    required: true
  },
  start: {
    type: Number,
    default: 0
  },
  time: {
    type: Number,
    default: 500
  }
});

const counter = ref(props.start);

function animate() {
  const interval = props.end / props.time;
  if(counter.value < props.end) {
    counter.value = Math.ceil(counter.value + interval);
    setTimeout(animate, 1);
  } else {
    counter.value = props.end;
  }
}

onMounted(() => animate());
</script>