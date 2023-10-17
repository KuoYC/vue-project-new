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
import Admin_login from '@/views/Admin_login.vue'
import SSO from '@/views/SSO.vue'

// import Category from '@/views/Category.vue'
// import Category_ad from '@/views/Category_ad.vue'
// import Category_up from '@/views/Category_up.vue'
// import Category_sl from '@/views/Category_sl.vue'
// import Source from '@/views/Source.vue'
// import Source_ad from '@/views/Source_ad.vue'
// import Source_up from '@/views/Source_up.vue'
// import Source_sl from '@/views/Source_sl.vue'
// import Company from '@/views/Company.vue'
// import Company_ad from '@/views/Company_ad.vue'
// import Company_up from '@/views/Company_up.vue'
// import Company_sl from '@/views/Company_sl.vue'
// import Contact from '@/views/Contact.vue'
// import Contact_ad from '@/views/Contact_ad.vue'
// import Contact_up from '@/views/Contact_up.vue'
// import Contact_sl from '@/views/Contact_sl.vue'
// import Proportion from '@/views/Proportion.vue'
// import Switch from '@/views/Switch.vue'
// import Per_purview from '@/views/Per_purview.vue'
// import Per_purview_ad from '@/views/Per_purview_ad.vue'
// import Per_purview_up from '@/views/Per_purview_up.vue'
// import Per_purview_sl from '@/views/Per_purview_sl.vue'
// import Per_group from '@/views/Per_group.vue'
// import Per_group_ad from '@/views/Per_group_ad.vue'
// import Per_group_up from '@/views/Per_group_up.vue'
// import Per_group_sl from '@/views/Per_group_sl.vue'
// import Admin from '@/views/Admin.vue'
// import Admin_ad from '@/views/Admin_ad.vue'
// import Admin_up from '@/views/Admin_up.vue'
// import Admin_sl from '@/views/Admin_sl.vue'
// import Group from '@/views/Group.vue'
// import Group_ad from '@/views/Group_ad.vue'
// import Group_up from '@/views/Group_up.vue'
// import Group_sl from '@/views/Group_sl.vue'



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
    { path: '/admin_login', component: Admin_login, name: '管理者登入' },
    { path: '/sso/login', component: SSO, name: 'SSO' },

    // { path: '/category', component: Category, name: '選單設定' },
    // { path: '/category/ad', component: Category_ad, name: '新增選單' },
    // { path: '/category/up/:id', component: Category_up, name: '修改選單' },
    // { path: '/category/sl/:id', component: Category_sl, name: '查看選單' },
    // { path: '/source', component: Source, name: '選單內容設定' },
    // { path: '/source/ad', component: Source_ad, name: '新增選單內容' },
    // { path: '/source/up/:id', component: Source_up, name: '修改選單內容' },
    // { path: '/source/sl/:id', component: Source_sl, name: '查看選單內容' },
    // { path: '/company', component: Company, name: '公司管理' },
    // { path: '/company/ad', component: Company_ad, name: '新增公司' },
    // { path: '/company/up/:id', component: Company_up, name: '修改公司' },
    // { path: '/company/sl/:id', component: Company_sl, name: '查看公司' },
    // { path: '/contact', component: Contact, name: '窗口設定' },
    // { path: '/contact/ad', component: Contact_ad, name: '新增窗口' },
    // { path: '/contact/up/:id', component: Contact_up, name: '修改窗口' },
    // { path: '/contact/sl/:id', component: Contact_sl, name: '查看窗口' },
    // { path: '/proportion', component: Proportion, name: '分攤比例設定' },
    // { path: '/switch', component: Switch, name: '全站開關控制' },
    // { path: '/per_purview', component: Per_purview, name: '員工使用權限設定' },
    // { path: '/per_purview/ad', component: Per_purview_ad, name: '新增員工使用權限' },
    // { path: '/per_purview/up/:id', component: Per_purview_up, name: '修改員工使用權限' },
    // { path: '/per_purview/sl/:id', component: Per_purview_sl, name: '查看員工使用權限' },
    // { path: '/per_group', component: Per_group, name: '員工群組管理' },
    // { path: '/per_group/ad', component: Per_group_ad, name: '新增員工群組' },
    // { path: '/per_group/up/:id', component: Per_group_up, name: '修改員工群組' },
    // { path: '/per_group/sl/:id', component: Per_group_sl, name: '查看員工群組' },
    // { path: '/admin', component: Admin, name: '帳號管理' },
    // { path: '/admin/ad', component: Admin_ad, name: '新增帳號' },
    // { path: '/admin/up/:id', component: Admin_up, name: '修改帳號' },
    // { path: '/admin/sl/:id', component: Admin_sl, name: '查看帳號' },
    // { path: '/group', component: Group, name: '帳號群組管理' },
    // { path: '/group/ad', component: Group_ad, name: '新增帳號群組' },
    // { path: '/group/up/:id', component: Group_up, name: '修改帳號群組' },
    // { path: '/group/sl/:id', component: Group_sl, name: '查看帳號群組' },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
