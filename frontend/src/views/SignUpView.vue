<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import TextField from "@/components/TextField.vue";

let isValidEmail = true;
let isValidPassword = true;
let isEmptyEmail = true;
let isEmptyPassword = true;

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email)
}

function validatePassword(password) {
  return password.length >= 8;
}

function sendSignIn() {
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  if (validateEmail(email) && validatePassword(password)) {
    // send
  } else {
    // error
  }
}

</script>

<template>
  
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/icons/TrentoGoLogo.svg" alt="">
    
    <div class="h-full flex flex-col justify-end items-center ">
      <TextField type="email" placeholder="email" :callBackFunction="validateEmail"/>
      <TextField type="password" placeholder="password" :callBackFunction="validatePassword"/>

      <RoundButton @button-click="sendSignIn" text="Crea account" color="bg-trento-blue/30" text-color="text-trento-blue" hover-color="hover:bg-trento-blue/40" class="mt-50 mb-3"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

</style>