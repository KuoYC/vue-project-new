<template>
    <div class="container mx-auto align-self-center">

        <div class="row">

            <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                <div class="card mt-3 mb-3">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-12 mb-3">

                                <h2>共用資訊平台</h2>
                                <p>請輸入您的帳號及密碼</p>

                            </div>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">帳號</label>
                                    <input type="text" v-model="adminAccount" class="form-control">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-4">
                                    <label class="form-label">密碼</label>
                                    <input type="password" v-model="adminPassword" class="form-control">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-3">
                                    <div class="form-check form-check-primary form-check-inline">
                                        <input class="form-check-input me-3" type="checkbox"
                                               id="form-check-default">
                                        <label class="form-check-label" for="form-check-default">
                                            記住我
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="mb-4">
                                    <button @click="toLogin()" class="btn btn-secondary w-100">登 入</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "Admin",
        data(){
            return{
                adminAccount: '',
                adminPassword:'',
            }


        }
    }
</script>

<style scoped>

</style>