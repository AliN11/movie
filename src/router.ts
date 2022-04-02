import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Details from './pages/details/Index.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/movie/:id', component: Details, name: 'movie-details' },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
