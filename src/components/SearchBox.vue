<script setup lang="ts">
import { ref, watch } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import { dateFormatter } from '@/helpers';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['setDates', 'getMovies', 'setPage']);
const storedDates = store.getters['movies/filters'].dates;
const dates = ref([storedDates.start, storedDates.end]);

const format = (dates: [Date, Date]) => {
  if (dates[0] !== undefined && dates[1] === undefined) {
    return dateFormatter(dates[0]);
  }

  return `${dateFormatter(dates[0])} - ${dateFormatter(dates[1])}`;
};

watch(
  () => dates.value,
  (dates) => {
    if (Array.isArray(dates)) {
      emit('setDates', ...dates);
    } else {
      emit('setDates', '', '');
    }
  }
);

const search = () => {
  emit('setPage', 1);
  emit('getMovies');
};
</script>

<template>
  <div id="search-box" class="rounded">
    <div class="container">
      <div class="row">
        <div class="col-auto me-auto">
          Search by release date:
          <Datepicker
            v-model="dates"
            class="d-inline-block ms-4"
            :format="format"
            :preview-format="format"
            range
          ></Datepicker>
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" @click="search">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div#search-box {
  background-color: #e2e2e2;
  padding: 25px 60px;
}

input {
  border: 3px solid #ddd;
  padding: 5px;
}
</style>
