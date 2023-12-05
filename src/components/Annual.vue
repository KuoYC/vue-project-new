<template>
    <table class="newTable mb-5">
        <thead style="position: sticky;top: 0;"
               class="myNew">
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
                            :min-date="new Date(ann.annYear, 0, 1)"
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



                if ('' !== this.exes.exeCost && '' !== this.exes.exeMonth && null !== this.exes.exeCreateMonth) {

                    const subsidiariesArray = this.exes.iteSubsidiaries.split('|');
                    const subsidiaryDefault = [];
                    subsidiariesArray.forEach(comCode => {
                        subsidiaryDefault.push({
                            comCode: comCode,
                            subAmount: 0,
                            subPercent: 0,
                            subCost: 0,
                        })
                    });

                    const subsidiarySet = subsidiaryDefault;
                    if ('1' === this.exes.manType) {
                        subsidiarySet.forEach(sub => {
                            this.exes.ratio.forEach(rat => {
                                if (sub.comCode === rat.comCode) {
                                    sub.subPercent = parseFloat(rat.p);
                                }
                            });
                        });
                    }
                    if ('0' === this.exes.manType) {
                        subsidiarySet.forEach(sub => {
                            this.exes.ratio.forEach(rat => {
                                if (sub.comCode === rat.comCode) {
                                    sub.subAmount = parseFloat(rat.s);
                                }
                            });
                        });
                    }


                    const totalCost = parseInt(this.exes.exeCost);
                    const createYear = new Date(this.exes.exeCreateMonth).getFullYear();
                    const createMonth = new Date(this.exes.exeCreateMonth).getMonth();//parseInt(this.exes.exeCreateMonth.month);
                    const startYear = this.exes.exeStartYear;
                    const totalMonths = parseInt(this.exes.exeMonth);
                    const avgCost = Math.round(totalCost / totalMonths);

                    let nowYear = parseInt(startYear);
                    let overMonth = totalMonths;
                    let lastCost = totalCost;
                    const firstMonth = (nowYear - createYear) * 12 + (12 - createMonth);
                    const needYear = Math.ceil((totalMonths - firstMonth) / 12);
                    this.annualData.forEach(ann=>{
                        console.log(ann.annEndMonth);
                    });
                }
            },
        },
    }
</script>

<style scoped>

</style>