// mixins/workMixin.js

export const workMixin = {
    methods: {
        deleteWork(worId) {
            const confirmation = window.confirm("您確認要刪除嗎？");
            if (confirmation) {
                this.deleteWorkAction(worId);
            }
        },
        deleteWorkAction(worId){
            this.$api
                .delete(this.$test ? '/api/?type=work' : '/api/iform/work'
                    , {params: {worId: worId}})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push(`/info/work/`);
                        this.fetchFirst();
                    } else {
                        console.log('err');
                    }
                    console.log('Edit successful:', response.data);
                })
                .catch(error => {
                    console.error('Edit failed:', error);
                });
        },
    },
};
