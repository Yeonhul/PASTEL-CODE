import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import head from '@/components/header.vue'
import login from '@/components/login.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@fortawesome/fontawesome-free/js/all.js' //awesome font
axios.defaults.baseURL = "https://personal-node-project.herokuapp.com/";


createApp(App)
.use(store)
.use(router)
.use(VueAxios, axios)
.component('He-der', head)
.component('LoginComponent',login)
.mount('#app');
