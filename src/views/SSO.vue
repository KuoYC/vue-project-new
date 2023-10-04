<template>
    <div class="container mx-auto align-self-center">

        <div class="row">

            <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                <div class="card mt-3 mb-3">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-12 mb-3">

                                <h2>共用資訊平台</h2>
                                <!--<p class="loading-text">{{ loadingText }}</p>-->
                                <span>接收GET請求的數據：</span>
                                <ul>
                                    <li v-for="(data, index) in getData" :key="index">{{index}}={{ data }}</li>
                                </ul>
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
        name: "sso",
        data() {
            return {
                text: 'SSO Login',
                dots: '',
                getData: null, // 保存接收的POST請求數據
            };
        },
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            }
        },
        computed: {
            loadingText() {
                return this.text + this.dots;
            },
        },
        methods: {
            defaultData() {

            },
            fetchFirst(){

            },
            // addDot() {
            //     if (this.dots.length >5){
            //         this.dots = '';
            //     }
            //     else {
            //         this.dots += '.';
            //     }
            // },
        },
        created() {
            // setInterval(this.addDot, 500);
            this.getData = this.$route.query;
            console.log('参数1:', this.$route.query);
        },
    }
</script>

<style scoped>
    .loading-text {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
</style>