// mixins/groupMixin.js

export const groupMixin = {
    methods: {
        deleteGroup(comId) {
            const confirmation = window.confirm("您確認要刪除嗎？");
            if (confirmation) {
                this.deleteGroupAction(comId);
            }
        },
        deleteGroupAction(comId){
            this.$api
                .delete(this.$test ? '/api/?type=group' : '/api/iform/group'
                    , {params: {comId: comId}})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push(`/info/group/`);
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
