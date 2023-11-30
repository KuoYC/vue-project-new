<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">表單申請</h4>
            </li>
            <li class="breadcrumb-item">{{ templateData.temTitle }}</li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <div class="table-responsive">
                            <table class="newTable">
                                <thead class="myNew">
                                <tr>
                                    <th scope="col" style="min-width: 500px;">共用計畫書名稱</th>
                                    <th scope="col" style="min-width: 220px;">管理維運公司</th>
                                    <th scope="col" style="min-width: 80px;">狀態</th>
                                    <th scope="col" style="min-width: 200px;">序號</th>
                                    <!--<th scope="col">操作</th>-->
                                </tr>
                                </thead>
                                <tbody class="exTable">
                                <tr v-for="con in contractData" @click="$router.push(`/contract/${con.temId}/sl/${con.conId}`)">
                                    <td scope="row">
                                        {{ con.conTitle }}
                                    </td>
                                    <td>{{ con.comTitle + '/' + con.perBu2 + '/' + con.perBu3}}</td>
                                    <td>
                                        <template v-if="'0' === con.conStatus">草稿</template>
                                        <template v-if="'1' === con.conStatus">
                                            <template v-if="'1' === con.memSign">待簽核</template>
                                            <template v-else>簽核中</template>
                                        </template>
                                        <template v-if="'2' === con.conStatus">退件</template>
                                        <template v-if="'3' === con.conStatus">已歸檔</template>
                                        <template v-if="'4' === con.conStatus">撤案</template>
                                    </td>
                                    <td>
                                        {{ con.conSerial }}{{ con.conVer }}
                                    </td>
                                    <!--<td scope="col">-->
                                    <!--<template v-if="con.perKey === per.perKey">-->
                                    <!--<template v-if="'3' === con.conStatus">-->
                                    <!--<button type="button" @click="actionTo('ch', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-info btn-border-radius waves-effect myFont16">-->
                                    <!--變更-->
                                    <!--</button>-->
                                    <!--<button type="button" @click="actionTo('tp', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">-->
                                    <!--終止-->
                                    <!--</button>-->
                                    <!--</template>-->
                                    <!--<template v-if="'0' === con.conStatus || '1' === con.conStatus">-->
                                    <!--<button type="button" @click="actionTo('ot', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">-->
                                    <!--撤案-->
                                    <!--</button>-->
                                    <!--</template>-->
                                    <!--</template>-->
                                    <!--<button type="button" @click="actionTo('sl', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">-->
                                    <!--查閱-->
                                    <!--</button>-->
                                    <!--<template v-if="con.perKey === per.perKey">-->
                                    <!--<template v-if="'0' === con.conStatus">-->
                                    <!--<button type="button" @click="actionTo('up', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">-->
                                    <!--修正-->
                                    <!--</button>-->
                                    <!--<button type="button" @click="actionTo('dl', con.conId)"-->
                                    <!--class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">-->
                                    <!--刪除-->
                                    <!--</button>-->
                                    <!--</template>-->
                                    <!--<template v-if="'2' === con.conStatus">-->
                                    <!--<button type="button" @click="actionTo('dl', con.conId)"-->
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

    export default {
        name: 'Search',
        data() {
            return {
                per: Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null,
                contractData: [],
                templateData: [],
                searchType: 0,
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
                const contractPayload = {
                    action: 0,
                    temId: this.$route.params.tem,
                    perKey: this.per.perKey,
                    perBu1Code: this.per.perBu1Code,
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
                if (3 === this.searchType) {
                    try {
                        const contractPayload = {
                            temId: this.$route.params.tem,
                            perKey: this.per.perKey,
                            perBu1Code: this.per.perBu1Code,
                            conStatus: 0,
                        };

                        const contactResponse = await this.$api.get(this.$test ? `/api/?type=contract` : `/api/adm/contract/List`, {params: contractPayload});
                        console.log(contactResponse.data.data);
                        this.contractData = contactResponse.data.data;
                    } catch (error) {
                        console.error(error);
                    }
                }
                else {
                    try {
                        const contractPayload = {
                            action: this.searchType,
                            temId: this.$route.params.tem,
                            perKey: this.per.perKey,
                            perBu1Code: this.per.perBu1Code,
                        };

                        const contactResponse = await this.$api.get(this.$test ? `/api/?type=contract` : `/api/adm/contract/List`, {params: contractPayload});
                        console.log(contactResponse.data.data);
                        this.contractData = contactResponse.data.data;
                    } catch (error) {
                        console.error(error);
                    }
                }

            },
            actionTo(action, conId) {
                if (action === 'sl') {
                    this.$router.push(`/contract/${this.$route.params.tem}/sl/${conId}`);
                } else if (action === 'up') {
                    this.$router.push(`/contract/${this.$route.params.tem}/up/${conId}`);
                } else if (action === 'dl') {
                    this.$api
                        .delete(this.$test ? '/api/?type=contract' : '/api/iform/contract'
                            , {params: {conId: conId}})
                        .then(response => {
                            console.log(response.data);
                            if (response.status === 200) {
                                this.$router.go(0);
                            } else {
                                console.log('err');
                            }
                            console.log('Edit successful:', response.data);
                        })
                        .catch(error => {
                            console.error('Edit failed:', error);
                        });
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
