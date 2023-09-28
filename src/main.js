import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'; // 路徑可能需要調整
import Cookies from 'js-cookie'
import axios from 'axios'

const app = createApp(App);
app.use(router);
app.use(store); // 將 Vuex Store 連接到 Vue 實例
app.config.globalProperties.$cookies = Cookies;

const test = true;
const api = axios.create({
    // baseURL: test ? 'https://ju-house.com/' : 'http://cathayhong.site:8080/',
    baseURL: test ? 'http://www.api.ks/' : 'http://cathayhong.site:8080/',
    // 其他設定...
})

// Cookies.set('account', 'D456789012', { expires: 7, path: '/' })

app.config.globalProperties.$api = api
app.config.globalProperties.$test = test
app.mount('#app')
