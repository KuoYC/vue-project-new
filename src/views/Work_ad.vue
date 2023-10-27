<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">作業種類設定</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/info/work`"><vue-feather type="link"></vue-feather>作業種類列表</router-link></li>
            <li class="breadcrumb-item">新增作業種類</li>
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
                                                <h4><input type="text" class="form-control" v-model="workData.worTitle" placeholder="標題"/></h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="col-6" style="padding-bottom: 20px;">
                                        <button type="button" @click="createWork"
                                                :disabled="'' === workData.worTitle"
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
        name: "Work_ad",
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
                workData: {
                    worTitle:'',
                },
            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
            },
            createWork(){
                const payload = JSON.stringify(this.workData);
                this.$api
                    .post(this.$test ? '/api/?type=work' : '/api/iform/work', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            this.$router.push(`/info/work/sl/${response.data.worId}`);
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
