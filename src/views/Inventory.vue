<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">資訊共用計畫書清冊</h4>
            </li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <!--
                        <ul class="nav nav-pills p-3 mb-3 rounded-pill align-items-center">
                            <li class="nav-item">
                                <router-link :to="'/info/work/ad'"
                                             class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2">
                                    <vue-feather type="plus" stroke="red"></vue-feather>
                                    <span class="d-md-block" style="color: red;">新增作業種類</span>
                                </router-link>
                            </li>
                        </ul>
                        -->
                        <div class="table-responsive">
                            <table class="newTable" id="exportTable">
                                <thead style="position: sticky;top: 0;" class="myNew">
                                <tr>
                                    <th rowspan="2" style="min-width: 150px;">序號</th>
                                    <th rowspan="2" style="min-width: 100px;">維運公司</th>
                                    <th rowspan="2" style="min-width: 100px;">負責單位</th>
                                    <th rowspan="2" style="min-width: 100px;">申請類別</th>
                                    <th rowspan="2" style="min-width: 150px;">計畫框架</th>
                                    <th rowspan="2" style="min-width: 200px;">計畫名稱</th>
                                    <th :colspan="workData.length">作業項目</th>
                                    <th :colspan="companyData.length">使用公司</th>
                                    <th rowspan="2" style="min-width: 130px;">費用攤提第一年</th>
                                    <th rowspan="2" style="min-width: 130px;">費用攤提最後年</th>
                                </tr>
                                <tr>
                                    <th v-for="wor in workData">{{ wor.worTitle }}</th>
                                    <th v-for="com in companyData">{{ com.comTitle }}</th>
                                </tr>

                                </thead>
                                <tbody>
                                <tr v-for="con in contractData" :key="con.conId">
                                    <td>{{ con.conSerial }}{{ con.conVer }}</td>
                                    <td>{{ con.comTitle }}</td>
                                    <td>{{ con.perBu3 }}</td>
                                    <td>
                                        <template v-if="0 === parseInt(con.conType)">新增</template>
                                        <template v-if="1 === parseInt(con.conType)">變更</template>
                                        <template v-if="2 === parseInt(con.conType)">終止</template>
                                    </td>
                                    <td>{{ con.frmTitle }}</td>
                                    <td>{{ con.conTitle }}</td>
                                    <td v-for="wor in workData" style="min-width: 50px;">
                                        <template v-if="con.conWork.includes(parseInt(wor.worId))">
                                            V
                                        </template>
                                        <template v-else></template>
                                    </td>
                                    <td v-for="com in companyData" style="min-width: 100px;">
                                        <template v-if="con.conCompany.includes(com.comCode)">
                                            V
                                        </template>
                                        <template v-else></template>
                                    </td>
                                    <td>{{ con.conFirst }}</td>
                                    <td>{{ con.conLast }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="exportExcel" type="button"
                class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">
            Excel
        </button>
    </section>
</template>

<script>
    export default {
        name: "Inventory",
        data() {
            return {
                contractData: [],
                companyData:[],
                workData:[],
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
        mounted() {
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=inventory' : '/api/iform/work'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/work'),
                    this.$api.get(this.$test ? '/api/?type=work' : '/api/iform/work'),
                ];
                Promise.all(apiRequests)
                    .then(([inventoryResponse, companyResponse, workResponse]) => {
                        //inventoryResponse
                        this.contractData = inventoryResponse.data.data;
                        this.contractData.forEach(con=>{
                            con.conWork = con.conWork.split('|').map(Number);
                            con.conCompany = con.conCompany.split('|');
                        });
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //workResponse
                        this.workData = workResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            exportExcel(){
                const table = document.getElementById('exportTable');
                const tableHTML = table.outerHTML;

                const downloadLink = document.createElement('a');
                const blob = new Blob([tableHTML], {type: 'application/vnd.ms-excel'});
                const url = URL.createObjectURL(blob);

                downloadLink.href = url;
                downloadLink.download = 'inventory.xls';
                downloadLink.click();

                URL.revokeObjectURL(url);
            },
        },
    }
</script>

<style scoped>

</style>