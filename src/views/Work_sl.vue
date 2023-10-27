<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">作業種類設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/work`"><vue-feather type="link"></vue-feather>作業種類列表</router-link></li>
            <li class="breadcrumb-item">查看作業種類</li>
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
                                                <h4>{{ workData.worTitle }}</h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <router-link :to="`/info/work/up/${worId}`"
                                                     class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">修改
                                        </router-link>
                                        <button type="button" @click="deleteWork(worId)"
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
    import { workMixin } from '@/mixins/workMixin.js';

    export default {
        name: "Work_sl",
        mixins:[workMixin],
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
                worId:0,
                workData: [],
                sourceData: [],
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.worId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=work&worId=${this.worId}` : `/api/iform/work/${this.temId}`),
                ];
                Promise.all(apiRequests)
                    .then(([workResponse]) => {
                        //workResponse
                        this.workData = workResponse.data.data;
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
