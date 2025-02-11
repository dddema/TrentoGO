<script setup>
import { ref, watch, defineModel } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ' '
  },
  validationFn: {
    type: Function
  },
})

const text = defineModel('text');
const isValid = defineModel('isValid', { type: Boolean, default: false });

const isEmpty = ref(true);

if (props.validationFn) {
  watch(text, (newText, oldText) => {
    isEmpty.value = newText === '';
    isValid.value = props.validationFn(newText);
  });
}
</script>

<template>
  <div>
    <input
    v-model="text"
    :type="props.type" 
    :placeholder="props.placeholder"
    class="border rounded-xl p-2 m-2 w-80 text-center placeholder-dark-gray/30" 
    :class="{
      'border-light-gray': isEmpty,
      'border-green-500': isValid && !isEmpty,
      'border-red-500': !isValid && !isEmpty
    }" 
  />
  </div>
</template>

<style>
</style>