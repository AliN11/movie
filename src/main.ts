import './styles/main.scss';
import { createApp } from 'vue';
import store from './store';
import App from './App.vue';
import MovieLink from './components/MovieLink.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(store);
app.component('MovieLink', MovieLink);

app.mount('#app');
