<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    default: " ",
  },
  color: {
    type: String,
    default: "fill-dark-gray",
  },
})

const router = useRouter()

function click() {
  router.go(-1)
}
</script>

<template>
  <div @click="click" id="gobackbutton" class="cursor-pointer flex w-full">
    <!-- <img src="../assets/icons/arrow_back.svg" alt="Torna Indietro" class="fill-trento-white stroke-trento-white"/> -->
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" :class="props.color"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
    <span class="pl-1">{{ props.text }}</span>
  </div>
</template>

<style>
</style>