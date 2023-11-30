<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">簽核管理</h4>
            </li>
            <li class="breadcrumb-item">待簽文件</li>
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
                                <tr v-for="con in contractData"
                                    @click="$router.push(`/review/sl/${con.conId}`)">
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
                            conStatus: 1,
                            perKey: this.per.perKey,
                            perBu1Code: this.per.perBu1Code,
                            memView: 1,
                            memSign: 1,
                            conMark:0,
                            conInh:0,
                        }
                    }),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, templateResponse]) => {
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
