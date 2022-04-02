<script setup lang="ts">
defineProps({
  movieId: {
    required: true,
    type: Number,
  },
});
</script>

<template>
  <router-link :to="{ name: 'movie-details', params: { id: movieId } }">
    <slot />
  </router-link>
</template>
