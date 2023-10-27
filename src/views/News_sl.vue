<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">公告設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/news`"><vue-feather type="link"></vue-feather>公告列表</router-link></li>
            <li class="breadcrumb-item">新增公告</li>
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
                                                <h4>{{ newsData.nwsTitle }}</h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <router-link :to="`/info/news/up/${nwsId}`"
                                                     class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">修改
                                        </router-link>
                                        <button type="button" @click="deleteNews(nwsId)"
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
    import { newsMixin } from '@/mixins/newsMixin.js';

    export default {
        name: "News_sl",
        mixins:[newsMixin],
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
                nwsId:0,
                newsData: [],
                sourceData: [],
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.nwsId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=news&nwsId=${this.nwsId}` : `/api/iform/news/${this.temId}`),
                ];
                Promise.all(apiRequests)
                    .then(([newsResponse]) => {
                        //newsResponse
                        this.newsData = newsResponse.data.data;
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
