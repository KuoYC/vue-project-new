<template>
    <template v-if="per === null || per === ''">
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
                                            <input type="password" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="mb-3">
                                            <div class="form-check form-check-primary form-check-inline">
                                                <input class="form-check-input me-3" type="checkbox"
                                                       id="form-check-default">
                                                <label class="form-check-label" for="form-check-default">
                                                    記住我
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="mb-4">
                                            <button @click="toLogin()" class="btn btn-secondary w-100">登 入</button>
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
                        <li style="margin-right: 10px;"><a href="#" data-bs-toggle="sidebar" class="nav-link nav-link-lg
									collapse-btn">
                            <vue-feather type="menu"></vue-feather>
                        </a></li>
                    </ul>
                </div>
                <!-- <div class="d-flex align-items-center" style="color: white; font-size: 22px;">資訊共用作業系統
                </div> -->
                <ul class="navbar-nav navbar-right d-flex align-items-center">
                    <li><a href="#" class="nav-link nav-link-lg fullscreen-btn d-flex align-items-center">
                        <vue-feather type="maximize"></vue-feather>
                    </a>
                    </li>
                    <li class="dropdown dropdown-list-toggle"><a href="#" data-bs-toggle="dropdown"
                                                                 class="nav-link d-flex notification-toggle nav-link-lg">
                        <vue-feather type="bell"></vue-feather>
                    </a>
                        <div class="dropdown-menu dropdown-list dropdown-menu-right pullDown">
                            <div class="dropdown-header">
                                Notifications
                                <div class="float-right">
                                    <a href="#">Mark All As Read</a>
                                </div>
                            </div>
                            <div class="dropdown-list-content dropdown-list-icons">
                                <a href="#" class="dropdown-item dropdown-item-unread"> <span
                                        class="dropdown-item-icon l-bg-orange text-white"> <i
                                        class="far fa-envelope"></i>
                  </span> <span class="dropdown-item-desc"> You got new mail, please check. <span class="time">2 Min
                      Ago</span>
                  </span>
                                </a> <a href="#" class="dropdown-item"> <span
                                    class="dropdown-item-icon l-bg-purple text-white"> <i
                                    class="fas fa-bell"></i>
                  </span> <span class="dropdown-item-desc"> Meeting with <b>John Deo</b> and <b>Sarah Smith </b> at
                    10:30 am <span class="time">10 Hours
                      Ago</span>
                  </span>
                            </a> <a href="#" class="dropdown-item"> <span
                                    class="dropdown-item-icon l-bg-green text-white"> <i
                                    class="far fa-check-circle"></i>
                  </span> <span class="dropdown-item-desc"> Sidebar Bug is fixed by Kevin <span class="time">12
                      Hours
                      Ago</span>
                  </span>
                            </a> <a href="#" class="dropdown-item"> <span
                                    class="dropdown-item-icon bg-danger text-white"> <i
                                    class="fas fa-exclamation-triangle"></i>
                  </span> <span class="dropdown-item-desc"> Low disk space error!!!. <span class="time">17 Hours
                      Ago</span>
                  </span>
                            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-icon bg-info text-white"> <i
                                    class="fas
												fa-bell"></i>
                  </span> <span class="dropdown-item-desc"> Welcome to Gati
                    template! <span class="time">Yesterday</span>
                  </span>
                            </a>
                            </div>
                            <div class="dropdown-footer text-center">
                                <a href="#">View All <i class="fas fa-chevron-right"></i></a>
                            </div>
                        </div>
                    </li>
                    <!-- 這裡放人名 -->
                    <li class="d-flex align-items-center" style="color: white;font-size: 16px;margin-right: 10px;">
                        <span>{{ per.perName }}  {{ per.perPositionName}}</span>
                    </li>
                    <!-- 這裡放公司職位 -->
                    <li class="d-flex align-items-center" style="color: white;font-size: 16px;">
                        <span>({{ per.comTitle }}/{{ per.perBu2 }}/{{ per.perBu3 }})</span>
                    </li>
                    <li class="dropdown">
                        <a href="#" data-bs-toggle="dropdown"
                           class="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img
                                alt="image" src="/assets/img/person-304893_1280.png" class="user-img-radious-style">
                            <span
                                    class="d-sm-none d-lg-inline-block"></span></a>
                        <div class="dropdown-menu dropdown-menu-right pullDown" style="width: 300px;">
                            <!-- <div class="dropdown-title">白昕蕎</div> -->
                            <div class="dropdown-title">{{ per.perNo }}</div>
                            <div class="dropdown-divider"></div>
                            <!-- 這裡放可切換的身份 -->
                            <!-- 目前啟用的身份 -->
                            <template v-for="rol in roleData">
                                <template
                                        v-if="rol.perNo === per.perNo && rol.perPosition === per.perPosition && rol.perBu1Code === per.perBu1Code">
                                    <div class="dropdown-title d-flex dropdown-item auth-active">
                                        <vue-feather type="user-check"></vue-feather>
                                        <span style="margin-left: 5px;">{{ rol.comTitle }}/{{ rol.perBu2 }}/{{ rol.perBu3 }}</span>
                                    </div>
                                </template>
                                <template
                                        v-else>
                                    <!-- 其他可切換的身份 -->
                                    <div class="dropdown-title d-flex dropdown-item"
                                         @click="toChangeLogin(rol.perNo, rol.perPosition, rol.perBu1Code)">
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
            <div class="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">
                    <!-- sidebar個資和品牌 -->
                    <div class="sidebar-brand" style="background-color: var(--theme-color);">
                        <router-link :to="`/`">
                            <img alt="image" src="/assets/img/logo2.png" class="header-logo"/>
                            <span class="logo-name" style="color: white;"> 國泰金控</span>
                        </router-link>
                    </div>
                    <div style="width: 100%;padding: 0 10px;">
                        <div class="sidebar-user" style="padding-top: 30px;margin-bottom: 30px;">
                            <div class="sidebar-user-picture" style="margin-right: 0;">
                                <!-- <img alt="image" src="/assets/img/person-304893_1280.png"> -->
                                <span class="logo-name" style="font-size: 22px;">資訊共用作業系統
                </span>
                            </div>
                            <!-- <div class="sidebar-user-details">
                               <div class="user-name">白昕蕎</div>
                              <div class="user-role">A123456789</div>
                              <div class="sidebar-userpic-btn" style="padding-bottom: 30px;">
                                <a href="profile.html" data-bs-toggle="tooltip" title="Profile">
                                  <i data-feather="user"></i>
                                </a>
                                <a href="email-inbox.html" data-bs-toggle="tooltip" title="Mail">
                                  <i data-feather="mail"></i>
                                </a>
                                <a href="chat.html" data-bs-toggle="tooltip" title="Chat">
                                  <i data-feather="message-square"></i>
                                </a>
                                <a href="auth-login.html" data-bs-toggle="tooltip" title="Log Out">
                                  <i data-feather="log-out"></i>
                                </a>
                              </div>
                            </div> -->
                        </div>
                        <!-- sidebar個資和品牌 -->
                        <ul class="sidebar-menu">
                            <!-- <li class="menu-header">Dashboard</li> -->
                            <li class="dropdown" :class="$route.path === '/' || $route.path ==='' ? 'active' : ''">
                                <router-link :to="`/`" class="nav-link">
                                    <vue-feather type="home"></vue-feather>
                                    <span>首頁</span>
                                </router-link>
                            </li>
                            <li class="dropdown" :class="$route.path.startsWith('/template') ? 'active' : ''">
                                <router-link :to="`/template`" class="nav-link">
                                    <vue-feather type="clipboard"></vue-feather>
                                    <span>樣板管理</span>
                                </router-link>
                            </li>


                            <!-- <li class="menu-header">Approval Form Management</li> -->
                            <li class="dropdown" :class="$route.path.startsWith('/contract') ? 'active' : ''">
                                <a href="#" class="menu-toggle nav-link has-dropdown">
                                    <vue-feather type="layers"></vue-feather>
                                    <span>簽核單項</span></a>
                                <ul class="dropdown-menu">
                                    <li v-for="menu in templateData"
                                        :class="$route.path.startsWith(`/contract/${menu.temId}/`) ? 'active' : ''">
                                        <router-link :to="`/contract/${menu.temId}/list`" class="nav-link">
                                            {{ menu.temTitle }}
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown" :class="$route.path.startsWith(`/contract_`) ? 'active' : ''">
                                <a href="#" class="menu-toggle nav-link has-dropdown">
                                    <vue-feather type="briefcase"></vue-feather>
                                    <span>簽核單管理</span></a>
                                <ul class="dropdown-menu">
                                    <li><a class="nav-link" href="#">我的待簽單</a></li>
                                    <li><a class="nav-link" href="#">新增簽核單</a></li>
                                    <li><a class="nav-link" href="#">我送出的簽單</a></li>
                                    <li><a class="nav-link" href="#">我簽過的簽單</a></li>
                                    <li><a class="nav-link" href="#">簽核單查詢</a></li>
                                </ul>
                            </li>
                            <!-- <li class="menu-header">Approval Form Inventory</li> -->
                            <li class="dropdown">
                                <a href="#" class="nav-link">
                                    <vue-feather type="calendar"></vue-feather>
                                    <span>簽核單清冊</span></a>
                            </li>
                            <!-- <li class="menu-header">Expense Allocation Sheet</li> -->
                            <li class="dropdown">
                                <a href="#" class="nav-link">
                                    <vue-feather type="check-circle"></vue-feather>
                                    <span>費用分攤表</span></a>
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
                perNo: '00886666',
                per: Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null,
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
            //獲取所有的<li>元素
            // const liElements = document.querySelectorAll('.sidebar-menu .dropdown');
            // // 為每個 <li> 元素添加點擊事件監聽器
            // liElements.forEach((li) => {
            //     li.addEventListener('click', () => {
            //         // 檢查當前 <li> 是否已經具有 'active'
            //         if (!li.classList.contains('active')) {
            //             // 移除所有 <li> 上的 'active'
            //             liElements.forEach((otherLi) => {
            //                 otherLi.classList.remove('active');
            //             });
            //
            //             // 將被點擊的 <li> 添加 'active'
            //             li.classList.add('active');
            //         }
            //     });
            // });
            // this.fetchTemplateData();
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
            defaultData() {

            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=template' : '/api/iform/company'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                    this.$api.get(this.$test ? '/api/?type=work' : '/api/iform/company'),
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
                window.location.href = '/'
            },
            toLogin() {
                this.$api
                    .get(this.$test ? `/api/?type=personnel&perNo=${this.perNo}` : `/api/iform/personnel&perEmail=${this.perEmail}`)
                    .then(response => {
                        this.roleData = response.data.data;

                        Cookies.set('per', JSON.stringify(this.roleData[0]));
                        this.per = JSON.stringify(this.roleData[0]);
                        this.getRole();
                        window.location.href = '/'
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            toChangeLogin(perNo, perPosition, perBu1Code) {
                const newPer = this.roleData.find(per => per.perNo === perNo && per.perPosition === perPosition && per.perBu1Code === perBu1Code);
                Cookies.set('per', JSON.stringify(newPer));
                this.per = Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null;
                this.$router.push('/');
            },
            getRole() {//取得登入人員全部角色
                if (this.per) {
                    this.$api
                        .get(this.$test ? `/api/?type=personnel&perEmail=${this.per.perEmail}` : `/api/iform/personnel&perEmail=${this.perEmail}`)
                        .then(response => {
                            this.roleData = response.data.data;
                            // console.log(this.userData);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            },
            formatDate(dateString) {
                if ('' != dateString) {
                    return dayjs(dateString).format('YYYY-MM-DD');
                }
                else {
                    return dateString;
                }
                // const date = new Date(dateString);
                // const year = date.getFullYear();
                // const month = (date.getMonth() + 1).toString().padStart(2, '0');
                // const day = date.getDate().toString().padStart(2, '0');
                // const hours = date.getHours().toString().padStart(2, '0');
                // const minutes = date.getMinutes().toString().padStart(2, '0');
                // const seconds = date.getSeconds().toString().padStart(2, '0');
                //
                // return `${year}-${month}-${day}`;
                // // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            },
            formatDateTime(dateString) {
                if ('' != dateString) {
                    return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss');
                }
                else {
                    return dateString;
                }
                // const date = new Date(dateString);
                // const year = date.getFullYear();
                // const month = (date.getMonth() + 1).toString().padStart(2, '0');
                // const day = date.getDate().toString().padStart(2, '0');
                // const hours = date.getHours().toString().padStart(2, '0');
                // const minutes = date.getMinutes().toString().padStart(2, '0');
                // const seconds = date.getSeconds().toString().padStart(2, '0');
                //
                // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
        }
    }

</script>
<style>
    .add_link {
        box-shadow: 0 2px 6px #bc8f8f;
        color: #FFF !important;
        background-color: #a52a2a !important;
    }

</style>
