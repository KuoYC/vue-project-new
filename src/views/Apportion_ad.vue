<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">表單申請</h4>
            </li>
            <li class="breadcrumb-item">
                <router-link :to="`/apportion/list`">
                    <vue-feather type="link"></vue-feather>
                    費用分攤明細表
                </router-link>
            </li>
            <li class="breadcrumb-item">新增文件</li>
        </ul>
        <div class="section-body">
            <div class="contract-serial mb-2" style="width: 100%;">
                <div class="dropdown d-inline mr-2" style="text-align:left;">
                    <button class="btn btn-success dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                        2024年
                    </button>
                    <div class="dropdown-menu" style="">
                        <a class="dropdown-item" href="#">2024年</a>
                        <a class="dropdown-item" href="#">2025年</a>
                        <a class="dropdown-item" href="#">2026年</a>
                    </div>
                </div>
                <div class="dropdown d-inline mr-2" style="text-align:right; float: right;">
                    <button class="btn btn-success dropdown-toggle" type="button"
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
            <div class="card contract-title">
                <div class="author-box-name d-flex justify-content-between"
                     style="margin-bottom: 20px;padding: 10px 25px;border-bottom-color: #f9f9f9;">
                    <h4 class="myCardTitle" style="font-size: x-large;">
                        {{ contractData.temTitle }}
                    </h4>
                    <div class="contract-serial">
                        <!-- 這裡放文件序號 -->
                        <div style="font-weight: 400;">文件序號：<span class="date">{{ contractData.conSerial }}{{ contractData.conVer }}</span>
                        </div>
                        <!-- 這裡放創文日期 -->
                        <div style="font-weight: 400;">創文日期：<span class="date">{{ this.$root.formatDate(contractData.conCreateTime) }}</span>
                        </div>
                    </div>
                </div>
                <div class="card-body myNotification d-flex">
                    <div class="myFont16Title" style="margin: 0 10px;">申請單位： <span
                            class="date myFont16">{{ contractData.perBu2}}  {{ contractData.perBu3}}</span>
                    </div>
                    <div class="myFont16Title" style="margin: 0 10px;">申請人： <span
                            class="date myFont16">{{ contractData.perName}}</span>
                    </div>
                    <div class="myFont16Title" style="margin: 0 10px;">聯絡電話： <span
                            class="date myFont16">{{ contractData.perPhone1}}  {{ contractData.perPhone2}}  {{ contractData.perPhone3}}</span>
                    </div>
                </div>
                <div class="card-body myNotification d-flex">
                    <div class="myFont16Title" style="margin: 0 10px;">管理維運公司： <span class="date myFont16">{{ contractData.comTitle }}</span>
                    </div>
                    <div class="myFont16Title" style="margin: 0 10px;">使用公司： <span
                            class="date myFont16">
                            <template v-if="contractData?.conCompany">
                                <template v-for="(option, idx) in contractData.conCompany.split('|')">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getCompanyTitle('', option)}}</template>
                            </template>
                        </span>
                    </div>
                    <div class="myFont16Title" style="margin: 0 10px;">作業種類： <span
                            class="date myFont16">
                            <template v-if="contractData?.conWork">
                                <template v-for="(option, idx) in contractData.conWork.split('|')">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getWorkTitle(option)}}</template>
                            </template>
                        </span>
                    </div>
                </div>
                <div class="card-body myNotification d-flex">
                    <div class="myFont16Title" style="margin: 0 10px;">申請類型：
                        <span v-if="'0' === apportionData.appType"
                              class="date myFont16">新增</span>
                        <span v-if="'1' === apportionData.appType"
                              class="date myFont16">變更</span>
                        <span v-if="'2' === apportionData.appType"
                              class="date myFont16">終止</span>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>{{ apportionData.appYear }}年各公司分攤費用</span>
                        </h4>
                    </div>
                    <div class="card-body myNotification">
                        <div class="table-responsive">
                            <table ref="testTable" class="newTable tables-def">
                                <thead style="position: sticky;top: 0;" class="myNew">
                                <tr>
                                    <th></th>
                                    <template v-if="contractData?.conCompany">
                                        <th v-for="(option, idx) in contractData.conCompany.split('|')">{{
                                            this.$root.getCompanyTitle('', option) }}
                                        </th>
                                    </template>
                                    <th>加總</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="cou in countCostData">
                                    <td>{{ cou.iteTitle }}</td>
                                    <td v-for="(option, idx) in contractData.conCompany.split('|')">{{ cou[option] }}
                                    </td>
                                    <td>{{ cou.costSum }}</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>費用分攤明細</span>
                        </h4>
                    </div>
                    <div class="card-body myNotification">
                        <div class="row">
                            <div class="col-12 sub-item">
                                <div class="row" style="margin-bottom: 20px;">
                                    <div class="table-responsive">
                                        <table class="newTable">
                                            <caption>費用分攤明細資料表</caption>
                                            <thead style="position: sticky;top: 0;" class="myNew">
                                            <tr>
                                                <th style="width: 20px;"></th>
                                                <th style="width: 50px;">種類</th>
                                                <th style="min-width: 110px;">共用作業項目</th>
                                                <th style="min-width: 120px;">軟硬體名稱</th>
                                                <th style="min-width: 80px;">分攤總費用</th>
                                                <th style="width: 80px;">提列年度</th>
                                                <th style="width: 70px;">操作</th>
                                            </tr>
                                            </thead>

                                            <tbody class="exesTable">
                                            <Exes v-for="(exes, exes_index) in apportionData.exesData"
                                                  :key="exes.uniqueId"
                                                  :idx="exes_index"
                                                  :exes="exes"
                                                  :itemData="itemData"
                                                  :nowYear="parseInt(infoData.infYear)"
                                                  @remove-exes="removeExesData"
                                                  @scrollExes="scrollToElement"
                                                  @checkMathAnnual="mathAnnual"
                                                  ref="ItemComp"
                                            />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class=" mt-2 d-flex justify-content">
                                    <button type="button" @click="addExesData"
                                            class="btn btn-icon icon-left btn-outline-success myFont16"
                                            style="border-radius: 6px;">新增一筆
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" style="position: static;">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>費用分攤明細</span>
                        </h4>
                    </div>
                    <div class="card-body">
                        <div v-for="exes in apportionData.exesData" class="card" :id="'ite_'+exes.uniqueId">
                            <div class="card-body mt-2">
                                <div class="row myShowDetail">
                                    <h4 class="myCardTitle">項目資訊</h4>
                                    <div class="d-flex mb-5 row">
                                        <div class="col-xl-2 col-md-2 col-sm-4 col-4">
                                            <label class="row-label row-title">種類</label>
                                            <label class="row-text">{{ exes.worTitle }}</label>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-8 col-8">
                                            <label class="row-label row-title">共用作業項目</label>
                                            <label class="row-text">{{ exes.iteTitle }}</label>
                                        </div>
                                        <div class="col-xl-3 col-md-6 col-sm-12 col-12">
                                            <label class="row-label row-title">分攤原則</label>
                                            <label class="row-text">{{ exes.disTitle}}</label>
                                        </div>
                                        <div class="col-xl-4 col-md-12 col-sm-12 col-12">
                                            <label class="row-label row-title">分攤比例說明</label>
                                            <label class="row-text">{{ exes.manTitle }}</label>
                                        </div>

                                        <div class="col-xl-3 col-md-3 col-sm-3 col-6">
                                            <label class="row-label row-title">軟硬體名稱</label>
                                            <label class="row-text">{{ exes.exeTitle }}</label>
                                        </div>
                                        <div class="col-xl-2 col-md-3 col-sm-3 col-6">
                                            <label class="row-label row-title">分攤總費用</label>
                                            <label class="row-text">{{ exes.exeCost}}</label>
                                        </div>
                                        <div class="col-xl-2 col-md-3 col-sm-3 col-6">
                                            <label class="row-label row-title">提列年度</label>
                                            <label class="row-text">{{ exes.exeStartYear}}</label>
                                        </div>
                                        <div class="col-xl-2 col-md-3 col-sm-3 col-6">
                                            <label class="row-label row-title">攤提月數(個)</label>
                                            <input type="number" v-model="exes.exeMonth" class="row-text"
                                                   style="width: 80px;" placeholder="0" onclick="this.select();"/>
                                        </div>
                                        <div class="col-xl-3 col-md-12 col-sm-12 col-12">
                                            <label class="row-label row-title">費用攤提起始年月</label>
                                            <DatePicker format="yyyy/MM"
                                                        v-model="exes.exeCreateMonth"
                                                        :enable-time-picker="false"
                                                        placeholder="費用攤提起始年月"
                                                        @closed="mathAnnual(exes)"
                                                        style="width: 140px;"/>
                                        </div>
                                        <div class="col-12">
                                            <div class="card-body">
                                                <ul class="nav nav-tabs" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <a class="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                           :href="'#ann_'+exes.uniqueId" role="tab"
                                                           aria-controls="home" aria-selected="true">各年度分攤費用</a>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <a class="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                           :href="'#exe_'+exes.uniqueId" role="tab"
                                                           aria-controls="profile" aria-selected="false" tabindex="-1">各公司年度分攤費用</a>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <a class="nav-link" id="contact-tab" data-bs-toggle="tab"
                                                           :href="'#fil_'+exes.uniqueId" role="tab"
                                                           aria-controls="contact" aria-selected="false" tabindex="-1">附件資料</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content" id="myTabContent">
                                                    <div class="tab-pane fade show active" :id="'ann_'+exes.uniqueId"
                                                         role="tabpanel" aria-labelledby="home-tab">
                                                        <div class="card-body" style="padding: 0px;">
                                                            <div class="">
                                                                <table class="newTable mb-5">
                                                                    <thead style="position: sticky;top: 0;"
                                                                           class="myNew">
                                                                    <tr>
                                                                        <th></th>
                                                                        <th v-for="ann in exes.annualData">{{
                                                                            ann.annYear }}年度
                                                                        </th>
                                                                    </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                    <tr>
                                                                        <td>費用起始</td>
                                                                        <td v-for="(ann, idx) in exes.annualData">
                                                                            {{ this.$root.formatDate(ann.annStartMonth)
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>費用迄止</td>
                                                                        <td v-for="(ann, idx) in exes.annualData">
                                                                            <DatePicker format="yyyy/MM/dd"
                                                                                        v-model="ann.annEndMonth"
                                                                                        placeholder="費用起始"
                                                                                        :enable-time-picker="false"
                                                                                        style="width: 180px;"
                                                                                        :min-date="ann.annStartMonth"
                                                                                        :max-date="new Date(ann.annYear, 11, 31)"
                                                                            />

                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>費用</td>
                                                                        <template v-for="ann in exes.annualData">
                                                                            <td>
                                                                                <input type="number"
                                                                                       v-model="ann.annCost"
                                                                                       class="row-text"
                                                                                       @input="mathCompany(ann)"
                                                                                       style="width: 120px;"
                                                                                       placeholder="0"
                                                                                       onclick="this.select();"/>
                                                                            </td>
                                                                        </template>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" :id="'exe_'+exes.uniqueId"
                                                         role="tabpanel" aria-labelledby="profile-tab">
                                                        <!-- 待簽列表 -->
                                                        <template v-for="ann in exes.annualData">
                                                            <table v-if="ann.annYear === parseInt(infoData.infYear)"
                                                                   class="newTable">
                                                                <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th v-for="sub in ann.subsidiaryData">{{
                                                                        this.$root.getCompanyTitle('', sub.comCode) }}
                                                                    </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>分攤數量</td>
                                                                    <td v-for="sub in ann.subsidiaryData">
                                                                        <input type="number" v-model="sub.subAmount"
                                                                               class="row-text"
                                                                               style="width: 120px;" placeholder="0"
                                                                               onclick="this.select();"/>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>分攤比例</td>
                                                                    <td v-for="sub in ann.subsidiaryData">
                                                                        <input type="number" v-model="sub.subPercent"
                                                                               class="row-text"
                                                                               @input="mathCompany(ann)"
                                                                               style="width: 120px;float: left;"
                                                                               placeholder="0"
                                                                               onclick="this.select();"/>
                                                                        <span style="float: end; line-height: 35px; padding-left: 3px;">%</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>分攤金額</td>
                                                                    <td v-for="sub in ann.subsidiaryData">
                                                                        <input type="number" v-model="sub.subCost"
                                                                               class="row-text"
                                                                               style="width: 120px;" placeholder="0"
                                                                               onclick="this.select();"/>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </template>
                                                        <!-- 待簽列表 -->
                                                    </div>
                                                    <div class="tab-pane fade" :id="'fil_'+exes.uniqueId"
                                                         role="tabpanel" aria-labelledby="contact-tab">
                                                        <!-- 待簽列表 -->
                                                        <table class="table table-bordered table-md">
                                                            <tbody>
                                                            <tr>
                                                                <th>編號</th>
                                                                <th>名稱</th>
                                                                <th>創建日期</th>
                                                                <th>狀態</th>
                                                                <th>查看</th>
                                                            </tr>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>資訊作業系統</td>
                                                                <td>2017-01-09</td>
                                                                <td>
                                                                    <div class="badge badge-success">Active</div>
                                                                </td>
                                                                <td>
                                                                    <!-- <a href="#" class="btn btn-primary">詳細內容</a>  -->
                                                                    <div class="action-btns"><a
                                                                            href="javascript:void(0);"
                                                                            class="action-btn btn-view bs-tooltip me-2"
                                                                            data-toggle="tooltip" data-placement="top"
                                                                            title="" data-bs-original-title="View"
                                                                            aria-label="View">
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none" stroke="currentColor"
                                                                                stroke-width="2" stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="feather feather-eye">
                                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                            <circle cx="12" cy="12" r="3"></circle>
                                                                        </svg>
                                                                    </a></div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>資訊作業系統</td>
                                                                <td>2017-01-09</td>
                                                                <td>
                                                                    <div class="badge badge-success">Active</div>
                                                                </td>
                                                                <td>
                                                                    <div class="action-btns"><a
                                                                            href="javascript:void(0);"
                                                                            class="action-btn btn-view bs-tooltip me-2"
                                                                            data-toggle="tooltip" data-placement="top"
                                                                            title="" data-bs-original-title="View"
                                                                            aria-label="View">
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none" stroke="currentColor"
                                                                                stroke-width="2" stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="feather feather-eye">
                                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                            <circle cx="12" cy="12" r="3"></circle>
                                                                        </svg>
                                                                    </a></div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>資訊作業系統</td>
                                                                <td>2017-01-11</td>
                                                                <td>
                                                                    <div class="badge badge-danger">Not Active</div>
                                                                </td>
                                                                <td>
                                                                    <div class="action-btns"><a
                                                                            href="javascript:void(0);"
                                                                            class="action-btn btn-view bs-tooltip me-2"
                                                                            data-toggle="tooltip" data-placement="top"
                                                                            title="" data-bs-original-title="View"
                                                                            aria-label="View">
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none" stroke="currentColor"
                                                                                stroke-width="2" stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="feather feather-eye">
                                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                            <circle cx="12" cy="12" r="3"></circle>
                                                                        </svg>
                                                                    </a></div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>資訊作業系統</td>
                                                                <td>2017-01-11</td>
                                                                <td>
                                                                    <div class="badge badge-success">Active</div>
                                                                </td>
                                                                <td>
                                                                    <div class="action-btns"><a
                                                                            href="javascript:void(0);"
                                                                            class="action-btn btn-view bs-tooltip me-2"
                                                                            data-toggle="tooltip" data-placement="top"
                                                                            title="" data-bs-original-title="View"
                                                                            aria-label="View">
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none" stroke="currentColor"
                                                                                stroke-width="2" stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="feather feather-eye">
                                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                            <circle cx="12" cy="12" r="3"></circle>
                                                                        </svg>
                                                                    </a></div>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <!-- 待簽列表 -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div class="col-6" style="padding-bottom: 20px;">
                <button type="button" @click="updateApportion"
                        class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">儲存
                </button>
                <button type="button" @click="deleteApportion"
                        class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">刪除
                </button>
            </div>

        </div>
    </section>

</template>

<script>
    import {ref} from 'vue';
    import Cookies from 'js-cookie'
    import Exes from '@/components/Exes.vue';
    import VueOfficeDocx from '@vue-office/docx';
    import '@vue-office/docx/lib/index.css';
    import VueOfficeExcel from '@vue-office/excel';
    import '@vue-office/excel/lib/index.css';
    import VueOfficePdf from '@vue-office/pdf';
    import {exesMixin} from '@/mixins/exesMixin.js';
    import DatePicker from '@vuepic/vue-datepicker';

    export default {
        name: "Apportion_ad",
        mixins: [exesMixin],
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
                contractData: [],
                apportionData: [],
                itemData: [],
                iMemberData: [],//發起
                mMemberData: [],//維運
                uMemberData: [],//使用
                contactData: [],
                theWidth: 0,
                testWidth: 0,
                infoData: {},//系統資訊
                countCostData: {},//


                templateStyleData: [],
                workData: [],
                // exesData: [], // 新增一個空的數組
                iMemberList: [],//發起
                mMemberList: [],//維運
                uMemberList: [],//使用

                conFileMeeting: [],
                conFilePlan: [],
                conFile: [],
                highlightedFirstDates: {
                    customPredictor(date) {
                        return date.getDate() === 1;
                    },
                }
            }
        },
        components: {
            VueOfficeDocx,
            VueOfficeExcel,
            VueOfficePdf,
            DatePicker,
            Exes,
        },
        computed: {
            formattedYearMonth() {
                const {year, month} = this.exes.exeStartYear;
                return `${year}/${month.toString().padStart(2, '0')}`;
            }
        },
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                },
                immediate: true,
            }
        },
        mounted() {
            // 添加全域點擊事件監聽器
            window.addEventListener('click', this.handleGlobalClick);
        },
        beforeUnmount() {
            // 在元件銷毀之前移除事件監聽器
            window.removeEventListener('click', this.handleGlobalClick);
        },
        methods: {
            defaultData() {
                this.fetchFirst();
            },
            fetchFirst() {
                // this.testExes();
                const conId = this.$route.params.con; // 取得路由參數 id
                const appId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=apportion&appId=${appId}` : `/api/adm/apportion/${appId}`),
                    this.$api.get(this.$test ? `/api/?type=contract&conId=${conId}` : `/api/adm/contract/${conId}`),
                    this.$api.get(this.$test ? `/api/?type=contractItem` : `/api/iform/contractItem/List`, {params: {conId: conId}}),
                    this.$api.get(this.$test ? `/api/?type=contractMember` : `/api/iform/contractMember/List`, {params: {conId: conId}}),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                    this.$api.get(this.$test ? '/api/?type=info' : '/api/iform/info/List'),
                ];
                Promise.all(apiRequests)
                    .then(([apportionResponse, contractResponse, itemResponse, memberResponse, contactResponse, infoResponse]) => {
                        //contactResponse
                        this.contactData = contactResponse.data.data;

                        //apportionResponse
                        this.apportionData = apportionResponse.data.data;
                        //contractResponse
                        this.contractData = contractResponse.data.data;

                        // itemResopnse
                        this.itemData = itemResponse.data.data;
                        this.itemData.forEach((item) => {
                            item.iteProportion = item.iteProportion && '' !== item.iteProportion ? JSON.parse(item.iteProportion) : item.iteProportion;
                        });

                        // memberResponse
                        this.iMemberData = memberResponse.data.data.find(member => member.memType === '0');
                        this.mMemberData = memberResponse.data.data.filter(member => member.memType === '1');
                        this.uMemberData = memberResponse.data.data.filter(member => member.memType === '2');
                        // infoResponse
                        this.infoData = infoResponse.data.data;


                        this.defaultCountData();

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
            scrollToElement(el) {
                this.$nextTick(() => {
                    const targetElement = document.getElementById('ite_' + el);
                    // console.log(targetElement);

                    if (targetElement) {
                        const targetScrollPosition = targetElement.offsetTop;

                        window.scrollTo({
                            top: targetScrollPosition,
                            behavior: "smooth",
                        });
                    }
                });
            },
            mathAnnual(exes) {
                if ('' !== exes.exeCost && '' !== exes.exeMonth && null !== exes.exeCreateMonth) {

                    const subsidiariesArray = exes.iteSubsidiaries.split('|');
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
                    if ('1' === exes.manType) {
                        subsidiarySet.forEach(sub => {
                            exes.iteProportion.forEach(ite => {
                                if (sub.comCode === ite.comCode) {
                                    sub.subPercent = parseFloat(ite.p);
                                }
                            });
                        });
                    }


                    exes.annualData = [];
                    const totalCost = parseInt(exes.exeCost);
                    const createYear = new Date(exes.exeCreateMonth).getFullYear();
                    const createMonth = new Date(exes.exeCreateMonth).getMonth();//parseInt(exes.exeCreateMonth.month);
                    const startYear = exes.exeStartYear;
                    const totalMonths = parseInt(exes.exeMonth);
                    const avgCost = Math.round(totalCost / totalMonths);

                    let nowYear = parseInt(startYear);
                    let overMonth = totalMonths;
                    let lastCost = totalCost;
                    const firstMonth = (nowYear - createYear) * 12 + (12 - createMonth);
                    const needYear = Math.ceil((totalMonths - firstMonth) / 12);


                    //計算總共需要年份
                    let endMonth = new Date(nowYear, 11, new Date(nowYear, 11 + 1, 0).getDate());
                    if (firstMonth > totalMonths) {
                        exes.annualData.push({
                            annYear: nowYear,
                            annStartMonth: new Date(createYear, createMonth, 1),//{year: createYear, month: createMonth, day: 1},
                            annEndMonth: endMonth,//{year: nowYear, month: 11, day: lastDay},
                            annMonth: firstMonth,
                            annCost: lastCost,
                            subsidiaryData: nowYear === parseInt(this.infoData.infYear) ? this.getCost(subsidiarySet, lastCost) : subsidiaryDefault,
                        });
                        if (parseInt(this.apportionData.appYear) === nowYear) {
                            exes.exeYearCost = lastCost;
                        }
                    }
                    else {
                        exes.annualData.push({
                            annYear: nowYear,
                            annStartMonth: new Date(createYear, createMonth, 1),//{year: createYear, month: createMonth, day: 1},
                            annEndMonth: endMonth,//{year: nowYear, month: 11, day: lastDay},
                            annMonth: firstMonth,
                            annCost: parseInt(firstMonth * avgCost),
                            subsidiaryData: nowYear === parseInt(this.infoData.infYear) ? this.getCost(subsidiarySet, lastCost) : subsidiaryDefault,
                        });
                        if (parseInt(this.apportionData.appYear) === nowYear) {
                            exes.exeYearCost = parseInt(firstMonth * avgCost);
                        }
                    }
                    nowYear = nowYear + 1;
                    overMonth = overMonth - firstMonth;
                    let preMonth = endMonth;
                    while (overMonth > 12) {
                        preMonth = new Date(new Date(preMonth).getFullYear(), new Date(preMonth).getMonth() + 1, 1);
                        const lastDay = new Date(nowYear, 11 + 1, 0).getDate();
                        exes.annualData.push({
                            annYear: nowYear,
                            annStartMonth: preMonth,//new Date(nowYear, 0, 1),//{year: nowYear, month: 0, day: 1},
                            annEndMonth: new Date(nowYear, 11, new Date(nowYear, 11 + 1, 0).getDate()),//{year: nowYear, month: 11, day: lastDay},
                            annMonth: 12,
                            annCost: parseInt(avgCost * 12),
                            subsidiaryData: nowYear === parseInt(this.infoData.infYear) ? this.getCost(subsidiarySet, lastCost) : subsidiaryDefault,
                        });
                        if (parseInt(this.apportionData.appYear) === nowYear) {
                            exes.exeYearCost = parseInt(avgCost * 12);
                        }
                        nowYear = nowYear + 1;
                        overMonth = overMonth - 12;
                    }
                    if (overMonth > 0) {
                        preMonth = new Date(new Date(preMonth).getFullYear(), new Date(preMonth).getMonth() + 1, 1);
                        const lastDay = new Date(nowYear, 11 + 1, 0).getDate();
                        exes.annualData.push({
                            annYear: nowYear,
                            annStartMonth: preMonth,//new Date(nowYear, 0, 1),//{year: nowYear, month: 0, day: 1},
                            annEndMonth: new Date(nowYear, 11, new Date(nowYear, 11 + 1, 0).getDate()),//{year: nowYear, month: 11, day: lastDay},
                            annMonth: overMonth,
                            annCost: parseInt(avgCost * overMonth),
                            subsidiaryData: nowYear === parseInt(this.infoData.infYear) ? this.getCost(subsidiarySet, lastCost) : subsidiaryDefault,
                        });
                        if (parseInt(this.apportionData.appYear) === nowYear) {
                            exes.exeYearCost = parseInt(avgCost * overMonth);
                        }
                    }
                }
                this.mathCompany(exes);
            },
            getCost(subsidiaryList, sum) {
                subsidiaryList.forEach(sub => {
                    sub.subCost = Math.round(sum * sub.subPercent / 100);
                });
                return subsidiaryList;
            },
            mathCompany(ann) {
                ann.subsidiaryData.forEach(sub => {
                    sub.subCost = Math.round(ann.annCost * sub.subPercent / 100);
                });
                this.countCost();
            },
            defaultCountData() {
                this.countCostData = {};

                this.itemData.forEach(item => {
                    const iteId = item.iteId;
                    const iteTitle = item.iteTitle;
                    const companyCodes = this.contractData.conCompany.split('|');

                    // 初始化 exesGroup[iteId] 如果尚不存在
                    if (!this.countCostData[iteId]) {
                        this.countCostData[iteId] = {
                            iteTitle: iteTitle,
                            costSum: 0, // 初始化 costSum 为 0
                        };
                    }

                    // 遍历 companyCodes，将 comCost 添加到 exesGroup 中
                    companyCodes.forEach(comCode => {
                        const comCost = 0;
                        this.countCostData[iteId][comCode] = comCost;

                        // 将 comCost 累加到 costSum 中
                        this.countCostData[iteId].costSum += comCost;
                    });
                });
            },
            countCost() {
                this.defaultCountData();
                this.apportionData.exesData.forEach(exes => {
                    exes.annualData.forEach(ann => {
                        if (ann.annYear === parseInt(this.infoData.infYear)) {
                            ann.subsidiaryData.forEach(sub => {
                                this.countCostData[parseInt(exes.iteId)][sub.comCode] += sub.subCost;
                                this.countCostData[parseInt(exes.iteId)].costSum += sub.subCost;
                            });
                        }
                    });
                });
            },
            async updateApportion() {
                const payload = {
                    conId: this.contractData.conId,
                    conTitle: this.contractData.conTitle,
                    frmId: this.contractData.frmId,
                    conDate: this.contractData.conDate,
                    conWork: cloneDeep(this.conWork).join('|'),
                    conCompany: cloneDeep(this.conCompany).join('|'),
                    conValue: JSON.stringify(conValue),
                    itemList: itemList,
                    memberList: memberList,
                    conStatus:0,
                    // delFileMeeting: this.delFileMeeting ? Object.keys(cloneDeep(this.delFileMeeting)).join('|') : null,
                    // delFilePlan: this.delFilePlan ? Object.keys(cloneDeep(this.delFilePlan)).join('|') : null,
                    // delFile: this.delFile ? Object.keys(cloneDeep(this.delFile)).join('|') : null,
                };

                // const formData = new FormData();
                // this.$root.addFilesToFormData(formData, this.filMeetingFiles, 'conFileMeeting[]');
                // this.$root.addFilesToFormData(formData, this.filPlanFiles, 'conFilePlan[]');
                // this.$root.addFilesToFormData(formData, this.filOtherFiles, 'conFile[]');
                // const dataToAppend = {
                //     temId: this.temId,
                //     perKey: this.per.perKey,
                //     comCode: this.per.perBu1Code,
                //     conTitle: this.conTitle,
                //     conType: this.conType,
                //     conDate: this.conDate,
                //     conWork: cloneDeep(this.conWork).join('|'),
                //     conCompany: cloneDeep(this.conCompany).join('|'),
                //     conValue: JSON.stringify(conValue),
                //     itemList: JSON.stringify(itemList),
                //     memberList: JSON.stringify(memberList),
                // };
                // for (const key in dataToAppend) {
                //     formData.append(key, dataToAppend[key]);
                // }


                await this.saveApportion(payload, this.contractData.temId, this.contractData.conId, null);


            },
        }
    }
</script>

<style scoped>
    .card {
        border-style: double;
        border-width: 1px;
        border-color: white;
    }

    .contract-title .myNotification {
        min-height: auto !important;
    }

    .tables-min thead {
        display: none;
    }

    .tables-min td {
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

    .sign-title {
        color: #a9a9a9;
        font-size: 14px;
    }

    /*table{*/
    /*width: 100%;*/
    /*border-collapse: collapse;*/
    /*border-radius: 10px ;*/
    /*overflow: hidden;*/
    /*}*/
    /*!* Zebra striping *!*/
    /*!*table tr:nth-of-type(odd) {*!*/
    /*!*background: #ececec;*!*/
    /*!*}*!*/
    /*table th {*/
    /*background: #f0f3ff;*/
    /*color: #6777ef;*/
    /*font-weight: bold;*/
    /*}*/
    /*table td, table th {*/
    /*padding: 6px;*/
    /*border: 1px solid #ccc;*/
    /*!*text-align: center;*!*/
    /*}*/

    .transfer > tr > td {
        height: 60px !important;
    }

    .transfer .bm-1 {
        border-bottom: 1px solid #ccc;
    }
</style>