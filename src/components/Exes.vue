<template>
    <tr>
        <td>
            <vue-feather type="trash-2" size="20" class="m-clean" @click="removeExes(exes.uniqueId)"></vue-feather>
        </td>
        <td>{{ exes.worTitle }}</td>
        <td>
            <select :disabled="1 === parseInt(exes.exeStatus)" v-model="exes.iteId" class="form-control" ref="ite" @change="iteChange">
                <option value="0">作業項目</option>
                <option v-for="ite in itemData" :value="ite.iteId">
                    {{ ite.iteTitle }}
                </option>
            </select>
        </td>
        <td>
            <input :disabled="1 === parseInt(exes.exeStatus)" type="text" v-model="exes.exeTitle" class="form-control" placeholder="名稱" onclick="this.select();"/>
        </td>
        <td v-if="3 === parseInt(exes.worId)" style="min-width: 120px;">
            <div class="input-group">
                <div class="input-group-text">PM人天數</div>
                <input :disabled="1 === parseInt(exes.exeStatus)" type="number" v-model="exes.exePM" class="form-control" placeholder="0" min="0"
                       @input="mathCost"
                       onclick="this.select();"/>
            </div>
        </td>
        <td v-if="3 === parseInt(exes.worId)" style="min-width: 120px;">
            <div class="input-group">
                <div class="input-group-text">SP人天數</div>
                <input :disabled="1 === parseInt(exes.exeStatus)" type="number" v-model="exes.exeSP" class="form-control" placeholder="0" min="0"
                       @input="mathCost"
                       onclick="this.select();"/>
            </div>
        </td>
        <td :colspan="3 === parseInt(exes.worId) ? 1 : 3" style="min-width: 80px;">
            <input type="number" v-model="exes.exeCost" class="form-control" placeholder="0"
                   @input="checkAnnual(exes.uniqueId)"
                   :disabled="3 === parseInt(exes.worId) || 1 === parseInt(exes.exeStatus)" onclick="this.select();"/>
        </td>
        <td>
            {{ exes.exeStartYear }}
        </td>
        <td>
            <vue-feather v-if="1 !== parseInt(exes.exeStatus)" type="edit-2" size="20" class="m-r-10 m-clean"
                         @click="viewExesContent(exes.uniqueId)"></vue-feather>
        </td>
    </tr>
</template>

<script>
    import DatePicker from '@vuepic/vue-datepicker';

    export default {
        name: "Exes",
        emits: ['remove-exes', 'scrollExes', 'checkMathAnnual'],
        props: {
            idx: {
                type: Number,
                default: () => 0,
            },
            exes: {
                type: Object,
                // default: () => [],
                required: false,
            },
            infoData: {
                type: Object,
                // default: () => [],
                required: false,
            },
            itemData: {
                type: Array,
                default: () => [],
                required: true,
            },
            nowYear: {
                type: Number,
                default: () => 0,
            },
            PM: {
                type: Number,
                default: () => 0,
            },
            SP: {
                type: Number,
                default: () => 0,
            }
        },
        data() {
            const currentYear = new Date().getFullYear() + 1;
            const years = Array.from({length: currentYear - 1999}, (_, index) => currentYear - index);

            return {
                yearList: years,
            };
        },
        mounted() {
        },
        watch: {
            'exes.exeMonth': function (newVal, oldVal) {
                if(parseInt(newVal) < 1) {
                    this.exes.exeMonth = oldVal;
                }
                this.checkAnnual(this.exes.uniqueId);
                // console.log('aaa');
            },
            'exes.exeCost': function (newVal, oldVal) {
                this.checkAnnual(this.exes.uniqueId);
                // console.log('ccc');
            },
        },
        components: {
            DatePicker,
        },

        methods: {
            removeExes() {
                this.$emit("remove-exes", this.exes.uniqueId);
            },
            iteChange() {
                const selectItem = this.itemData.find(item => parseInt(item.iteId) === parseInt(this.exes.iteId));
                if (selectItem) {
                    this.exes.disId = selectItem.disId;
                    this.exes.manId = selectItem.manId;
                    this.exes.worId = selectItem.worId;
                    this.exes.worTitle = selectItem.worTitle;
                    this.exes.iteTitle = selectItem.iteTitle;
                    this.exes.disTitle = selectItem.disTitle;
                    this.exes.manTitle = selectItem.manTitle;
                    this.exes.manType = selectItem.manType;
                    this.exes.iteSubsidiaries = selectItem.iteSubsidiaries;
                    // const subsidiariesArray = selectItem.iteSubsidiaries.split('|');

                    // // 創建一個陣列，存放多個物件
                    // const subsidiaryDefault = [];
                    //
                    // subsidiariesArray.forEach(comCode => {
                    //     subsidiaryDefault.push({
                    //         comCode: comCode,
                    //         subAmount: 0,
                    //         subPercent: 0,
                    //         subCost: 0,
                    //     })
                    //     // this.exes.subsidiaryData.push(subsidiaryDataObject);
                    // });
                    // this.exes.annualData.forEach(ann=>{
                    //     if (ann.annYear === this.nowYear) {
                    //         ann.subsidiaryData = subsidiaryDefault;
                    //     }
                    // });
                    const manType = parseInt(selectItem.manType);
                    switch (manType) {
                        case 0:
                            this.exes.ratio = selectItem.manRatio;
                            break;
                        case 1:
                            this.exes.ratio = selectItem.iteProportion;
                            break;

                    }
                }
            },
            viewExesContent(idx) {
                this.$emit('scrollExes', idx);
            },
            checkAnnual(idx) {
                this.$emit('checkMathAnnual', this.exes);
            },
            mathCost(){
                this.exes.exeCost = ((undefined === this.exes.exePM ? 0 : this.exes.exePM) * this.PM) + ((undefined === this.exes.exeSP ? 0 : this.exes.exeSP) * this.SP);
                this.checkAnnual(this.exes.uniqueId);
            }
        },
    };
</script>

<style scoped>
    .m-clean {
        cursor: pointer;
    }

    .m-clean:hover {
        color: red;
    }

</style>
