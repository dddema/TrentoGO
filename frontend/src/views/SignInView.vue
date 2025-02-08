<script setup>
import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg"
</script>

<template>
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/TrentoGoLogo.png" alt="">
    
    <div class="h-full flex flex-col justify-end pb-5 items-center">

      <RoundButton @button-click="sendSignIn" text="Crea account" color="trento-blue/30" text-color="trento-blue" class="mb-5"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

</style>