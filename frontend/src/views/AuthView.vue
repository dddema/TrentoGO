<script setup>
import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg"

function googleSignIn() {
  
}

function signUp() {
  
}

function logIn() {

}

</script>

<template>
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/TrentoGoLogo.png" alt="">
    
    <div class="h-full flex flex-col justify-end pb-5 items-center">
      <RoundButton @button-click="googleSignIn" text="Continua con Google" color="trento-white" text-color="dark-gray" :icon="GoogleIcon"/>
      
      <div class="flex items-center w-full my-5">
        <hr class="flex-grow border-t border-light-gray">
        <span class="text-gray-300 mx-2">Oppure</span>
        <hr class="flex-grow border-t border-light-gray">
      </div>
      
      <RoundButton @button-click="signUp" text="Crea un Account"/>
      <RoundButton @button-click="logIn" text="Accedi o Continua come Ospite" color="trento-blue/30" text-color="trento-blue" class="mb-5"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

</style>