<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    required: true,
  }
})

const router = useRouter()

function click() {
  router.go(-1)
}
</script>

<template>
  <div @click="click" id="gobackbutton" class="cursor-pointer flex w-full">
    <img src="../assets/icons/arrow_back.svg" alt="Torna Indietro" />
    <span class="pl-1">{{ props.text }}</span>
  </div>
</template>

<style>
</style>