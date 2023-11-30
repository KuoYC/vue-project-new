// mixins/contractActionMixin.js

export const contractActionMixin = {
    methods: {
        createContractLog(conId, memId, perKey, memStatus, msg, status) {
            const contractLog = {
                conId: conId,
                memId: memId,
                perKey: perKey,
                colMemberStatus: memStatus,
                colMsg: msg,
                colStatus: status
            };
            return JSON.stringify(contractLog);
        },
        // updateContractStatus(狀態, 生效日期, log) 修改文件簽核狀態
        async updateContractStatus(conId, status, date, log) {
            const payload = {
                conId: conId,
                conStatus: status,
                conDate: date,
                conLog: log,
            };
            console.log(payload);
            try {
                await this.$api.put(
                    this.$test ? '/api/?type=contractStatus' : '/api/iform/contractStatus',
                    payload
                );
            } catch (error) {
                console.error('Edit failed:', error);
            }
            return false;

        },
        async deleteContract(conId){
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
        async saveContract(payload, conId){
            let log = this.createContractLog(conId, 0, this.per.perKey, -1, '儲存草稿', 0);
            await this.updateContractStatus(conId, 0, null, log);//修改文件狀態為進行中
            await this.$api
                .put(this.$test ? '/api/?type=contract' : '/api/iform/contract', payload)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log(response);
                        this.$router.push(`/contract/sl/${conId}`);
                    } else {
                        console.log('err');
                    }
                })
                .catch(error => {
                    console.error('Edit failed:', error);
                });

        },
        async cleanContract(temId, conId){
            let log = this.createContractLog(conId, 0, this.per.perKey, -1, '撤案', 4);
            await this.updateContractStatus(conId, 4, null, log);//修改文件狀態為進行中
            this.$router.push(`/contract/list`);
        },

        showTransfer(){
            this.viewTransfer = true;
        },
        closeTransfer(){
            this.viewTransfer = false;
        },

    },
};
