<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">表單申請</h4>
            </li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <ul class="nav nav-pills p-3 mb-3 rounded-pill align-items-center">
                            <li class="nav-item">
                                <router-link :to="`/contract/up/0`"
                                             class="d-flex btn btn-outline-success btn-border-radius align-items-center" style="margin-right: 10px; font-weight: 400;">
                                    <vue-feather type="table" size="16" style="padding-right: 2px;"></vue-feather>
                                    <span class="d-md-block">新增表單</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="`/apportion/up/0`"
                                             class="d-flex btn btn-outline-success btn-border-radius align-items-center" style="margin-right: 10px; font-weight: 400;">
                                    <vue-feather type="dollar-sign" size="16" style="padding-right: 2px;"></vue-feather>
                                    <span class="d-md-block">新增費用</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="`/paper`"
                                             :class="`${searchType !== 0 && searchType !== 1 && searchType !== 3 ? 'btn-success' : 'btn-outline-success'} d-flex btn  btn-border-radius align-items-center`"
                                             style="margin-right: 10px; font-weight: 400; border-radius:20px;"
                                             id="all-category">
                                    <vue-feather type="check-circle" size="16" style="padding-right: 2px;"></vue-feather>
                                    <span class="d-md-block">所有文件</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="`/paper/0`"
                                             :class="`${searchType === 0 ? 'btn-success' : 'btn-outline-success'} d-flex btn  btn-border-radius align-items-center`"
                                             style="margin-right: 10px; font-weight: 400; border-radius:20px;"
                                             id="note-work">
                                    <vue-feather type="briefcase" size="16" style="padding-right: 2px;"></vue-feather>
                                    <span class="d-md-block">草稿</span></router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="`/paper/1`"
                                             :class="`${searchType === 1 ? 'btn-success' : 'btn-outline-success'} d-flex btn  btn-border-radius align-items-center`"
                                             style="margin-right: 10px; font-weight: 400; border-radius:20px;"
                                             id="note-family">
                                    <vue-feather type="users" size="16" style="padding-right: 2px;"></vue-feather>
                                    <span class="d-md-block">簽核中</span></router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="`/paper/3`"
                                             :class="`${searchType === 3 ? 'btn-success' : 'btn-outline-success'} d-flex btn  btn-border-radius align-items-center`"
                                             style="margin-right: 10px; font-weight: 400; border-radius:20px;"
                                             id="note-important">
                                    <vue-feather type="star" size="16" style="padding-right: 2px;"></vue-feather>
                                    <span class="d-md-block">已歸檔</span></router-link>
                            </li>
                        </ul>
                        <div class="table-responsive">
                            <table class="newTable">
                                <thead class="myNew">
                                <tr>
                                    <th scope="col" style="min-width: 200px;">表單類型</th>
                                    <th scope="col" style="min-width: 500px;">共用計畫書名稱</th>
                                    <th scope="col" style="min-width: 220px;">管理維運公司</th>
                                    <th scope="col" style="min-width: 80px;">狀態</th>
                                    <th scope="col" style="min-width: 200px;">序號</th>
                                    <!--<th scope="col">操作</th>-->
                                </tr>
                                </thead>
                                <tbody class="exTable">
                                <tr v-for="con in contractData"
                                    @click="0 === parseInt(con.Type) ? $router.push(`/contract/sl/${con.conId}`) : $router.push(`/apportion/sl/${con.appId}`)">
                                    <td scope="row">
                                        <template v-if="0 === parseInt(con.Type) && 0 <= parseInt(con.conApp)">
                                            <span class="sp-contract">共用計畫書</span>
                                            <span class="sp-apportion">分攤明細表</span>
                                        </template>
                                        <template v-else>
                                            <template v-if="0 === parseInt(con.Type)"><span class="sp-contract">共用計畫書</span></template>
                                            <template v-else><span class="sp-apportion">分攤明細表</span></template>
                                        </template>
                                    </td>
                                    <td scope="row">
                                        {{ con.conTitle }}
                                        <span class="sp-note">- {{ 0 === parseInt(con.Type) ? con.temTitle : con.temExes }}</span>
                                    </td>
                                    <td>{{ con.comTitle + '/' + con.perBu2 + '/' + con.perBu3}}</td>
                                    <td>
                                        <template v-if="'0' === con.Status">草稿</template>
                                        <template v-if="'1' === con.Status">
                                            <template v-if="'1' === con.memSign">待簽核</template>
                                            <template v-else>簽核中</template>
                                        </template>
                                        <template v-if="'2' === con.Status">退件</template>
                                        <template v-if="'3' === con.Status">已歸檔</template>
                                        <template v-if="'4' === con.Status">撤案</template>
                                    </td>
                                    <td>
                                        {{ con.conSerial }}{{ con.conVer }}
                                    </td>
                                    <!--<td scope="col">-->
                                    <!--<template v-if="con.perKey === per.perKey">-->
                                    <!--<template v-if="'3' === con.conStatus">-->
                                    <!--<button type="button" @click="contractActionTo('ch', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-info btn-border-radius waves-effect myFont16">-->
                                    <!--變更-->
                                    <!--</button>-->
                                    <!--<button type="button" @click="contractActionTo('tp', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">-->
                                    <!--終止-->
                                    <!--</button>-->
                                    <!--</template>-->
                                    <!--<template v-if="'0' === con.conStatus || '1' === con.conStatus">-->
                                    <!--<button type="button" @click="contractActionTo('ot', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">-->
                                    <!--撤案-->
                                    <!--</button>-->
                                    <!--</template>-->
                                    <!--</template>-->
                                    <!--<button type="button" @click="contractActionTo('sl', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">-->
                                    <!--查閱-->
                                    <!--</button>-->
                                    <!--<template v-if="con.perKey === per.perKey">-->
                                    <!--<template v-if="'0' === con.conStatus">-->
                                    <!--<button type="button" @click="contractActionTo('up', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">-->
                                    <!--修正-->
                                    <!--</button>-->
                                    <!--<button type="button" @click="contractActionTo('dl', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">-->
                                    <!--刪除-->
                                    <!--</button>-->
                                    <!--</template>-->
                                    <!--<template v-if="'2' === con.conStatus">-->
                                    <!--<button type="button" @click="contractActionTo('dl', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">-->
                                    <!--刪除-->
                                    <!--</button>-->
                                    <!--</template>-->
                                    <!--</template>-->
                                    <!--</td>-->
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Cookies from 'js-cookie'
    import {contractActionMixin} from '@/mixins/contractActionMixin.js';

    export default {
        name: 'Paper',
        mixins: [contractActionMixin],
        data() {
            return {
                per: Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null,
                contractData: [],
                templateData: [],
                searchType: parseInt(this.$route.params.type),
            };
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
        methods: {
            defaultData() {
                this.searchType = parseInt(this.$route.params.type);
            },
            fetchFirst() {
                const contractPayload = {
                    action: 1,
                    // temId: this.$route.params.tem,
                    perKey: this.per.perKey,
                    perBu1Code: this.per.perBu1Code,
                    memOwner: 1,
                    status: this.searchType === 0 || this.searchType === 1 || this.searchType === 3 ? this.searchType : null,
                };

                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=contract` : `/api/adm/contract`, {params: contractPayload}),
                    this.$api.get(this.$test ? `/api/?type=template&temId=${this.$route.params.tem}` : `/api/iform/template/${this.$route.params.tem}`),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, templateResponse]) => {
                        //contractResponse
                        this.contractData = contractResponse.data.data;
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async getContractList(search_type) {
                this.searchType = search_type;
                try {
                    const contractPayload = {
                        action: 1,
                        perKey: this.per.perKey,
                        perBu1Code: this.per.perBu1Code,
                        memOwner: 1,
                        status: this.searchType === -1 ? null : this.searchType,
                    };

                    const contactResponse = await this.$api.get(this.$test ? `/api/?type=contract` : `/api/adm/contract/List`, {params: contractPayload});
                    console.log(contactResponse.data.data);
                    this.contractData = contactResponse.data.data;
                } catch (error) {
                    console.error(error);
                }
            },
            createContract() {
                this.$router.push(`/contract/${this.$route.params.tem}/ad`);
            }
        },
    };
</script>

<style scoped>
    li {
        list-style: none;
    }
</style>
