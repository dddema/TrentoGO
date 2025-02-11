<script setup>
import router from '@/router'
import axios from 'axios'
import { compile, computed, ref, watch, onMounted } from 'vue'

const props = defineProps({
  position: {
    type: Object,
    required: true,
  }
})

const query = ref('')
const autocompleteResults = ref([])
// const autocompleteResults = ref([
//     {
//       description: "Piazza Fiera, Trento, TN, Italia",
//       matched_substrings: [
//         {
//           length: 4,
//           offset: 0
//         }
//       ],
//       place_id: "ChIJY5c-qrR2gkcRj4uvPychn0o",
//       reference: "ChIJY5c-qrR2gkcRj4uvPychn0o",
//       structured_formatting: {
//         main_text: "Piazza Fiera",
//         main_text_matched_substrings: [
//           {
//             length: 4,
//             offset: 0
//           }
//         ],
//         secondary_text: "Trento, TN, Italia"
//       },
//       terms: [
//         {
//           offset: 0,
//           value: "Piazza Fiera"
//         },
//         {
//           offset: 14,
//           value: "Trento"
//         },
//         {
//           offset: 22,
//           value: "TN"
//         },
//         {
//           offset: 26,
//           value: "Italia"
//         }
//       ],
//       types: [
//         "town_square",
//         "geocode"
//       ]
//     },
//     {
//       description: "Piazza della Mostra, Trento, TN, Italia",
//       matched_substrings: [
//         {
//           length: 4,
//           offset: 0
//         }
//       ],
//       place_id: "EidQaWF6emEgZGVsbGEgTW9zdHJhLCBUcmVudG8sIFROLCBJdGFsaWEiLiosChQKEgn9NTPJynaCRxGtBHItmuoj6RIUChIJ253Oycp2gkcRR_WfE5mixic",
//       reference: "EidQaWF6emEgZGVsbGEgTW9zdHJhLCBUcmVudG8sIFROLCBJdGFsaWEiLiosChQKEgn9NTPJynaCRxGtBHItmuoj6RIUChIJ253Oycp2gkcRR_WfE5mixic",
//       structured_formatting: {
//         main_text: "Piazza della Mostra",
//         main_text_matched_substrings: [
//           {
//             length: 4,
//             offset: 0
//           }
//         ],
//         secondary_text: "Trento, TN, Italia"
//       },
//       terms: [
//         {
//           offset: 0,
//           value: "Piazza della Mostra"
//         },
//         {
//           offset: 21,
//           value: "Trento"
//         },
//         {
//           offset: 29,
//           value: "TN"
//         },
//         {
//           offset: 33,
//           value: "Italia"
//         }
//       ],
//       types: [
//         "route",
//         "geocode"
//       ]
//     },
//     {
//       description: "Piazza Dante, Trento, TN, Italia",
//       matched_substrings: [
//         {
//           length: 4,
//           offset: 0
//         }
//       ],
//       place_id: "EiBQaWF6emEgRGFudGUsIFRyZW50bywgVE4sIEl0YWxpYSIuKiwKFAoSCT-Ocbc1cYJHESzZZ4roFjPEEhQKEgnbnc7JynaCRxFH9Z8TmaLGJw",
//       reference: "EiBQaWF6emEgRGFudGUsIFRyZW50bywgVE4sIEl0YWxpYSIuKiwKFAoSCT-Ocbc1cYJHESzZZ4roFjPEEhQKEgnbnc7JynaCRxFH9Z8TmaLGJw",
//       structured_formatting: {
//         main_text: "Piazza Dante",
//         main_text_matched_substrings: [
//           {
//             length: 4,
//             offset: 0
//           }
//         ],
//         secondary_text: "Trento, TN, Italia"
//       },
//       terms: [
//         {
//           offset: 0,
//           value: "Piazza Dante"
//         },
//         {
//           offset: 14,
//           value: "Trento"
//         },
//         {
//           offset: 22,
//           value: "TN"
//         },
//         {
//           offset: 26,
//           value: "Italia"
//         }
//       ],
//       types: [
//         "route",
//         "geocode"
//       ]
//     },
//     {
//       description: "Piazza Duomo, Piazza del Duomo, Trento, TN, Italia",
//       matched_substrings: [
//         {
//           length: 4,
//           offset: 0
//         }
//       ],
//       place_id: "ChIJu_TMBUtxgkcR2d5GcTDKwt4",
//       reference: "ChIJu_TMBUtxgkcR2d5GcTDKwt4",
//       structured_formatting: {
//         main_text: "Piazza Duomo",
//         main_text_matched_substrings: [
//           {
//             length: 4,
//             offset: 0
//           }
//         ],
//         secondary_text: "Piazza del Duomo, Trento, TN, Italia"
//       },
//       terms: [
//         {
//           offset: 0,
//           value: "Piazza Duomo"
//         },
//         {
//           offset: 14,
//           value: "Piazza del Duomo"
//         },
//         {
//           offset: 32,
//           value: "Trento"
//         },
//         {
//           offset: 40,
//           value: "TN"
//         },
//         {
//           offset: 44,
//           value: "Italia"
//         }
//       ],
//       types: [
//         "tourist_attraction",
//         "point_of_interest",
//         "establishment"
//       ]
//     },
//     {
//       description: "Piazza Cesare Battisti, Trento, TN, Italia",
//       matched_substrings: [
//         {
//           length: 4,
//           offset: 0
//         }
//       ],
//       place_id: "EipQaWF6emEgQ2VzYXJlIEJhdHRpc3RpLCBUcmVudG8sIFROLCBJdGFsaWEiLiosChQKEgmzZHu6SnGCRxHbDFuzj-G_xRIUChIJ253Oycp2gkcRR_WfE5mixic",
//       reference: "EipQaWF6emEgQ2VzYXJlIEJhdHRpc3RpLCBUcmVudG8sIFROLCBJdGFsaWEiLiosChQKEgmzZHu6SnGCRxHbDFuzj-G_xRIUChIJ253Oycp2gkcRR_WfE5mixic",
//       structured_formatting: {
//         main_text: "Piazza Cesare Battisti",
//         main_text_matched_substrings: [
//           {
//             length: 4,
//             offset: 0
//           }
//         ],
//         secondary_text: "Trento, TN, Italia"
//       },
//       terms: [
//         {
//           offset: 0,
//           value: "Piazza Cesare Battisti"
//         },
//         {
//           offset: 24,
//           value: "Trento"
//         },
//         {
//           offset: 32,
//           value: "TN"
//         },
//         {
//           offset: 36,
//           value: "Italia"
//         }
//       ],
//       types: [
//         "route",
//         "geocode"
//       ]
//     }
//   ]
// )


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
        console.error("Google maps API Error: " + response.data.error_message)
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
// 

