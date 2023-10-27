<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">選單內容設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/source`"><vue-feather type="link"></vue-feather>選單內容列表</router-link></li>
            <li class="breadcrumb-item">查看選單內容</li>
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
                                                <h4>{{ sourceData.souTitle }}</h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="d-flex mb-4 mt-2">
                                        <div class="flex-grow-1">
                                            <div class="myFont16Title">選項： <span class="date myFont16">{{ sourceData.catTitle }}</span></div>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <router-link :to="`/info/source/up/${souId}`"
                                                     class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">修改
                                        </router-link>
                                        <button type="button" @click="deleteSource(souId)"
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
    import { sourceMixin } from '@/mixins/sourceMixin.js';

    export default {
        name: "Source_sl",
        mixins:[sourceMixin],
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
                souId:0,
                sourceData: [],
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.souId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=source&souId=${this.souId}` : `/api/iform/source/${this.temId}`),
                ];
                Promise.all(apiRequests)
                    .then(([sourceResponse]) => {
                        //sourceResponse
                        this.sourceData = sourceResponse.data.data;
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
