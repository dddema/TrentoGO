<script setup>
import { GoogleMap } from 'vue3-google-map';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const center = {lat: 45.508458, lng: 10.510491}
</script>

<template>
  <main>
    <h2>Home</h2>
    <GoogleMap
      :api-key="GOOGLE_MAPS_API_KEY"
      style="width: 500px; height: 500px"
      :center="center"
      :zoom="15"
    >

    </GoogleMap>
  </main>
</template>
