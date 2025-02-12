<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackButton from "@/components/BackButton.vue";
import RoundButton from "@/components/RoundButton.vue";
import NonCheckedTextField from '@/components/NonCheckedTextField.vue';
import GCS from '@/components/GrayCircleSeparator.vue';
import mopedIcon from '../assets/icons/moped.svg';
import axios from 'axios';
import { getNearestBikeStall, getNearestScooter } from '@/lib/api.js';

const route = useRoute();
// const router = useRouter();
const start = ref({
  latitude: parseFloat(route.params.start.split(',')[0]),
  longitude: parseFloat(route.params.start.split(',')[1])
});
const arrival = ref(route.params.arrival);

console.log(start.value.latitude, start.value.longitude, arrival.value.latitude, arrival.value.longitude)

const routesResults = ref([]);
const destination = ref('Destinazione');

let nearestBikeStall;
let nearestScooter;

const fetchTransport = async () => {
  nearestBikeStall = await getNearestBikeStall(start.value.latitude, start.value.longitude);
  nearestScooter = await getNearestScooter(start.value.latitude, start.value.longitude);
  nearestBikeStall = nearestBikeStall.data;
  nearestScooter = nearestScooter.data;
  console.log('nearestBikeStall:', nearestBikeStall);
  console.log('nearestScooter:', nearestScooter);
}

let distance_by_foot = 0;
let timeAtFoot = 0;

function parseResponse(type, response, transportMode) {
  const legs = response.data.routes[0].legs[0];
  const steps = legs.steps;

  let totalTime = legs.duration.text;
  const walkingSteps = steps.filter(step => step.travel_mode === 'WALKING');
  const transportSteps = steps.filter(step => step.travel_mode === transportMode.toUpperCase());

  // console.log('transportSteps:', transportSteps);
  
  let data = [];
  if (transportMode === 'transit') {
    // calculates total time at foot by summing up the duration of each walking step
    timeAtFoot = walkingSteps.reduce((acc, step) => acc + step.duration.value, 0);
    // construct busStops array by extracting the departure and arrival stops and the line number of every transit step
    data = transportSteps.map(step => ({
      departure_stop: step.transit_details.departure_stop.name,
      arrival_stop: step.transit_details.arrival_stop.name,
      line: step.transit_details.line.short_name
    }));

    console.log('step:', steps);
    console.log('trans step:', transportSteps);
    console.log('data:', data);
  } else {
    // calulate scooter cost, 1€ for activation, 0.20€ per km. rounded to the first decimal showing the second decimal as 0
    const scooter_cost = (Math.floor((1 + (legs.distance.value / 1000) * 0.20) * 10) / 10).toFixed(2);
    data = [{
      departure_stop: legs.start_address.split(',').slice(0, 2).join(' '), // set to response.data.legs[0].start_location of the park
      arrival_stop: legs.end_address.split(',').slice(0, 2).join(' '),
      distance_by_foot: distance_by_foot,
      scooter_cost
    }];
  }

  totalTime = `${parseInt(totalTime) + Math.floor(timeAtFoot / 60)} min`;

  const routeInfo = [];
  routeInfo.push({
    totalTime,
    timeAtFoot,
    type,
    data
  });

  routesResults.value.push(routeInfo);
}

const fetchRouteBus = async () => {
  try {
    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const response = await axios.get(url, {
      params: {
        origin: `${start.value.latitude},${start.value.longitude}`,
        destination: `place_id:${arrival.value}`,
        mode: 'transit',
        language: 'it',
        departure_time: '1739263817',
        transit_routing_preference: 'fewer_transfers',
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      }
    });
    console.log('autobus response:', response);
    if (response.status === 200){
      if (response.data.routes[0].legs[0].steps.some(step => step.travel_mode === 'TRANSIT')) {
        parseResponse('Autobus', response, 'transit');
      } else {
        console.log("No transit (autobus) routes found");
      }
    }else 
      console.error("Google maps API Error: " + response.data.error_message);
  } catch (error) {
    console.error(error);
  }
};

