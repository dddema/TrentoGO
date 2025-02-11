<script setup>
import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import { GoogleLogin } from "vue3-google-login";
import axios from "axios";
// import GoogleIcon from "@/assets/icons/GoogleIcon.svg";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const signUp = () => {
}

const logIn = () => {
}

const googleSignIn = async (response) => {
  try {
    const url = 'http://trentogo.onrender.com/auth/google'
    const res = await axios.post(url, {
      idToken: response.credential
    })
    console.log(res)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/icons/TrentoGoLogo.svg" alt="">
    
    <div class="h-full flex flex-col justify-end pb-5 items-center">
      <!-- <RoundButton @button-click="googleSignIn" text="Continua con Google" color="bg-trento-white" text-color="text-dark-gray" text-weight="font-medium" hover-color="hover:bg-dark-gray/5" :icon="GoogleIcon"/> -->
      <GoogleLogin :client-id="GOOGLE_CLIENT_ID" :callback="googleSignIn" prompt auto-login  />
      
      <div class="flex items-center w-full my-5">
        <hr class="flex-grow border-t border-light-gray">
        <span class="text-gray-300 mx-2">Oppure</span>
        <hr class="flex-grow border-t border-light-gray">
      </div>
      
      <RoundButton @button-click="signUp" text="Crea un Account"/>
      <RoundButton @button-click="logIn" text="Accedi o Continua come Ospite" color="bg-trento-blue/30" text-color="text-trento-blue" hover-color="hover:bg-dark-trento-blue/40" class="mb-5"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

</style>