<script setup>
import { defineProps } from 'vue';

import HomeIcon from '../assets/icons/home.svg'
import BookIcon from '../assets/icons/book.svg'
import DumbellIcon from '../assets/icons/dumbell.svg'
import WorkIcon from '../assets/icons/work.svg'

const props = defineProps({
  place: {
    type: Object,
    required: true
  },
})

const emit = defineEmits(['click'])

const icons = {
  home: HomeIcon,
  uni: BookIcon,
  gym: DumbellIcon,
  work: WorkIcon,
}

const colors = {
  home: {
    bg: 'bg-blue-500',
    shadow: 'shadow-blue-500/50',
    hover: 'hover:bg-blue-600'
  },
  uni: {
    bg: 'bg-trento-amber',
    shadow: 'shadow-trento-amber/50',
    hover: 'hover:bg-trento-amber-dark'
  },
  gym: {
    bg: 'bg-green-500',
    shadow: 'shadow-green-500/50',
    hover: 'hover:bg-green-600'
  },
  work: {
    bg: 'bg-red-500',
    shadow: 'shadow-red-500/50',
    hover: 'hover:bg-red-600'
  }
}
</script>

<template>
  <span
    class="shadow-md shrink-0 px-2 py-1 rounded-full text-white flex flex-row cursor-pointer"
    :class="[colors[props.place.icon].bg, colors[props.place.icon].shadow, colors[props.place.icon].hover]"
    @click="emit('click')"
  >
    <img class="w-3" :src="icons[props.place.icon]" />
    <span class="ml-1 text-xs">{{ props.place.title }}</span>
  </span>
</template>