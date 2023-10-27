<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">公司設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/company`"><vue-feather type="link"></vue-feather>公司列表</router-link></li>
            <li class="breadcrumb-item">修改公司</li>
        </ul>
        <div class="section-body">
            <div class="row">
                <!-- 主要內容 -->
                <div class="card">
                    <div class="boxs mail_listing">
                        <div class="inbox-body no-pad">
                            <section class="mail-list">
                                <div class="mail-sender">
                                    <div class="mail-heading">
                                        <h4 class="vew-mail-header">
                                            <div class="author-box-name d-flex justify-content-between"
                                                 style="margin-bottom: 20px;">
                                                <h4><input type="text" class="form-control"
                                                           v-model="companyData.comTitle" placeholder="標題"/></h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="d-flex mb-4 mt-2">
                                        <div class="flex-grow-1">
                                            <div class="myFont16Title">公司代碼： <span class="date myFont16">
                                                <input type="text" class="form-control"
                                                       v-model="companyData.comCode" placeholder="公司代碼"/>
                                            </span></div>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <button type="button" @click="updateCompany"
                                                :disabled="'' === companyData.comTitle && '' === companyData.comCode"
                                                class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">儲存
                                        </button>
                                        <button type="button" @click="deleteCompany(comId)"
                                                class="m-r-5 btn btn-danger btn-border-radius waves-effect myFont16">刪除
                                        </button>
                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

    export default {
        name: "Company_ad",
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            },
        },
        computed: {},
        data() {
            return {
                comId: 0,
                categoryData: [],
                companyData: [],
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.comId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=company&comId=${this.comId}` : `/api/iform/company/${this.comId}`),
                ];
                Promise.all(apiRequests)
                    .then(([companyResponse]) => {
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            updateCompany() {
                const payload = JSON.stringify(this.companyData);
                console.log(payload);
                this.$api
                    .put(this.$test ? '/api/?type=company' : '/api/iform/company', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            this.$router.push(`/info/company/sl/${this.companyData.comId}`);
                        } else {
                            console.log('err');
                        }

                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });
            },
        },
    };
</script>

<style scoped>
</style>
