<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signUp } from '@/lib/api';

import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import TextField from "@/components/TextField.vue";

const router = useRouter();

const fullName = ref('');
const email = ref('');
const password = ref('');

const isFullNameValid = ref(false);
const isEmailValid = ref(false);
const isPasswordValid = ref(false);

const errorMessage = ref('');

const validateFullName = (fullName) => {
  return fullName.length > 0;
}

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email)
}

const validatePassword = (password) => {
  return password.length >= 8;
}

const submit = async () => {
  if (isFullNameValid.value && isEmailValid.value && isPasswordValid.value) {
    const response = await signUp(email.value, password.value, fullName.value);

    if (response.result) {
      router.push({ name: 'signin' });
    } else {
      errorMessage.value = response.message;
    }
  }
}

</script>

<template>
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/icons/TrentoGoLogo.svg" alt="">
    
    <div class="h-full flex flex-col justify-end items-center">
      <TextField v-model:text="fullName" v-model:is-valid="isFullNameValid" type="text" placeholder="Nome completo" :validation-fn="validateFullName" />
      <TextField v-model:text="email" v-model:is-valid="isEmailValid" type="email" placeholder="Email" :validation-fn="validateEmail" />
      <TextField v-model:text="password" v-model:is-valid="isPasswordValid" type="password" placeholder="Password" :validation-fn="validatePassword" />

      <span class="mt-50"><!-- spacing --></span>

      <span class="mb-2 text-md text-red-500">{{ errorMessage }}</span>
      <RoundButton @button-click="submit" text="Crea account" class="font-semibold bg-trento-blue/20 text-trento-blue hover:bg-trento-blue/40 mb-3"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";
</style>