import { createStore } from 'vuex';
import genres from './modules/genres';
import movies from './modules/movies';

export default createStore({
  modules: {
    genres,
    movies,
  },
});
