<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { GoogleMap } from "vue3-google-map"
import { ref } from 'vue'
// import { Loader } from "@googlemaps/js-api-loader"

import SearchBar from "@/components/SearchBar.vue";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const trentoCoords = { lat: 46.066630516969994, lng: 11.136310379875919 }
const bounds = {
  // 46.126986, 11.202991
  east: 11.202991,
  north: 46.137986,
  // 46.014265, 11.049947
  west: 11.049947,
  south: 46.014265
}

// const mapsApiLoader = new Loader({
//   apiKey: GOOGLE_MAPS_API_KEY,
//   version: "weekly",
// })

const mapStyles = [
  {
    featureType: "poi",
    stylers: [
      {visibility: "off"},
    ],
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.icon",
    "stylers": [
      { "color": "#B5A0FB" }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#9398a0" }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#ffffff" }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "color": "#e9e9e9" }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      { "color": "#f9f9f9" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      { 
        "visibility": "off" 
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "color": "#ffffff" }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      { "color": "#f0f1f1" }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [
      { "color": "#f0f1f1" }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
    { "color": "#b8caf4" }
    ]
  },
]

const route = useRoute()
const isHome = computed(() => route.path == '/')


const position = ref(trentoCoords.value)

navigator.geolocation.getCurrentPosition(
  (current_position) => {
    position.value = current_position.coords
  },
  (error) => {
    console.error(error)
  }
);

</script>

<template>
  <main>
    <div class="w-screen h-screen flex flex-row">
      <img src="../assets/icons/TrentoGoLogo.svg" class="fixed z-100 opacity-40 w-60 p-4 select-none">
      <div class="grow h-full saturate-180">
        <GoogleMap
          class="w-full h-full"
          :api-key="GOOGLE_MAPS_API_KEY"
          :center="trentoCoords"
          :restriction="{ latLngBounds: bounds, strictBounds: true }"
          :zoom="14"
          :street-view-control="false"
          :map-type-control="false"
          :fullscreen-control="false"
          draggable-cursor="default"
          dragging-cursor="move"
          zoom-control-position="INLINE_START_BLOCK_END"
          :styles="mapStyles"
        ></GoogleMap>
      </div>
      <RouterView class="shadow-xl z-1 overflow-auto w-110 h-full bg-trento-white" />
    </div>

    <SearchBar v-if="isHome" :position="position"/>

    <!-- <div class="home-content">
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
          <img src="../assets/icons/cart.svg"/>
          <p>Compra il biglietto</p>
        </div>
      </div>
      
      <div class="directions-button">
        <img src="../assets/icons/directions.svg" />
        <p>Indicazioni</p>
      </div>
    </div> -->
  </main>
</template>

<style scoped>
</style>
