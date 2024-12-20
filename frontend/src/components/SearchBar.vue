<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'

const query = ref('')
const autocompleteResults = ref([
    {
      description: "Piazza Fiera, Trento, TN, Italia",
      matched_substrings: [
        {
          length: 4,
          offset: 0
        }
      ],
      place_id: "ChIJY5c-qrR2gkcRj4uvPychn0o",
      reference: "ChIJY5c-qrR2gkcRj4uvPychn0o",
      structured_formatting: {
        main_text: "Piazza Fiera",
        main_text_matched_substrings: [
          {
            length: 4,
            offset: 0
          }
        ],
        secondary_text: "Trento, TN, Italia"
      },
      terms: [
        {
          offset: 0,
          value: "Piazza Fiera"
        },
        {
          offset: 14,
          value: "Trento"
        },
        {
          offset: 22,
          value: "TN"
        },
        {
          offset: 26,
          value: "Italia"
        }
      ],
      types: [
        "town_square",
        "geocode"
      ]
    },
    {
      description: "Piazza della Mostra, Trento, TN, Italia",
      matched_substrings: [
        {
          length: 4,
          offset: 0
        }
      ],
      place_id: "EidQaWF6emEgZGVsbGEgTW9zdHJhLCBUcmVudG8sIFROLCBJdGFsaWEiLiosChQKEgn9NTPJynaCRxGtBHItmuoj6RIUChIJ253Oycp2gkcRR_WfE5mixic",
      reference: "EidQaWF6emEgZGVsbGEgTW9zdHJhLCBUcmVudG8sIFROLCBJdGFsaWEiLiosChQKEgn9NTPJynaCRxGtBHItmuoj6RIUChIJ253Oycp2gkcRR_WfE5mixic",
      structured_formatting: {
        main_text: "Piazza della Mostra",
        main_text_matched_substrings: [
          {
            length: 4,
            offset: 0
          }
        ],
        secondary_text: "Trento, TN, Italia"
      },
      terms: [
        {
          offset: 0,
          value: "Piazza della Mostra"
        },
        {
          offset: 21,
          value: "Trento"
        },
        {
          offset: 29,
          value: "TN"
        },
        {
          offset: 33,
          value: "Italia"
        }
      ],
      types: [
        "route",
        "geocode"
      ]
    },
    {
      description: "Piazza Dante, Trento, TN, Italia",
      matched_substrings: [
        {
          length: 4,
          offset: 0
        }
      ],
      place_id: "EiBQaWF6emEgRGFudGUsIFRyZW50bywgVE4sIEl0YWxpYSIuKiwKFAoSCT-Ocbc1cYJHESzZZ4roFjPEEhQKEgnbnc7JynaCRxFH9Z8TmaLGJw",
      reference: "EiBQaWF6emEgRGFudGUsIFRyZW50bywgVE4sIEl0YWxpYSIuKiwKFAoSCT-Ocbc1cYJHESzZZ4roFjPEEhQKEgnbnc7JynaCRxFH9Z8TmaLGJw",
      structured_formatting: {
        main_text: "Piazza Dante",
        main_text_matched_substrings: [
          {
            length: 4,
            offset: 0
          }
        ],
        secondary_text: "Trento, TN, Italia"
      },
      terms: [
        {
          offset: 0,
          value: "Piazza Dante"
        },
        {
          offset: 14,
          value: "Trento"
        },
        {
          offset: 22,
          value: "TN"
        },
        {
          offset: 26,
          value: "Italia"
        }
      ],
      types: [
        "route",
        "geocode"
      ]
    },
    {
      description: "Piazza Duomo, Piazza del Duomo, Trento, TN, Italia",
      matched_substrings: [
        {
          length: 4,
          offset: 0
        }
      ],
      place_id: "ChIJu_TMBUtxgkcR2d5GcTDKwt4",
      reference: "ChIJu_TMBUtxgkcR2d5GcTDKwt4",
      structured_formatting: {
        main_text: "Piazza Duomo",
        main_text_matched_substrings: [
          {
            length: 4,
            offset: 0
          }
        ],
        secondary_text: "Piazza del Duomo, Trento, TN, Italia"
      },
      terms: [
        {
          offset: 0,
          value: "Piazza Duomo"
        },
        {
          offset: 14,
          value: "Piazza del Duomo"
        },
        {
          offset: 32,
          value: "Trento"
        },
        {
          offset: 40,
          value: "TN"
        },
        {
          offset: 44,
          value: "Italia"
        }
      ],
      types: [
        "tourist_attraction",
        "point_of_interest",
        "establishment"
      ]
    },
    {
      description: "Piazza Cesare Battisti, Trento, TN, Italia",
      matched_substrings: [
        {
          length: 4,
          offset: 0
        }
      ],
      place_id: "EipQaWF6emEgQ2VzYXJlIEJhdHRpc3RpLCBUcmVudG8sIFROLCBJdGFsaWEiLiosChQKEgmzZHu6SnGCRxHbDFuzj-G_xRIUChIJ253Oycp2gkcRR_WfE5mixic",
      reference: "EipQaWF6emEgQ2VzYXJlIEJhdHRpc3RpLCBUcmVudG8sIFROLCBJdGFsaWEiLiosChQKEgmzZHu6SnGCRxHbDFuzj-G_xRIUChIJ253Oycp2gkcRR_WfE5mixic",
      structured_formatting: {
        main_text: "Piazza Cesare Battisti",
        main_text_matched_substrings: [
          {
            length: 4,
            offset: 0
          }
        ],
        secondary_text: "Trento, TN, Italia"
      },
      terms: [
        {
          offset: 0,
          value: "Piazza Cesare Battisti"
        },
        {
          offset: 24,
          value: "Trento"
        },
        {
          offset: 32,
          value: "TN"
        },
        {
          offset: 36,
          value: "Italia"
        }
      ],
      types: [
        "route",
        "geocode"
      ]
    }
  ]
)

