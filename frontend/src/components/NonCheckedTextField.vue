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
  placeholderColor: {
    type: String,
    default: "placeholder-dark-gray"
  },
  color: {
    type: String,
    default: "bg-trento-blue",
  },
  borderColor: {
    type: String,
    default: "bg-light-gray",
  },
  textColor: {
    type: String,
    default: "text-trento-white"
  },
  hoverColor: {
    type: String,
    default: "hover:bg-dark-trento-blue",
  },
  textWeight: {
    type: String,
    default: "font-regular"
  },
  textAlignment: {
    type: String,
    default: "text-left"
  },
})
</script>

<template>
    <input 
      :type="props.type" 
      :placeholder="props.placeholder"
      :class="[props.color, props.textColor, props.hoverColor, props.textWeight, props.placeholderColor, props.textAlignment, props.borderColor]"
      class="border rounded-lg pl-2 py-0.5 w-60" 
    />
</template>

<style>
</style>