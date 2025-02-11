<script setup>
import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg"
import axios from "axios";

// import { googleAuthCodeLogin } from "vue3-google-login"
// const Glogin = () => {
//   googleAuthCodeLogin().then((response) => {
//     console.log("Handle the response", response)
//   })
// }


// import { decodeCredential } from 'vue3-google-login'

const callback = async (response) => {
  // decodeCredential will retrive the JWT payload from the credential
  // const userData = decodeCredential(response.credential)
  // if (userData!=undefined) {

  try {
    const url = 'http://localhost:3000/auth/google'
    const res = await axios.post(url, {
      idToken: response.credential
    })
    console.log(res)
  } catch (error) {
    console.error(error)
  }
    
  //   console.log("Handle the userData, FOLLOWING:", userData)
  // } 
}


// function signUp() {
  
// }

// function logIn() {
// }

</script>

<template>
  <div class="bg-red flex flex-col justify-start items-center p-4">
    <BackButton text="Torna Indietro" />
    <img class="py-30 w-90" src="../assets/TrentoGoLogo.png" alt="">
    
    <div class="h-full flex flex-col justify-end pb-5 items-center">
      <GoogleLogin :callback="callback" prompt auto-login />
      
      <div class="flex items-center w-full my-5">
        <hr class="flex-grow border-t border-light-gray">
        <span class="text-gray-300 mx-2">Oppure</span>
        <hr class="flex-grow border-t border-light-gray">
      </div>
      
      <RoundButton @button-click="TrentoGoSignUp" text="Crea un Account"/>
      
      <RoundButton text="Accedi o Continua come Ospite" color="trento-blue/30" text-color="trento-blue" class="mb-5"/>
      <span class="text-dark-gray">Continuando accetti i nostri <span class="text-trento-blue underline font-semibold">Terms of service.</span></span>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

</style>