const fetchRouteBicycle = async () => {
  try {
    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const response = await axios.get(url, {
      params: {
        origin: `${nearestBikeStall.lat},${nearestBikeStall.lng}`,
        destination: `place_id:${arrival.value}`,
        mode: 'bicycling',
        language: 'it',
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      }
    });
    console.log('bicycle response:', response);
    if (response.status === 200){
      destination.value = response.data.routes[0].legs[0].end_address.split(',').slice(0, 2).join(' ');
      parseResponse('Bicicletta', response, 'bicycling');
    }else 
      console.error("Google maps API Error: " + response.data.error_message);
  } catch (error) {
    console.error(error);
  }
};

const fetchRouteScooter = async () => {
  try {
    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const response = await axios.get(url, {
      params: {
        origin: `${nearestScooter.lat},${nearestScooter.lng}`,
        destination: `place_id:${arrival.value}`,
        mode: 'bicycling',
        language: 'it',
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      }
    });
    console.log('scooter response:', response);
    if (response.status === 200){
      parseResponse('Monopattino', response, 'bicycling');
    }else 
      console.error("Google maps API Error: " + response.data.error_message);
  } catch (error) {
    console.error(error);
  }
};

const fetchRouteWalkingToWaypoint = async (latitude, longitude) => {
  try {
    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const response = await axios.get(url, {
      params: {
        origin: `${start.value.latitude},${start.value.longitude}`,
        destination: `${latitude},${longitude}`,
        mode: 'walking',
        language: 'it',
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      }
    });
    console.log('walking waypoint response:', response);
    if (response.status === 200){
      distance_by_foot = response.data.routes[0].legs[0].distance.value;
      timeAtFoot = response.data.routes[0].legs[0].duration.value;
    }else 
      console.error("Google maps API Error: " + response.data.error_message);
  } catch (error) {
    console.error(error);
  }
};

const fetchRouteWalking = async () => {
  try {
    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const response = await axios.get(url, {
      params: {
        origin: `${start.value.latitude},${start.value.longitude}`,
        destination: `place_id:${arrival.value}`,
        mode: 'walking',
        language: 'it',
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      }
    });
    console.log('walking response:', response);
    if (response.status === 200){
      parseResponse('Camminando', response, 'walking');
    }else 
      console.error("Google maps API Error: " + response.data.error_message);
  } catch (error) {
    console.error(error);
  }
};

const fetchRouteDetails = async (type) => {
  try {
    if (type === 'Autobus') {
      await fetchRouteBus();
    } else if (type === 'Bicicletta') {
      await fetchRouteWalkingToWaypoint(nearestBikeStall.lat, nearestBikeStall.lng);
      await fetchRouteBicycle();
    } else if (type === 'Monopattino') {
      await fetchRouteWalkingToWaypoint(nearestScooter.lat, nearestScooter.lng);
      await fetchRouteScooter();
    } else if (type === 'Camminando') {
      await fetchRouteWalking();
    }
  } catch (error) {
    console.error(error);
  }
};

fetchRouteDetails('Autobus').then(() => {
  console.log('destination:', destination.value);
  console.log(routesResults.value);
});
fetchTransport().then(() => {
  fetchRouteDetails('Bicicletta')
  fetchRouteDetails('Monopattino').then(() => {
    fetchRouteDetails('Camminando')
  });
});

const router = useRouter()
const goToRoutes = (result) => {
  console.log('goToRoutes:', result);
  router.push(route.fullPath + '/0');
}

</script>

