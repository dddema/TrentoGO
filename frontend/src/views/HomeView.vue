<script setup>
import { GoogleMap } from "vue3-google-map";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const center = { lat: 45.508458, lng: 10.510491 };
</script>

<template>
  
  
  <main class="home-container">
    <div>
      <GoogleMap :api-key="GOOGLE_MAPS_API_KEY" class="google-map" style="" :center="center" :zoom="15"></GoogleMap>
    </div>
    
    <div class="home-content">
      <div class="back_button"> 
        <img src="../assets/icons/arrow_back.svg" alt="Torna Indietro">
        <p>Informazioni Viaggio</p>
      </div>

      <img src="../assets/icons/directions_bus.svg" alt="Bus TrentinoTrasporti" class="travel-info-transport-icon">
      <p class="travel-info-transport-title">Autobus</p>
      <p class="travel-info-time">15 min</p>
      <p class="travel-info-arrive-time">Arrivo alle <b>12:34</b></p>
      
      <div class="directions-button">
        <img src="../assets/icons/directions.svg">
        <p>Indicazioni</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: row;
  justify-content:left;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
}

.home-content {
  width: 25vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.back_button {
  font-size: 1.2rem;
  width: 100%;
  
  display: flex;
  flex-wrap: nowrap;
  margin-top: 0.5vh;
}

.back_button img {
  margin-left: 2vh;
  margin-right: 1vh;
}

.travel-info-transport-icon {
  width: 15vh;
  margin-top: 2vh;
  margin-bottom: 0;
}

.travel-info-transport-title {
  /* color: var(--trento-blue); */
  color: #5171ff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.travel-info-time {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0;
}

.travel-info-arrive-time {
  font-size: 1.1rem;
  margin-top: 0;
}

.directions-button {
  font-size: 2rem;
  color: #ffffff;
  background-color: #5171ff;
  border-radius: 2vh;
  padding: 0.5vh 2vw 0.5vh 1vw;

  display: flex;
}

.directions-button:hover {
  background-color: #314dc8;
}

.directions-button img {
  width: 5vw;
  margin-right: 0.5vw;
}


.google-map {
  left: 0;
  top: 0;
  width: 75vw;
  height: 100vh;
}


</style>
