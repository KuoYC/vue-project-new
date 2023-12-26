<template>
    <template v-if="$route.path === '/sso/login'">
        <div class="auth-container d-flex">
            <router-view></router-view>
        </div>
    </template>
    <template v-else-if="$route.path === '/admin_login'">
        <div class="auth-container d-flex">
            <router-view></router-view>
        </div>
    </template>
    <template v-else-if="(per === null || per === '') && (adm === null || adm === '')">
        <div class="auth-container d-flex">

            <div class="container mx-auto align-self-center">

                <div class="row">

                    <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                        <div class="card mt-3 mb-3">
                            <div class="card-body">

                                <div class="row">
                                    <div class="col-md-12 mb-3">

                                        <h2>共用資訊平台</h2>
                                        <p>請輸入您的帳號及密碼</p>

                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label">帳號</label>
                                            <input type="text" v-model="perNo" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="mb-4">
                                            <label class="form-label">密碼</label>
                                            <input type="password" v-model="password" class="form-control">
                                        </div>
                                    </div>
                                    <!--<div class="col-12">-->
                                    <!--<div class="mb-4">-->
                                    <!--<button @click="toLocalLogin()" class="btn btn-success w-100">登 入</button>&lt;!&ndash;本機登入&ndash;&gt;-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <div class="col-12">
                                        <div class="mb-4">
                                            <button @click="toLogin()" class="btn btn-success w-100">登 入</button>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="mb-4">
                                            <button @click="toSSOLogin()" class="btn btn-success w-100">SSO 登 入</button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </template>
    <template v-else>
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <!-- nav bar -->
            <nav class="navbar navbar-expand-lg main-navbar sticky d-flex"
                 style="justify-content: space-between;background-color: var(--theme-color);">
                <div class="form-inline">
                    <ul class="navbar-nav mr-3">
                        <li style="margin-right: 10px;"><a href="javascript:void(0);" data-bs-toggle="sidebar" class="nav-link nav-link-lg
									collapse-btn">
                            <vue-feather type="menu"></vue-feather>
                        </a></li>
                        <li>
                            <div class="sidebar-brand" style="background-color: var(--theme-color);">
                                <router-link :to="`/`">
                                    <img alt="image" src="/assets/img/logo.png" class="header-logo"/>
                                    <span class="logo-name" style="color: white;"><img src="/assets/img/logo-title.png" style="padding-bottom: 10px;" alt="logo-title"></span>
                                    <!--<span class="logo-name" style="color: white;"> 國泰金控</span>-->
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- <div class="d-flex align-items-center" style="color: white; font-size: 22px;">資訊共用作業系統
                </div> -->
                <ul class="navbar-nav navbar-right d-flex align-items-center">
                    <!--<li><a href="javascript:void(0);"-->
                           <!--class="nav-link nav-link-lg fullscreen-btn d-flex align-items-center">-->
                        <!--<vue-feather type="maximize"></vue-feather>-->
                    <!--</a>-->
                    <!--</li>-->
                    <!-- 這裡放人名 -->
                    <li class="d-flex align-items-center" style="color: white;margin-right: 5px;">
                        <ul style="list-style: none; text-align: right;">
                            <li style="font-size: 16px;line-height: 24px; border: 0px;">{{ per.perName }}  {{ per.perPositionName}}</li>
                            <li style="font-size: 12px;line-height: 14px; border: 0px;">[{{ per.comTitle }}/{{ per.perBu2 }}/{{ per.perBu3 }}]</li>
                        </ul>
                    </li>
                    <!-- 這裡放公司職位 -->
                    <!--<li class="d-flex align-items-center" style="color: white;font-size: 16px;">-->
                        <!--<span>({{ per.comTitle }}/{{ per.perBu2 }}/{{ per.perBu3 }})</span>-->
                    <!--</li>-->
                    <li class="dropdown">
                        <a href="javascript:void(0);" data-bs-toggle="dropdown"
                           class="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img
                                alt="image" src="/assets/img/person-304893_1280.png" class="user-img-radious-style">
                            <span
                                    class="d-sm-none d-lg-inline-block"></span></a>
                        <div class="dropdown-menu dropdown-menu-right pullDown" style="width: 300px;">
                            <div class="dropdown-title">{{ per.perNo }}</div>
                            <div class="dropdown-divider"></div>
                            <!-- 這裡放可切換的身份 -->
                            <!-- 目前啟用的身份 -->
                            <template v-for="rol in roleData">
                                <template
                                        v-if="rol.perKey === per.perKey">
                                    <div class="dropdown-title d-flex dropdown-item auth-active">
                                        <vue-feather type="user-check"></vue-feather>
                                        <span style="margin-left: 5px;">{{ rol.comTitle }}/{{ rol.perBu2 }}/{{ rol.perBu3 }}</span>
                                    </div>
                                </template>
                                <template
                                        v-else>
                                    <!-- 其他可切換的身份 -->
                                    <div class="dropdown-title d-flex dropdown-item"
                                         @click="toChangeLogin(rol.perKey)">
                                        <vue-feather type="user"></vue-feather>
                                        <span style="margin-left: 5px;">{{ rol.comTitle }}/{{ rol.perBu2}}/{{ rol.perBu3}}</span>
                                    </div>
                                </template>
                            </template>
                            <div class="dropdown-divider"></div>
                            <a href="javascript:void(0);" @click="toLogout()"
                               class="dropdown-item has-icon text-danger"> <i class="fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            <!-- nav bar -->
            <!-- sidebar -->
            <div class="main-sidebar sidebar-style-2" style="top: 70px !important; padding-bottom: 90px;">
                <aside id="sidebar-wrapper">
                    <!-- sidebar個資和品牌 -->
                    <div style="width: 100%;padding: 0 0px;">
                        <div class="sidebar-user" style="padding-top: 30px;margin-bottom: 30px;">
                            <div class="sidebar-user-picture" style="margin-right: 0;">
                                <!-- <img alt="image" src="/assets/img/person-304893_1280.png"> -->
                                <span class="logo-name" style="font-size: 28px; font-weight: bold;">資訊共用作業系統</span>
                            </div>
                        </div>
                        <!-- sidebar個資和品牌 -->
                        <ul class="sidebar-menu">
                            <!-- <li class="menu-header">Dashboard</li> -->
                            <li class="dropdown" :class="{active : $route.path === '/' || $route.path === ''}">
                                <router-link :to="`/`" class="nav-link">
                                    <vue-feather type="home"></vue-feather>
                                    <span>首頁</span>
                                </router-link>
                            </li>
                            <li class="dropdown" :class="{active : $route.path.startsWith('/announcement')}">
                                <router-link :to="`/announcement`" class="nav-link">
                                    <vue-feather type="bell"></vue-feather>
                                    <span>公告</span>
                                </router-link>
                            </li>
                            <li class="dropdown" :class="{active : $route.path.startsWith('/template')}">
                                <router-link :to="`/template`" class="nav-link">
                                    <vue-feather type="clipboard"></vue-feather>
                                    <span>樣板管理</span>
                                </router-link>
                            </li>


                            <!-- <li class="menu-header">Approval Form Management</li> -->
                            <li class="dropdown" :class="{active : $route.path.startsWith('/paper') || $route.path.startsWith(`/contract/`) || $route.path.startsWith(`/apportion/`)}">
                                <router-link :to="`/paper`" class="nav-link">
                                    <vue-feather type="layers"></vue-feather>
                                    <span>表單申請</span>
                                </router-link>
                            </li>

                            <li class="dropdown" :class="{active : $route.path.startsWith(`/review`) || $route.path.startsWith(`/signed`) || $route.path.startsWith(`/archived`)}">
                                <a href="javascript:void(0);" class="menu-toggle nav-link has-dropdown">
                                    <vue-feather type="edit"></vue-feather>
                                    <span>簽核管理</span></a>
                                <ul class="dropdown-menu">
                                    <li :class="{ active: $route.path.startsWith(`/review`)}">
                                        <router-link :to="`/review`" class="nav-link">
                                            待簽核文件
                                        </router-link>
                                    </li>
                                    <li :class="{ active: $route.path.startsWith(`/signed`)}">
                                        <router-link :to="`/signed`" class="nav-link">
                                            已簽核文件
                                        </router-link>
                                    </li>
                                    <li :class="{ active: $route.path.startsWith(`/archived`)}">
                                        <router-link :to="`/archived`" class="nav-link">
                                            已歸檔文件
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown" :class="{active : $route.path.startsWith('/search')}">
                                <router-link :to="`/search`" class="nav-link">
                                    <vue-feather type="search"></vue-feather>
                                    <span>查詢作業</span>
                                </router-link>
                            </li>
                            <li class="dropdown" :class="{active : $route.path.startsWith('/batch')}">
                                <a href="javascript:void(0);" onclick="alert('建置中');" class="nav-link">
                                    <vue-feather type="fast-forward"></vue-feather>
                                    <span>批次簽核作業</span>
                                </a>
                            </li>
                            <!--<li class="dropdown" :class="{active : $route.path.startsWith('/exes')}">-->
                                <!--<a href="javascript:void(0);" class="menu-toggle nav-link has-dropdown">-->
                                    <!--<vue-feather type="check-circle"></vue-feather>-->
                                    <!--<span>費用分攤表</span>-->
                                <!--</a>-->
                                <!--<ul class="dropdown-menu">-->
                                    <!--<li v-for="menu in templateData"-->
                                        <!--:class="{ active: $route.path.startsWith(`/exes/${menu.temId}/`)}">-->
                                        <!--<router-link :to="`/exes/${menu.temId}/list`" class="nav-link">-->
                                            <!--{{ menu.temTitle }}-->
                                        <!--</router-link>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</li>-->
                            <!-- <li class="menu-header">Approval Form Inventory</li> -->
                            <li class="dropdown" :class="{active : $route.path.startsWith(`/inventory`) || $route.path.startsWith(`/integrate`)}">
                                <a href="javascript:void(0);" class="menu-toggle nav-link has-dropdown">
                                    <vue-feather type="bar-chart-2"></vue-feather>
                                    <span>報表管理</span></a>
                                <ul class="dropdown-menu">
                                    <li :class="{active : $route.path.startsWith(`/inventory`)}" class="nav-link">
                                        <router-link :to="`/inventory`">資訊共用計畫書清冊</router-link>
                                    </li>
                                    <li :class="{active : $route.path.startsWith(`/integrate`)}" class="nav-link">
                                        <router-link :to="`/integrate`">年度費用分攤明細</router-link>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown" :class="{active : $route.path.startsWith(`/info`)}">
                                <a href="javascript:void(0);" class="menu-toggle nav-link has-dropdown">
                                    <vue-feather type="settings"></vue-feather>
                                    <span>內部資料管理</span></a>
                                <ul class="dropdown-menu">
                                    <li :class="{active : $route.path.startsWith(`/info/news`)}" class="nav-link">
                                        <router-link :to="`/info/news`">公告設定</router-link>
                                    </li>
                                    <li :class="{active : $route.path.startsWith(`/info/category`)}" class="nav-link">
                                        <router-link :to="`/info/category`">選單設定</router-link>
                                    </li>
                                    <li :class="{active : $route.path.startsWith(`/info/source`)}" class="nav-link">
                                        <router-link :to="`/info/source`">選單內容設定</router-link>
                                    </li>
                                    <li :class="{active : $route.path.startsWith(`/info/work`)}" class="nav-link">
                                        <router-link :to="`/info/work`">作業種類設定</router-link>
                                    </li>
                                    <li :class="{active : $route.path.startsWith(`/info/company`)}" class="nav-link">
                                        <router-link :to="`/info/company`">公司設定</router-link>
                                    </li>
                                    <li :class="{active : $route.path.startsWith(`/info/contact`)}" class="nav-link">
                                        <router-link :to="`/info/contact`">窗口設定</router-link>
                                    </li>
                                    <li :class="{active : $route.path.startsWith(`/info/manner`)}" class="nav-link">
                                        <router-link :to="`/info/manner`">比例設定</router-link>
                                    </li>
                                    <li :class="{active : $route.path.startsWith(`/info/exes`)}" class="nav-link">
                                        <router-link :to="`/info/exes`">費用相關設定</router-link>
                                    </li>
                                    <!--<li :class="{active : $route.path.startsWith(`/info/proportion`)}" class="nav-link"><router-link :to="`/info/proportion`">分攤比例設定</router-link></li>-->
                                    <!--<li :class="{active : $route.path.startsWith(`/info/switch`)}" class="nav-link"><router-link :to="`/info/switch`">全站開關控制</router-link></li>-->
                                </ul>
                            </li>
                            <li class="dropdown" :class="{active : $route.path.startsWith(`/control`)}">
                                <a href="javascript:void(0);" onclick="alert('建置中');" class="menu-toggle nav-link has-dropdown">
                                    <vue-feather type="users"></vue-feather>
                                    <span>帳戶管理</span></a>
                                <ul class="dropdown-menu">
                                    <li :class="{ active : $route.path.startsWith(`/control/personnel`)}"
                                        class="nav-link">
                                        <router-link :to="`/control/personnel`">員工使用權限設定</router-link>
                                    </li>
                                    <li :class="{ active : $route.path.startsWith(`/control/admin`)}" class="nav-link">
                                        <router-link :to="`/control/admin`">帳號管理</router-link>
                                    </li>
                                    <li :class="{ active : $route.path.startsWith(`/control/group`)}" class="nav-link">
                                        <router-link :to="`/control/group`">帳號群組管理</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
            <!-- sidebar -->

            <!-- Main Content -->
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </template>
</template>
<script>
    // import '../public/assets/css/style.css';
    import {useRoute} from 'vue-router';
    import {computed} from 'vue';
    import {mapGetters} from 'vuex';
    import Cookies from 'js-cookie'
    import dayjs from 'dayjs';
    import axios from 'axios'

    export default {
        name: 'App',
        setup() {
            const route = useRoute();

            return {
                route
            };
        },
        data() {
            return {
                test: null,
                api: null,
                perKey: '',//00886666
                password: '',
                per: null,
                adm: null,
                templateData: [],
                personnelData: [
                    // {perId:0, perAccount:'', perNo:'', perName:'', perPar:'', perNick:'', perPosition:'', perPositionName:'', perEmail:'', perPhone1:'', perPhone2:'', perPhone3:'', perBu1Code:'', perBu1:'', perBu2Code:'', perBu2:'', perBu3Code:'', perBu3:'', perMobile:''}
                ],
                companyData: [],
                workData: [],
                roleData: [],
            };
        },
        mounted() {
            this.loadConfig();
            this.defaultData();
            this.fetchFirst();
            // console.log(this.perNo);
            // console.log(this.perPosition);
            // console.log(this.perBu1Code);
            // console.log(this.comId);
            // window.scrollTo(0, 0);
        },
        components: {},
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            }
        },
        computed: {},
        methods: {
            async loadConfig() {
                try {
                    const response = await axios.get('/config.json'); // 适应你的项目结构
                    const config = response.data;
                    this.test = config.test;
                    this.api = axios.create({
                        baseURL: config.baseURL,
                        // 其他设置...
                    });
                    // return response.data;
                } catch (error) {
                    console.error('Failed to load config:', error);
                    return {};
                }
            },


            defaultData() {
                this.per = Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null;
                this.adm = Cookies.get('adm') ? JSON.parse(Cookies.get('adm')) : null;
                this.perKey = this.per?.perKey;
                this.getRole();
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=template' : '/api/iform/template'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                    this.$api.get(this.$test ? '/api/?type=work' : '/api/iform/work'),
                ];
                Promise.all(apiRequests)
                    .then(([templateResponse, companyResponse, workResponse]) => {
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //workResponse
                        this.workData = workResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
                if (this.per) {
                    this.getRole();
                }

            },
            toLogout() {
                Cookies.remove('per');
                this.per = null;
                // window.location.href = '/'
            },
            toLocalLogin() {
                if (this.password === '5678') {
                    axios.get('/personnel.json')
                        .then(response => {
                            // 处理成功响应
                            const perData = response.data;
                            const foundData = perData.find(item => item.perNo === this.perNo);
                            Cookies.set('per', JSON.stringify(foundData));
                            window.location.href = '/'

                            // 在这里对perData进行搜索和处理
                        })
                        .catch(error => {
                            // 处理错误
                            console.error(error);
                        });
                }
            },
            toLogin() {
                if (this.password === '5678') {
                    this.$api
                        .get(this.$test ? `/api/?type=personnel&perNo=${this.perNo}` : `/api/iform/personnel?perEmail=${this.perEmail}`)
                        .then(response => {
                            if (response.data.data.length > 0) {
                                this.roleData = response.data.data;
                                Cookies.set('per', JSON.stringify(this.roleData[0]));
                                window.location.href = '/'
                            } else {
                                alert('查無此帳號');
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            },
            toSSOLogin() {
                this.$api
                    .get(this.$test ? `/api/?type=sso_login` : `/api/iform/saml?returnUrl=https://contract.cathayholdings.com/sso/login`)
                    .then(response => {
                        if (response.data.data?.redirectUrl) {
                            const redirect = response.data.data.redirectUrl;
                            window.location.href = redirect;
                        } else {
                            alert('error');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            toChangeLogin(perKey) {
                const newPer = this.roleData.find(per => per.perKey === perKey);
                Cookies.set('per', JSON.stringify(newPer));
                this.per = Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null;
                this.$router.go(0);
            },
            getRole() {//取得登入人員全部角色
                if (this.per) {
                    this.$api
                        .get(this.$test ? `/api/?type=personnel&perEmail=${this.per.perEmail}` : `/api/iform/personnel?perEmail=${this.perEmail}`)
                        .then(response => {
                            this.roleData = response.data.data;
                            // console.log(this.userData);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            },
            formatDate(date) {
                if (typeof  date === 'object' && date.year !== undefined && date.month !== undefined && date.day !== undefined) {
                    return dayjs(`${date.year}-${date.month+1}-${date.day}`).format('YYYY/MM/DD');
                }
                else if ('' != date) {
                    return dayjs(date).format('YYYY/MM/DD');
                }
                else {
                    return date;
                }
            },
            formatDateTime(date) {
                if ('' != date) {
                    return dayjs(date).format('YYYY/MM/DD HH:mm:ss');
                }
                else {
                    return date;
                }
            },
            addFilesToFormData(formData, files, key) {
                files.forEach(file => {
                    formData.append(key, file);
                });
            },
            addDataPush(box, data) {
                data.forEach(dt => {
                    box.push(dt);
                });
            },
            generateUniqueId() {
                return Math.random().toString(36).substr(2, 9);
            },

            getCompanyTitle(company_id, company_code) {
                let company = '';
                if (company_id && '' !== company_id) {
                    company = this.companyData.filter(company => {
                        return company.comId === company_id;
                    });
                }
                if (company_code && '' !== company_code) {
                    company = this.companyData.filter(company => {
                        return company.comCode === company_code;
                    });
                }
                if (company.length > 0) {
                    return company[0].comTitle;
                } else {
                    return '';
                }
            },
            formatNumber(num) {
                num = Number(num);
                const formattedNumber = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(num);
                return formattedNumber;
            },
            getWorkTitle(work_id) {
                let work = '';
                if (work_id && '' !== work_id) {
                    work = this.workData.filter(work => {
                        return work.worId === work_id;
                    });
                }
                if (work.length > 0) {
                    return work[0].worTitle;
                } else {
                    return '';
                }
            },
            checkRouter(path) {
                return $route.path.startsWith(path)
            },
        }
    }

</script>
<style>
    .add_link {
        box-shadow: 0 2px 6px #bc8f8f;
        color: #FFF !important;
        background-color: #a52a2a !important;
    }

    .main-sidebar .sidebar-menu li a i {
        margin-bottom: -3px;
    }

    .breadcrumb-item a i {
        margin-right: -3px !important;
        margin-bottom: -4px;
    }

    .breadcrumb-item a {
        color: #6c757d;
    }

    .breadcrumb-item a:hover {
        color: #6c757d;
    }
    .text-control {
        width: 200px;
        font-size: 14px;
        padding: 10px 15px;
        height: 42px;
        background-color: #fdfdff;
        border-radius: 0.375rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-clip: padding-box;
        border: 1px solid #ced4da;
    }

    .newTable {
        width: 100%;
        border-collapse: collapse;
    }
    .newTable caption {
        display: none;
    }
    .newTable thead tr:first-child th:first-child {
        border-top-left-radius: 10px;
        background: #F5F5F5;
        /*background: #26a862;*/
        color: black;
        font-weight: bold;
    }
    .newTable thead tr:first-child th:last-child {
        border-top-right-radius: 10px;
        background: #F5F5F5;
        /*background: #26a862;*/
        color: black;
        font-weight: bold;
    }
    .newTable th {
        background: #F5F5F5;
        /*background: #26a862;*/
        color: black;
        font-weight: bold;
    }
    .newTable th {
        padding: 6px;
        /*border: 1px solid #ccc; */
        text-align: left;
    }
    .newTable tbody tr {
        border-bottom: 1px solid transparent;
        border-color: #f6f6f6;
        height: 50px !important;
    }
    .newTable td {
        padding: 6px;
        /*border: 1px solid #ccc; */
        text-align: left;
    }
    .contract-serial {
        font-size: small !important;
    }
    .contract-serial span {
        font-size: small !important;
    }


    table a {
        color: #26a862 !important;
    }

    .newTable .exTable tr:hover {
        color: #26a862 !important;
        cursor: pointer;
    }
    .newTable .exTable tr:hover td:first-child {
        position: relative; /* 需要將 position 設置為 relative，以便添加偽元素 */
    }
    .newTable .exTable tr:hover td:first-child::before {
        content: ""; /* 偽元素的內容為空 */
        position: absolute; /* 將偽元素定位為絕對位置 */
        left: 0; /* 與左邊對齊，創建偽邊框效果 */
        top: 1px; /* 與頂部對齊 */
        bottom: 2px;
        height: 100%; /* 高度與 tr 元素相同 */
        width: 5px; /* 寬度為 1px，創建偽邊框效果 */
        background-color: #26a862; /* 偽邊框的顏色 */
    }

    .newTable .exesTable .action {
        background-color: #EAF7ED; /* 偽邊框的顏色 */
    }

    .row-title {
        font-weight:bold;
    }
    .row-title-font {
        font-size: 16px !important;/*font-size: 16px;*/
    }
    .row-label {
        padding-top: 10px;
        font-size: 14px;/*font-size: 16px;*/
        line-height: normal;
    }
    .row-text {
        display: block;
        font-size: 16px;
        /*padding-left: 10px;*/
        font-weight: 400;
        border: 1px solid #e3e3e3;
        padding: 6px 15px;
        width: fit-content;
        border-radius:4px;

        /*max-width: 250px;*/
    }
    .row-text {
        background-color: #f6f6f6;
    }
    input.row-text {
        background-color: white;
    }
    input.row-text:disabled {
        background-color: #f6f6f6;
    }
    textarea.form-control:disabled {
        background-color: #f6f6f6;
    }
    textarea.row-text {
        background-color: white;
    }
    select.row-text {
        background-color: white;
    }
    .row-text-full {
        display: block;
        background-color: #f6f6f6;
        font-size: 16px;
        /*padding-left: 10px;*/
        font-weight: 400;
        border: 1px solid #e3e3e3;
        padding: 10px 15px;
        border-radius:10px;

        /*max-width: 250px;*/
    }
    /*
    .row-text {
        max-width: 250px;
    }*/
    .row-full{

    }

    .viewBox{
        height: 400px;
        overflow: scroll;
    }

    .navbar {
        left: 0px !important;
    }

    .form-check-input {
        border-color: rgb(38, 168, 98);
    }
    .form-check-input:checked {
        background-color: rgb(38, 168, 98);
        border-color: rgb(38, 168, 98);
    }

    .sp-contract{
        background-color:#8edc9c;
        color:white;
        border-radius: 7px;
        padding: 3px;
        margin-right: 3px;
    }
    .sp-apportion{
        background-color:#e9f7ed;
        color:#26a862;
        border-radius: 7px;
        padding: 3px;
        margin-right: 3px;
    }
    .sp-note{
        color: #9f9f9f;
    }

    .st-success {
        box-shadow: 0 2px 6px #8edc9c;
        background-color: #54ca68;
        border-color: #54ca68;
        color: #fff;
        padding: 0.3rem 0.8rem;
        letter-spacing: .5px;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        border-radius:5px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .st-warning {
        box-shadow: 0 2px 6px #ffc473;
        background-color: #ffa426;
        border-color: #ffa426;
        color: #fff;
        padding: 0.3rem 0.8rem;
        letter-spacing: .5px;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        border-radius:5px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .st-secondary {
        box-shadow: 0 2px 6px #e1e5e8;
        background-color: #cdd3d8;
        border-color: #cdd3d8;
        color: #fff;
        padding: 0.3rem 0.8rem;
        letter-spacing: .5px;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        border-radius:5px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .v-popper--theme-tooltip{
        max-width: 250px;
        margin: 0 auto;
    }
</style>
