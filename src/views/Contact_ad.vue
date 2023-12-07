<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">窗口設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/contact`"><vue-feather type="link"></vue-feather>窗口列表</router-link></li>
            <li class="breadcrumb-item">新增窗口</li>
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
                                                <Multiselect
                                                        v-if="'' !== contactData.comCode"
                                                             v-model="per"
                                                             :options="options"
                                                             :searchable="false"
                                                             @search-change="loadPersonnel"
                                                             placeholder="搜尋員工編號"
                                                             label="name"
                                                             track-by="id"
                                                />

                                            </span></div>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <button type="button" @click="createContact"
                                                :disabled="'' === contactData.comCode || '' === contactData.perKey"
                                                class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">儲存
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
    import Multiselect from 'vue-multiselect';
    import 'vue-multiselect/dist/vue-multiselect.css';
    export default {
        name: "Contact_ad",
        mixins: [contactMixin],
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            },
            'per':function (newPer, oldPer) {
                this.contactData.perKey = newPer.id;
            }
        },
        components: {Multiselect},
        computed: {},
        data() {
            return {
                options: [],
                isLoading: false,
                companyData: [],
                per:{},
                contactData: {
                    comCode: '',
                    perKey: ''
                },
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
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
            createContact() {
                const payload = JSON.stringify(this.contactData);
                this.$api
                    .post(this.$test ? '/api/?type=contact' : '/api/iform/contact', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            this.$router.push(`/info/contact/sl/${response.data.cotId}`);
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
