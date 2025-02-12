<script setup>
import axios from 'axios'

import { computed, ref, watch, onMounted, useTemplateRef, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import FavPlaceButton from './FavPlaceButton.vue'

const props = defineProps({
  position: {
    type: Object,
    required: true,
  },
  favourites: {
    type: Array,
    required: true,
  }
})

const router = useRouter()
const root = useTemplateRef('root')

const query = ref('')
const autocompleteResults = ref([])
const focused = ref(false)

const fetchData = async (newQuery) => {
  if (newQuery != '') {
    try {
      const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
      const response = await axios.get(url, {
        params: {
          input: newQuery,
          components: 'country:it',
          language: 'it',
          location:'46.066630516969994,11.136310379875919',
          origin: `${props.position.latitude}, ${props.position.longitude}`,
          radius: 10000,
          strictbounds: true,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }
      })

      if (response.data.status == 'OK')
        autocompleteResults.value = response.data.predictions
      else
        console.error("Google maps API Error:", response.data.error_message)
    } catch (error) {
      console.error(error)
    }
  }
}

let autocompleteBlocked = false
let unansweredQuery = false

watch(query, async (newQuery, oldQuery) => {
  // watch for query changes -> triggers fetchData and blocks other requests for 500ms
  // keeps track of blocked queries and calls fetchData as soon as it unblocks them

  if (newQuery == '') {
    autocompleteResults.value = []
    unansweredQuery = false
  }

  if (!autocompleteBlocked) {
    unansweredQuery = false
    autocompleteBlocked = true
    await fetchData(newQuery)

    setTimeout(async () => {
      if (unansweredQuery) {
        unansweredQuery = false
        await fetchData(query.value)
      }

      autocompleteBlocked = false
    }, 500)
  } else {
    unansweredQuery = true
  }
})

// query x pref utente, ritorna anche favourites places

// const isFavoritesOveflown = ref(false)

const windowClickHandler = (event) => {
  if (!root.value.contains(event.target))
    focused.value = false
}

onMounted(() => {
  window.addEventListener('click', windowClickHandler)

  // const element = document.querySelector('#favorites_slider')
  // isFavoritesOveflown.value = doesItOverflow(element)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', windowClickHandler)
})

// const doesItOverflow = (element) => {
//   return element.scrollWidth > element.clientWidth;
// }

const goToRoutes = (placeId) => {
  router.push(`/routes/${props.position.latitude},${props.position.longitude}/${placeId}`);
}
</script>

<template>
  <div class="flex items-end justify-center">
    <div ref="root" class="flex flex-col items-center text-center fixed transition-bottom duration-300 delay-75 text-dark-gray" :class="[focused ? 'bottom-50' : 'bottom-10']">
      <div v-if="focused" class="w-2xl -mb-6 rounded-[1rem] pt-3 pb-9 border-1 border-gray-300 px-10 bg-white/30 backdrop-blur-md z-1">
        <ul class="pb-4">
          <li @click="goToRoutes(result.place_id)" v-for="result in autocompleteResults" class="cursor-pointer flex items-center my-1 text-left border-b-1 last:border-b-0 border-gray-300 py-2">
            <div class="text-center flex flex-col items-center justify-center w-4 ml-5">
              <img v-if="!result.types.includes('route')" src="../assets/icons/location.svg"/>
              <img v-else src="../assets/icons/road.svg"/>

              <span v-if="result.distance_meters" class="text-xs">{{ (result.distance_meters/1000).toFixed(1) }}&nbsp;km</span>
            </div>
            <span class="text-md pl-8 truncate max-w-80">{{ `${result.terms[0].value}, `}}</span><span class="pl-1 text-gray-400 truncate" >{{ `${result.terms[1].value}` }}</span>
          </li>
        </ul>
        <div id="favorites_slider" class="flex flex-row gap-2 overflow-visible items-center h-10 overflow-x-scroll no-scrollbar mask-blur scroll-px-150 justify-center">
          <span class="bg-transparent w-20 text-transparent">spacer</span>
          <FavPlaceButton v-for="place in favourites" :place="place" @click="goToRoutes(place.placeId)" />
          <span class="bg-transparent w-20 text-transparent">spacer</span>
        </div>
      </div>

      <div class="relative flex flex-row items-center w-74 py-2 px-3 z-10 rounded-xl shadow-md border-1 border-gray-200 bg-radial from-violet-200 to-slate-50 to-90%">
        <img class="w-5 inline z-11" src="../assets/icons/search.svg"/>
        <input
          class="text-dark-gray pl-2 outline-0 w-full"
          type="text"
          placeholder="Dove vuoi andare?"
          v-model="query"
          @focusin="focused = true"
        />
      </div>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

@layer base {
  input::placeholder,
  textarea::placeholder {
    color: #2c2c2c;
  }
}
</style>