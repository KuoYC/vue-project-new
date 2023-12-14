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
                appId: this.apportionData.appId,
                iteId: 0,
                iteTitle: '',
                worTitle: '',
                worId: 0,
                disId: 0,
                disTitle: '',
                manId: 0,
                manTitle: '',
                manType: 0,
                exeTitle: '',
                exeCost: 0,//
                exePM: 0,
                exeSP: 0,
                exeYearCost:0,//當年總額
                exeCreateMonth: null,//攤提起始
                exeMonth: 1,
                exeStartYear: this.currentYear,//提列年度
                iteSubsidiaries:[],//本項目使用公司
                ratio:[],//自訂義比例
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
        loadContract(query) {
            this.isLoading = true;
            const contractPayload = {
                action: 1,
                // temId: this.$route.params.tem,
                perKey: this.per.perKey,
                perBu1Code: this.per.perBu1Code,
                memOwner: 1,
                status: 3,
                inh: 0,
                keyword:query,
            };

            this.$api
                .get(this.$test ? `/api/?type=contract` : `/api/adm/contract`, {params: contractPayload})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.isLoading = false;
                        console.log(response);

                        this.options = response.data.data.map(con => ({
                            id: con.conId,
                            name: `${ con.conTitle} ${ con.conSerial }${ con.conVer }`,
                        }));
                    } else {
                        this.isLoading = false;
                        console.log('err');
                    }

                })
                .catch(error => {
                    console.error('Edit failed:', error);
                });
        },
    },
};
