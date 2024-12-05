<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --dark-grey: #2c2c2c;
  --trento-blue: #5171ff;
  --dark-trento-blue: #314dc8;

  background-color: #f8f8f8;
}

* {
  font-family: 'Roboto', sans-serif;
  color: var(--color-dark-grey);
}
</style>
