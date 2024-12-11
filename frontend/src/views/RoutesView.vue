<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
<div class="bg-neutral-50">
    <p>{{ route.params.start }}</p>
    <p>{{ route.params.arrival }}</p>
</div>
</template>

<style scoped>
</style>