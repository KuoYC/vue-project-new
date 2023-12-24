<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">簽核管理</h4>
            </li>
            <li class="breadcrumb-item">待簽核文件</li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <div class="table-responsive">
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
                                        @click="0 === parseInt(con.Type) ? $router.push(`/review_contract/${con.conId}`) : $router.push(`/review_apportion/${con.appId}`)">
                                        <td scope="row">
                                            <template v-if="0 === parseInt(con.Type)">
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
                                            <span class="sp-note">- {{ 0 === parseInt(con.Type) ? con.temTitle : con.appYear + con.temExes }}</span>
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
        </div>
    </section>
</template>

<script>
    import Cookies from 'js-cookie'

    export default {
        name: 'Review',
        data() {
            return {
                per: Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null,
                contractData: [],
            };
        },
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.searchType = 0;
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            }
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=contract` : `/api/adm/contract`, {
                        params: {
                            action: 1,
                            status: 1,
                            perKey: this.per.perKey,
                            perBu1Code: this.per.perBu1Code,
                            memView: 1,
                            memSign: 1,
                            mark:0,
                            inh:0,
                        }
                    }),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse]) => {
                        //contractResponse
                        this.contractData = contractResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
        },
    };
</script>

<style scoped>
    li {
        list-style: none;
    }
</style>
