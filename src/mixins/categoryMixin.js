// mixins/categoryMixin.js

export const categoryMixin = {
    methods: {
        deleteCategory(catId) {
            const confirmation = window.confirm("您確認要刪除嗎？");
            if (confirmation) {
                this.deleteCategoryAction(catId);
            }
        },
        deleteCategoryAction(catId){
            this.$api
                .delete(this.$test ? '/api/?type=category' : '/api/iform/category'
                    , {params: {catId: catId}})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push(`/info/category/`);
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
