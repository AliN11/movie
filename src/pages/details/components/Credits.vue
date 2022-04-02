<script setup lang="ts">
import { Movie } from '@/types';
import { computed } from '@vue/reactivity';

const props = defineProps<{ movie: Movie }>();

const members = computed(() => {
  let members = props.movie.credits.cast;
  members.sort((a, b) => b.popularity - a.popularity);

  return members.reduce((total: string[], member) => {
    total.push(member.name);

    return total;
  }, []);
});
</script>

<template>
  <div class="credits">
    <h4>Credit:</h4>
    <p class="small">
      {{ members.slice(0, 10).join(', ') }}
      <template v-if="members.length > 10"> and {{ members.length - 10 }} more.</template>
    </p>
  </div>
</template>
