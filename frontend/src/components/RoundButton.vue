<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  }
})

defineEmits(['buttonClick'])
</script>

<template>
  <div @click="$emit('buttonClick')" class="cursor-pointer m-1 flex w-90 text-xl justify-center p-3 rounded-full border-trento-blue border-2 outline-0">
    <img v-if="props.icon" :src="props.icon" alt="">
    <span class="pl-1">{{ props.text }}</span>
  </div>
</template>

<style>
</style>