<template>
  <div class="bg-neutral-50 overflow-x-hidden">

    <!-- header -->
    <div class="bg-linear-to-b from-[#4749d4] from-10% to-[#9a97ee] rounded-b-4xl h-30 p-4 pt-5 flex flex-row justify-start items-start">
      <BackButton color="fill-trento-white" class="max-w-7 mt-1"/>
      <img src="../assets/icons/RoutesViewStartFinish.svg" class="w-7 mx-2 mt-1.5"/>
      <div class="mt-0.5">
        <NonCheckedTextField class="mb-3" type="text" placeholder="La tua posizione" placeholder-color="placeholder-trento-white" color="bg-dark-accent/40" border-color="border-transparent" text-color="pointer-events-none text-trento-white" hover-color="hover:bg-dark-accent/40"/>
        <NonCheckedTextField type="text" :placeholder="destination" placeholder-color="placeholder-trento-white" color="bg-dark-accent/40" border-color="border-transparent" text-color="pointer-events-none text-trento-white" hover-color="hover:bg-dark-accent/40"/>
      </div>
      <img src="../assets/icons/TrentoGoCircle.svg" class="fixed w-45 -mt-32 -right-15 opacity-20"/>
    </div>

    <!-- filters -->
    <div class="px-4 pt-4">
      <!-- <RoundButton class="bg-trento-blue w-50 font-medium text-lg text-trento-white *:mr-1" text="Mezzi: Tutti" :icon="mopedIcon" /> -->
    </div>

    <!-- transport list -->
    <div class="flex flex-col justify-start items-left p-4">
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
        <li @click="goToRoutes(result)" v-for="result in routesResults" class="cursor-pointer flex flex-row items-center justify-left my-1 text-left  border-b-1 last:border-b-0 border-gray-300 px-3">
          <img v-if="result[0].type == 'Autobus' " class="w-12" src="../assets/icons/directions_bus.svg"/>
          <img v-else-if="result[0].type == 'Bicicletta' " class="w-14 -mr-3" src="../assets/icons/bike.svg"/>
          <img v-else-if="result[0].type == 'Monopattino' " class="w-12" src="../assets/icons/scooter.svg"/>
          <img v-else-if="result[0].type == 'Camminando' " class="ml-2 h-12 mr-3" src="../assets/icons/walking.svg"/>
          <img v-else class="w-12" src="../assets/icons/GoogleIcon.svg"/>
          
          <div class="flex flex-col items-left justify-center p-4 pl-8">
            <div class="font-medium text-dark-gray text-lg">
                <span class="text-trento-blue pr-1 text-md">{{ result[0].type }}</span><GCS/> 
                {{ result[0].totalTime }} 
                <span v-if="result[0].type == 'Monopattino' "><GCS/>~{{ result[0].data[0].scooter_cost }}€</span>
                <span v-else-if="result[0].type != 'Camminando' "><GCS/>1€</span>
            </div>
            <div class="flex flex-row justify-end items-end">
                <span v-if="result[0].type == 'Autobus' " class="flex"><span class="h-5 px-0.5 mr-1 bg-amber-300 rounded-md text-center font-medium text-white flex items-center justify-center place-self-center text-md">{{ result[0].data[0].line }}</span> <span class="truncate">{{ result[0].data[0].departure_stop }}</span></span>
                <span v-else-if="result[0].type == 'Monopattino' " class="flex"><img class="w-12 mr-2" src="../assets/icons/dott.svg"/><span class="truncate">{{ result[0].data[0].departure_stop }}</span></span> 
                <span v-else-if="result[0].type == 'Bicicletta' " class="flex"><img class="w-8 mr-2" src="../assets/icons/weelo_logo.svg"/><span class="truncate">{{ result[0].data[0].departure_stop }}</span></span> 
                <span v-else-if="result[0].type == 'Camminando' " class="flex"><span class="w-80 truncate">📍{{ result[0].data[0].departure_stop }} → {{ result[0].data[0].arrival_stop }}</span></span> 
                
                <span v-if="result[0].timeAtFoot != 0 && result[0].type != 'Camminando' " class="flex"><img class="ml-2 mr-1 h-5" src="../assets/icons/walking.svg"/><span class="truncate"> {{ Math.floor(result[0].timeAtFoot / 60) }} min a piedi</span></span>
              </div>
          </div>
        </li> 
        
      </ul>
    </div>
      
  </div>
</template>

<style scoped>
</style>