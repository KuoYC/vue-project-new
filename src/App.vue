<template>
    <template v-if="!$cookies.get('per')">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" class="feather feather-menu">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </a></li>
                    </ul>
                </div>
                <!-- <div class="d-flex align-items-center" style="color: white; font-size: 22px;">資訊共用作業系統
                </div> -->
                <ul class="navbar-nav navbar-right d-flex align-items-center">
                    <li><a href="#" class="nav-link nav-link-lg fullscreen-btn d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="feather feather-maximize">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                        </svg>
                    </a>
                    </li>
                    <li class="dropdown dropdown-list-toggle"><a href="#" data-bs-toggle="dropdown"
                                                                 class="nav-link notification-toggle nav-link-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                             stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             class="feather feather-user-check">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="8.5" cy="7" r="4"></circle>
                                            <polyline points="17 11 19 13 23 9"></polyline>
                                        </svg>
                                        <span style="margin-left: 5px;">{{ rol.comTitle }}/{{ rol.perBu2 }}/{{ rol.perBu3 }}</span>
                                    </div>
                                </template>
                                <template
                                        v-else>
                                    <!-- 其他可切換的身份 -->
                                    <div class="dropdown-title d-flex dropdown-item"
                                         @click="toChangeLogin(rol.perNo, rol.perPosition, rol.perBu1Code)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round"
                                             class="feather feather-user">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
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
                        <a href="/">
                            <img alt="image" src="/assets/img/logo2.png" class="header-logo"/>
                            <span class="logo-name" style="color: white;"> 國泰金控</span>
                        </a>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" class="feather feather-home">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    <span>首頁</span>
                                </router-link>
                            </li>
                            <li class="dropdown" :class="$route.path.startsWith('/template') ? 'active' : ''">
                                <router-link :to="`/template`" class="nav-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" class="feather feather-clipboard">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                    </svg>
                                    <span>樣板管理</span>
                                </router-link>
                            </li>


                            <!-- <li class="menu-header">Approval Form Management</li> -->
                            <li class="dropdown" :class="$route.path.startsWith('/contract') ? 'active' : ''">
                                <a href="#" class="menu-toggle nav-link has-dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" class="feather feather-layers">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
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
                            <li class="dropdown" :class="{ active: isActive('/contract_/', '') }">
                                <a href="#" class="menu-toggle nav-link has-dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" class="feather feather-briefcase">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" class="feather feather-calendar">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>簽核單清冊</span></a>
                            </li>
                            <!-- <li class="menu-header">Expense Allocation Sheet</li> -->
                            <li class="dropdown">
                                <a href="#" class="nav-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" class="feather feather-check-circle">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
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
                per: Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null,
                temTitle: '',
                templateData: [],
                personnelData: [
                    // {perId:0, perAccount:'', perNo:'', perName:'', perPar:'', perNick:'', perPosition:'', perPositionName:'', perEmail:'', perPhone1:'', perPhone2:'', perPhone3:'', perBu1Code:'', perBu1:'', perBu2Code:'', perBu2:'', perBu3Code:'', perBu3:'', perMobile:''}
                ],
                companyData: [],
                workData: [],
                roleData: [],
                perNo: Cookies.get('perNo') ? Cookies.get('perNo') : '00886666',
                perPosition: Cookies.get('perPosition') ? Cookies.get('perPosition') : '',
                perBu1Code: Cookies.get('perBu1Code') ? Cookies.get('perBu1Code') : '',
                perBu2Code: Cookies.get('perBu2Code') ? Cookies.get('perBu2Code') : '',
                perBu3Code: Cookies.get('perBu3Code') ? Cookies.get('perBu3Code') : '',
                perEmail: Cookies.get('perEmail') ? Cookies.get('perEmail') : '',
                comId: Cookies.get('comId') ? Cookies.get('comId') : '',
            };
        },
        mounted() {
            this.fetchTemplateData();
            this.defaultData();
            this.fetchFirst();
            //獲取所有的<li>元素
            const liElements = document.querySelectorAll('.sidebar-menu .dropdown');
            // 為每個 <li> 元素添加點擊事件監聽器
            liElements.forEach((li) => {
                li.addEventListener('click', () => {
                    // 檢查當前 <li> 是否已經具有 'active'
                    if (!li.classList.contains('active')) {
                        // 移除所有 <li> 上的 'active'
                        liElements.forEach((otherLi) => {
                            otherLi.classList.remove('active');
                        });

                        // 將被點擊的 <li> 添加 'active'
                        li.classList.add('active');
                    }
                });
            });
            // console.log(this.perNo);
            // console.log(this.perPosition);
            // console.log(this.perBu1Code);
            // console.log(this.comId);
            // window.scrollTo(0, 0);
        },
        components: {
            // School,
            // Student
        },
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
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                ];
                Promise.all(apiRequests)
                    .then(([companyResponse]) => {
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
                if ('' !== this.perNo && '' !== this.perPosition && '' !== this.perBu1Code && '' !== this.comId) {
                    this.getRole();
                }

            },
            isActive(route, route2) {
                let check = false;
                if ('' !== route) {
                    check = this.$route.path === route;
                }
                if ('' !== route2) {
                    check = this.$route.path.startsWith(route2);
                }
                return check;
            },
            toHome() {
                window.location.href = '/'
            },
            // toLogin(perNo, perPosition, perEmail, perBu1Code, perBu2Code, perBu3Code, comId) {
            //     if (!perNo || perNo === '' || !perPosition || perPosition === '' || !perBu1Code || perBu1Code === '' || !perBu2Code || perBu2Code === '' || !perBu3Code || perBu3Code === '' || !comId || comId === '') {
            //         Cookies.set('perNo', '00000001', {expires: 7, path: '/'});
            //         Cookies.set('perPosition', 'JB001', {expires: 7, path: '/'});
            //         Cookies.set('perBu1Code', '0001', {expires: 7, path: '/'});
            //         Cookies.set('perBu2Code', 'OOA', {expires: 7, path: '/'});
            //         Cookies.set('perBu3Code', 'OOOX', {expires: 7, path: '/'});
            //         Cookies.set('perEmail', 'noelle@example.com', {expires: 7, path: '/'});
            //         Cookies.set('comId', 1, {expires: 7, path: '/'});
            //     } else {
            //         Cookies.set('perNo', perNo, {expires: 7, path: '/'});
            //         Cookies.set('perPosition', perPosition, {expires: 7, path: '/'});
            //         Cookies.set('perBu1Code', perBu1Code, {expires: 7, path: '/'});
            //         Cookies.set('perBu2Code', perBu2Code, {expires: 7, path: '/'});
            //         Cookies.set('perBu3Code', perBu3Code, {expires: 7, path: '/'});
            //         Cookies.set('perEmail', perEmail, {expires: 7, path: '/'});
            //         Cookies.set('comId', comId, {expires: 7, path: '/'});
            //     }
            //     this.getRole();
            //     window.location.href = '/'
            // },
            toLogin() {
                this.$api
                    .get(this.$test ? `/api/?type=personnel&perNo=${this.perNo}` : `/api/iform/personnel&perEmail=${this.perEmail}`)
                    .then(response => {
                        this.roleData = response.data.data;

                        Cookies.set('per', JSON.stringify(this.roleData[0]));
                        this.per =  Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null;
                        // console.log(this.roleData[0].perAccount);
                        // Cookies.set('perNo', this.roleData[0].perNo, {expires: 7, path: '/'});
                        // Cookies.set('perName', this.roleData[0].perName, {expires: 7, path: '/'});
                        // Cookies.set('perPosition', this.roleData[0].perPosition, {expires: 7, path: '/'});
                        // Cookies.set('perPositionName', this.roleData[0].perPositionName, {expires: 7, path: '/'});
                        // Cookies.set('perEmail', this.roleData[0].perEmail, {expires: 7, path: '/'});
                        // Cookies.set('perPhone1', this.roleData[0].perPhone1, {expires: 7, path: '/'});
                        // Cookies.set('perPhone2', this.roleData[0].perPhone2, {expires: 7, path: '/'});
                        // Cookies.set('perPhone3', this.roleData[0].perPhone3, {expires: 7, path: '/'});
                        // Cookies.set('perBu1Code', this.roleData[0].perBu1Code, {expires: 7, path: '/'});
                        // Cookies.set('perBu2Code', this.roleData[0].perBu2Code, {expires: 7, path: '/'});
                        // Cookies.set('perBu3Code', this.roleData[0].perBu3Code, {expires: 7, path: '/'});
                        // Cookies.set('comId', this.roleData[0].comId, {expires: 7, path: '/'});
                        this.getRole();
                        window.location.href = '/'
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            toChangeLogin(perNo, perPosition, perBu1Code){
                const newPer = this.roleData.find(per => per.perNo === perNo && per.perPosition === perPosition && per.perBu1Code === perBu1Code);
                Cookies.set('per', JSON.stringify(newPer));
                this.per =  Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null;
                window.location.href = '/'
            },
            toLogout() {
                Cookies.remove('per');
                window.location.href = '/'
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
            fetchTemplateData() {
                this.$api
                    .get(this.$test ? '/api/?type=template' : '/api/iform/template')
                    .then(response => {
                        this.templateData = response.data.data;
                        const get_temTitle = this.$route.params.tem ? this.templateData.find(item => item.temId === this.$route.params.tem) : null;
                        this.temTitle = get_temTitle ? get_temTitle.temTitle + '-' : '';
                    })
                    .catch(error => {
                        console.error(error);
                    });
                this.$api
                    .get(this.$test ? '/api/?type=company' : '/api/iform/personnel')
                    .then(response => {
                        this.companyData = response.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
                this.$api
                    .get(this.$test ? '/api/?type=work' : '/api/iform/personnel')
                    .then(response => {
                        this.workData = response.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            formatDate(dateString) {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');

                return `${year}-${month}-${day}`;
                // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            },
            formatDateTime(dateString) {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            },
            async getPersonName(company_id, per_no, per_position) {
                this.$api
                    .get(this.$test ? `/api/?type=personnel&comId=${company_id}&perNo=${per_no}&perPosition=${per_position}` : `/api/iform/personnel&perEmail=${this.perEmail}`)
                    .then(response => {
                        const perData = response.data.data;
                        if (perData.length >0) {
                            return perData[0].perName;
                        }
                        else {
                            return '';
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async getPersonPositionName(company_id, per_no, per_position) {
                this.$api
                    .get(this.$test ? `/api/?type=personnel&comId=${company_id}&perNo=${per_no}&perPosition=${per_position}` : `/api/iform/personnel&perEmail=${this.perEmail}`)
                    .then(response => {
                        const perData = response.data.data;
                        if (perData.length >0) {
                            return perData[0].perPositionName;
                        }
                        else {
                            return '';
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async getPersonDepartment(company_id, per_no, per_position) {
                this.$api
                    .get(this.$test ? `/api/?type=personnel&comId=${company_id}&perNo=${per_no}&perPosition=${per_position}` : `/api/iform/personnel&perEmail=${this.perEmail}`)
                    .then(response => {
                        const perData = response.data.data;
                        if (perData.length >0) {
                            return perData[0].perBu2;
                        }
                        else {
                            return '';
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async getPersonBranch(company_id, per_no, per_position) {
                this.$api
                    .get(this.$test ? `/api/?type=personnel&comId=${company_id}&perNo=${per_no}&perPosition=${per_position}` : `/api/iform/personnel&perEmail=${this.perEmail}`)
                    .then(response => {
                        const perData = response.data.data;
                        if (perData.length >0) {
                            return perData[0].perBu3;
                        }
                        else {
                            return '';
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async getPersonPhone(company_id, per_no, per_position) {
                this.$api
                    .get(this.$test ? `/api/?type=personnel&comId=${company_id}&perNo=${per_no}&perPosition=${per_position}` : `/api/iform/personnel&perEmail=${this.perEmail}`)
                    .then(response => {
                        const perData = response.data.data;
                        if (perData.length >0) {
                            return perData[0].perPhone2 + ' ' + perData[0].perPhone3;
                        }
                        else {
                            return '';
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
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
