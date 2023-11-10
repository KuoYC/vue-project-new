<template>
    <section class="section">
        <!-- breadcrumb -->
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">首頁</h4>
            </li>
            <!-- <li class="breadcrumb-item">
              <a href="index.html">
                <i data-feather="home"></i></a>
            </li>
            <li class="breadcrumb-item active">Dashboard</li> -->
        </ul>
        <!-- breadcrumb -->


        <!-- 主要內容 -->
        <div class="card">
            <div class="boxs mail_listing">
                <div class="inbox-body no-pad">
                    <section class="mail-list">
                        <div class="mail-sender">
                            <div class="mail-heading">
                                <h4 class="vew-mail-header">
                                    <div class="author-box-name d-flex justify-content-between"
                                         style="margin-bottom: 20px;">
                                        <h4 class="myCardTitle" href="#"><vue-feather type="book" size="20"
                                                                                      class="m-r-5"></vue-feather>費用分攤明細表
                                        </h4>
                                        <div class="dropdown d-inline mr-2">
                                            <button class="btn btn-success dropdown-toggle" type="button"
                                                    id="dropdownMenuButton3"
                                                    data-bs-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                2023年
                                            </button>
                                            <div class="dropdown-menu" style="">
                                                <a class="dropdown-item" href="#">2024年</a>
                                                <a class="dropdown-item" href="#">2025年</a>
                                                <a class="dropdown-item" href="#">2026年</a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="author-box-name d-flex" style="margin-bottom: 20px;">
                          <span class="myFont16 d-flex align-center"
                                style="background-color:#6777ef ;color: white;border-radius: 6px;padding: 0.3rem 0.8rem;font-weight: 400;">
                            <vue-feather type="tag" size="20" style="transform: rotate(135deg);"
                                         class="m-r-10"></vue-feather>{{ contractData.temTitle }}</span>
                                    </div>
                                    <!-- 這裡放主旨title -->
                                    <b style="font-weight: 600;">{{ contractData.conTitle }}</b>
                                </h4>
                            </div>
                            <div class="d-flex mb-4 mt-2">
                                <div class="flex-grow-1">
                                    <!-- 這裡放承辦單位 -->
                                    <div class="myFont16Title">承辦單位： <span class="date myFont16">{{ contractData.perBu2}}  {{ contractData.perBu3}}</span></div>
                                    <!-- 這裡放承辦人 -->
                                    <div class="myFont16Title">承辦人： <span class="data myFont16">{{ contractData.perName}}</span></div>
                                    <!-- 這裡放聯絡電話 -->
                                    <div class="myFont16Title">聯絡電話： <span class="data myFont16">{{ contractData.perPhone1}}  {{ contractData.perPhone2}}  {{ contractData.perPhone3}}</span></div>
                                    <br>
                                    <!-- 這裡放管理維運公司 -->
                                    <div class="myFont16Title">管理維運公司： <span class="data myFont16">{{ contractData.comTitle }}</span></div>
                                    <!-- 這裡放使用公司 -->
                                    <div class="myFont16Title">使用公司： <span class="data myFont16"><template
                                            v-for="(option, idx) in contractData.conCompany.split('|')">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getCompanyTitle('', option)}}</template></span>
                                    </div>
                                    <!-- 這裡放作業種類 -->
                                    <div class="myFont16Title">作業種類： <span class="data myFont16"><template
                                            v-for="(option, idx) in contractData.conWork.split('|')">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getWorkTitle(option)}}</template></span></div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="author-box-name d-flex" style="margin-bottom: 20px;">
                    <span class="myFont16 d-flex align-center"
                          style="background-color:#6777ef ;color: white;border-radius: 6px;padding: 0.3rem 0.8rem;font-weight: 400;">
                      <vue-feather type="tag" size="20" style="transform: rotate(135deg);"
                                   class="m-r-10"></vue-feather>2023年各公司分攤費用</span>
                        </div>


                        <table ref="testTable" :class="theWidth <= 640 ? 'tables-min' : 'tables-def'">
                            <thead>
                            <tr>
                                <th></th>
                                <th>金控</th>
                                <th>人壽</th>
                                <th>銀行</th>
                                <th>產險</th>
                                <th>證券</th>
                                <th>加總</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>預估比例</td>
                                <td><b>金控</b><span>10%</span></td>
                                <td><b>人壽</b><span>10%</span></td>
                                <td><b>銀行</b><span>10%</span></td>
                                <td><b>產險</b><span>10%</span></td>
                                <td><b>證券</b><span>10%</span></td>
                                <td><b>加總</b><span>10%</span></td>
                            </tr>

                            <tr>
                                <td>預估費用</td>
                                <td>10%</td>
                                <td>10%</td>
                                <td>10%</td>
                                <td>10%</td>
                                <td>10%</td>
                                <td>10%</td>
                            </tr>

                            <tr>
                                <td>實際分攤</td>
                                <td>10%</td>
                                <td>10%</td>
                                <td>10%</td>
                                <td>10%</td>
                                <td>10%</td>
                                <td>10%</td>
                            </tr>

                            </tbody>
                        </table>

                        <!-- 這裡放內文 -->

                        <hr>
                        <div class="author-box-name d-flex" style="margin-bottom: 20px;">
                    <span class="myFont16 d-flex align-center"
                          style="background-color:#6777ef ;color: white;border-radius: 6px;padding: 0.3rem 0.8rem;font-weight: 400;">
                      <vue-feather type="tag" size="20" style="transform: rotate(135deg);"
                                   class="m-r-10"></vue-feather>費用分攤明細</span>
                        </div>
                        <!-- 這裡放內文 -->


                        <!-- 這裡col-6 跟 col-4 切換，當切到col-4時 table 父層div width:50% 要切到width:33% -->
                        <div class="d-flex">

                            <div :style="viewFile ? 'width:33%;' : 'width:50%;'"
                                 style="margin-right: 10px;position: relative;">
                                <vue-feather type="plus" class="item-plus" size="20" style="position: absolute;right: 0;top: -50px;font-weight: 700;"></vue-feather>
                                <table class="myTable myTableTwo col-4">
                                    <thead>
                                    <tr>
                                        <th>共用作業項目</th>
                                        <th>種類</th>
                                        <th>軟硬體名稱</th>
                                        <th>費用</th>
                                        <th>提列年度</th>
                                        <th>分攤月數</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>訊息平台軟體</td>
                                        <td>軟體</td>
                                        <td>SQL</td>
                                        <td>$200,000</td>
                                        <td>2024年</td>
                                        <td>36</td>
                                        <td>
                                            <i class="material-icons">mode_edit</i>
                                            <i class="material-icons">delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>訊息平台軟體</td>
                                        <td>軟體</td>
                                        <td>SQL</td>
                                        <td>$200,000</td>
                                        <td>2024年</td>
                                        <td>36</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>訊息平台軟體</td>
                                        <td>軟體</td>
                                        <td>SQL</td>
                                        <td>$200,000</td>
                                        <td>2024年</td>
                                        <td>36</td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div :class="viewFile ? 'col-4' : 'col-6'" class="myShowDetail" style="overflow-x: auto;">
                                <h4 class="myCardTitle">項目資訊</h4>
                                <div class="d-flex mb-5">
                                    <div class="col-6">
                                        <div class="myFont16Title">共用作業項目：<span class="myFont16">訊息平台軟體</span></div>
                                        <div class="myFont16Title">種類：<span class="myFont16">軟體</span></div>
                                        <div class="myFont16Title">軟硬體名稱：<span class="myFont16">授權費</span></div>
                                        <div class="myFont16Title">合約期間：<span class="myFont16">113/7</span></div>
                                        <div class="myFont16Title">財產編號：<span class="myFont16">E080493624</span></div>
                                    </div>
                                    <div class="col-6">
                                        <div class="myFont16Title">費用：<span class="myFont16">1000000</span></div>
                                        <div class="myFont16Title">分攤原則：<span class="myFont16">依各公司業務適用之人數比例分攤</span>
                                        </div>
                                        <div class="myFont16Title">分攤比例說明：<span class="myFont16"></span></div>
                                    </div>
                                </div>

                                <h4 class="myCardTitle">各年度分攤費用</h4>
                                <table class="myTable myTableThree mb-5">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>2024年度</th>
                                        <th>2025年度</th>
                                        <th>2026年度</th>
                                        <th>2027年度</th>
                                        <th>2028年度</th>
                                        <th>2029年度</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>費用期間起迄</td>
                                        <td>2024/1/1-2024/12/31</td>
                                        <td>2024/1/1-2024/12/31</td>
                                        <td>2024/1/1-2024/12/31</td>
                                        <td>2024/1/1-2024/12/31</td>
                                        <td>2024/1/1-2024/12/31</td>
                                        <td>2024/1/1-2024/12/31</td>
                                    </tr>
                                    <tr>
                                        <td>費用</td>
                                        <td>3333</td>
                                        <td>3333</td>
                                        <td>3333</td>
                                        <td>3333</td>
                                        <td>3333</td>
                                        <td>3333</td>
                                    </tr>
                                    </tbody>
                                </table>


                                <h4 class="myCardTitle">各公司分攤費用</h4>
                                <table class="myTable myTableFour mb-5">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>金控</th>
                                        <th>人壽</th>
                                        <th>銀行</th>
                                        <th>產險</th>
                                        <th>證券</th>
                                        <th>加總</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>分攤數量</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                    </tr>

                                    <tr>
                                        <td>分攤比例</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                    </tr>

                                    <tr>
                                        <td>分攤金額</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                        <td>10%</td>
                                    </tr>

                                    </tbody>
                                </table>

                                <h4 class="myCardTitle">佐證資料</h4>
                                <div class="replyBox m-t-20 myFont16">
                                    <span>
                                      <!-- 這裡放附檔 -->
                                      <div>
                                        <a href="javascript:void(0);" @click="openViewFile('1')">顧問報告.pdf</a> |
                                        <a href="javascript:void(0);">顧問報告.pdf</a> |
                                        <a href="javascript:void(0);">顧問報告.pdf</a> |
                                      </div>
                                      <p></p>
                                    </span>
                                </div>
                            </div>

                            <template v-if="viewFile">
                                <div id="myPdfViewer" class="col-4" style="height: 65vh; position: sticky; top:100px;">
                                    <div class="card-header d-flex justify-content-end">
                                        <button type="button" id="closePdfViewer" @click="closeViewFile"
                                                class="btn btn-icon icon-left btn-primary myFont16"
                                                style="border-radius: 6px;">
                                            取消檢視
                                        </button>
                                    </div>
                                    <embed src="https://digitaldreams.tw/pdf/doc.pdf" width="100%" height="100%"/>
                                </div>
                            </template>
                            <!-- 主要內容 -->

                        </div>
                    </section>
                </div>
            </div>
        </div>

        <!-- 主要內容 -->
    </section>
