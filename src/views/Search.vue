<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">查詢作業</h4>
            </li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <div class="row mb-2">
                            <div class="col-2">
                                <label class="row-label row-title">計劃書名稱</label>
                                <input type="text"
                                       class="row-text"
                                       style="background-color: white;"
                                       v-model="keyword"
                                       placeholder="請輸入搜尋關鍵字">
                            </div>
                            <div class="col-2">
                                <label class="row-label row-title">搜尋計畫書</label>
                                <div class="row-text">
                                    <input class="form-check-input" type="checkbox" style="margin-right: 5px;"
                                           v-model="search_contract"
                                           value="1" id="cbx_contract">
                                    <label class="form-check-label"
                                           for="cbx_contract">計畫書</label>
                                </div>
                            </div>
                            <div class="col-2">
                                <label class="row-label row-title">搜尋費用</label>
                                <div class="row-text">
                                    <input class="form-check-input" type="checkbox" style="margin-right: 5px;"
                                           v-model="search_apportion"
                                           value="1" id="cbx_apportion">
                                    <label class="form-check-label"
                                           for="cbx_apportion">費用</label>
                                </div>
                            </div>
                            <div class="col-2">
                                <label class="row-label row-title">維運公司：</label>
                                <select class="row-text" v-model="comCode">
                                    <option value="">請選擇</option>
                                    <template v-for="com in companyData">
                                        <option :value="com.comCode">{{ com.comTitle }}</option>
                                    </template>
                                </select>
                            </div>
                            <div class="col-2">
                                <label class="row-label row-title">框架類型：</label>
                                <select class="row-text" v-model="frmId">
                                    <option value="">請選擇</option>
                                    <template v-for="frm in frameData">
                                        <option :value="frm.frmId">{{ frm.frmTitle }}</option>
                                    </template>
                                </select>
                            </div>
                            <div class="col-2">
                                <label class="row-label row-title">狀態：</label>
                                <select class="row-text" v-model="status">
                                    <option value="">請選擇</option>
                                        <option value="0">草稿</option>
                                        <option value="1">簽核中</option>
                                        <option value="3">已歸檔</option>
                                </select>
                            </div>

                            <div class="col-12" style="margin-top: 5px; text-align: right;">
                                <button type="button" @click="searchData"
                                        class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">查詢
                                </button>
                            </div>
                        </div>
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
                                    @click="0 === parseInt(con.Type) ? $router.push(`/search_contract/${con.conId}`) : $router.push(`/search_apportion/${con.appId}`)">
                                    <td scope="row">
                                        <template v-if="0 === parseInt(con.Type) && 0 <= parseInt(con.conApp)">
                                            <span class="sp-contract">共用計畫書</span>
                                            <span class="sp-apportion">分攤明細表</span>
                                        </template>
                                        <template v-else>
                                            <template v-if="0 === parseInt(con.Type)"><span
                                                    class="sp-contract">共用計畫書</span></template>
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
        name: 'Search',
        mixins: [contractActionMixin],
        data() {
            return {
                per: Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null,
                contractData: [],
                companyData: [],
                frameData:[],
                keyword:'',
                search_contract:'',
                search_apportion:'',
                comCode:'',
                frmId:'',
                status:'',

            };
        },
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                },
                immediate: true,
            }
        },
        methods: {
            defaultData() {
                this.fetchFirst();
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=company` : `/api/adm/company`),
                    this.$api.get(this.$test ? `/api/?type=frame` : `/api/adm/frame`),
                    this.$api.get(this.$test ? `/api/?type=template&temId=${this.$route.params.tem}` : `/api/iform/template/${this.$route.params.tem}`),
                ];
                Promise.all(apiRequests)
                    .then(([companyResponse, frameResopnse, templateResponse]) => {
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //frameResopnse
                        this.frameData = frameResopnse.data.data;
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async searchData() {
                try {
                    const contractPayload = {
                        perKey: this.per.perKey,
                        perBu1Code: this.per.perBu1Code,
                        perBu2Code: this.per.perBu2Code,
                        perBu3Code: this.per.perBu3Code,
                        memView: 1,
                        keyword:this.keyword,
                        status: this.status,
                        contract_search:this.search_contract ? 1 : 0,
                        apportion_search:this.search_apportion ? 1 : 0,
                        comCode:this.comCode,
                        frmId:this.frmId,
                    };
                    const contractResponse = await this.$api.get(this.$test ? `/api/?type=search` : `/api/adm/contract/List`, {params: contractPayload});
                    console.log(contractResponse.data.data);
                    this.contractData = contractResponse.data.data;
                } catch (error) {
                    console.error(error);
                }
            },
        },
    };
</script>

<style scoped>
    li {
        list-style: none;
    }
</style>
