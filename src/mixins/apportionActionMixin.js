// mixins/apportionActionMixin.js

export const apportionActionMixin = {
    methods: {
        async deleteApportion(appId) {
            await this.$api
                .delete(this.$test ? '/api/?type=apportion' : '/api/iform/apportion'
                    , {params: {appId: appId}})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push(`/paper`);
                    } else {
                        console.log('err');
                    }
                    console.log('Edit successful:', response.data);
                })
                .catch(error => {
                    console.error('Edit failed:', error);
                });
        },
        async saveApportion(payload, appId){
            await this.$api
                .put(this.$test ? '/api/?type=apportion' : '/api/iform/apportion', payload)
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        console.log(response);
                    } else {
                        console.log('err');
                    }
                })
                .catch(error => {
                    console.error('Edit failed:', error);
                });

        },
        async cleanApportion(appId) {
            let log = this.createSignLog(0, appId, 0, this.per.perKey, -1, '撤案', 4);
            await this.updateApportionStatus(appId, 4, null, log);//修改文件狀態為進行中
            this.$router.push(`/paper`);
        },
        async apportionActionTo(action, appId) {
            switch (action) {
                case 'ch':
                case 'tp':
                    await this.$api
                        .get(this.$test ? `/api/?type=apportionCopy` : `/api/iform/contractCopy`, {
                            params: {
                                appId: appId,
                                appType: action === 'ch' ? 1 : 2,
                                appMark: 0,
                            }
                        })
                        .then(response => {
                            console.log(response);
                            if (response.status === 200) {
                                //response.data.conId
                                this.$router.push(`/apportion/up/${response.data.appId}`);
                            } else {
                                console.log('err');
                            }

                        })
                        .catch(error => {
                            console.error('Edit failed:', error);
                        });

                    break;
            }
        },
    },
};
