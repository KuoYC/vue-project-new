// mixins/contactMixin.js

export const contactMixin = {
    methods: {
        deleteContact(cotId) {
            const confirmation = window.confirm("您確認要刪除嗎？");
            if (confirmation) {
                this.deleteContactAction(cotId);
            }
        },
        deleteContactAction(cotId){
            this.$api
                .delete(this.$test ? '/api/?type=contact' : '/api/iform/contact'
                    , {params: {cotId: cotId}})
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push(`/info/contact/`);
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
        loadPersonnel(query) {
            this.isLoading = true;
            this.$api
                .get(this.$test ? `/api/?type=personnel&keyword=${query}&perBu1Code=${this.contactData.comCode}` : `/api/iform/personnel?keyword=${query}&perBu1Code=${this.contactData.comCode}`)
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        this.isLoading = false;
                        console.log(response);

                        this.options = response.data.data.map(per => ({
                            id: per.perKey,
                            name: `${ per.perNo} ${ per.comTitle} ${ per.perBu2 } ${ per.perBu3 } ${ per.perName } ${ per.perPositionName }`,
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
