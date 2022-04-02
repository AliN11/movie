<script setup lang="ts">
import { computed } from '@vue/reactivity';

const props = defineProps({
  page: {
    required: true,
    type: Number,
  },
  totalPages: {
    required: true,
    type: Number,
  },
  moviesLength: {
    required: true,
    type: Number,
  },
});

const emit = defineEmits(['setPage', 'getMovies']);

const load = (page: number) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  emit('setPage', page);
  emit('getMovies');
};

const resultsRange = computed(() => {
  const start = (props.page - 1) * 20 + 1;
  const remainder = props.moviesLength % 20;
  const end = props.page * 20 - remainder;

  return `${start}-${end}`;
});
</script>

<template>
  <div class="container text-center">
    <div class="d-flex justify-content-center">
      <button :disabled="page <= 1" class="text-end" @click="load(page - 1)">Previous Page</button>
      <span class="separator"></span>
      <button :disabled="page >= totalPages" class="text-start" @click="load(page + 1)">Next Page</button>
    </div>
    <p>Showing results {{ resultsRange }}</p>
  </div>
</template>

<style scoped>
p {
  color: #999;
  margin-top: 20px;
}

.separator {
  display: inline-block;
  margin: 0 25px;
  border-right: 2px solid #999;
  width: 1px;
  height: 40px;
}

button {
  font-weight: bold;
  border: none;
  background: none;
  min-width: 150px;
  color: #3993e8;
}

button:disabled {
  color: #777;
}
</style>
