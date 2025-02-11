<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from "@/components/BackButton.vue";
import NonCheckedTextField from '@/components/NonCheckedTextField.vue';
import RoundButton from "@/components/RoundButton.vue";
import axios from 'axios';

// const transportResults = ref([
//     {
//       "destination_addresses" : 
//       [
//           "New York, NY, USA"
//       ],
//       "origin_addresses" : 
//       [
//           "Washington, DC, USA"
//       ],
//       "rows" : 
//       [
//           {
//             "elements" : 
//             [
//                 {
//                   "distance" : 
//                   {
//                       "text" : "225 mi",
//                       "value" : 361711
//                   },
//                   "duration" : 
//                   {
//                       "text" : "3 hours 52 mins",
//                       "value" : 13911
//                   },
//                   "status" : "OK"
//                 }
//             ]
//           }
//       ],
//       "status" : "OK"
//     }
//   ]
// )

const transportResults = ref([]);

const route = useRoute();
const start = ref({
  latitude: parseFloat(route.params.start.split(',')[0]),
  longitude: parseFloat(route.params.start.split(',')[1])
});
const arrival = ref(route.params.arrival);

console.log(start.value.latitude, start.value.longitude, arrival.value.latitude, arrival.value.longitude)

// richiesta backend posti bici e monopattini
// richiesya gmaps distance matrix per piedi
// richiesta gmaps routes per parcheggi bici e monopattini
// richiesta gmaps routes per mezzi pubblici
// sommare distanze e tempi
// mostrare risultati

const fetchData = async () => {
  try {
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json'
    const modes = ['transit', 'bicycling', 'walking'];

    for (const mode of modes) {
      const response = await axios.get(url, {
        params: {
          destinations: `place_id:${arrival.value}`,
          origins: `${start.value.latitude},${start.value.longitude}`,
          units: 'metric',
          language: 'it',
          mode: mode,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          ...(mode === 'transit' && { departure_time: 'now', transit_routing_preference: 'fewer_transfers' })
        }
      });
      console.log(response);
      if (response.status === 200)
        transportResults.value.push(...response.data.rows);
      else
        console.error("Google maps API Error: " + response.data.error_message);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData().then(() => console.log(transportResults.value))

</script>

<template>
  <div class="bg-neutral-50">

    <!-- header -->
    <div class="bg-linear-to-b from-[#4749d4] from-10% to-[#9a97ee] rounded-b-4xl h-30 p-4 pt-5 flex flex-row justify-start items-start">
      <BackButton color="fill-trento-white" class="max-w-7 mt-1"/>
      <img src="../assets/icons/RoutesViewStartFinish.svg" class="w-7 mx-2 mt-1.5"/>
      <div class="mt-0.5">
        <NonCheckedTextField class="mb-3" type="text" placeholder="La tua posizione" placeholder-color="placeholder-trento-white" color="bg-dark-accent/40" border-color="border-transparent" text-color="text-trento-white" hover-color="hover:bg-accent"/>
        <NonCheckedTextField type="text" placeholder="Piazza Duomo, Trento" placeholder-color="placeholder-trento-white" color="bg-dark-accent/40" border-color="border-transparent" text-color="text-trento-white" hover-color="hover:bg-accent"/>
      </div>
    </div>

    <!-- filters -->
    <div></div>

    <!-- transport list -->
    <div class="h-full flex flex-col justify-start items-left p-4">
      <!-- <ul>
        <li v-for="result in transportResults" class="cursor-pointer flex items-center my-1 text-left border-b-1 last:border-b-0 border-gray-300 py-2">
          <div class="text-center flex flex-col items-center justify-center w-4 ml-5">
            <img v-if="!result.types.includes('route')" src="../assets/icons/location.svg"/>
            <img v-else src="../assets/icons/road.svg"/>
          </div>
          <span class="text-md pl-8 truncate max-w-80">{{ `${result.terms[0].value}, `}}</span><span class="pl-1 text-gray-400 truncate" >{{ `${result.terms[1].value}` }}</span>
        </li>
      </ul> -->
      <ul>
        <li class="cursor-pointer flex flex-row items-center my-1 text-left border-b-1 last:border-b-0 border-gray-300 px-3">
          <img class="w-12" src="../assets/icons/directions_bus.svg"/>
          
          <div class="flex flex-col items-left justify-center p-4 pl-8">
            <div class="font-medium text-dark-gray text-lg">
                <span class="text-trento-blue pr-1">Autobus</span><span class="inline-block w-2 h-2 mx-1 mb-0.5 bg-gray-300 rounded-full place-self-center"/>15 min<span class="inline-block w-2 h-2 mx-1 mb-0.5 bg-gray-300 rounded-full" />1€              
            </div>
            <div class="flex flex-row">
              <span class="w-5 h-5 pt-0.5 mr-1 bg-amber-300 rounded-md text-center font-medium text-white flex items-center justify-center place-self-center text-md">5</span>Piazza Dante <img class="mx-2" src="../assets/icons/walking.svg"/> 5 min a piedi</div>
          </div>
        </li>
        <li class="cursor-pointer flex flex-row items-center my-1 text-left border-b-1 last:border-b-0 border-gray-300 px-3">
          <img class="w-12" src="../assets/icons/directions_bus.svg"/>
          
          <div class="flex flex-col items-left justify-center p-4 pl-8">
            <div class="font-medium text-dark-gray text-lg">
                <span class="text-trento-blue pr-1">Autobus</span><span class="inline-block w-2 h-2 mx-1 mb-0.5 bg-gray-300 rounded-full place-self-center"/>15 min<span class="inline-block w-2 h-2 mx-1 mb-0.5 bg-gray-300 rounded-full" />1€              
            </div>
            <div class="flex flex-row">
              <span class="w-5 h-5 pt-0.5 mr-1 bg-amber-300 rounded-md text-center font-medium text-white flex items-center justify-center place-self-center text-md">5</span>Piazza Dante <img class="mx-2" src="../assets/icons/walking.svg"/> 5 min a piedi</div>
          </div>
        </li>
        <li class="cursor-pointer flex flex-row items-center my-1 text-left border-b-1 last:border-b-0 border-gray-300 px-3">
          <img class="w-12" src="../assets/icons/directions_bus.svg"/>
          
          <div class="flex flex-col items-left justify-center p-4 pl-8">
            <div class="font-medium text-dark-gray text-lg">
                <span class="text-trento-blue pr-1">Autobus</span><span class="inline-block w-2 h-2 mx-1 mb-0.5 bg-gray-300 rounded-full place-self-center"/>15 min<span class="inline-block w-2 h-2 mx-1 mb-0.5 bg-gray-300 rounded-full" />1€              
            </div>
            <div class="flex flex-row">
              <span class="w-5 h-5 pt-0.5 mr-1 bg-amber-300 rounded-md text-center font-medium text-white flex items-center justify-center place-self-center text-md">5</span>Piazza Dante <img class="mx-2" src="../assets/icons/walking.svg"/> 5 min a piedi</div>
          </div>
        </li>

      </ul>
    </div>
      
  </div>
</template>

<style scoped>
</style>