<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">公告</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/announcement`"><vue-feather type="link"></vue-feather>公告列表</router-link></li>
            <li class="breadcrumb-item">公告訊息</li>
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
                                        <div class="vew-mail-header">
                                            <div class="author-box-name d-flex justify-content-between"
                                                 style="margin-bottom: 20px;">
                                                <h4 class="myCardTitle" style="font-size: x-large;">
                                                    <span v-if="'1' === newsData.nwsType" class="nws-type badge badge-secondary" style="margin-right:10px;">一般</span>
                                                    <span v-if="'2' === newsData.nwsType" class="nws-type badge badge-success" style="margin-right:10px;">提醒</span>
                                                    <span v-if="'3' === newsData.nwsType" class="nws-type badge badge-primary" style="margin-right:10px;">重要</span>
                                                    <span v-if="'4' === newsData.nwsType" class="nws-type badge badge-info" style="margin-right:10px;">好康</span>
                                                    <span v-if="'5' === newsData.nwsType" class="nws-type badge badge-danger" style="margin-right:10px;">緊急</span>
                                                    {{ newsData.nwsTitle }}</h4>
                                            </div>
                                            <div class="d-flex">
                                                <div class="myFont16Title" style="margin: 0 10px;">公告日期： <span class="date myFont16">{{ newsData.nwsRelease }}</span>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="d-flex mb-4 mt-2 myFont16">
                                                <div class="flex-grow-1">
                                                    <div v-html="newsData.nwsContent"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <router-link :to="`/announcement`"
                                                     class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">
                                            回列表
                                        </router-link>
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
        name: "Announcement_sl",
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
                nwsId: 0,
                newsData: [],
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.nwsId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=news&nwsId=${this.nwsId}` : `/api/iform/news/${this.nwsId}`),
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
    .nws-type {
        font-size: 12px;
    }
</style>
