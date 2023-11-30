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
import Search from '@/views/Search.vue'
import Search_sl from '@/views/Search_sl.vue'
import Apportion from '@/views/Apportion.vue'
import Apportion_ad from '@/views/Apportion_ad.vue'
import Apportion_up from '@/views/Apportion_up.vue'
import Apportion_sl from '@/views/Apportion_sl.vue'
import Admin_login from '@/views/Admin_login.vue'
import SSO from '@/views/SSO.vue'

import Category from '@/views/Category.vue'
import Category_ad from '@/views/Category_ad.vue'
import Category_up from '@/views/Category_up.vue'
import Category_sl from '@/views/Category_sl.vue'
import Announcement from '@/views/Announcement.vue'
import Announcement_sl from '@/views/Announcement_sl.vue'
import News from '@/views/News.vue'
import News_ad from '@/views/News_ad.vue'
import News_up from '@/views/News_up.vue'
import News_sl from '@/views/News_sl.vue'
import Work from '@/views/Work.vue'
import Work_ad from '@/views/Work_ad.vue'
import Work_up from '@/views/Work_up.vue'
import Work_sl from '@/views/Work_sl.vue'
import Source from '@/views/Source.vue'
import Source_ad from '@/views/Source_ad.vue'
import Source_up from '@/views/Source_up.vue'
import Source_sl from '@/views/Source_sl.vue'
import Company from '@/views/Company.vue'
import Company_ad from '@/views/Company_ad.vue'
import Company_up from '@/views/Company_up.vue'
import Company_sl from '@/views/Company_sl.vue'
import Review from '@/views/Review.vue'
import Review_sl from '@/views/Review_sl.vue'
import Contact from '@/views/Contact.vue'
import Contact_ad from '@/views/Contact_ad.vue'
import Contact_up from '@/views/Contact_up.vue'
import Contact_sl from '@/views/Contact_sl.vue'
// import Proportion from '@/views/Proportion.vue'
// import Switch from '@/views/Switch.vue'
import Personnel from '@/views/Personnel.vue'
import Personnel_ad from '@/views/Personnel_ad.vue'
import Personnel_up from '@/views/Personnel_up.vue'
import Personnel_sl from '@/views/Personnel_sl.vue'
import Admin from '@/views/Admin.vue'
import Admin_ad from '@/views/Admin_ad.vue'
import Admin_up from '@/views/Admin_up.vue'
import Admin_sl from '@/views/Admin_sl.vue'
import Group from '@/views/Group.vue'
import Group_ad from '@/views/Group_ad.vue'
import Group_up from '@/views/Group_up.vue'
import Group_sl from '@/views/Group_sl.vue'