const focused = ref(false)

// const fetchData = async (newQuery) => {
//   if (newQuery != '') {
//     try {
//       const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
//       const response = await axios.get(url, {
//         params: {
//           input: newQuery,
//           components: 'country:it',
//           language: 'it',
//           location:'46.066630516969994,11.136310379875919',
//           // origin: ,
//           radius: 6000,
//           key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//         }
//       })

//       if (response.data.status == 'OK')
//         autocompleteResults.value = response.data.predictions
//       else
//         console.error("Google maps API Error: " + response.data.error_message)
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// let autocompleteBlocked = false
// let unansweredQuery = false

// watch(query, async (newQuery, oldQuery) => {
//   // watch for query changes -> triggers fetchData and blocks other requests for 500ms
//   // keeps track of blocked queries and calls fetchData as soon as it unblocks them

//   if (newQuery == '') {
//     autocompleteResults.value = []
//     unansweredQuery = false
//   }

//   if (!autocompleteBlocked) {
//     unansweredQuery = false
//     autocompleteBlocked = true
//     await fetchData(newQuery)

//     setTimeout(async () => {
//       if (unansweredQuery) {
//         unansweredQuery = false
//         await fetchData(query.value)
//       }

//       autocompleteBlocked = false
//     }, 500)
//   } else {
//     unansweredQuery = true
//   }
// })

</script>

<template>
  <div class="left-1/5 right-1/5 text-center fixed bottom-8 transition-bottom duration-300 has-focus:bottom-1/4">
    <div class="w-md mx-auto -mb-2 rounded-[1rem] pt-3 pb-5 px-3 border-1 border-gray-300 bg-neutral-50 px-10" :class="{ hidden: !focused }">
      <ul>
        <li v-for="result in autocompleteResults" class="flex my-1 text-left border-b-1 last:border-b-0 border-gray-300 py-2">
          <div class="text-center flex flex-col items-center"> 
            <img class="w-4" src="../assets/icons/location.svg"/>
            <span class="text-xs">2000000.3 km</span>
          </div>
          <span class="font-normal pl-8">{{ `${result.terms[0].value}, `}}</span><span class="pl-1 text-gray-400" >{{ `${result.terms[1].value}` }}</span>
        </li>
      </ul>
    </div>

    <input
      class="w-64 py-2 px-4 z-10 rounded-xl shadow-md border-1 border-gray-200 bg-radial from-violet-200 to-slate-50 to-90% outline-0"
      type="text"
      placeholder="🔍Dove vuoi andare?"
      v-model="query"
      @focusin="focused = true"
      @focusout="focused = false"
    >
    
  </div>
</template>

<style>
@import "tailwindcss";

.hidden {
  display: none;
}
</style>