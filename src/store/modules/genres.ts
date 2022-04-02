import { genres as genresApi } from '@/api';
import { Commit } from 'vuex';

type State = {
  genres: [];
};

const state: () => State = () => ({
  genres: [],
});

// getters
const getters = {
  genres: (state: State) => state.genres,
};

// actions
const actions = {
  async getGenres({ commit }: { commit: Commit }) {
    const { genres } = await genresApi.get();
    commit('setGenres', genres);
  },
};

// mutations
const mutations = {
  setGenres(state: State, genres: []) {
    state.genres = genres;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
