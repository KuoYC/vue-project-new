<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">窗口設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/contact`"><vue-feather type="link"></vue-feather>窗口列表</router-link></li>
            <li class="breadcrumb-item">修改窗口</li>
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
                                                <h4>
                                                    <select v-model="contactData.comCode" class="form-control">
                                                        <option disabled value="">請選擇公司</option>
                                                        <template v-for="com in companyData">
                                                            <option :value="com.comCode">{{ com.comTitle }}
                                                            </option>
                                                        </template>
                                                    </select>
                                                </h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="d-flex mb-4 mt-2">
                                        <div class="flex-grow-1">
                                            <div class="myFont16Title">窗口： <span class="date myFont16">
                                                <multiselect
                                                        v-if="'' !== contactData.comCode"
                                                        v-model="per"
                                                        :options="options"
                                                        :searchable="true"
                                                        :loading="isLoading"
                                                        @search-change="loadPersonnel"
                                                        placeholder="搜尋員工編號"
                                                        label="name"
                                                        track-by="id"
                                                />
                                            </span></div>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <button type="button" @click="updateContact"
                                                :disabled="'' === contactData.comCode || '' === contactData.perKey"
                                                class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">儲存
                                        </button>
                                        <button type="button" @click="deleteContact(cotId)"
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
    import {contactMixin} from '@/mixins/contactMixin.js';
    import Multiselect from "vue-multiselect";
    import 'vue-multiselect/dist/vue-multiselect.css';

    export default {
        name: "Contact_up",
        mixins: [contactMixin],
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            },
        },
        components: {Multiselect},
        computed: {},
        data() {
            return {
                cotId: 0,
                options: [],
                isLoading: false,
                companyData: [],
                per: {},
                contactData: {},
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.cotId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                    this.$api.get(this.$test ? `/api/?type=contact&cotId=${this.cotId}` : `/api/iform/contact/${this.cotId}`),
                ];
                Promise.all(apiRequests)
                    .then(([companyResponse, contactResponse]) => {
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //contactResponse
                        this.contactData = contactResponse.data.data;
                        this.options = [{
                            id: this.contactData.perKey,
                            name: `${ this.contactData.perNo} ${ this.contactData.comTitle} ${ this.contactData.perBu2 } ${ this.contactData.perBu3 } ${ this.contactData.perName } ${ this.contactData.perPositionName }`,
                        }];
                        this.per = {
                            id: this.contactData.perKey,
                            name: `${ this.contactData.perNo} ${ this.contactData.comTitle} ${ this.contactData.perBu2 } ${ this.contactData.perBu3 } ${ this.contactData.perName } ${ this.contactData.perPositionName }`,
                        };
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            updateContact() {
                const payload = JSON.stringify(this.contactData);
                console.log(payload);
                this.$api
                    .put(this.$test ? '/api/?type=contact' : '/api/iform/contact', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            this.$router.push(`/info/contact/sl/${this.contactData.cotId}`);
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
