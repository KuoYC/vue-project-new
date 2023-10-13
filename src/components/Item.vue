<template>
    <tr>
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
            <div v-for="com in companyData" :key="com.comCode"
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
            <select v-model="item.disId" class="form-select" ref="dis" @change="disChange">
                <option value="0">費用分攤原則</option>
                <option v-for="dis in distributionData" :value="dis.disId" :data-type="dis.disType">
                    {{ dis.disTitle }}
                </option>
            </select>
            <select v-if="item.disId !== 0" v-model="item.manId" class="form-select" ref="man" @change="manChange">
                <option value="0">費用分攤方式</option>
                <option v-for="man in manner" :value="man.manId" :data-type="man.manType"
                        :disabled="disType === '1' && man.manType !== '1'">
                    {{ man.manTitle }}
                </option>
            </select>
            <input v-if="getManType('2')" type="text" v-model="item.iteTypeNote" class="form-control" placeholder="分攤方式描述"/>
        </td>
    </tr>
    <tr v-if="getManType('1')">
        <td colspan="7">
            <div v-for="(pp, index) in item.iteProportion" :key="index" class="form-check form-check-primary form-check-inline">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            {{ this.$root.getCompanyTitle('', pp.comCode)}}
                        </div>
                    </div>
                    <input type="text" v-model="pp.p" :disabled="!item.iteSubsidiaries.includes(pp.comCode)" class="form-control">
                </div>
            </div>
        </td>
    </tr>
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
            manner: {
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
                disType: 0,
                manType: 0,
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
            disChange() {
                this.item.manId = '0';
                const dis = this.$refs.dis.querySelector('option:checked');
                this.disType = dis.getAttribute('data-type');
            },
            manChange() {
                const man = this.$refs.man.querySelector('option:checked');
                this.manType = man.getAttribute('data-type');
                // if ('0' === this.manType) {
                //     this.item.iteProportion.forEach(ite=>
                //     ite.p = '0');
                // }
            },
            getManType(type){
                const man = this.manner.find(item => item.manId === this.item.manId);
                if (man && man.manType === type) {
                    return true;
                }
                return false;
            }
        },
    };
</script>

<style scoped>
    .mouse-clean {
        cursor: pointer;
    }

    /* CSS 样式 */
</style>
