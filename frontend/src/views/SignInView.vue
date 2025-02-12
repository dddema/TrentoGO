<script setup>
import BackButton from "@/components/BackButton.vue"
import RoundButton from "@/components/RoundButton.vue"
import { useRouter } from 'vue-router';
import { signIn } from "@/lib/api";
import TextField from "@/components/TextField.vue";
import { ref } from 'vue';

const router = useRouter();
const email = ref('');
const password = ref('');
const checkEmailExists= ref(false);
const isEmailValid = ref(false);
const isPasswordValid = ref(false);

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email)
}

const validatePassword = (password) => {
  return password.length >= 8;
}

const doSignIn= async () => {
  if (isEmailValid.value && isPasswordValid.value) {
      const response = await signIn(email.value, password.value);

      if (response.result== false) {
          checkEmailExists.value=true;
          console.log(checkEmailExists)
      } else {
        checkEmailExists.value=false;
        router.push('/');
      }
  }
  
}

</script>

<template>
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/icons/TrentoGoLogo.svg" alt="">
    
    <TextField v-model:text="email" v-model:is-valid="isEmailValid" type="email" placeholder="Email" :validation-fn="validateEmail" @blur="checkEmailExists" />
    <p v-if="checkEmailExists" class="text-red-500">
      Non esiste un account con quella mail. 
      <router-link to="/auth/signup" class="text-trento-blue underline">Registrati qua</router-link>
    </p>
    <TextField v-model:text="password" v-model:is-valid="isPasswordValid" type="password" placeholder="Password" :validation-fn="validatePassword" />

    <div class="h-full flex flex-col justify-end pb-5 items-center">
        <RoundButton @click="doSignIn" text="Accedi" color="trento-blue/30" text-color="trento-blue" class="mb-5"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

</style>