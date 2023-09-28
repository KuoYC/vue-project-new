<template>
    <div class="col-12 mb-2 form-control">
        <div class="row item-box">
            <div class="col-6 layout-spacing">
                <label class="form-label"><a @click="removeExes(item_index, exes_index)" style="color: red;" class="mouse-clean">X</a>名稱</label>
                <input type="text" v-model="exesEdit.exesTitle" ref="nameInput" class="form-control"/>
            </div>
            <div class="col-6 layout-spacing">
                <label class="form-label">預估費用</label>
                <input type="text" v-model="exesEdit.exesCost" ref="nameInput" class="form-control"/>
            </div>
            <div class="col-12 layout-spacing">
                <label>預估分攤費用</label>
                <div class="form-control">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th v-for="subsidiary in subsidiaryData" class="text-center"
                                    scope="col">{{
                                    subsidiary.ssTitle }}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td v-for="subsidiary in subsidiaryData" class="text-center">
                                    {{ ratioData.hasOwnProperty(subsidiary.ssId) ?
                                    (ratioData[subsidiary.ssId] * exesEdit.exesCost/ratioCountData).toFixed(0) : 0 }}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExesEdit",
        emits: ['remove-exes', 'exesEditChanged'],
        props: {
            item_index: {
                type: Number,
                required: true,
            },
            exes_index: {
                type: Number,
                required: true,
            },
            subsidiaryData: {
                type: Array,
                default: () => [],
            },
            ratioData: {
                type: Object,
                default: () => [],
                required: true,
            },
            ratioCountData: {
                type: Number,
                required: true,
            },
            exesEditDefault: {
                type: Object,
                default: () => [],
                required: false,
            },
        },
        data() {
            return {
                exesEdit: {
                    uniqueId: '',
                    exesTitle: '',
                    exesCost: 0,
                },
            };
        },
        mounted() {
            this.exesEdit = this.exesEditDefault;
        },
        watch: {
            exesEdit: {
                deep: true, // 深度监听对象的变化
                handler(newVal) {
                    // 当 itemEdit 对象发生变化时触发
                    this.$emit("exesEditChanged", newVal, this.item_index, this.exes_index);
                },
            },
        },
        methods: {
            removeExes() {
                this.$emit("remove-exes", this.item_index, this.exes_index);
            },
            clearNumberInput(ssId) {
                // if (!this.exesEdit.itemSelectedSubsidiaries.includes(ssId)) {
                //     this.exesEdit.itemRatio[ssId] = '';
                // }
            },
        },
    };
</script>

<style scoped>
    .mouse-clean {
        cursor: pointer;
    }

</style>
