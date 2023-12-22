<template>
    <section class="section">
        <!-- breadcrumb -->
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">首頁</h4>
            </li>
            <!-- <li class="breadcrumb-item">
              <a href="index.html">
                <i data-feather="home"></i></a>
            </li>
            <li class="breadcrumb-item active">Dashboard</li> -->
        </ul>
        <!-- breadcrumb -->
        <!-- 主要內容 -->
        <div class="row ">
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <!-- <div class="card-icon card-icon-large"><i class="fa fa-award"></i></div> -->
                        <div class="card-content" style="color: #6c757d;">
                            <span class="myFont18">
                                <router-link :to="`/review`">待簽核文件</router-link>
                            </span>
                            <h4 class="card-title" style="color: red;">{{ contractData.length }}份</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <!-- <div class="card-icon card-icon-large"><i class="fa fa-briefcase"></i></div> -->
                        <div class="card-content" style="color: #6c757d;">
                            <span class="myFont18">
                                <router-link :to="`/paper/1`">簽核中文件</router-link>
                            </span>
                            <h4 class="card-title" style="color: orange;">{{ contractSignData.length }}份</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <!-- <div class="card-icon card-icon-large"><i class="fa fa-globe"></i></div> -->
                        <div class="card-content" style="color: #6c757d;">
                            <span class="myFont18">
                                <router-link :to="`/paper/3`">歸檔文件</router-link>
                            </span>
                            <h4 class="card-title" style="color: green;">{{ contractOverData.length }}份</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <div class="card-content" style="color: #6c757d;">
                            <span class="myFont18">
                                <router-link :to="`/paper/0`">草稿文件</router-link>
                            </span>
                            <h4 class="card-title" style="color: green;">{{ contractDraftData.length }}份</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- 公告 -->
            <div v-if="newsData.length > 0" class="col-12 myRwd">
                <div class="card">
                    <div class="card-header">
                        <vue-feather type="volume-2"></vue-feather>
                        <span style="margin-left: 10px; font-weight:bold;font-size: 17px;color: black;">
                            公告
                        </span>
                    </div>
                    <div class="card-body myNotification table-responsive">
                        <table class="newTable">
                            <thead style="position: sticky;top: 0;" class="myNew">
                            <tr>
                                <th scope="col">標題</th>
                                <th scope="col">發布日期</th>
                            </tr>
                            </thead>
                            <tbody class="exTable">
                            <tr v-for="nws in newsData" @click="$router.push(`/announcement/sl/${nws.nwsId}`)">
                                <td scope="row">
                                    <span v-if="'1' === nws.nwsType" class="badge badge-secondary">一般</span>
                                    <span v-if="'2' === nws.nwsType" class="badge badge-success">提醒</span>
                                    <span v-if="'3' === nws.nwsType" class="badge badge-primary">重要</span>
                                    <span v-if="'4' === nws.nwsType" class="badge badge-info">好康</span>
                                    <span v-if="'5' === nws.nwsType" class="badge badge-danger">緊急</span>
                                    {{ nws.nwsTitle }}
                                </td>
                                <td>{{ this.$root.formatDate(nws.nwsRelease)}}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 公告 -->
            <!-- 待簽文件 -->
            <div class="col-12 myRwd myPadding">
                <div class="card">
                    <div class="card-header">
                        <vue-feather type="edit-3"></vue-feather>
                        <span style="margin-left: 10px; font-weight:bold;font-size: 17px;color: black;">
                            待簽核文件
                        </span>
                    </div>
                    <div class="card-body myNotification table-responsive">
                        <table class="newTable">
                            <thead style="position: sticky;top: 0;" class="myNew">
                            <tr>
                                <th scope="col" style="min-width: 110px;">表單類型</th>
                                <th scope="col">序號</th>
                                <th scope="col">共用計畫書名稱</th>
                                <th scope="col">創文日期</th>
                            </tr>
                            </thead>
                            <tbody class="exTable">
                            <tr v-for="con in contractData"
                                @click="$router.push(`/review_contract/${con.conId}`)">
                                <td>
                                    <template v-if="0 === parseInt(con.Type) && 0 <= parseInt(con.conApp)">
                                        <span class="sp-contract">共用計畫書</span>
                                        <span class="sp-apportion">分攤明細表</span>
                                    </template>
                                    <template v-else>
                                        <template v-if="0 === parseInt(con.Type)"><span class="sp-contract">共用計畫書</span></template>
                                        <template v-else><span class="sp-apportion">分攤明細表</span></template>
                                    </template>
                                </td>
                                <td>
                                    {{ con.conSerial }}{{ con.conVer }}
                                </td>
                                <td>
                                    {{ con.conTitle }}
                                    <span class="sp-note">- {{ 0 === parseInt(con.Type) ? con.temTitle : con.appYear + con.temExes }}</span>
                                </td>
                                <td>
                                    <template v-if="0 === parseInt(con.Type) && 0 <= parseInt(con.conApp)">
                                        {{ this.$root.formatDateTime(con.conCreateTime)}}
                                    </template>
                                    <template v-else>
                                        {{ 0 === parseInt(con.Type) ? this.$root.formatDateTime(con.conCreateTime) : this.$root.formatDateTime(con.appCreateTime)}}
                                    </template>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-12 myRwd myPadding">
                <div class="card">
                    <div class="card-header">
                        <vue-feather type="award"></vue-feather>
                        <span style="margin-left: 10px; font-weight:bold;font-size: 17px;color: black;">
                            申請作業
                        </span>
                    </div>
                    <div class="card-body myNotification table-responsive">
                        <table class="newTable">
                            <thead style="position: sticky;top: 0;" class="myNew">
                            <tr>
                                <th scope="col" style="min-width: 110px;">表單類型</th>
                                <th scope="col">序號</th>
                                <th scope="col">共用計畫書名稱</th>
                                <th scope="col">狀態</th>
                                <th scope="col">創文日期</th>
                            </tr>
                            </thead>
                            <tbody class="exTable">
                            <tr v-for="con in contractOwnerData"
                                @click="$router.push(`/contract/sl/${con.conId}`)">
                                <td>
                                    <template v-if="0 === parseInt(con.Type) && 0 <= parseInt(con.conApp)">
                                        <span class="sp-contract">共用計畫書</span>
                                        <span class="sp-apportion">分攤明細表</span>
                                    </template>
                                    <template v-else>
                                        <template v-if="0 === parseInt(con.Type)"><span class="sp-contract">共用計畫書</span></template>
                                        <template v-else><span class="sp-apportion">分攤明細表</span></template>
                                    </template>
                                </td>
                                <td>
                                    {{ con.conSerial }}{{ con.conVer }}
                                </td>
                                <td>
                                    {{ con.conTitle }}
                                    <span class="sp-note">- {{ 0 === parseInt(con.Type) ? con.temTitle : con.appYear + con.temExes }}</span>
                                </td>
                                <td>
                                    <template v-if="con.Status === '-1'">建置中</template>
                                    <template v-if="con.Status === '0'">草稿</template>
                                    <template v-if="con.Status === '1'">簽核中</template>
                                    <template v-if="con.Status === '2'">退回</template>
                                    <template v-if="con.Status === '3'">已歸檔</template>
                                    <template v-if="con.Status === '4'">撤回</template>
                                </td>
                                <td>
                                    <template v-if="0 === parseInt(con.Type) && 0 <= parseInt(con.conApp)">
                                        {{ this.$root.formatDateTime(con.conCreateTime)}}
                                    </template>
                                    <template v-else>
                                        {{ 0 === parseInt(con.Type) ? this.$root.formatDateTime(con.conCreateTime) : this.$root.formatDateTime(con.appCreateTime)}}
                                    </template>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 待簽文件 -->

        </div>

        <!-- 主要內容 -->
    </section>
