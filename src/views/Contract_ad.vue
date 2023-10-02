<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">簽核單項</h4>
            </li>
            <li class="breadcrumb-item">新增文件</li>
        </ul>
        <div class="section-body">
            <div class="row">
                <div class="d-flex">
                    <!-- 主要內容 -->
                </div>
                <div class="col-6" style="padding-bottom: 20px;">
                    <button type="button" @click="createContract"
                            class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">儲存
                    </button>
                </div>
            </div>
        </div>
    </section>


    <!-- 浮動控制版 -->
    <div :class="isSidebarVisible ? 'settingSidebar showSettingPanel' : 'settingSidebar'" ref="sidebar">
        <a href="javascript:void(0)" class="settingPanelToggle" @click="sidebarClick"> <i
                class="fa fa-spin fa-cog"></i>
        </a>
        <div class="settingSidebar-body ps-container ps-theme-default">
            <div class=" fade show active">
                <div class="setting-panel-header">管理面板
                </div>
                <div class="p-15 border-bottom">
                    <div class="col-lg-12">
                        <div class="m-l-20">
                            <button type="button" @click="createContract"
                                    class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">儲存
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">文件架構</h6>
                    <ul class="contact-list">
                        <li v-for="(item, index) in conValue" class="nav-item" ref="tp">
                            <a class="nav-link myFont16" href="javascript:void(0);"
                               @click="scrollToElement('my' + index)">
                                {{ item.areaTitle }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- 浮動控制版 -->
</template>

<script>
    import Cookies from 'js-cookie'
    import Item from '@/components/Item.vue';
    import Member from '@/components/Member.vue';
    import DatePicker from '@vuepic/vue-datepicker';

    import '@vuepic/vue-datepicker/dist/main.css';

    export default {
        name: "Contract_ad",
        data() {
            return {
                per: JSON.parse(Cookies.get('per')),
                isSidebarVisible: false,//管理面板使用
                temId: 0,

                workData: [//作業種類
                    {worId: '0', worTitle: ''},
                ],
                companyData: [//公司
                    {comId: '0', comTitle: '', comCode: ''},
                ],
                categoryData: [//選單類型
                    {catId: '0', catTitle: '', catType: '', catWord: ''},
                ],
                sourceData: [//選單類型
                    {souId: '0', catId: '0', souTitle: ''},
                ],
                contractType: [{text: '新增', value: 0}, {text: '變更', value: 1}, {text: '終止', value: 2},],

                conTitle: '',
                conType: '0',//申請類別
                conDate: null,//生效日期
                // conSerial:'xxxxxxx',//序號
                account: '',
                templateData: {
                    temId: '',
                    temTitle: '',
                    temStyle: '',
                }, // 存放樣板資料的陣列
                conValue: [],//temStyle
                conWork: [],//作業種類
                conCompany: [],//使用公司
                timeData: [],

                personnelData: [],

                iMemberData: {},//發起
                mMemberData: [],//維運
                uMemberData: [],//使用
                itemData: [],//作業項目


                dpFormat: {
                    inputFormat: 'yyyy/MM/dd',
                    // weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    // months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                },
            };
        },
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            }
        },
        mounted() {
            // 添加全局點擊事件監聽器
            window.addEventListener('click', this.handleGlobalClick);//管理面板使用
        },
        beforeUnmount() {
            // 在組建銷毀之前移除事件監聽器
            window.removeEventListener('click', this.handleGlobalClick);//管理面板使用
        },
        components: {
            Item,
            Member,
            DatePicker,
        },
        methods: {
            defaultData() {

            },
            fetchFirst() {
                this.temId = this.$route.params.tem;
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=template&temId=${this.$route.params.tem}` : `/api/adm/contractTemplate/${this.$route.params.ctp}`),
                    this.$api.get(this.$test ? '/api/?type=work' : ''),
                    this.$api.get(this.$test ? '/api/?type=company' : ''),
                    this.$api.get(this.$test ? '/api/?type=category' : ''),
                    this.$api.get(this.$test ? '/api/?type=source' : ''),
                    this.$api.get(this.$test ? '/api/?type=distribution' : ''),
                ];

                Promise.all(apiRequests)
                    .then(([templateResponse, workResponse, companyResponse, categoryResponse, sourceResponse, distributionResponse]) => {
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                        this.conValue = this.templateData?.temStyle ? JSON.parse(this.templateData.temStyle) : null;
                        //workResponse
                        this.workData = workResponse.data.data;
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //categoryResponse
                        this.categoryData = categoryResponse.data.data;
                        //sourceResponse
                        this.sourceData = sourceResponse.data.data;
                        this.timeData = this.sourceData.filter(item => parseInt(item.catId) === 1);
                        //distributionResponse
                        this.distributionData = distributionResponse.data.data;

                        //設定發起人
                        this.iMemberData = {
                            uniqueId: this.generateUniqueId(),
                            memId: '0',
                            memType: '0',
                            memBu1Code: this.per.perBu1Code,
                            memBu2Code: this.per.perBu2Code,
                            memBu2: this.per.perBu2,
                            memBu3Code: this.per.perBu3Code,
                            memBu3: this.per.perBu3,
                            LV0: this.per.perNo + '|' + this.per.perPosition,
                            memLV0: this.per.perNo,
                            memLV0Name: this.per.perName,
                            memLV0Position: this.per.perPosition,
                            memLV0PositionName: this.per.perPositionName,
                            LVC: '',
                            memLVC: '',
                            memLVCPosition: '',
                            LV1: '',
                            memLV1: '',
                            memLV1Position: '',
                            LV2: '',
                            memLV2: '',
                            memLV2Position: '',
                            memPhone: this.per.perPhone2 + ' ' + this.per.perPhone3,
                        };
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            generateUniqueId() {
                return Math.random().toString(36).substr(2, 9);
            },
            createContract() {
                const memberList = [];
                memberList.push(this.iMemberData);
                this.mMemberData.forEach(member => {
                    memberList.push(member);
                });
                this.uMemberData.forEach(member => {
                    memberList.push(member);
                });
                const itemList = [];
                this.itemData.forEach(item => {
                    itemList.push(item);
                });
                itemList.forEach(item => {
                    item.iteSubsidiaries = item.iteSubsidiaries.join('|');
                });

                this.conValue.forEach(area => {
                    area.colItem.forEach(col => {
                        if (col.type?.startsWith('word')) {
                            this.categoryData.forEach(cat => {
                                if (parseInt(cat.catId) === parseInt(col.id)) {
                                    col.value = cat.catWord;
                                }
                            });
                        }
                    });
                });


                const payload = {
                    temId: this.temId,
                    perNo: this.per.perNo,
                    perPosition: this.per.perPosition,
                    comId: this.per.comId,
                    conTitle: this.conTitle,
                    conType: this.conType,
                    conDate: this.conDate,
                    conWork: this.conWork.join('|'),
                    conCompany: this.conCompany.join('|'),
                    conValue: JSON.stringify(this.conValue),
                    itemList: itemList,
                    memberList: memberList,
                };
                // console.log(JSON.stringify(payload));
                this.$api
                    .post(this.$test ? '/api/?type=contract' : '/api/adm/contract/addNew', payload)
                    .then(response => {
                        if (response.status === 200) {
                            this.$router.push(`/contract/${this.$route.params.tem}/sl/${response.data.conId}`);
                        } else {
                            console.log('err');
                        }
                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });


            },
            addItemData() {
                this.itemData.push({
                    uniqueId: this.generateUniqueId(),
                    iteId: 0,
                    conId: 0,//
                    iteTitle: '',
                    worId: 0,//
                    iteTime: '',
                    iteSubsidiaries: [],//
                    iteControl: '',
                    disId: 0,//
                    iteTypeNote: '',//
                    iteDescription: '',
                    iteFileMeeting: '',//
                    iteFilePlan: '',//
                    iteFile: [],//
                    iteWord: '',
                    iteNote: '',
                },);
            },
            removeItemData(uniqueId) {
                const index = this.itemData.findIndex(item => item.uniqueId === uniqueId);
                if (index !== -1) {
                    this.itemData.splice(index, 1);
                }
            },
            addMemberMData() {
                this.mMemberData.push(
                    this.createMemberData('1', Cookies.get('perBu1Code')),);
            },
            addMemberUData() {
                this.uMemberData.push(
                    this.createMemberData('2', ''),);
            },
            createMemberData(memType, memBu1Code) {
                const memberData = {
                    uniqueId: this.generateUniqueId(),
                    memId: '0',
                    memType: memType,
                    memBu1Code: memBu1Code,
                    memBu2Code: '',
                    memBu2: '',
                    memBu3Code: '',
                    memBu3: '',
                    LV0: '',
                    memLV0: '',
                    memLV0Name: '',
                    memLV0Position: '',
                    memLV0PositionName: '',
                    LVC: '',
                    memLVC: '',
                    memLVCName: '',
                    memLVCPosition: '',
                    memLVCPositionName: '',
                    LV1: '',
                    memLV1: '',
                    memLV1Name: '',
                    memLV1Position: '',
                    memLV1PositionName: '',
                    LV2: '',
                    memLV2: '',
                    memLV2Name: '',
                    memLV2Position: '',
                    memLV2PositionName: '',
                    memPhone: '',
                };
                return memberData;

            },

            removeMemberMData(uniqueId) {
                const index = this.mMemberData.findIndex(item => item.uniqueId === uniqueId);
                if (index !== -1) {
                    this.mMemberData.splice(index, 1);
                }
            },
            removeMemberUData(uniqueId) {
                const index = this.uMemberData.findIndex(item => item.uniqueId === uniqueId);
                if (index !== -1) {
                    this.uMemberData.splice(index, 1);
                }
            },

            //右方管理面板
            handleGlobalClick(event) {
                const sidebar = this.$refs.sidebar;
                if (this.isSidebarVisible && !sidebar.contains(event.target)) {
                    // 如果側邊欄可見且點擊事件不在側邊欄內部，則隱藏側邊欄
                    this.isSidebarVisible = false;
                }
            },
            sidebarClick() {
                if (!this.isSidebarVisible) {
                    this.isSidebarVisible = true;
                }
                else {
                    this.isSidebarVisible = false;
                }
            },
            scrollToElement(el) {
                // 取得要捲動到的目標元素
                const targetElement = document.getElementById(el);

                if (targetElement) {
                    // 計算滾動目標位置（目標元素的頂部位置減去 70 像素）
                    const targetScrollPosition = targetElement.offsetTop - 70;

                    // 使用 scrollIntoView() 方法捲動到目標位置
                    window.scrollTo({
                        top: targetScrollPosition,
                        behavior: "smooth", // 可以使用 "smooth" 实现平滑滚动
                    });
                }
            },
        },
    };
</script>

<style scoped>
    /*.textBox {*/
    /*border-style: dashed;*/
    /*border-color: darkgray;*/
    /*border-width: thin;*/
    /*}*/

    /*h4 {*/
    /*color: black;*/
    /*}*/

    /*.lb-title {*/
    /*text-align: right;*/
    /*}*/

    /*.collapse {*/
    /*background-color: #f6f6f6;*/
    /*}*/
    /*.example-drag label.btn {*/
    /*margin-bottom: 0;*/
    /*margin-right: 1rem;*/
    /*}*/

    /*.example-drag .drop-active {*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*position: fixed;*/
    /*z-index: 9999;*/
    /*opacity: .6;*/
    /*text-align: center;*/
    /*background: #000;*/
    /*}*/

    /*.example-drag .drop-active h3 {*/
    /*margin: -.5em 0 0;*/
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 0;*/
    /*right: 0;*/
    /*-webkit-transform: translateY(-50%);*/
    /*-ms-transform: translateY(-50%);*/
    /*transform: translateY(-50%);*/
    /*font-size: 40px;*/
    /*color: #fff;*/
    /*padding: 0;*/
    /*}*/
</style>
