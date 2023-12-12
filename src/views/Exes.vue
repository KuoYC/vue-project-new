<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">費用相關設定</h4>
            </li>
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
                                                <h4>人天金額</h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="row">
                                        <div class="col-4">
                                            <label class="row-label">PM</label>
                                            <input type="number" v-model="infoData.infPM" class="form-control"/>
                                        </div>
                                        <div class="col-4">
                                            <label class="row-label">PA/SP</label>
                                            <input type="number" v-model="infoData.infSP" class="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="boxs mail_listing">
                        <div class="inbox-body no-pad">
                            <section class="mail-list">
                                <div class="mail-sender">
                                    <div class="mail-heading">
                                        <h4 class="vew-mail-header">
                                            <div class="author-box-name d-flex justify-content-between"
                                                 style="margin-bottom: 20px;">
                                                <h4>計價年度</h4>
                                            </div>
                                            <hr>
                                        </h4>
                                    </div>
                                    <div class="row">
                                        <div class="col-4">
                                            <label class="row-label">年度</label>
                                            <input type="number" v-model="infoData.infYear" class="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div class="col-6" style="padding-bottom: 20px;">
                    <button type="button" @click="updateInfo"
                            class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">儲存
                    </button>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';

    export default {
        name: "Exes",
        data() {
            return {
                infoData: [],
            }
        },
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                },
                immediate: true,
            }
        },
        mounted() {
        },
        methods: {
            defaultData() {
                this.fetchFirst();
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=info' : '/api/iform/company'),
                ];
                Promise.all(apiRequests)
                    .then(([infoResponse]) => {
                        //infoResponse
                        this.infoData = infoResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            updateInfo() {
                const infoData = cloneDeep(this.infoData);
                const payload = {
                    infYear: infoData.infYear,
                    infPM: infoData.infPM,
                    infSP: infoData.infSP
                };
                this.$api
                    .put(this.$test ? '/api/?type=info' : '/api/iform/info', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            alert('資料修改成功');
                            this.$router.go(0);
                        } else {
                            console.log('err');
                        }

                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });
            },
        },
    }
</script>

<style scoped>
    .my-list ul li {
        float: left;
        list-style: none;
    }

</style>