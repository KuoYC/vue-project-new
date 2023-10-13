// mixins/itemMixin.js

export const itemMixin = {
    methods: {
        addItemData() {
            const iteProportion = this.companyData.map(company => ({
                comCode: company.comCode,
                p: '0',
            }));
            this.itemData.push({
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
            const index = this.itemData.findIndex(item => item.uniqueId === uniqueId);
            if (index !== -1) {
                this.itemData.splice(index, 1);
            }
        },
    },
};
