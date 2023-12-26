<template>
    <table class="newTable">
        <caption>各公司分攤資訊</caption>
        <thead>
        <tr>
            <th></th>
            <th v-for="sub in subsidiaryData">
                {{ this.$root.getCompanyTitle('', sub.comCode) }}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="1 !== parseInt(exesData.manId)">
            <td>分攤數量</td>
            <td v-for="sub in subsidiaryData">
                <input type="number" v-model="sub.subAmount"
                       class="row-text"
                       style="width: 120px;" placeholder="0"
                       :disabled="0 === parseInt(exesData.manType) || 1 === parseInt(exesData.manType) || 1 === parseInt(annualData.annStatus)"
                       @input="mathByAmount"
                       onclick="this.select();"/>
            </td>
        </tr>
        <tr>
            <td>分攤比例</td>
            <td v-for="sub in subsidiaryData">
                <input type="number" v-model="sub.subPercent"
                       class="row-text"
                       style="width: 120px;float: left;"
                       placeholder="0"
                       disabled
                       @input="mathByPercent"
                       onclick="this.select();"/>
                <!--:disabled="0 === parseInt(exesData.manType) || 1 === parseInt(exesData.manType) || 1 === parseInt(annualData.annStatus)"-->
                <span style="float: end; line-height: 35px; padding-left: 3px;">%</span>
            </td>
        </tr>
        <tr>
            <td>分攤金額</td>
            <td v-for="sub in subsidiaryData">
                <input type="number" v-model="sub.subCost"
                       class="row-text"
                       style="width: 120px;" placeholder="0"
                       :min="sub.subCostOG - 10"
                       :max="sub.subCostOG + 10"
                       :disabled="1 === parseInt(annualData.annStatus) || 0 === parseInt(sub.subPercent)"
                       @input="mathByCost"
                       onclick="this.select();"/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "Subsidiary",
        props: {
            exesData: {
                type: Object,
                // default: () => [],
                required: false,
            },
            annualData: {
                type: Object,
                // default: () => [],
                required: false,
            },
            subsidiaryData: {
                type: Object,
                // default: () => [],
                required: false,
            },
        },
        methods: {
            mathByCost() {
                let sumCost = 0;
                this.subsidiaryData.forEach(sub => {
                    sumCost = sumCost + parseInt(sub.subCost);
                });
                this.subsidiaryData.forEach(sub => {
                    sub.subPercent = (sub.subCost / sumCost * 100).toFixed(2);
                });
                this.$emit('getCount');
            },
            mathByAmount(){
                let sumAmount = 0;
                this.subsidiaryData.forEach(sub => {
                    sumAmount = sumAmount + parseInt(sub.subAmount);
                });
                this.subsidiaryData.forEach(sub => {
                    sub.subPercent = (sub.subAmount / sumAmount * 100).toFixed(2);
                    sub.subCost = Math.round(this.annualData.annCost * sub.subPercent / 100)
                });
                this.$emit('getCount');
            },
            mathByPercent(){
                let sumAmount = 0;
                this.subsidiaryData.forEach(sub => {
                    sumAmount = sumAmount + parseInt(sub.subAmount);
                });
                this.subsidiaryData.forEach(sub => {
                    sub.subAmount = Math.round(sumAmount * sub.subPercent / 100);
                    sub.subCost = Math.round(this.annualData.annCost * sub.subPercent / 100)
                });
                this.$emit('getCount');
            },
        },
    }
</script>

<style scoped>

</style>