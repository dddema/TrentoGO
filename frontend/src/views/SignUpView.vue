<script setup>
import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg"

let isValidEmail = true;
let isValidPassword = true;


function validateEmail(event) {
  const email = event.target.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isValidEmail = emailPattern.test(email);
}

function validatePassword(event) {
  const password = event.target.value;
  isValidPassword = password.length >= 8;
}

function sendSignIn() {

}

</script>

<template>
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/TrentoGoLogo.png" alt="">
    
    <div class="h-full flex flex-col justify-end pb-5 items-center">

      <input 
        type="email" 
        placeholder="e-mail" 
        class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" 
        :class="{'border-red-500': !isValidEmail}" 
        @input="validateEmail"
      />
      <input 
        type="password" 
        placeholder="password" 
        class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" 
        :class="{'border-red-500': !isValidPassword}" 
        @input="validatePassword"
      />

      <RoundButton @button-click="sendSignIn" text="Crea account" color="trento-blue/30" text-color="trento-blue" class="mb-5"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

</style>