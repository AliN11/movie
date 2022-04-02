async function get() {
  const url = `${import.meta.env.VITE_API_BASE_PATH}/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export default {
  get,
};
