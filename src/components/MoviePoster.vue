<script lang="ts" setup>
import { computed } from '@vue/reactivity';

const sizes = {
  thumb: 'w300',
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
};

interface Props {
  image: string | null;
  alt?: string;
  size: keyof typeof sizes;
}

const props = defineProps<Props>();
const size = sizes[props.size] || sizes.original;

const image = computed(() => `https://image.tmdb.org/t/p/${size}${props.image}`);
</script>

<template>
  <img :src="image" :alt="alt ?? ''" />
</template>