const routes = [
    { path: '/', component: Home, name: '首頁' },
    { path: '/template', component: Template, name: '樣管理板' },
    { path: '/template/ad', component: Template_ad, name: '新增樣板' },
    { path: '/template/up/:id', component: Template_up, name: '修改樣板' },
    { path: '/template/sl/:id', component: Template_sl, name: '查看樣板' },
    { path: '/review/list', component: Review, name: '待簽核文件' },
    { path: '/review/sl/:id', component: Review_sl, name: '查看待簽核文件' },
    { path: '/contract/list/:type?', component: Contract, name: '文件列表' },
    // { path: '/contract/:tem/ad/:id', component: Contract_ad, name: '文件新增' },
    { path: '/contract/up/:id', component: Contract_up, name: '文件操作' },
    { path: '/contract/sl/:id', component: Contract_sl, name: '文件查看' },
    // { path: '/contract/:tem/list', component: Contract, name: '文件列表' },
    // { path: '/contract/:tem/ad/:id', component: Contract_ad, name: '文件新增' },
    // { path: '/contract/:tem/up/:id', component: Contract_up, name: '文件修改' },
    // { path: '/contract/:tem/sl/:id', component: Contract_sl, name: '文件查看' },
    { path: '/search/:tem/list', component: Search, name: '查詢作業列表' },
    { path: '/search/:tem/sl/:id', component: Search_sl, name: '查看作業' },
    { path: '/apportion/list', component: Apportion, name: '費用分攤列表' },
    { path: '/apportion/ad/:id', component: Apportion_ad, name: '費用分攤新增' },
    { path: '/apportion/up/:id', component: Apportion_up, name: '費用分攤修改' },
    { path: '/apportion/sl/:id', component: Apportion_sl, name: '費用分攤查看' },
    { path: '/admin_login', component: Admin_login, name: '管理者登入' },
    { path: '/sso/login', component: SSO, name: 'SSO' },
    { path: '/announcement', component: Announcement, name: '公告' },
    { path: '/announcement/sl/:id', component: Announcement_sl, name: '公告查看' },

    { path: '/info/news', component: News, name: '公告設定' },
    { path: '/info/news/ad', component: News_ad, name: '新增公告' },
    { path: '/info/news/up/:id', component: News_up, name: '修改公告' },
    { path: '/info/news/sl/:id', component: News_sl, name: '查看公告' },
    { path: '/info/category', component: Category, name: '選單設定' },
    { path: '/info/category/ad', component: Category_ad, name: '新增選單' },
    { path: '/info/category/up/:id', component: Category_up, name: '修改選單' },
    { path: '/info/category/sl/:id', component: Category_sl, name: '查看選單' },
    { path: '/info/work', component: Work, name: '作業種類設定' },
    { path: '/info/work/ad', component: Work_ad, name: '新增作業種類' },
    { path: '/info/work/up/:id', component: Work_up, name: '修改作業種類' },
    { path: '/info/work/sl/:id', component: Work_sl, name: '查看作業種類' },
    { path: '/info/source', component: Source, name: '選單內容設定' },
    { path: '/info/source/ad', component: Source_ad, name: '新增選單內容' },
    { path: '/info/source/up/:id', component: Source_up, name: '修改選單內容' },
    { path: '/info/source/sl/:id', component: Source_sl, name: '查看選單內容' },
    { path: '/info/company', component: Company, name: '公司管理' },
    { path: '/info/company/ad', component: Company_ad, name: '新增公司' },
    { path: '/info/company/up/:id', component: Company_up, name: '修改公司' },
    { path: '/info/company/sl/:id', component: Company_sl, name: '查看公司' },
    { path: '/info/contact', component: Contact, name: '窗口設定' },
    { path: '/info/contact/ad', component: Contact_ad, name: '新增窗口' },
    { path: '/info/contact/up/:id', component: Contact_up, name: '修改窗口' },
    { path: '/info/contact/sl/:id', component: Contact_sl, name: '查看窗口' },
    // { path: '/info/proportion', component: Proportion, name: '分攤比例設定' },
    // { path: '/info/switch', component: Switch, name: '全站開關控制' },
    { path: '/control/personnel', component: Personnel, name: '員工使用權限設定' },
    { path: '/control/personnel/ad', component: Personnel_ad, name: '新增員工使用權限' },
    { path: '/control/personnel/up/:id', component: Personnel_up, name: '修改員工使用權限' },
    { path: '/control/personnel/sl/:id', component: Personnel_sl, name: '查看員工使用權限' },
    { path: '/control/admin', component: Admin, name: '帳號管理' },
    { path: '/control/admin/ad', component: Admin_ad, name: '新增帳號' },
    { path: '/control/admin/up/:id', component: Admin_up, name: '修改帳號' },
    { path: '/control/admin/sl/:id', component: Admin_sl, name: '查看帳號' },
    { path: '/control/group', component: Group, name: '帳號群組管理' },
    { path: '/control/group/ad', component: Group_ad, name: '新增帳號群組' },
    { path: '/control/group/up/:id', component: Group_up, name: '修改帳號群組' },
    { path: '/control/group/sl/:id', component: Group_sl, name: '查看帳號群組' },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
