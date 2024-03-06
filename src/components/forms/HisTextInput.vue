<script setup lang="ts">
import { IonLabel } from '@ionic/vue';
import { inject, ref, watch } from 'vue';
import { 
  COMPUTED_FORM_DATA_KEY, 
  FORM_DATA_KEY, 
  FormField, 
  FormData,
  ComputedFormData,
FormErrors,
FORM_ERRORS_KEY
} from '@/interfaces';
import { validate } from '@/utils/form/validations';
import { isEmpty } from '@/utils';

const props = defineProps<FormField>();
const fdata = inject<FormData>(FORM_DATA_KEY, {});
const cdata = inject<ComputedFormData>(COMPUTED_FORM_DATA_KEY, {});
const errors = inject<FormErrors>(FORM_ERRORS_KEY, {});
const value = ref(props.defaultValue as string);

watch(value, (newValue) => {
  fdata[props.id] = newValue;
  if(!isEmpty(newValue) && typeof props.computedValue === "function") {
    cdata[props.id] = props.computedValue(value, fdata, cdata)
  } else {
    cdata[props.id] = null;
  }
})

</script>

<template>
  <ion-label v-if="label" class="ion-padding-bottom bold">{{ label }}</ion-label>
  <div class="ion-margin-top input-wrapper" :class="errors?.length ? 'box-input-error' : 'box-input'">
    <div v-if="prefixValue" class="input-modifier">
      <ion-label class="checkbox-label bold">{{ prefixValue }}</ion-label>
    </div>
    <div class="input-value">
      <ion-input
        class="ion-no-margin ion-no-padding"
        v-model="value"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        @ionFocus="errors[id] = ''"
        @ionBlur="errors[id] = validate(value, rules)"
      />
    </div>
    <div v-if="suffixValue" class="input-modifier">
      <ion-label class="checkbox-label bold ion-float-right">{{ suffixValue }}</ion-label>
    </div>
  </div>
  <ion-note v-if="errors[id].length" color="danger">{{ errors[id] }}</ion-note>
</template>

<style scoped>
.input-wrapper {
  width: 100%; 
  height: 2.5rem; 
  display: flex; 
  justify-content: space-between;
}

.input-modifier {
  background: #f2f2f2; 
  height: 100%; 
  padding: .5rem; 
  flex-grow: 1;
}

.input-value {
  background: #ffffff; 
  height: 100%;
  padding: .5rem;  
  flex-grow: 8;
}
</style>