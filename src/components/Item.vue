<template>
    <div style="border-radius: 3px; border: 1px solid #ced4da;">
        <div class="row" style="padding-top: 10px;padding-left: 10px;">
            <div class="col-xl-4 col-md-4 col-sm-6 col-12">
                <label class="row-label">共用作業項目</label>
                <input type="text" v-model="item.iteTitle" class="row-text" placeholder="請輸入文字">
            </div>
            <div class="col-xl-4 col-md-4 col-sm-6 col-12">
                <label class="row-label">作業種類</label>
                <select v-model="item.worId" class="row-text">
                    <option value="0">作業種類</option>
                    <option v-for="wor in workData" :value="wor.worId" :disabled="!workUse.includes(wor.worId)">
                        {{ wor.worTitle }}
                    </option>
                </select>
            </div>
            <div class="col-xl-4 col-md-4 col-sm-12 col-12">
                <label class="row-label">服務時間</label>
                <select v-model="item.iteTime" class="row-text">
                    <option value="">服務時間</option>
                    <option v-for="time in timeData" :value="time.souTitle" :key="time.souId">
                        {{ time.souTitle }}
                    </option>
                </select>
            </div>

            <div class="col-12">
                <label class="row-label">使用公司</label>
                <div class="my-list">
                    <ul>
                        <li v-for="com in companyData" :key="com.comCode" class="form-check">
                            <input class="form-check-input" :disabled="!companyUse.includes(com.comCode)"
                                   :name="'com_'+item.uniqueId"
                                   type="checkbox"
                                   :value="com.comCode"
                                   v-model="item.iteSubsidiaries"
                                   :id="'com_'+item.uniqueId+'_'+com.comCode"/>
                            <label class="form-check-label" :for="'com_'+item.uniqueId+'_'+com.comCode">{{ com.comTitle
                                }}</label>
                        </li>
                    </ul>
                </div>
            </div>

            <div :class="0 !== parseInt(item.manType) && 0 !== parseInt(item.manId) ? 'col-xl-4 col-md-4 col-sm-6 col-12' : 'col-xl-6 col-md-6 col-sm-6 col-12'">
                <label class="row-label">費用分攤原則</label>
                <select v-model="item.disId" class="row-text" ref="dis" @change="disChange">
                    <option value="0" data-type="">費用分攤原則</option>
                    <option v-for="dis in distributionData" :value="dis.disId" :data-type="dis.disType"
                            :style="(parseInt(item.worId) === 3 && parseInt(dis.disId) !== 1) ? 'display:none;' : ''"
                            :disabled="(parseInt(item.worId) === 3 && parseInt(dis.disId) !== 1)">
                        {{ dis.disTitle }}
                    </option>
                </select>
            </div>
            <div :class="0 !== parseInt(item.manType) && 0 !== parseInt(item.manId) ? 'col-xl-4 col-md-4 col-sm-6 col-12' : 'col-xl-6 col-md-6 col-sm-6 col-12'">
                <label class="row-label">計算基礎</label>
                <select v-model="item.manId" class="row-text" ref="man" @change="manChange">
                    <option value="0" data-type="">費用分攤方式</option>
                    <option v-for="man in manner" :value="man.manId" :data-type="man.manType"
                            :style="parseInt(item.disId) === 0 || (item.disType === 1 && parseInt(man.manType) === 0) ? 'display:none;' : ''"
                            :disabled="parseInt(item.disId) === 0 || (item.disType === 1 && parseInt(man.manType) === 0)">
                        {{ man.manTitle }}
                    </option>
                </select>
            </div>
            <div v-if="0 !== parseInt(item.manType) && 0 !== parseInt(item.manId)"
                 class="col-xl-4 col-md-4 col-sm-12 col-12">
                <label class="row-label">說明</label>
                <input type="text" v-model="item.iteTypeNote" class="row-text" placeholder="說明"/>
            </div>
            <div v-if="1 === parseInt(item.manId)" class="col-12" style="padding-left: 8px;">
                <label class="row-label">使用公司固定分攤比例</label>
                <div class="d-flex my-list" style="overflow-x: auto;">
                    <ul>
                        <li v-for="(pp, index) in item.iteProportion" :key="index" class=""
                            style="margin-bottom: 20px; width: 220px;">
                            <label class="row-label" style="float: left; padding-right: 10px;">{{
                                this.$root.getCompanyTitle('', pp.comCode)}}</label>
                            <input type="number" v-model="pp.p" :disabled="!item.iteSubsidiaries.includes(pp.comCode)"
                                   class="row-text" placeholder="0" style="width: 95px; float: left;"
                                   onclick="this.select();">
                            <label class="myFont16 p-t-10" style="float: end; padding-left: 10px;">%</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12">
                <label class="row-label">權限控管及資料管制</label>
                <textarea class="row-text" v-model="item.iteControl" spellcheck="false" placeholder="請輸入標題"
                          style="width: 98%;"></textarea>
            </div>

        </div>

        <div style="padding:10px 10px;">
            <div class="row">

            </div>


            <div class=" mt-2 d-flex justify-content">
                <!--<button type="button"-->
                <!--@click="$router.push(`/contract/${contractData.temId}/sl/${contractData.conId}`)"-->
                <!--class="m-r-5 btn btn-outline-info btn-border-radius waves-effect myFont16">-->
                <!--複製-->
                <!--</button>-->
                <button type="button" @click="removeItem(item.uniqueId)"
                        class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">刪除
                </button>
            </div>

        </div>
    </div>
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
        watch: {
            companyUse: {
                handler(newVal) {
                    this.item.iteSubsidiaries = this.item.iteSubsidiaries.filter((comCode) =>
                        newVal.includes(comCode)
                    );
                    this.item.iteProportion.forEach(v => {
                        if (!this.item.iteSubsidiaries.includes(v.comCode)) {
                            v.p = 0;
                        }
                    });
                },
                deep: true, // 深度监听数组内元素的变化
            },
            'item.iteSubsidiaries': {
                handler(newVal) {
                    this.item.iteProportion.forEach(v => {
                        if (!this.item.iteSubsidiaries.includes(v.comCode)) {
                            v.p = 0;
                        }
                    });
                }
            }
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
                this.item.manType = '0';
                const dis = this.$refs.dis.querySelector('option:checked');
                this.item.disType = parseInt(dis.getAttribute('data-type'));
            },
            manChange() {
                const man = this.$refs.man.querySelector('option:checked');
                this.item.manType = parseInt(man.getAttribute('data-type'));
                // if ('0' === this.manType) {
                //     this.item.iteProportion.forEach(ite=>
                //     ite.p = '0');
                // }
            },
        },
    };
</script>

<style scoped>
    .m-clean {
        cursor: pointer;
    }

    .form-check {
        font-size: 16px;
    }

    .my-list ul li {
        float: left;
        list-style: none;
    }

    .contract-title .myNotification {
        min-height: auto !important;
    }

    .d-flex i {
        padding-right: 10px;
    }

</style>
