<script setup>
import BackButton from "@/components/BackButton.vue";

</script>

<template>
    <div class="h-full flex flex-col items-center justify-start text-center">
      <BackButton text="Torna Indietro" class="p-4"/>

      <div class="travel-information-section" >
        <img src="../assets/icons/directions_bus.svg" class="w-35 mt-2 mb-0"/>
        <p class="text-trento-blue text-3xl font-semibold">Autobus</p>
        <p class="text-3xl font-semibold">15 min</p>
        <p class="text-lg">Arrivo alle <span class="font-semibold">12:34</span></p>
      </div>

      <p class="mt-0"><span class="text-[#34c139]">-823g</span> di CO2 rispetto ad un'auto</p>

      <img src="../assets/icons/temp_travel_info.svg" alt="TEMP" class="w-55 mt-10 mb-10"/>

      <div class="">
        <span class="mb-0">Biglietto Ordinario Zona 2</span>
        <div class="flex flex-col justify-center items-center ticket-section mb-10 mt-0">
          <span class="ticket-price">1.00€</span>
          <div class="buy-ticket-button w-50 h-10 shadow-lg shadow-trento-blue/30 py-5 flex ">
            <img src="../assets/icons/cart.svg" class="w-5" />
            <span class="font-regular text-md ml-1">Compra il biglietto</span>
          </div>
        </div>
      </div>
      
      <div class="directions-button bg-trento-blue text-trento-white font-semibold w-60 h-20 shadow-xl shadow-trento-blue/30">
        <img src="../assets/icons/directions.svg" class="w-15 mr-1"/>
        <p>Indicazioni</p>
      </div>

    </div>
</template>

<style scoped>
.directions-button {
  font-size: 1.6em;
  border-radius: 2vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.directions-button:hover {
  background-color: #314dc8;
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

  display: flex;
  justify-content: center;
  align-items: center;
}

.buy-ticket-button:hover {
  background-color: #314dc8;
}

</style>