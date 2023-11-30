// mixins/itemMixin.js

export const itemMixin = {
    methods: {
        addItemData() {
            const iteProportion = this.companyData.map(company => ({
                comCode: company.comCode,
                p: '0',
            }));
            this.contractData.itemData.push({
                uniqueId: this.$root.generateUniqueId(),
                iteId: 0,
                conId: 0,//
                iteTitle: '',
                worId: 0,//
                iteTime: '',
                iteSubsidiaries: [],//
                iteControl: '',
                disId: 0,//
                manId: 0,//
                iteProportion: iteProportion,
                iteTypeNote: '',//
                iteDescription: '',
                iteWord: '',
                iteNote: '',
            },);
        },
        removeItemData(uniqueId) {
            const index = this.contractData.itemData.findIndex(item => item.uniqueId === uniqueId);
            if (index !== -1) {
                this.contractData.itemData.splice(index, 1);
            }
        },
    },
};
