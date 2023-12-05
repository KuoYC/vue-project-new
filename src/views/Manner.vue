<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">比例設定</h4>
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
                            <table class="newTable">
                                <thead style="position: sticky;top: 0;" class="myNew">
                                <tr>
                                    <th style="min-width: 120px;">作業種類</th>
                                    <th style="width: auto;">比例設定</th>
                                </tr>

                                </thead>
                                <tbody>
                                <template v-for="man in mannerData" :key="man.manId">
                                    <tr v-if="0 === parseInt(man.manType)">
                                        <td>{{ man.manTitle }}</td>
                                        <td class="my-list">
                                            <ul>
                                                <li v-for="(pp, index) in man.manRatio" :key="index" class=""
                                                    style="margin-bottom: 20px; width: 220px;">
                                                    <label class="row-label" style="float: left; padding-right: 10px;">{{
                                                        this.$root.getCompanyTitle('', pp.comCode)}}</label>
                                                    <input type="number" v-model="pp.s" class="row-text" placeholder="0"
                                                           style="width: 95px; float: left;" onclick="this.select();">
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <button type="button" @click="updateManner"
                                class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    export default {
        name: "Manner",
        data() {
            return {
                mannerData: [],
                companyData: [],
            }
        },
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                },
                immediate: true,
            }
        },
        mounted() {
        },
        methods: {
            defaultData() {
                this.fetchFirst();
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                    this.$api.get(this.$test ? '/api/?type=manner' : '/api/iform/manner'),
                ];
                Promise.all(apiRequests)
                    .then(([companyResponse, mannerResponse]) => {
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //mannerResponse
                        this.mannerData = mannerResponse.data.data;

                        this.mannerData = this.mannerData.filter(item => parseInt(item.manType) === 0);
                        this.mannerData.forEach(man => {
                                man.manRatio = man.manRatio && null !== man.manRatio && '' !== man.manRatio ? JSON.parse(man.manRatio) : '';
                                console.log(man.manRatio);
                                const Ratio = [];
                                this.companyData.forEach(com => {
                                    const item = Array.isArray(man?.manRatio) ? man.manRatio.find(item => item.comCode === com.comCode) : 0;
                                    Ratio.push({
                                        comCode: com.comCode,
                                        s: item ? item.s : 0,
                                    });
                                });
                                man.manRatio = Ratio;
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            updateManner() {
                const mannerData = cloneDeep(this.mannerData);
                mannerData.forEach(man=>{
                    man.manRatio = JSON.stringify(man.manRatio);
                });
                const payload = {mannerData:mannerData};
                this.$api
                    .put(this.$test ? '/api/?type=manner' : '/api/iform/manner', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            alert('資料修改成功');
                            this.$router.go(0);
                        } else {
                            console.log('err');
                        }

                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });
            },
        },
    }
</script>

<style scoped>
    .my-list ul li {
        float: left;
        list-style: none;
    }

</style>