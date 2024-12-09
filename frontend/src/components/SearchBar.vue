<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'

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
          // origin: ,
          radius: 6000,
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
  // wathc for query changes -> triggers fetchData and blocks other requests for 500ms
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


</script>

<template>
  <div class="left-1/5 right-1/5 text-center fixed bottom-8 transition-bottom duration-300 has-focus:bottom-1/4">
    <div class="w-md mx-auto -mb-2 rounded-md pt-3 pb-5 border-1 border-gray-300 bg-neutral-50" :class="{ hidden: !focused }">
      <ul>
        <li v-for="result in autocompleteResults">
          <span class="font-normal">{{ result.description }}</span>
        </li>
      </ul>
    </div>

    <input
      class="w-64 py-2 px-4 z-10 rounded-xl shadow-md border-1 border-gray-200 bg-radial from-violet-200 to-slate-50 to-90% outline-0"
      type="text"
      placeholder="Dove vuoi andare?"
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