<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">選單設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/category`"><vue-feather type="link"></vue-feather>選單列表</router-link></li>
            <li class="breadcrumb-item">查看選單</li>
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
                                                <h4><input type="text" class="form-control" v-model="categoryData.catTitle" placeholder="標題"/></h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="d-flex mb-4 mt-2">
                                        <div class="flex-grow-1">
                                            <div class="myFont16Title">屬性： <span class="date myFont16">
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_type_1" v-model="categoryData.catType" value="list">
                                                    <label class="form-check-label"
                                                           for="rdo_type_1">
                                                        選項
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <input class="form-check-input"
                                                           type="radio" id="rdo_type_2" v-model="categoryData.catType" value="word">
                                                    <label class="form-check-label"
                                                           for="rdo_type_2">
                                                        文字
                                                    </label>
                                                </div>

                                            </span></div>
                                            <template v-if="'word' === categoryData.catType">
                                                <div class="myFont16Title">使用文字： <span class="data myFont16"><input type="text" class="form-control" v-model="categoryData.catWord" placeholder="使用文字"/></span></div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <button type="button" @click="createCategory"
                                                :disabled="'' === categoryData.catTitle || '' === categoryData.catType || ('word' === categoryData.catType && '' === categoryData.catWord)"
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

    export default {
        name: "Category_ad",
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
                categoryData: {
                    catTitle:'',
                    catType:'',
                    catWord:'',
                },
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
            },
            createCategory(){
                const payload = JSON.stringify(this.categoryData);
                this.$api
                    .post(this.$test ? '/api/?type=category' : '/api/iform/category', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            this.$router.push(`/info/category/sl/${response.data.catId}`);
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
