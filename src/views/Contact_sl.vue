<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">窗口設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/contact`"><vue-feather type="link"></vue-feather>窗口列表</router-link></li>
            <li class="breadcrumb-item">窗口內容</li>
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
                                            <div class="author-box-name d-flex justify-content-between" style="margin-bottom: 20px;">
                                                <h4>{{ contactData.comTitle }}</h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="d-flex mb-4 mt-2">
                                        <div class="flex-grow-1">
                                            <div class="myFont16Title">窗口： <span class="date myFont16">{{ contactData.perNo }} {{ contactData.comTitle }} {{ contactData.perBu2 }} {{ contactData.perBu3 }} {{ contactData.perName }} {{ contactData.perPositionName }}</span></div>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <router-link :to="`/info/contact/up/${cotId}`"
                                                     class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">修改
                                        </router-link>
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
    import { contactMixin } from '@/mixins/contactMixin.js';

    export default {
        name: "Contact_sl",
        mixins:[contactMixin],
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            },
        },
        computed: {
        },
        data() {
            return {
                cotId:0,
                contactData: [],
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.cotId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=contact&cotId=${this.cotId}` : `/api/iform/contact/${this.cotId}`),
                ];
                Promise.all(apiRequests)
                    .then(([contactResponse]) => {
                        //contactResponse
                        this.contactData = contactResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
        },
    };
</script>

<style scoped>
</style>
