<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg"

let isValidEmail = ref(true);
let isValidPassword = ref(true);

const name = ref('');
const email = ref('');
const password = ref('');

function validateEmail(event) {
  let email = event.target.value;
  const check = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  return check.test(email);
}

function validatePassword(event) {
  let password = event.target.value;
  isValidPassword.value = password.length >= 8;
}

async function sendSignIn() {
    if (isValidEmail && isValidPassword) {
      alert("asd");
    // try {
    //   const url = 'https://trentogo.onrender.com/auth/signup';
    //   const response = await axios.post(url, {
    //     email: email.value,
    //     password: password.value,
    //     name: name.value,
    //   });
    //   if (response.status === 200) {
    //     this.$router.push('/');
    //   }
    // } catch (error) {
    //   console.error('Error creating account:', error);
    // }
  }
}

</script>

<template>
  
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/TrentoGoLogo.png" alt="">
    
    <div class="h-full flex flex-col justify-end pb-5 items-center">
      <input 
        type="name" 
        placeholder="Please enter your name" 
        class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" 
        v-model="name"
      />
      <input 
        type="email" 
        placeholder="Please enter your email" 
        class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" 
        :class="{'border-red-500': !isValidEmail}" 
        v-model="email"
      />
      <input 
        type="password" 
        placeholder="Please enter your password" 
        class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" 
        :class="{'border-red-500': !isValidPassword}" 
        v-model="password"
      />

      <RoundButton @click="sendSignIn" text="Crea account" color="trento-blue/30" text-color="trento-blue" class="mb-5"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

</style>