<script setup lang="ts">
import { prettifyGenres } from '@/helpers';
import { computed } from '@vue/reactivity';
import store from '@/store';
import { Genre } from '@/types';

const props = defineProps<{ genres: Genre[] }>();

const totalGenres = store.getters['genres/genres'];
const genreIds = computed(() => {
  return props.genres.reduce((genres: number[], item: { id: number }) => {
    genres.push(item.id);

    return genres;
  }, []);
});

const genres = computed(() => prettifyGenres(totalGenres, genreIds.value));
</script>

<template>
  {{ genres.join(', ') }}
</template>