</template>

<script>
    import Cookies from 'js-cookie'
    import VueOfficeDocx from '@vue-office/docx';
    import '@vue-office/docx/lib/index.css';
    import VueOfficeExcel from '@vue-office/excel';
    import '@vue-office/excel/lib/index.css';
    import VueOfficePdf from '@vue-office/pdf';

    export default {
        name: "Exes_ad",
        data() {
            return {
                per: JSON.parse(Cookies.get('per')),
                viewFile: false,
                viewFileUrl: '',
                viewFilePDF: false,
                viewFileDOCK: false,
                viewFileXLSE: false,
                isSidebarVisible: false,
                msg: '',//理由
                contractData: {},
                conValue: [],
                itemData: [],
                iMemberData: [],//發起
                mMemberData: [],//維運
                uMemberData: [],//使用
                contactData: [],
                theWidth: 0,
                testWidth:0,


                templateStyleData: [],
                subsidiaryData: [],
                workData: [],
                itemList: [], // 新增一個空的數組
                iMemberList: [],//發起
                mMemberList: [],//維運
                uMemberList: [],//使用

                conFileMeeting: [],
                conFilePlan: [],
                conFile: [],
            }
        },
        components: {
            VueOfficeDocx,
            VueOfficeExcel,
            VueOfficePdf,
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
            this.$nextTick(() => {
                this.theWidth = this.$refs.testTable.offsetWidth;
            });
            window.addEventListener('resize', () => this.getWidth()); // 监听窗口大小变化并更新宽度
            // 添加全域點擊事件監聽器
            window.addEventListener('click', this.handleGlobalClick);
        },
        beforeUnmount() {
            // 在元件銷毀之前移除事件監聽器
            window.removeEventListener('click', this.handleGlobalClick);
            window.removeEventListener('resize', () => this.getWidth()); // 移除监听器以避免内存泄漏
        },
        methods: {
            getWidth(){
                this.theWidth = this.$refs.testTable.offsetWidth;
            },
            defaultData() {

            },
            fetchFirst() {
                window.scrollTo(0, 0);
                const conId = this.$route.params.con; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=contract&conId=${conId}` : `/api/adm/contract/${conId}`),
                    this.$api.get(this.$test ? `/api/?type=contractItem` : `/api/iform/contractItem/List`, {params:{conId:conId}}),
                    this.$api.get(this.$test ? `/api/?type=contractMember` : `/api/iform/contractMember/List`, {params:{conId:conId}}),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, itemResponse, memberResponse, contactResponse]) => {
                        //contactResponse
                        this.contactData = contactResponse.data.data;

                        //contractResponse
                        this.contractData = contractResponse.data.data;
                        this.conValue = this.contractData?.conValue ? JSON.parse(this.contractData.conValue) : null;
                        this.conFileMeeting = this.contractData?.conFileMeeting ? this.contractData.conFileMeeting.split('|') : null;
                        this.conFilePlan = this.contractData?.conFilePlan ? this.contractData.conFilePlan.split('|') : null;
                        this.conFile = this.contractData?.conFile ? this.contractData.conFile.split('|') : null;

                        // itemResopnse
                        this.itemData = itemResponse.data.data;
                        this.itemData.forEach((item) => {
                            item.iteProportion = item.iteProportion && '' !== item.iteProportion ? JSON.parse(item.iteProportion) : item.iteProportion;
                        });

                        // memberResponse
                        this.iMemberData = memberResponse.data.data.find(member => member.memType === '0');
                        this.mMemberData = memberResponse.data.data.filter(member => member.memType === '1');
                        this.uMemberData = memberResponse.data.data.filter(member => member.memType === '2');

                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            closeViewFile() {
                this.viewFilePDF = false;
                this.viewFileDOCK = false;
                this.viewFileXLSE = false;
                this.viewFile = false;
                this.viewFileUrl = '';
            },
            openViewFile(url) {
                this.viewFile = true;

                // this.viewFilePDF = false;
                // this.viewFileDOCK = false;
                // this.viewFileXLSE = false;
                //
                // if (url.endsWith(".docx")) {
                //     this.viewFileDOCK = true;
                // }
                // else if (url.endsWith(".xlsx")) {
                //     this.viewFileXLSE = true;
                // }
                // else if (url.endsWith(".pdf") || url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif")) {
                //     this.viewFilePDF = true;
                // }
                //
                // if (this.viewFilePDF || this.viewFileDOCK || this.viewFileXLSE) {
                //     this.viewFileUrl = url;
                //     this.viewFile = true;
                // }
            },
        }
    }
</script>

<style scoped>
    .tables-min thead{
        display: none;
    }
    .tables-min td{
        display: block;
        float: left;
        clear: left;
        width: 100%;
    }
    .tables-min b {
        display: inline-block;
        padding: 0 1.2em 0 0;
        width: 30%;
        text-align: right;
    }
    .tables-def b {
        display: none;
    }

    table{
        width: 100%;
        border-collapse: collapse;
        border-radius: 10px ;
        overflow: hidden;
    }
    /* Zebra striping */
    /*table tr:nth-of-type(odd) {*/
        /*background: #ececec;*/
    /*}*/
    table th {
        background: #f0f3ff;
        color: #6777ef;
        font-weight: bold;
    }
    table td, table th {
        padding: 6px;
        border: 1px solid #ccc;
        /*text-align: center;*/
    }
    .item-plus :hover{
        color: red;
        cursor: pointer;
    }
</style>