import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'; // 路徑可能需要調整
import Cookies from 'js-cookie'
import axios from 'axios'
import VueFeather from 'vue-feather';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

const app = createApp(App);
app.use(router);
app.use(store); // 將 Vuex Store 連接到 Vue 實例
app.use(FloatingVue);
app.config.globalProperties.$cookies = Cookies;
app.component(VueFeather.name, VueFeather);



//=============================
async function loadConfig() {
    try {
        const response = await axios.get('/config.json');
        return response.data;
    } catch (error) {
        console.error('Failed to load config:', error);
        return {};
    }
}

loadConfig().then(config => {
    const test = config.test;
    const api = axios.create({
        baseURL: config.baseURL,
        // 其他设置...
    });

    app.config.globalProperties.$api = api;
    app.config.globalProperties.$test = test;

    app.mount('#app');
});

const scriptTags = [
    '/assets/js/app.min.js',
    '/assets/js/jquery.nicescroll.min.js',
    '/assets/js/scripts.js',
    '/assets/js/custom.js',
];
scriptTags.forEach(scriptTag => {
    const script = document.createElement('script');
    script.src = scriptTag;
    document.body.appendChild(script);
});
//=============================


// const test = true;
// const api = axios.create({
//     // baseURL: test ? 'https://ju-house.com/' : 'https://10.75.37.42:8080/',
//     baseURL: test ? 'http://www.api.ks/' : 'http://cathayhong.site:8080/',
//     // baseURL: test ? 'https://10.75.37.42/' : 'http://cathayhong.site:8080/',
//     // 其他設定...
// })


// app.config.globalProperties.$api = api;
// app.config.globalProperties.$test = test;
// app.mount('#app');
