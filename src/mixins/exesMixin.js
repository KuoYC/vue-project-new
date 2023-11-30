// mixins/exesMixin.js

export const exesMixin = {
    methods: {
        addExesData() {
            // const now = new Date();
            // const year = now.getFullYear();
            // const month = now.getMonth(); // 月份是从0开始的，需要+1，并且保证两位数

            const uid = this.$root.generateUniqueId();
            this.apportionData.exesData.push({
                uniqueId: uid,
                appId: 0,
                iteId: 0,
                iteTitle: '',
                worTitle: '',
                disId: 0,
                disTitle: '',
                manId: 0,
                manTitle: '',
                manType: 0,
                exeTitle: '',
                exeCost: 0,//
                exeYearCost:0,//當年總額
                exeCreateMonth: null,//攤提起始
                exeMonth: '',
                exeStartYear: this.currentYear,//提列年度
                iteSubsidiaries:[],//本項目使用公司
                iteProportion:'',//自訂義比例
                subsidiaryData:[],//
                exeYear: '',
                exeNumber: '',
                annualData: [],
                exeAction: false,
            });
        },
        removeExesData(uniqueId) {
            const index = this.apportionData.exesData.findIndex(exes => exes.uniqueId === uniqueId);
            if (index !== -1) {
                this.apportionData.exesData.splice(index, 1);
            }
        },
        async saveApportion(payload, appId){
            await this.$api
                .put(this.$test ? '/api/?type=apportion' : '/api/iform/apportion', payload)
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        console.log(response);
                        this.$router.push(`/apportion/sl/${appId}`);
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
