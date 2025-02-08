<script setup>
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "trento-blue",
  },
  textColor: {
    type: String,
    default: "trento-white"
  },
  icon: {
    type: String,

  }
})


defineEmits(['buttonClick'])
</script>

<template>
  <div @click="$emit('buttonClick')" :class="['bg-'+props.color, 'text-'+props.textColor]" class="m-1 flex w-90 text-xl font-bold justify-center p-3 rounded-full border-trento-blue border-2">
    <img v-if="props.icon" :src="props.icon" alt="">
    <span class="pl-1">{{ props.text }}</span>
  </div>
</template>

<style>
</style>