let isFavoritesOveflown = ref(Boolean)

onMounted(() => {
  const element = document.querySelector('#favorites_slider');
  isFavoritesOveflown = doesItOverflow(element);
}) 

const doesItOverflow = (element) => {
  return element.scrollWidth > element.clientWidth;
}

const goToRoutes = (result) => {
  router.push(`/routes/${props.position.latitude},${props.position.longitude}/${result.place_id}`);
}
</script>

<template>
  <div class="flex flex-col items-center left-1/5 right-1/5 text-center fixed bottom-22 transition-bottom duration-300 has-focus:bottom-1/4 text-dark-gray">
    <div class="w-2xl -mb-6 rounded-[1rem] pt-3 pb-9 border-1 border-gray-300 px-10 bg-white/30 backdrop-blur-md z-1" :class="{ hidden: !focused }">
      <ul class="pb-4" >
        <li @click="goToRoutes(result)" v-for="result in autocompleteResults" class="flex items-center my-1 text-left border-b-1 last:border-b-0 border-gray-300 py-2">
          <div class="text-center flex flex-col items-center justify-center w-4 ml-5">
            <img v-if="!result.types.includes('route')" src="../assets/icons/location.svg"/>
            <img v-else src="../assets/icons/road.svg"/>

            <span v-if="result.distance_meters" class="text-xs">{{ (result.distance_meters/1000).toFixed(1) }}&nbsp;km</span>
          </div>
          <span class="text-md pl-8 truncate max-w-80">{{ `${result.terms[0].value}, `}}</span><span class="pl-1 text-gray-400 truncate" >{{ `${result.terms[1].value}` }}</span>
        </li>
      </ul>
      <div :class="{ 'bg-red-500' : isFavoritesOveflown }" id="favorites_slider" class="flex flex-row text-xs overflow-visible items-center h-10 overflow-x-scroll no-scrollbar mask-blur scroll-px-150 justify-center">
          <span class="bg-transparent w-20 text-transparent">spacer</span>
          <span class="bg-blue-500 shadow-md shadow-blue-500/50 shrink-0 px-2 py-1 rounded-full text-white flex flex-row">
            <img src="../assets/icons/home.svg"/>
            <span class="ml-1">Casa</span>
          </span>
          <span class="bg-trento-amber shadow-md shadow-trento-amber/50 shrink-0 mx-1 px-2 py-1 rounded-full text-white flex flex-row">
            <img src="../assets/icons/book.svg"/>
            <span class="ml-1">Uni</span>
          </span>
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
</template>

<style>
@import "tailwindcss";

@layer base {
  input::placeholder,
  textarea::placeholder {
    color: #2c2c2c;
  }
}

.hidden {
  display: none;
}
</style>