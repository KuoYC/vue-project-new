<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">選單內容設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/source`"><vue-feather type="link"></vue-feather>選單內容列表</router-link></li>
            <li class="breadcrumb-item">新增選單內容</li>
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
                                                <h4><input type="text" class="form-control" v-model="sourceData.souTitle" placeholder="標題"/></h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="d-flex mb-4 mt-2">
                                        <div class="flex-grow-1">
                                            <div class="myFont16Title">選項： <span class="date myFont16">
                                                <select v-model="sourceData.catId" class="form-control">
                                                    <option disabled value="">請選擇</option>
                                                    <template v-for="cat in categoryData">
                                                        <template v-if="cat.catType === 'list'">
                                                            <option :value="cat.catId">{{ cat.catTitle
                                                                }}
                                                            </option>
                                                        </template>
                                                    </template>
                                                </select>
                                            </span></div>
                                        </div>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <button type="button" @click="createSource"
                                                :disabled="'' === sourceData.souTitle || '' === sourceData.catId"
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
        name: "Source_ad",
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
                categoryData:[],
                sourceData: {
                    catId:'',
                    souTitle:'',
                },
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=category' : '/api/iform/category/List'),
                ];
                Promise.all(apiRequests)
                    .then(([categoryResponse]) => {
                        //categoryResponse
                        this.categoryData = categoryResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            createSource(){
                const payload = JSON.stringify(this.sourceData);
                console.log(payload);
                this.$api
                    .post(this.$test ? '/api/?type=source' : '/api/iform/source', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            console.log('ok');
                            this.$router.push(`/info/source/sl/${response.data.souId}`);
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
