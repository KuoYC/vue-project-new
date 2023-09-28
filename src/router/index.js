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


// import SignContract from '@/views/SignContract.vue'
// import SignContract_sl from '@/views/SignContract_sl.vue'
//
// import ContractItem from '@/views/ContractItem.vue'
//
// import ContractTP from '@/views/ContractTP.vue'
// import ContractTP_ad from '@/views/ContractTP_ad.vue'
// import ContractTP_up from '@/views/ContractTP_up.vue'
// import ContractTP_sl from '@/views/ContractTP_sl.vue'
//
// import ItemReport from '@/views/ItemReport.vue'
// import ExesReport from '@/views/ExesReport.vue'
// import Test from '@/views/Test.vue'
//
// import News from '@/views/News.vue'

const routes = [
    { path: '/', component: Home, name: '首頁' },
    // { path: '/contract', component: Contract, name: '文件列表' },
    // { path: '/contract/ad', component: Contract_ad, name: '文件新增' },
    // { path: '/contract/up/:id', component: Contract_up, name: '文件修改' },
    // { path: '/contract/sl/:id', component: Contract_sl, name: '文件查看' },
    // { path: '/sign_contract/:ctp/list', component: SignContract, name: '簽核文件列表' },
    // { path: '/sign_contract/:ctp/sl/:id', component: SignContract_sl, name: '簽核文件查看' },
    // { path: '/contract_item/:id', component: ContractItem, name: '文件項目' },
    // { path: '/contract_template', component: ContractTP, name: '樣板列表' },
    // { path: '/contract_template/ad', component: ContractTP_ad, name: '樣板新增' },
    // { path: '/contract_template/up/:id', component: ContractTP_up, name: '樣板修改' },
    // { path: '/contract_template/sl/:id', component: ContractTP_sl, name: '樣板查看' },
    // { path: '/item_report', component: ItemReport, name: '資訊共用清冊' },
    // { path: '/exes_report', component: ExesReport, name: '費用分攤統計表' },
    // { path: '/test', component: Test, name: '測試' },
    // { path: '/news', component: News, name: '測試功能' },
    { path: '/template', component: Template, name: '樣管理板' },
    { path: '/template/ad', component: Template_ad, name: '新增樣板' },
    { path: '/template/up/:id', component: Template_up, name: '修改樣板' },
    { path: '/template/sl/:id', component: Template_sl, name: '查看樣板' },
    { path: '/contract/:tem/list', component: Contract, name: '文件列表' },
    { path: '/contract/:tem/ad', component: Contract_ad, name: '文件新增' },
    { path: '/contract/:tem/up/:id', component: Contract_up, name: '文件修改' },
    { path: '/contract/:tem/sl/:id', component: Contract_sl, name: '文件查看' },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
