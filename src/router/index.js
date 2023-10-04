import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Template from '@/views/Template.vue'
import Template_ad from '@/views/Template_ad.vue'
import Template_up from '@/views/Template_up.vue'
import Template_sl from '@/views/Template_sl.vue'

import Contract from '@/views/Contract.vue'
import Contract_ad from '@/views/Contract_ad.vue'
import Contract_up from '@/views/Contract_up.vue'
import Contract_sl from '@/views/Contract_sl.vue'
import Admin from '@/views/Admin.vue'
import SSO from '@/views/SSO.vue'


const routes = [
    { path: '/', component: Home, name: '首頁' },
    { path: '/template', component: Template, name: '樣管理板' },
    { path: '/template/ad', component: Template_ad, name: '新增樣板' },
    { path: '/template/up/:id', component: Template_up, name: '修改樣板' },
    { path: '/template/sl/:id', component: Template_sl, name: '查看樣板' },
    { path: '/contract/:tem/list', component: Contract, name: '文件列表' },
    { path: '/contract/:tem/ad', component: Contract_ad, name: '文件新增' },
    { path: '/contract/:tem/up/:id', component: Contract_up, name: '文件修改' },
    { path: '/contract/:tem/sl/:id', component: Contract_sl, name: '文件查看' },
    { path: '/admin', component: Admin, name: '管理者登入' },
    { path: '/sso/login', component: SSO, name: 'SSO' },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
