<template>
        <td>
            <a @click="removeItem(item.uniqueId)" style="color: red;"
               class="mouse-clean">X</a>{{ idx+1 }}
        </td>
        <td>
            <!--作業項目-->
            <input type="text" v-model="item.iteTitle" ref="nameInput" class="form-control"/>
        </td>
        <td>
            <!--作業種類-->
            <select v-model="item.worId" class="form-select">
                <option value="0">作業種類</option>
                <option v-for="wor in workData" :value="wor.worId" :disabled="!workUse.includes(wor.worId)">
                    {{ wor.worTitle }}
                </option>
            </select>
        </td>
        <td>
            <!--服務時間-->
            <select v-model="item.iteTime" class="form-select">
                <option value="">服務時間</option>
                <option v-for="time in timeData" :value="time.souTitle" :key="time.souId">
                    {{ time.souTitle }}
                </option>
            </select>
        </td>
        <td>
            <!--本項目使用公司-->
            <div v-for="com in companyData"
                 class="form-check form-check-primary form-check-inline">
                <input :disabled="!companyUse.includes(com.comCode)"
                       :name="'com_'+item.uniqueId"
                       type="checkbox"
                       :value="com.comCode"
                       v-model="item.iteSubsidiaries"
                       class="form-check-input"
                       :id="'com_'+item.uniqueId+'_'+com.comCode"/>
                <label class="form-check-label"
                       :for="'com_'+item.uniqueId+'_'+com.comCode">
                    {{ com.comTitle }}
                </label>
            </div>
        </td>
        <td>
            <!--權限控管及資料管制-->
            <input type="text" v-model="item.iteControl" class="form-control"/>
        </td>
        <td>
            <!--分攤比例原則-->
            <select v-model="item.disId" class="form-select">
                <option value="0">費用分攤原則</option>
                <option v-for="dis in distributionData" :value="dis.disId">
                    {{ dis.disTitle }}
                </option>
            </select>
        </td>
</template>
<script>
    export default {
        name: "Item",
        emits: ['remove-item'],
        props: {
            idx: {
                type: Number,
                default: () => 0,
            },
            workData: {
                type: Array,
                default: () => [],
                required: true,
            },
            workUse: {
                type: Array,
                default: () => [],
                required: true,
            },
            timeData: {
                type: Array,
                default: () => [],
                required: true,
            },
            distributionData: {
                type: Array,
                default: () => [],
                required: true,
            },
            // categoryData: {
            //     type: Array,
            //     default: () => [],
            // },
            companyData: {
                type: Array,
                default: () => [],
                required: true,
            },
            companyUse: {
                type: Array,
                default: () => [],
                required: true,
            },
            item: {
                type: Object,
                // default: () => [],
                required: false,
            }
        },
        data() {
            return {
                // workData: [],//作業種類
                // distributionData: [{disId: 0, disTitle: ''},],//分攤方式
                // categoryData: [],//
                // sourceData: [],//
                // timeData: [],//
                // companyData: [],//
                // item: {
                //     uniqueId: '',
                //     iteId: 0,
                //     conId: 0,//
                //     iteTitle: '',
                //     worId: 0,//
                //     iteTime: '',
                //     iteSubsidiaries: [],//
                //     iteControl: '',
                //     disId: 0,//
                //     iteTypeNote: '',//
                //     iteDescription: '',
                //     iteFileMeeting: '',//
                //     iteFilePlan: '',//
                //     iteFile: [],//
                //     iteWord: '',
                //     iteNote: '',
                // },
            };
        },
        watch: {
            companyUse: {
                handler(newVal) {
                    this.item.iteSubsidiaries = this.item.iteSubsidiaries.filter((comCode) =>
                        newVal.includes(comCode)
                    );
                },
                deep: true, // 深度监听数组内元素的变化
            },
        },
        computed: {},
        mounted() {
            // if (this.itemEditDefault) {
            //     this.itemEdit = this.itemEditDefault;
            //     // console.log(this.itemEdit);
            // }
        },
        methods: {
            removeItem() {
                this.$emit('remove-item', this.item.uniqueId);
            },
        },
    };
</script>

<style scoped>
    .mouse-clean {
        cursor: pointer;
    }

    /* CSS 样式 */
</style>
