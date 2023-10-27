<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">選單設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/category`"><vue-feather type="link"></vue-feather>選單列表</router-link></li>
            <li class="breadcrumb-item">新增選單</li>
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
                                                <h4>{{ categoryData.catTitle }}</h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="d-flex mb-4 mt-2">
                                        <div class="flex-grow-1">
                                            <div class="myFont16Title">屬性： <span class="date myFont16">{{ 'list' === categoryData.catType ? '選項' : ('word' === categoryData.catType ? '文字' : '')}}</span></div>
                                            <template v-if="'word' === categoryData.catType">
                                                <div class="myFont16Title">使用文字： <span class="data myFont16">{{ categoryData.catWord }}</span></div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <router-link :to="`/info/category/up/${catId}`"
                                                class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">修改
                                        </router-link>
                                        <button type="button" @click="deleteCategory(catId)"
                                                class="m-r-5 btn btn-danger btn-border-radius waves-effect myFont16">刪除
                                        </button>
                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div v-if="categoryData.catType === 'list'" class="card">
                    <div class="card-header">
                        <i class="fas fa-bullhorn" style="margin-right: 10px;font-size: 17px;color: black;">
                            選項
                        </i>
                    </div>
                    <div class="card-body myNotification">
                        <table class="table">
                            <thead style="position: sticky;top: 0;" class="myNew">
                            <tr>
                                <th scope="col">選項</th>
                            </tr>
                            </thead>
                            <tbody class="myNew">
                            <tr v-for="sou in sourceData">
                                <td>{{ sou.souTitle }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import { categoryMixin } from '@/mixins/categoryMixin.js';

    export default {
        name: "Category_sl",
        mixins:[categoryMixin],
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
                catId:0,
                categoryData: [],
                sourceData: [],
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.catId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=category&catId=${this.catId}` : `/api/iform/category/${this.catId}`),
                    this.$api.get(this.$test ? `/api/?type=source` : `/api/iform/source/List`, { params: {catId:this.catId}}),
                ];
                Promise.all(apiRequests)
                    .then(([categoryResponse, sourceResponse]) => {
                        //categoryResponse
                        this.categoryData = categoryResponse.data.data;
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
