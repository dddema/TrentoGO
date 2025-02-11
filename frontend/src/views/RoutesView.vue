<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from "@/components/BackButton.vue";
import NonCheckedTextField from '@/components/NonCheckedTextField.vue';
import GCS from '@/components/GrayCircleSeparator.vue';
import axios from 'axios';

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
// X richiesta gmaps routes per mezzi pubblici
// X sommare distanze e tempi
// X mostrare risultati

// const fetchData = async () => {
//   try {
//     const url = 'https://maps.googleapis.com/maps/api/distancematrix/json'
//     const modes = ['transit', 'bicycling', 'walking'];

//     for (const mode of modes) {
//       const response = await axios.get(url, {
//         params: {
//           destinations: `place_id:${arrival.value}`,
//           origins: `${start.value.latitude},${start.value.longitude}`,
//           units: 'metric',
//           language: 'it',
//           mode: mode,
//           key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//           ...(mode === 'transit' && { departure_time: 'now', transit_routing_preference: 'fewer_transfers' })
//         }
//       });
//       console.log(response);
//       if (response.status === 200)
//         transportResults.value.push(...response.data.rows);
//       else
//         console.error("Google maps API Error: " + response.data.error_message);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }


let routesResults = ref([]);

// richiedere al backend posti vicini x bici e monopattini
// richiedere a gmaps i dettagli del percorso in bici, e usarlo per generare le entries in routesResults per bici e monopattini

const fetchRouteDetails = async () => {
  try {
    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const response = await axios.get(url, {
      params: {
        origin: `${start.value.latitude},${start.value.longitude}`,
        destination: `place_id:${arrival.value}`,
        mode: 'transit',
        language: 'it',
        transit_routing_preference: 'fewer_transfers',
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }
    });

    console.log('response:', response);

    if (response.status === 200) {
      const legs = response.data.routes[0].legs[0];
      const steps = legs.steps;

      const totalTime = legs.duration.text;
      const walkingSteps = steps.filter(step => step.travel_mode === 'WALKING');
      const transitSteps = steps.filter(step => step.travel_mode === 'TRANSIT');

      // calculates total time at foot by summing up the duration of each walking step
      const timeAtFoot = walkingSteps.reduce((acc, step) => acc + step.duration.value, 0);
      // construct busStops array by extracting the departure and arrival stops and the line number of every transit step
      const busStops = transitSteps.map(step => ({
        departure_stop: step.transit_details.departure_stop.name,
        arrival_stop: step.transit_details.arrival_stop.name,
        line: step.transit_details.line.short_name
      }));

      const type = 'bicycle';

      const busRouteInfo = [];

      busRouteInfo.push({
        totalTime,
        timeAtFoot,
        busStops,
        type
      });

      routesResults.value.push(busRouteInfo);

      // console.log('Total Time:', totalTime);
      // console.log('Time at Foot:', timeAtFoot);
      // console.log('Bus Stops:', busStops);
    } else {
      console.error("Google maps API Error: " + response.data.error_message);
    }
  } catch (error) {
    console.error(error);
  }
};


fetchRouteDetails().then(() => {
  console.log('routes result:', routesResults);
  console.log('routes result:', routesResults.value[0][0].type);

  for (const result of routesResults.value) {
    console.log('result:', result[0].type);
  }
});

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
      <img src="../assets/icons/TrentoGoCircle.svg" class="fixed w-45 -mt-32 -right-15 opacity-20"/>
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
        <li v-for="result in routesResults" class="cursor-pointer flex flex-row items-center my-1 text-left border-b-1 last:border-b-0 border-gray-300 px-3">
          <img v-if="result[0].type == 'bus' " class="w-12" src="../assets/icons/directions_bus.svg"/>
          <img v-else-if="result[0].type == 'bicycle' " class="w-12" src="../assets/icons/bike.svg"/>
          <img v-else-if="result[0].type == 'scooter' " class="w-12" src="../assets/icons/scooter.svg"/>
          <img v-else class="w-12" src="../assets/icons/GoogleIcon.svg"/>
          
          <div class="flex flex-col items-left justify-center p-4 pl-8">
            <div class="font-medium text-dark-gray text-lg">
                <span class="text-trento-blue pr-1">Autobus</span><GCS/> {{ result[0].totalTime }}<GCS/>1€
            </div>
            <div class="flex flex-row">
                <span class="w-5 h-5 pt-0.5 mr-1 bg-amber-300 rounded-md text-center font-medium text-white flex items-center justify-center place-self-center text-md">5</span> {{ result[0].busStops[0].departure_stop }}
                <img class="mx-2" src="../assets/icons/walking.svg"/> {{ Math.floor(result[0].timeAtFoot / 60) }} min a piedi
              </div>
          </div>
        </li> 
        
      </ul>
    </div>
      
  </div>
</template>

<style scoped>
</style>