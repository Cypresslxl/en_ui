import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import './index.css' // If you're using Tailwind CSS

createApp(App).use(store).use(router).mount('#app');

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
