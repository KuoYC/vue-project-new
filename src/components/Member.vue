<template>
    <td>
        <select v-model="member.memBu1Code" class="form-control" ref="bu1" @change="Bu1Change">
            <template v-if="member.memType === '0' || member.memType === '1'">
                <template v-for="com in companyData">
                    <option v-if="com.comCode === member.memBu1Code" :value="com.comCode" :comCode="com.comCode">
                        {{com.comTitle}}
                    </option>
                </template>
            </template>
            <template v-else>
                <option value="">公司</option>
                <option v-for="com in companyData" :value="com.comCode" :key="com.comId"
                        :disabled="!companyUse.includes(com.comCode)">
                    {{ com.comTitle }}
                </option>
            </template>
        </select>
    </td>
    <td>
        <select v-model="member.memBu2Code" class="form-control" ref="bu2" @change="Bu2Change">
            <template v-if="member.memType === '0'">
                <template v-for="bu2 in bu2Data">
                    <option v-if="bu2.perBu2Code === member.memBu2Code" :value="bu2.perBu2Code" :department="bu2.perBu2">
                        {{bu2.perBu2}}
                    </option>
                </template>
            </template>
            <template v-else>
                <option value="" buName="">部門</option>
                <option v-for="bu2 in bu2Data" :value="bu2.perBu2Code" :department="bu2.perBu2">
                    {{bu2.perBu2}}
                </option>
            </template>
        </select>
    </td>
    <td>
        <select v-model="member.memBu3Code" class="form-control" ref="bu3" @change="Bu3Change">
            <template v-if="member.memType === '0'">
                <template v-for="bu3 in bu3Data">
                    <option v-if="bu3.perBu3Code === member.memBu3Code" :value="bu3.perBu3Code" :division="bu3.perBu3">
                        {{bu3.perBu3}}
                    </option>
                </template>
            </template>
            <template v-else>
                <option value="" buName="">科部</option>
                <option v-for="bu3 in bu3Data" :value="bu3.perBu3Code" :division="bu3.perBu3">
                    {{bu3.perBu3}}
                </option>
            </template>
        </select>
    </td>
    <td>
        <select v-model="member.memLV2Key" class="form-control" :disabled="member.memLV1Key === '' || member.memLV0Key === ''" ref="lv2"
                @change="LV2Change">
            <option value="">部門主管</option>
            <option v-for="per in personnel1Data" :value="per.perKey" :key="per.perId"
                    :perName="per.perName"
                    :positionName="per.perPositionName" :bu1="per.perBu1" :bu2="per.perBu2" :bu3="per.perBu3">
                {{ per.perName }}
            </option>
        </select>
    </td>
    <td>
        <select v-model="member.memLV1Key" class="form-control" :disabled="member.LV0 === ''" ref="lv1" @change="LV1Change">
            <option value="">科別主管</option>
            <option v-for="per in personnel2Data" :value="per.perKey" :key="per.perId"
                    :perName="per.perName"
                    :positionName="per.perPositionName" :bu1="per.perBu1" :bu2="per.perBu2" :bu3="per.perBu3">
                {{ per.perName }}
            </option>
        </select>
    </td>
    <td>
        <select v-model="member.memLV0Key" class="form-control" :disabled="lv_disabled" ref="lv0" @change="LV0Change">
            <option value="">承辦人</option>
            <option v-for="per in personnel3Data" :value="per.perKey" :key="per.perId"
                    :perName="per.perName"
                    :positionName="per.perPositionName" :bu1="per.perBu1" :bu2="per.perBu2" :bu3="per.perBu3"
                    :phone="per.perPhone2 + ' ' + per.perPhone3">
                {{ per.perName }}
            </option>
        </select>
    </td>
    <td>
        <input v-if="typeof member.memPhone !== 'undefined' && member.memPhone !== ''" :value="member.memPhone" type="text" disabled class="form-control" style="background-color: white;"/>
        <input v-else v-model="member.memPhone" type="text" disabled class="form-control" style="background-color: white;"/>
    </td>
    <td><vue-feather type="trash-2" size="20" class="m-clean" @click="removeMember(member.uniqueId)" v-show="use_close"></vue-feather></td>

