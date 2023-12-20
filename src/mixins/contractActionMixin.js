// mixins/contractActionMixin.js

export const contractActionMixin = {
    methods: {
        async deleteContract(conId) {
            await this.$api
                .delete(this.$test ? '/api/?type=contract' : '/api/iform/contract'
                    , {params: {conId: conId}})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push(`/contract/list`);
                    } else {
                        console.log('err');
                    }
                    console.log('Edit successful:', response.data);
                })
                .catch(error => {
                    console.error('Edit failed:', error);
                });
        },
        async saveContract(payload, conId) {
            let log = this.createSignLog(conId, 0, 0, this.per.perKey, -1, '儲存草稿', 0);
            await this.updateContractStatus(conId, 0, null, log);//修改文件狀態為進行中
            await this.$api
                .put(this.$test ? '/api/?type=contract' : '/api/iform/contract', payload)
                .then(response => {
                    console.log(response);
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
        async cleanContract(temId, conId) {
            let log = this.createSignLog(conId, 0, 0, this.per.perKey, -1, '撤案', 4);
            await this.updateContractStatus(conId, 4, null, log);//修改文件狀態為進行中
            this.$router.push(`/contract/list`);
        },
        async cleanApportionByContract(conId) {
            try {
                await this.$api
                    .delete(this.$test ? '/api/?type=apportionClean' : '/api/iform/apportionClean'
                        ,  {params: {conId: conId}}
                    );
            } catch (error) {
                console.error('Edit failed:', error);
            }
        },
        async contractActionTo(action, conId) {
            switch (action) {
                case 'ch':
                case 'tp':
                    await this.$api
                        .get(this.$test ? `/api/?type=contractCopy` : `/api/iform/contractCopy`, {
                            params: {
                                conId: conId,
                                conType: action === 'ch' ? 1 : 2,
                                conMark: 0,
                            }
                        })
                        .then(response => {
                            console.log(response);
                            if (response.status === 200) {
                                //response.data.conId
                                this.$router.push(`/contract/up/${response.data.conId}`);
                            } else {
                                console.log('err');
                            }

                        })
                        .catch(error => {
                            console.error('Edit failed:', error);
                        });

                    break;
                case 'ex':
                    await this.$api
                        .get(this.$test ? `/api/?type=apportion` : `/api/iform/apportion`, {
                            params: {
                                conId: conId,
                            }
                        })
                        .then(response => {
                            console.log(response);
                            if (response.status === 200) {
                                if (response.data?.appId) {
                                    this.$router.push(`/apportion/sl/${response.data.appId}`);
                                    // this.$router.push(`/apportion/sl/${response.data.data[0].appId}`);
                                }
                                else {
                                    this.$api
                                        .get(this.$test ? `/api/?type=apportionId` : `/api/iform/apportionId`, {
                                            params: {
                                                conId: conId,
                                                perKey: this.per.perKey,
                                                comCode: this.per.comCode,
                                            }
                                        })
                                        .then(response => {
                                            console.log(response);
                                            if (response.status === 200) {
                                                this.$router.push(`/apportion/up/${response.data.appId}`);
                                            } else {
                                                console.log('err');
                                            }

                                        })
                                        .catch(error => {
                                            console.error('Edit failed:', error);
                                        });
                                }
                            } else {
                                console.log('err');
                            }

                        })
                        .catch(error => {
                            console.error('Edit failed:', error);
                        });
                    break;
                case 're':
                    await this.$api
                    this.$api
                        .get(this.$test ? `/api/?type=apportionId` : `/api/iform/apportionId`, {
                            params: {
                                conId: conId,
                                perKey: this.per.perKey,
                                comCode: this.per.comCode,
                            }
                        })
                        .then(response => {
                            console.log(response);
                            if (response.status === 200) {
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

        showTransfer() {
            this.viewTransfer = true;
        },
        closeTransfer() {
            this.viewTransfer = false;
        },

    },
};
