<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import SearchBox from '@/components/SearchBox.vue';
import MovieCard from '@/components/MovieCard.vue';
import NavigationBox from '@/components/NavigationBox.vue';
import Loading from '@/components/Loading.vue';

const store = useStore();
const movies = computed(() => store.getters['movies/movies']);
const page = computed(() => store.getters['movies/filters'].page);

onMounted(() => {
  store.dispatch('movies/getHomeMovies');
});
</script>

<template>
  <search-box />
  <div class="container">
    <div class="row">
      <template v-if="movies.loading === false">
        <div v-for="(movie, index) in movies.results" :key="index" class="col-md-4 gx-5 mb-5">
          <movie-card :movie="movie" />
        </div>
        <navigation-box :page="page" :total-pages="movies.totalPages" :movies-length="movies.results.length" />
      </template>
      <Loading v-else />
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 120px;
}
</style>
