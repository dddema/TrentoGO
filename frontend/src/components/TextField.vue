<script setup>
import { ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: " "
  },
  callBackFunction: {
    type: Function,
    required: true,
  },
})

const isValidField = ref(true);
const isEmptyField = ref(true);

function checkValidity(event) {
  const target = event.target;
  isEmptyField.value = target.value === '';
  isValidField.value = props.callBackFunction(target.value);
  console.log(isEmptyField.value);
  console.log(isValidField.value);
}

</script>

<template>
  <div>
    <input 
    :type="props.type" 
    :placeholder="props.placeholder"
    class="border rounded-xl p-2 m-2 w-80 text-center placeholder-dark-gray/30" 
    :class="{
      'border-light-gray': isEmptyField,
      'border-green-500': isValidField && !isEmptyField,
      'border-red-500': !isValidField
    }" 
    @input="checkValidity"
  />
  </div>
</template>

<style>
</style>