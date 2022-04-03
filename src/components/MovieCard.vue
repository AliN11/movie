<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import { prettifyGenres } from '@/helpers';
import MoviePoster from '@/components/MoviePoster.vue';
import { MovieInList } from '@/types';

const store = useStore();

const props = defineProps<{ movie: MovieInList }>();

const movie = computed(() => props.movie);
const totalGenres = store.getters['genres/genres'];
const genres = computed(() => prettifyGenres(totalGenres, movie.value.genre_ids));
</script>

<template>
  <div class="card">
    <div class="row g-3">
      <div class="col-md-6">
        <movie-link :movie-id="movie.id">
          <movie-poster :image="movie.poster_path" :alt="movie.title" size="small" :class="'rounded-start'" />
        </movie-link>
      </div>
      <div class="col-md-6">
        <div class="d-flex flex-column align-items-start h-100 py-3">
          <h5 class="title mb-auto">
            <movie-link :movie-id="movie.id">{{ movie.title }}</movie-link>
          </h5>
          <section class="info">
            <i class="icon-calendar"></i>
            <time class="d-inline-block mb-3 ms-2" :datetime="movie.release_date">{{ movie.release_date }}</time>
            <ul class="genres">
              <li v-for="(genre, index) in genres" :key="index">{{ genre }}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 3px;
  background-color: #f1f1f1;
  border-width: 2px;
  min-height: 260px;
}

.title {
  font-weight: bold;
  font-size: 1.1rem;
}

.title a {
  color: black;
  text-decoration: none;
}

img {
  width: 100%;
}

section.info {
  font-size: 0.9em;
  color: #555;
}

ul.genres {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul.genres li {
  display: inline-block;
  margin-right: 7px;
}

ul.genres li:not(:last-child):after {
  content: '•';
  margin-left: 7px;
}
</style>
