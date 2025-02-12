import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import '@fontsource/roboto'; 
import 'boxicons/css/boxicons.min.css';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify from 'vue3-toastify';
import GoogleLogin   from 'vue3-google-login';
import { createPinia } from 'pinia';
import Toast from "vue3-toastify";
const app = createApp(App)
const pinia = createPinia()
app.use(GoogleLogin , {
    clientId: '907550782722-9g1dcqa9dgkqhld6nueuvial14k6pr3p.apps.googleusercontent.com', 
  });
app.use(router)
app.use(pinia)
app.use(Toast);
app.mount('#app')
app.use(Vue3Toastify, {
  autoClose: 5000, // Tự động đóng sau 3 giây
  position: 'top-right', // Vị trí của toast
});
