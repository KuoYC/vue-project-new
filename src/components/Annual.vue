<template>
    <table class="newTable">
        <thead><!--  style="position: sticky;top: 0;"
               class="myNew"-->
        <tr>
            <th></th>
            <th v-for="ann in annualData">{{
                ann.annYear }}年度
            </th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td>費用起始</td>
            <td v-for="(ann, idx) in annualData">
                {{ ann.annStartMonth.year }}/{{ (ann.annStartMonth.month+1).toString().padStart(2, '0')}}
            </td>
        </tr>
        <tr>
            <td>費用迄止</td>
            <td v-for="(ann, idx) in annualData">
                <template v-if="idx === annualData.length-1">
                    {{ ann.annEndMonth.year }}/{{ (ann.annEndMonth.month+1).toString().padStart(2, '0') }}
                </template>
                <template v-else>
                    <DatePicker format="yyyy/MM"
                                v-model="ann.annEndMonth"
                                placeholder="費用迄止"
                                locale="zh"
                                month-picker
                                :enable-time-picker="false"
                                :min-date="ann.annStartMonth.year < ann.annYear ? new Date(ann.annYear, 0, 1) : new Date(ann.annStartMonth.year, ann.annStartMonth.month, 1)"
                                :max-date="new Date(ann.annYear, 11, 31)"
                                @closed="mathAnnual"
                                :disabled="1 === parseInt(ann.annStatus)"
                                style="width: 135px;"
                    />
                </template>
            </td>
        </tr>
        <tr>
            <td>費用</td>
            <td v-for="ann in annualData">
                <input type="number"
                       v-model="ann.annCost"
                       class="row-text"
                       @input="mathCompany"
                       style="width: 120px;"
                       placeholder="0"
                       :disabled="1 === parseInt(ann.annStatus)"
                       onclick="this.select();"/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import DatePicker from '@vuepic/vue-datepicker';

    export default {
        name: "Annual",
        emits: ['math-company'],
        props: {
            appYear: {
                type: Number,
                default: () => 0,
            },
            annualData: {
                type: Object,
                // default: () => [],
                required: false,
            },
            exes: {
                type: Object,
                // default: () => [],
                required: false,
            },
        },
        components: {
            DatePicker,
        },
        methods: {
            mathCompany() {
                this.$emit("math-company", this.annualData);
            },
            mathAnnual() {
                // this.annualData.forEach((ann, idx)=>{
                //     if (0 < idx && ann[idx-1].annEndMonth) {
                //         const date = new Date(ann[idx-1].annEndMonth);
                //         ann.annStartMonth = date.setDate(date+1);
                //     }
                // });

                let endMonth = '';
                this.annualData.forEach((ann, idx) => {
                    if ('' !== endMonth) {
                        ann.annStartMonth = this.getYearMonth(endMonth, 2);
                    }
                    endMonth = ann.annEndMonth;
                });


                if ('' !== this.exes.exeCost && '' !== this.exes.exeMonth && null !== this.exes.exeCreateMonth) {

                    const totalCost = parseInt(this.exes.exeCost);//總金額
                    const totalMonths = parseInt(this.exes.exeMonth);//需要總月數
                    const avgCost = Math.round(totalCost / totalMonths);//平均每月金額
                    console.log(totalCost);
                    console.log(totalMonths);
                    console.log(avgCost);
                    console.log('====');

                    let overMonth = totalMonths;//剩餘為分攤月
                    let lastCost = totalCost;//剩餘為分攤金額
                    let useMonth = 0;//當前使用月數
                    this.annualData.forEach((ann, idx) => {
                        useMonth = (ann.annEndMonth.year - ann.annStartMonth.year) * 12 + (ann.annEndMonth.month - ann.annStartMonth.month) + 1;//當前使用月數
                        if (overMonth > useMonth) {
                            console.log(useMonth);
                            ann.annEndMonth = this.getYearMonth(ann.annStartMonth, useMonth);
                            ann.annMonth = useMonth;
                            ann.annCost = avgCost * useMonth;
                            lastCost = lastCost - (avgCost * useMonth);
                            overMonth = overMonth - useMonth;
                            if (parseInt(this.appYear) === ann.annYear) {
                                this.exes.exeYearCost = avgCost * useMonth;
                                this.getCost(ann.subsidiaryData, avgCost * useMonth);
                            }
                        }
                        else {
                            ann.annEndMonth = this.getYearMonth(ann.annStartMonth, useMonth);
                            ann.annMonth = useMonth;
                            ann.annCost = lastCost;
                            if (parseInt(this.appYear) === ann.annYear) {
                                this.exes.exeYearCost = lastCost;
                                this.getCost(ann.subsidiaryData, lastCost);
                            }
                        }
                    });
                    this.mathCompany();

                    //計算總共需要年份
                    // let start = this.exes.exeCreateMonth;
                    // let end = this.getYearMonth(start, firstMonth);
                    // let cost = parseInt((firstMonth > totalMonths ? totalMonths : firstMonth) * avgCost);
                    //
                    // this.annualData.forEach(ann=>{
                    //     console.log(ann.annEndMonth);
                    // });
                }
            },
            getCost(subsidiaryData, cost) {
                let totalCost = cost;
                subsidiaryData.forEach((sub, idx)=>{
                    if (idx === subsidiaryData.length +1) {
                        sub.subCost = totalCost;
                        sub.subCostOG = totalCost;
                    }
                    else {
                        sub.subCost = Math.round(cost * sub.subPercent / 100);
                        sub.subCostOG = Math.round(cost * sub.subPercent / 100);
                        totalCost = totalCost - Math.round(cost * sub.subPercent / 100);
                    }
                });

            },
            getYearMonth(nowYearMonth, num) {
                // 将传入的 nowYearMonth 转换为 Date 对象
                num = num - 1;
                const currentDate = new Date(nowYearMonth.year, nowYearMonth.month, 1);

                // 计算新日期
                currentDate.setMonth(currentDate.getMonth() + num);

                // 获取新日期的年份和月份
                const newYear = currentDate.getFullYear();
                const newMonth = currentDate.getMonth();

                // 返回结果
                return {year: newYear, month: newMonth};
            },

        },
    }
</script>

<style scoped>

</style>