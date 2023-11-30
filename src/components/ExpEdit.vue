<template>
    <!--<div class="col-4 mb-2">-->
        <!--<div class="input-group">-->
            <!--<span class="input-group-text">預計分攤總額</span>-->
            <!--<input type="number" :value="expSum" class="form-control"/>-->
        <!--</div>-->
    <!--</div>-->

    <table class="newTable" style="width: auto;">
        <caption>各公司預計分攤費用參考</caption>
        <thead style="position: sticky;top: 0;" class="myNew">
        <tr>
            <th class="text-center" style="min-width: 100px;"
                scope="col"></th>
            <template v-for="exp in expData">
                <th v-if="companyUse.includes(exp.comCode)" class="text-center"
                    scope="col" style="min-width:120px; max-width: 120px;">{{ exp.comTitle }}
                </th>
            </template>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                分攤比例
            </td>
            <template v-for="exp in expData">
                <td v-if="companyUse.includes(exp.comCode)">
                    <div class="input-group">
                    <input type="number" v-model="exp.comPercent" class="form-control" onclick="this.select();"/>
                        <span class="input-group-text">%</span>
                    </div>
                </td>
            </template>
            <!--<template v-for="exp in expData">-->
                <!--<td v-if="companyUse.includes(exp.comCode)">-->
                    <!--{{ !exp.comValue || exp.comValue === '' || exp.comValue === 0 || expSum === 0 ? 0 : (exp.comValue / expSum * 100).toFixed(2)}}%-->
                <!--</td>-->
            <!--</template>-->
        </tr>
        <tr>
            <td>
                分攤費用
            </td>
            <template v-for="exp in expData">
                <td v-if="companyUse.includes(exp.comCode)">
                    <input type="number" v-model="exp.comValue" class="form-control" onclick="this.select();"/>
                </td>
            </template>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "expEdit",
        props: {
            expData: {
                type: Array,
                default: () => [],
                required: true,
            },
            companyUse: {
                type: Array,
                default: () => [],
                required: true,
            },
            expSum: {
                type: Number,
                required:true
            }
        },
        data() {
            return {
            }
        },
        watch: {
            // expData: {
            //     handler(newValue) {
            //         this.expSum = newValue.reduce((sum, exp) => sum + (exp.comValue || 0), 0);
            //     },
            //     deep: true,
            // },
        },
    }
</script>

<style scoped>

</style>