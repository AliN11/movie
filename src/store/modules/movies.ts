/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { movies as moviesApi } from '@/api';
import { Commit } from 'vuex';

const stateObj: Record<string, any> = {
  home: {
    snapshots: {},
    loading: false,
    results: [],
    totalPages: 0,
    totalResults: 0,
    filters: {
      page: 1,
      dates: { start: '', end: '' },
    },
  },
  single: {
    snapshots: {},
    loading: false,
    movie: null,
  },
};

type State = typeof stateObj;
const state: () => State = () => stateObj;

type MovieListResponse = {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
};

const actions = {
  async getHomeMovies({ commit, state }: { commit: Commit; state: State }) {
    commit('setHomeLoading', true);
    const filters = state.home.filters;
    let data;
    const snapshotKey = JSON.stringify(filters);
    const snapshotExists = state.home.snapshots.hasOwnProperty(snapshotKey);

    if (snapshotExists) {
      data = state.home.snapshots[snapshotKey];
    } else {
      data = await moviesApi.get(filters);
      commit('setHomeSnapshot', { snapshotKey, data });
    }

    commit('setHomeLoading', false);
    commit('setHomeMovies', data);
  },
  async getSingleMovie({ commit, state }: { commit: Commit; state: State }, { movieId }: { movieId: string }) {
    let data;
    const snapshotExists = state.single.snapshots.hasOwnProperty(movieId);

    if (snapshotExists) {
      data = state.single.snapshots[movieId];
    } else {
      data = await moviesApi.find(movieId);
      data.credits = await moviesApi.credits(movieId);
      commit('setSingleMovieSnapshot', data);
    }

    commit('setSingleMovie', data);
  },
};

const mutations = {
  setPage(state: State, page: number) {
    state.home.filters.page = page;
  },
  setDates(state: State, dates: { start: string; end: string }) {
    state.home.filters.dates = dates;
  },
  setHomeLoading(state: State, loading: boolean) {
    state.home.loading = loading;
  },
  setHomeMovies(state: State, response: MovieListResponse) {
    state.home.results = response.results;
    state.home.totalPages = response.total_pages;
    state.home.totalResults = response.total_results;
  },
  setHomeSnapshot(state: State, { snapshotKey: key, data }: { snapshotKey: string; data: MovieListResponse }) {
    state.home.snapshots[key] = data;
  },
  setSingleMovie(state: State, data: Record<string, any>) {
    state.single.loading = false;
    state.single.movie = data;
  },
  setSingleMovieSnapshot(state: State, movie: { id: number }) {
    state.single.snapshots[movie.id] = movie;
  },
  resetSingleMovie(state: State) {
    state.single.movie = null;
    state.single.loading = false;
  },
};

// getters
const getters = {
  movies: (state: State) => state.home,
  filters: (state: State) => state.home.filters,
  single: (state: State) => state.single,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
