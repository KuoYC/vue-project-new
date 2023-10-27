// mixins/newsMixin.js

export const newsMixin = {
    methods: {
        deleteNews(nwsId) {
            const confirmation = window.confirm("您確認要刪除嗎？");
            if (confirmation) {
                this.deleteNewsAction(nwsId);
            }
        },
        deleteNewsAction(nwsId){
            this.$api
                .delete(this.$test ? '/api/?type=news' : '/api/iform/news'
                    , {params: {nwsId: nwsId}})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push(`/info/news/`);
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
