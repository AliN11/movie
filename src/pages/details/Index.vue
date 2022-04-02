<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import MoviePoster from '@/components/MoviePoster.vue';
import Genres from './components/Genres.vue';
import Loading from '@/components/Loading.vue';
import Credits from './components/Credits.vue';
import { Movie } from '@/types';

const route = useRoute();
const store = useStore();

onMounted(() => {
  const movieId = route.params.id;
  store.commit('movies/resetSingleMovie');
  store.dispatch('movies/getSingleMovie', { movieId });
});

const data = computed<{ movie: Movie; loading: boolean }>(() => store.getters['movies/single']);

const formatMoney = (value: number) => {
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٬')}`;
};

const durationToHoursAndMinutes = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};
</script>

<template>
  <div v-if="data.movie !== null && data.loading === false" class="container">
    <div class="info rounded d-flex justify-content-start align-items-center">
      <router-link class="d-block btn btn-primary px-4" to="/"><i class="icon-left"></i> Back</router-link>
      <div class="ms-5">
        <h1 class="title d-inline-block">{{ data.movie.title }}</h1>
        <p class="tagline m-0">{{ data.movie.tagline }}</p>
      </div>
    </div>
    <div class="details">
      <div class="row">
        <div class="col-md-4">
          <movie-poster :image="data.movie.poster_path" :alt="data.movie.title" size="large" :class="'rounded w-100'" />
        </div>
        <div class="col-md-8">
          <table>
            <tbody>
              <tr>
                <th>Budget</th>
                <td>{{ formatMoney(data.movie.budget) }}</td>
              </tr>
              <tr>
                <th>Revenue</th>
                <td>{{ formatMoney(data.movie.revenue) }}</td>
              </tr>
              <tr>
                <th>Relase Date</th>
                <td>{{ data.movie.release_date }}</td>
              </tr>
              <tr>
                <th>Runtime</th>
                <td>{{ durationToHoursAndMinutes(data.movie.runtime) }}</td>
              </tr>
              <tr>
                <th>Score</th>
                <td>{{ data.movie.vote_average }} ({{ data.movie.vote_count }} votes)</td>
              </tr>
              <tr>
                <th>Genres</th>
                <td><Genres :genres="data.movie.genres" /></td>
              </tr>
              <tr>
                <th>IMDB Link</th>
                <td><a :href="`https://www.imdb.com/title/${data.movie.imdb_id}`" target="_blank">Link</a></td>
              </tr>
              <tr>
                <th>Homepag Link</th>
                <td><a :href="`https://www.themoviedb.org/movie/${data.movie.id}`" target="_blank">Link</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p class="description p-1 mt-5">
      {{ data.movie.overview }}
    </p>
    <Credits :movie="data.movie" />
  </div>
  <Loading v-else />
</template>

<style scoped>
div.info {
  background-color: #e2e2e2;
  padding: 25px 60px;
}

div.details {
  margin-top: 80px;
}

h1 {
  font-size: 1.5rem;
  font-weight: bolder;
}

p.tagline {
  font-size: 1.2rem;
}

table {
  width: 100%;
}

table th {
  padding-left: 50px;
}

table td {
  text-align: right;
  padding: 10px;
}

.credits {
  margin-top: 100px;
}
.credits h4 {
  font-weight: bold;
}
</style>
