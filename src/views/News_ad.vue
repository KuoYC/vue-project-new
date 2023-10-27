<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">公告設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/news`"><vue-feather type="link"></vue-feather>公告列表</router-link></li>
            <li class="breadcrumb-item">查看公告</li>
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
                                                <h4 class="col-12"><input type="text" class="form-control" v-model="newsData.nwsTitle"
                                                           placeholder="公告標題"/></h4>
                                            </div>
                                            <hr>
                                            <div class="d-flex mb-4 mt-2">
                                                <div class="flex-grow-1">
                                                    <div class="myFont16Title">公告日期： <span class="date myFont16">
                                            <DatePicker v-model="newsData.nwsRelease"
                                                        format="yyyy-MM-dd"
                                                        locale="zh-tw"
                                                        :enable-time-picker="false"
                                                        style="width: auto;"/>
                                            </span></div>
                                                    <div class="myFont16Title">置頂： <span class="date myFont16">
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_top_0" v-model="newsData.nwsTop" value="0">
                                                    <label class="form-check-label"
                                                           for="rdo_top_0">
                                                        關閉
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_top_1" v-model="newsData.nwsTop" value="1">
                                                    <label class="form-check-label"
                                                           for="rdo_top_1">
                                                        開啟
                                                    </label>
                                                </div>

                                            </span></div>
                                                    <div class="myFont16Title">屬性： <span class="date myFont16">
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_type_0" v-model="newsData.nwsType" value="0">
                                                    <label class="form-check-label"
                                                           for="rdo_type_0">
                                                        無
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_type_1" v-model="newsData.nwsType" value="1">
                                                    <label class="form-check-label"
                                                           for="rdo_type_1">
                                                        一般
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_type_2" v-model="newsData.nwsType" value="2">
                                                    <label class="form-check-label"
                                                           for="rdo_type_2">
                                                        提醒
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_type_3" v-model="newsData.nwsType" value="3">
                                                    <label class="form-check-label"
                                                           for="rdo_type_3">
                                                        重要
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_type_4" v-model="newsData.nwsType" value="4">
                                                    <label class="form-check-label"
                                                           for="rdo_type_4">
                                                        好康
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_type_5" v-model="newsData.nwsType" value="5">
                                                    <label class="form-check-label"
                                                           for="rdo_type_5">
                                                        緊急
                                                    </label>
                                                </div>

                                            </span></div>

                                                    <div class="myFont16Title">內文： <span
                                                            class="data myFont16"><textarea
                                                                                         class="form-control"
                                                                                         v-model="newsData.nwsContent"
                                                                                         placeholder="內文"></textarea></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </h4>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <button type="button" @click="createNews"
                                                :disabled="'' === newsData.nwsTitle || '' === nwsRelease"
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
    import DatePicker from '@vuepic/vue-datepicker';

    export default {
        name: "News_ad",
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            },
        },
        components: {
            DatePicker,
        },
        computed: {},
        data() {
            return {
                newsData: {
                    nwsTitle: '',
                    nwsRelease: new Date().toISOString().substr(0, 10),
                    nwsTop: 0,
                    nwsType: 0,
                    nwsContent:'',
                },
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
            },
            createNews() {
                const payload = JSON.stringify(this.newsData);
                this.$api
                    .post(this.$test ? '/api/?type=news' : '/api/iform/news', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            this.$router.push(`/info/news/sl/${response.data.worId}`);
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
