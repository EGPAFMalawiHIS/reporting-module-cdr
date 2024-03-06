<script setup lang="ts">
import { ALTERNATIVE_FORM_DATA_KEY, FORM_DATA_KEY, FORM_ERRORS_KEY } from '@/interfaces';
import { IonButtons, IonButton } from '@ionic/vue';
import { provide, reactive } from 'vue';

const _formData = reactive({} as Record<string, any>);
const _alternativeFormValues = reactive({} as Record<string, any>);
const _form_errors = reactive({} as Record<string, string>);

provide(FORM_DATA_KEY, _formData);
provide(ALTERNATIVE_FORM_DATA_KEY, _alternativeFormValues);
provide(FORM_ERRORS_KEY, _form_errors);

const emit = defineEmits(["finish"]);

const handleSubmit = () => {
  emit("finish", )
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
    <ion-buttons class="ion-margin-top">
      <slot name="footerButtons"></slot>
      <ion-button @click="handleSubmit">Submit</ion-button>
    </ion-buttons>
  </form>
</template>