</template>

<script>
    import Cookies from 'js-cookie'

    export default {
        name: "Home",
        data() {
            return {
                per: JSON.parse(Cookies.get('per')),
                newsData: [],
                companyData: [//公司
                    // {comId: 0, comTitle: '', comCode: ''},
                ],
                contractData: [],//待簽文件
                contractSignData: [],//簽核中文件
                contractOverData: [],//已完成文件
                contractDraftData: [],//草稿文件
                contractOwnerData: [],//申請作業
            };
        },
        computed: {},
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            }
        },
        mounted() {
            this.defaultData();
            this.fetchFirst();
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                if (this.per) {
                    // this.companyData = this.$root.getCompanyData();
                    const apiRequests = [
                        this.$api.get(this.$test ? '/api/?type=news' : '/api/iform/news'),
                        this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                        // contractResponse 待簽文件
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {
                            params: {
                                action: 1,
                                status: 1,
                                perKey: this.per.perKey,
                                perBu1Code: this.per.perBu1Code,
                                memView:1,
                                memSign:1
                            }
                        }),
                        //contractSignResponse 簽核中文件
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {
                            params: {
                                action: 1,
                                status: 1,
                                perKey: this.per.perKey,
                                perBu1Code: this.per.perBu1Code,
                                memOwner:1
                            }
                        }),
                        // contractOverResponse 已完成文件
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {
                            params: {
                                action: 1,
                                status: 3,
                                perKey: this.per.perKey,
                                perBu1Code: this.per.perBu1Code,
                                memOwner:1,
                            }
                        }),
                        // contractDraftResponse 草稿文件
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {
                            params: {
                                action: 1,
                                status: 0,
                                perKey: this.per.perKey,
                                perBu1Code: this.per.perBu1Code,
                                memDraft:1,
                                memOwner:1
                            }
                        }),
                        // contractOwnerResponse 申請作業
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {
                            params: {
                                action: 1,
                                status: 1,
                                perKey: this.per.perKey,
                                perBu1Code: this.per.perBu1Code,
                                memOwner:1,
                            }
                        }),
                    ];
                    Promise.all(apiRequests)
                        .then(([newsResponse, companyResponse, contractResponse, contractSignResponse, contractOverResponse, contractDraftResponse, contractOwnerResponse]) => {
                            //newsResponse
                            this.newsData = newsResponse.data.data;
                            // companyResponse
                            this.companyData = companyResponse.data.data;
                            // contractResponse 待簽文件
                            this.contractData = contractResponse.data.data;
                            //contractSignResponse 簽核中文件
                            this.contractSignData = contractSignResponse.data.data;
                            // contractOverResponse 已完成文件
                            this.contractOverData = contractOverResponse.data.data;
                            // contractDraftResponse 草稿文件
                            this.contractDraftData = contractDraftResponse.data.data;
                            // contractOwnerResponse 申請作業
                            this.contractOwnerData = contractOwnerResponse.data.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            },
        },
    }
</script>

<style scoped>
    a {
        color: #33cc66;
        font-weight: 500;
        transition: all .5s;
        text-decoration: none;
    }
    a:hover {
        color: #009966;
    }

</style>