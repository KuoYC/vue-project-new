<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">年度費用分攤明細</h4>
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
                                <caption>年度費用分攤明細</caption>
                                <template v-for="data in contractData.company">
                                    <template v-if="data.frame.length && data.frame[0].exes.length > 0">
                                        <thead style="position: sticky;top: 0;" class="myNew">
                                        <tr>
                                            <th scope="row" style="min-width: 200px;">管理維運公司：{{ data.comTitle}}</th>
                                            <th scope="row"
                                                :colspan="5+workData.length+contractData.years.length+companyData.length+companyData.length-1">
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="row" rowspan="2" style="min-width: 150px;">計畫框架</th>
                                            <th scope="row" rowspan="2" style="min-width: 200px;">計畫名稱</th>
                                            <th scope="row" :colspan="workData.length">作業項目</th>
                                            <th scope="row" rowspan="2" style="min-width: 100px;">作業項目</th>
                                            <th scope="row" rowspan="2" style="min-width: 150px;">費用分攤原則</th>
                                            <th scope="row" :colspan="contractData.years.length">各年度費用</th>
                                            <th scope="row" rowspan="2" v-for="com in companyData"
                                                style="min-width: 140px;">{{
                                                com.comTitle }}<br>分攤費用
                                            </th>
                                            <th scope="row" :colspan="companyData.length">使用公司</th>
                                            <th scope="row" rowspan="2" style="min-width: 100px;">負責單位</th>
                                        </tr>
                                        <tr>
                                            <th scope="row" v-for="wor in workData" style="min-width: 50px;">{{
                                                wor.worTitle }}
                                            </th>
                                            <th scope="row" v-for="year in contractData.years">{{ year }}</th>
                                            <th scope="row" v-for="com in companyData" style="min-width: 50px;">{{
                                                com.comTitle }}
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <template v-for="frm in data.frame">
                                            <template v-if="frm.exes.length > 0">
                                                <template v-for="(exe, idx) in frm.exes">
                                                    <tr>
                                                        <td v-if="0 === idx" :rowspan="frm.exes.length">{{ frm.frmTitle
                                                            }}
                                                        </td>
                                                        <td>{{ exe.conTitle}}</td>
                                                        <td v-for="wor in workData">
                                                            <template v-if="exe.worId.includes(parseInt(wor.worId))">
                                                                V
                                                            </template>
                                                            <template v-else></template>
                                                        </td>
                                                        <td>{{ exe.iteTitle}}</td>
                                                        <td>{{ exe.disTitle}}</td>
                                                        <template v-for="year in contractData.years">
                                                            <td>
                                                                <template v-for="ann in exe.annual">
                                                                    <template
                                                                            v-if="parseInt(ann.annYear) === parseInt(year)">
                                                                        {{
                                                                        ann.annSum }}
                                                                    </template>
                                                                </template>
                                                            </td>
                                                        </template>
                                                        <template v-for="com in companyData">
                                                            <td>
                                                                <template v-for="sub in exe.subsidiary">
                                                                    <template v-if="sub.comCode === com.comCode">
                                                                        {{ sub.subSum }}
                                                                    </template>
                                                                </template>
                                                            </td>
                                                        </template>
                                                        <td v-for="com in companyData" style="min-width: 50px;">
                                                            <template v-for="sub in exe.iteSubsidiaries">
                                                                <template v-if="sub.includes(com.comCode)">
                                                                    V
                                                                </template>
                                                            </template>
                                                        </td>
                                                        <td>{{ exe.perBu3 }}</td>
                                                    </tr>
                                                </template>
                                            </template>
                                        </template>
                                        </tbody>
                                        <tbody style="height: 100px;"></tbody>
                                    </template>
                                </template>
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
        name: "Integrate",
        data() {
            return {
                contractData: [],
                companyData: [],
                workData: [],
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
                    this.$api.get(this.$test ? '/api/?type=integrate' : '/api/iform/work'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/work'),
                    this.$api.get(this.$test ? '/api/?type=work' : '/api/iform/work'),
                ];
                Promise.all(apiRequests)
                    .then(([integrateResponse, companyResponse, workResponse]) => {
                        //inventoryResponse
                        this.contractData = integrateResponse.data.data;
                        this.contractData.company.forEach(con => {
                            con.frame.forEach(frm => {
                                if (frm.exes.length > 0) {
                                    frm.exes.forEach(exe => {
                                        exe.iteSubsidiaries = exe.iteSubsidiaries.split('|');
                                    });
                                }
                            });
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
            exportExcel() {
                const table = document.getElementById('exportTable');
                const tableHTML = table.outerHTML;

                const downloadLink = document.createElement('a');
                const blob = new Blob([tableHTML], {type: 'application/vnd.ms-excel'});
                const url = URL.createObjectURL(blob);

                downloadLink.href = url;
                downloadLink.download = 'integrate.xls';
                downloadLink.click();

                URL.revokeObjectURL(url);
            },
        },
    }
</script>

<style scoped>

</style>