</template>

<script>
    export default {
        name: "Member",
        emits: ['remove-member'],
        props: {
            companyData: {
                type: Array,
                default: () => [],
            },
            companyUse: {
                type: [Array, String],
                default: () => [],
                required: true,
            },
            member: {
                type: Object,
                default: () => [],
                required: false,
            },
            use_contact: {
                type: Boolean,
                default: () => false,
            },
            use_close: {
                type: Boolean,
                default: () => true,
            },
            lv_disabled: {
                type: Boolean,
                default: () => false,
            }
        },
        data() {
            return {
                bu2Data: [],
                bu3Data: [],
                contactData: [],
                personnel1Data: [],
                personnel2Data: [],
                personnel3Data: [],
            };
        },
        computed: {},
        watch: {
            // member:{
            //     handler(new_member) {
            //         this.getBu2();
            //         this.getBu3();
            //     },
            //     deep: true,
            // },
        },
        mounted() {
            if (this.member.memBu1Code) {
                this.getBu2();
                this.getBu3();
                this.getContact();
            }
            if (this.member.memBu2Code) {
                this.getBu3();
            }
            if ('' !== this.member.memLV0Key && '' === this.member.memLV1Key && '' === this.member.memLV2Key) {
                this.getVIP();
            }
        },
        methods: {
            removeMember() {
                this.$emit('remove-member', this.member.uniqueId);
            },
            // LVCChange() {
            //     if (this.member.memLVCKey !== '') {
            //         const mem = this.$refs.lvc.querySelector('option:checked');
            //         this.member.memLVCName = mem.getAttribute('perName');
            //         this.member.memLVCPositionName = mem.getAttribute('positionName');
            //     }
            //     else {
            //         this.member.memLVCName = '';
            //         this.member.memLVCPositionName = '';
            //     }
            // },
            LV0Change() {

                // const mem = this.member.LV0.split("|");
                // this.member.memLV0 = mem[0];
                // this.member.memLV0Position= mem[1];

                const mem = this.$refs.lv0.querySelector('option:checked');
                this.member.memLV0Name = mem.getAttribute('perName');
                this.member.memLV0PositionName = mem.getAttribute('positionName');
                this.member.memPhone = mem.getAttribute('phone');
                this.getVIP();
            },
            LV1Change() {

                // const mem = this.member.LV0.split("|");
                // this.member.memLV0 = mem[0];
                // this.member.memLV0Position= mem[1];

                const mem = this.$refs.lv1.querySelector('option:checked');
                this.member.memLV1Name = mem.getAttribute('perName');
                this.member.memLV1PositionName = mem.getAttribute('positionName');
            },
            LV2Change() {

                // const mem = this.member.LV0.split("|");
                // this.member.memLV0 = mem[0];
                // this.member.memLV0Position= mem[1];

                const mem = this.$refs.lv2.querySelector('option:checked');
                this.member.memLV2Name = mem.getAttribute('perName');
                this.member.memLV2PositionName = mem.getAttribute('positionName');
            },
            Bu1Change(){
                this.member.memBu2Code = '';
                this.member.memBu2 = '';
                this.getBu2();
            },
            Bu2Change(){
                this.member.memBu3Code = '';
                this.member.memBu3 = '';
                const mem = this.$refs.bu2.querySelector('option:checked');
                this.member.memBu2 = mem.getAttribute('department');
                this.getBu3();
            },
            Bu3Change(){
                const mem = this.$refs.bu3.querySelector('option:checked');
                this.member.memBu3 = mem.getAttribute('division');
                this.getPersonnelAll();
            },
            getBu2() {
                if (this.member.memBu1Code === '') {
                    this.bu2Data = [];
                }
                else {
                    this.$api
                        .get(this.$test ? `/api/?type=personnel_group&col=2&perBu1Code=${this.member.memBu1Code}` : '/api/iform/template')
                        .then(response => {
                            this.bu2Data = response.data.data;
                            this.getPersonnel1();
                            this.getPersonnel2();
                            this.getPersonnel3();
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            },
            getBu3() {
                if (this.member.memBu1Code === '' || this.member.memBu2Code === '') {
                    this.bu3Data = [];
                }
                else {
                    this.$api
                        .get(this.$test ? `/api/?type=personnel_group&col=3&perBu1Code=${this.member.memBu1Code}&perBu2Code=${this.member.memBu2Code}` : '/api/iform/template')
                        .then(response => {
                            this.bu3Data = response.data.data;
                            this.getPersonnel1();
                            this.getPersonnel2();
                            this.getPersonnel3();
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            },
            getContact() {
                if (this.member.memType === '0') {
                    this.$api
                        .get(this.$test ? `/api/?type=contact&comCode=${this.member.memBu1Code}` : '/api/iform/template')
                        .then(response => {
                            this.contactData = response.data.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    this.contactData = [];
                }
            },
            getPersonnelAll() {
                this.getPersonnel1();
                this.getPersonnel2();
                this.getPersonnel3();

            },
            async getPersonnel1() {
                if (this.member.memBu1Code && this.member.memBu2Code && this.member.memBu3Code) {
                    this.$api
                        .get(this.$test ? `/api/?type=personnel&perBu1Code=${this.member.memBu1Code}&perBu2Code=${this.member.memBu2Code}&perBu3Code=${this.member.memBu3Code}` : `/api/iform/personnel?perBu1Code=${this.member.memBu1Code}&perBu2Code=${this.member.memBu2Code}&perBu3Code=${this.member.memBu3Code}`)
                        .then(response => {
                            this.personnel1Data = response.data.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    this.personnel1Data = [];
                }
            },
            async getPersonnel2() {
                if (this.member.memBu1Code && this.member.memBu2Code && this.member.memBu3Code) {
                    this.$api
                        .get(this.$test ? `/api/?type=personnel&perBu1Code=${this.member.memBu1Code}&perBu2Code=${this.member.memBu2Code}&perBu3Code=${this.member.memBu3Code}` : `/api/iform/personnel?perBu1Code=${this.member.memBu1Code}&perBu2Code=${this.member.memBu2Code}&perBu3Code=${this.member.memBu3Code}`)
                        .then(response => {
                            this.personnel2Data = response.data.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    this.personnel2Data = [];
                }
            },
            async getPersonnel3() {
                if (this.member.memBu1Code && this.member.memBu2Code && this.member.memBu3Code) {
                    this.$api
                        .get(this.$test ? `/api/?type=personnel&perBu1Code=${this.member.memBu1Code}&perBu2Code=${this.member.memBu2Code}&perBu3Code=${this.member.memBu3Code}` : `/api/iform/personnel?perBu1Code=${this.member.memBu1Code}&perBu2Code=${this.member.memBu2Code}&perBu3Code=${this.member.memBu3Code}`)
                        .then(response => {
                            this.personnel3Data = response.data.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    this.personnel3Data = [];
                }
            },
            async getVIP() {
                if (this.member.memBu1Code && this.member.memBu2Code && this.member.memBu3Code) {
                    this.$api
                        .get(this.$test ? `/api/?type=vip&perKey=${this.member.memLV0Key}` : `/api/iform/personnel?perBu1Code=${this.member.memBu1Code}&perBu2Code=${this.member.memBu2Code}&perBu3Code=${this.member.memBu3Code}`)
                        .then(response => {
                            const vip = response.data.data;
                            if (vip.lv1) {
                                this.personnel2Data = {};
                                this.personnel2Data[0] = vip.lv1;
                                this.member.memLV1Key = vip.lv1.perKey;
                                this.member.memLV1PositionName = vip.lv1.perPositionName;
                                console.log(vip.lv1.perKey);
                            }
                            if (vip.lv2) {
                                this.personnel1Data = {};
                                this.personnel1Data[0] = vip.lv2;
                                this.member.memLV2Key = vip.lv2.perKey;
                                this.member.memLV2PositionName = vip.lv2.perPositionName;
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    this.personnel1Data = [];
                }
            }
        },
    };
</script>

<style scoped>
    .m-clean {
        cursor: pointer;
        color: #6f6f6f;
    }

</style>
