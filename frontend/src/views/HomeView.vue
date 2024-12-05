<script setup>
import { GoogleMap } from "vue3-google-map";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const center = { lat: 46.066630516969994, lng: 11.136310379875919 };
// 46.066630516969994, 11.136310379875919
</script>

<template>
  <main class="home-container">
    <div>
      <GoogleMap
        :api-key="GOOGLE_MAPS_API_KEY"
        class="google-map"
        style=""
        :center="center"
        :zoom="14"
      ></GoogleMap>
    </div>

    <div class="home-content">
      <div class="back_button">
        <img src="../assets/icons/arrow_back.svg" alt="Torna Indietro" />
        <p>Informazioni Viaggio</p>
      </div>

      <div class="travel-information-section" >
        <img src="../assets/icons/directions_bus.svg" class="travel-info-transport-icon"/>
        <p class="travel-info-transport-title">Autobus</p>
        <p class="travel-info-time">15 min</p>
        <p class="travel-info-arrive-time">Arrivo alle <b>12:34</b></p>
      </div>

      <p style="margin-top: 0;"><span style="color: #34c139;">-823g</span> di CO2 rispetto ad un’auto</p>

      <img src="../assets/icons/temp_travel_info.png" alt="TEMP" style="width: 28vh; margin-top: 5vh; margin-bottom: 4vh;"/>

      <div class="ticket-section">
        <p class="ticket-name">Biglietto Ordinario Zona 2</p>
        <p class="ticket-price">1.00€</p>
        <div class="buy-ticket-button">
          <img src="../assets/icons/cart.svg" />
          <p>Compra il biglietto</p>
        </div>
      </div>
      
      <div class="directions-button">
        <img src="../assets/icons/directions.svg" />
        <p>Indicazioni</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;

  font-size: 1.6vh;
  color: #2c2c2c;
  background-color: #f8f8f8;
}

.home-content {
  width: 21vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  text-align: center;
}

.back_button {
  font-size: 1.5vh;
  width: 100%;

  display: flex;
  flex-wrap: nowrap;
  margin-top: 0.5vh;
}

.back_button img {
  margin-left: 2vh;
  margin-right: 1vh;
  width: 1.8vh;
}

.travel-info-transport-icon {
  width: 15vh;
  margin-top: 2vh;
  margin-bottom: 0;

}

.travel-info-transport-title {
  /* color: var(--trento-blue); */
  color: #5171ff;
  font-size: 2em;
  font-weight: 500;
  margin-top: -1.5vh;
}

.travel-info-time {
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 0;
}

.travel-info-arrive-time {
  font-size: 1.1em;
  margin-top: 0;
}

.directions-button {
  font-size: 1.6em;
  color: #ffffff;
  background-color: #5171ff;
  border-radius: 2vh;
  padding: 0.5vh 1vw 0.5vh 1vw;
  align-items: center;

  justify-content: center;

  width: 12vw;
  height: 8vh;
  display: flex;

  margin-top: 0;

  /* to change to m3: elevation */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
}

.directions-button:hover {
  background-color: #314dc8;
}

.directions-button img {
  width: 3vw;
  margin-right: 0.5vw;
}

.ticket-section {
  margin-bottom: 3vh;
  margin-top: 2vh;
}

.ticket-name {
  margin-bottom: 0;
}

.ticket-price {
  font-size: 2em;
  font-weight: 700;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.buy-ticket-button {
  font-size: 1em;
  color: #ffffff;
  background-color: #5171ff;
  border-radius: 1vh;
  /* padding: 0.5vh 1vw 0.5vh 1vw; */

  justify-content: center;
  align-items: center;

  width: 10vw;
  height: 5vh;
  display: flex;

  /* to change to m3: elevation */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 

  margin-bottom: 3vh;
}


.buy-ticket-button:hover {
  background-color: #314dc8;
}

.buy-ticket-button img {
  width: 1.2vw;
  margin-right: 0.5vw;
}

.google-map {
  left: 0;
  top: 0;
  width: 79vw;
  height: 100vh;
}
</style>
