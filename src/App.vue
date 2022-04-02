<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';

const store = useStore();
onMounted(() => {
  store.dispatch('genres/getGenres');
});
</script>

<template>
  <main>
    <div class="container-fluid">
      <AppHeader />
      <div class="container">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style scoped>
.container-fluid {
  padding: 0;
  margin: 0;
}
.container {
  padding: 100px 0;
  max-width: 1200px;
}
</style>
