// mixins/sourceMixin.js

export const sourceMixin = {
    methods: {
        deleteSource(souId) {
            const confirmation = window.confirm("您確認要刪除嗎？");
            if (confirmation) {
                this.deleteSourceAction(souId);
            }
        },
        deleteSourceAction(souId) {
            this.$api
                .delete(this.$test ? '/api/?type=source' : '/api/iform/source'
                    , {params: {souId: souId}})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push(`/info/source/`);
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
