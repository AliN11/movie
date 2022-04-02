import { dateFormatter } from '@/helpers';
import { MovieFilter } from '@/types';

async function get(filters: MovieFilter = {}) {
  let url = `${import.meta.env.VITE_API_BASE_PATH}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`;
  url += `&page=${filters.page || 1}`;

  if (filters.dates && filters.dates.start && filters.dates.start) {
    // eslint-disable-next-line prettier/prettier
    url += `&primary_release_date.gte=${dateFormatter(filters.dates.start)}&primary_release_date.lte=${dateFormatter(filters.dates.end)}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function find(id: string) {
  const url = `${import.meta.env.VITE_API_BASE_PATH}/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function credits(id: string) {
  const url = `${import.meta.env.VITE_API_BASE_PATH}/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export default {
  get,
  find,
  credits,
};
