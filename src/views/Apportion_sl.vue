<template>
    <template v-if="isLoading">
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
            <li class="breadcrumb-item">文件操作</li>
        </ul>
        <div class="section-body">
            <div class="contract-serial mb-2" style="width: 100%;">
                <div class="d-inline mr-2" style="text-align:left;">
                    <button class="btn btn-success" type="button"
                            @click="$router.push(`/contract/sl/${apportionData.conId}`)">
                        文件
                    </button>
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
            <div class="col-12" :id="'my0'">
                <div class="card contract-title">
                    <div class="author-box-name d-flex justify-content-between"
                         style="margin-bottom: 20px;padding: 10px 25px;border-bottom-color: #f9f9f9;">
                        <h4 class="myCardTitle" style="font-size: x-large;">
                            {{ apportionData.temTitle }}
                        </h4>
                        <div class="contract-serial">
                            <!-- 這裡放文件序號 -->
                            <div style="font-weight: 400;">文件序號：<span class="date">{{ apportionData.conSerial }}{{ apportionData.conVer }}</span>
                            </div>
                            <!-- 這裡放創文日期 -->
                            <div style="font-weight: 400;">創文日期：<span class="date">{{ this.$root.formatDate(apportionData.conCreateTime) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body myNotification d-flex">
                        <div class="myFont16Title" style="margin: 0 10px;">申請單位： <span
                                class="date myFont16">{{ apportionData.perBu2}}  {{ apportionData.perBu3}}</span>
                        </div>
                        <div class="myFont16Title" style="margin: 0 10px;">申請人： <span
                                class="date myFont16">{{ apportionData.perName}}</span>
                        </div>
                        <div class="myFont16Title" style="margin: 0 10px;">聯絡電話： <span
                                class="date myFont16">{{ apportionData.perPhone1}}  {{ apportionData.perPhone2}}  {{ apportionData.perPhone3}}</span>
                        </div>
                    </div>
                    <div class="card-body myNotification d-flex">
                        <div class="myFont16Title" style="margin: 0 10px;">管理維運公司： <span class="date myFont16">{{ apportionData.comTitle }}</span>
                        </div>
                        <div class="myFont16Title" style="margin: 0 10px;">使用公司： <span
                                class="date myFont16">
                                <template v-if="apportionData?.conCompany">
                                    <template v-for="(option, idx) in apportionData.conCompany">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getCompanyTitle('', option)}}</template>
                                </template>
                            </span>
                        </div>
                        <div class="myFont16Title" style="margin: 0 10px;">作業種類： <span
                                class="date myFont16">
                                <template v-if="apportionData?.conWork">
                                    <template v-for="(option, idx) in apportionData.conWork">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getWorkTitle(option)}}</template>
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
            </div>
            <div class="col-12">
                <div class="card" :id="'my1'">
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
                                    <template v-if="apportionData?.conCompany">
                                        <th v-for="(option, idx) in apportionData.conCompany">{{
                                            this.$root.getCompanyTitle('', option) }}
                                        </th>
                                    </template>
                                    <th>加總</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="cou in countCostData">
                                    <td>{{ cou.iteTitle }}</td>
                                    <td v-for="(option, idx) in apportionData.conCompany">{{ cou[option] }}
                                    </td>
                                    <td>{{ cou.costSum }}</td>
                                </tr>
                                <tr>
                                    <td>合計</td>
                                    <td v-for="(option, idx) in apportionData.conCompany">{{ countTotelCostData[option] }}</td>
                                    <td>{{ countTotelCostData.costSum }}</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card" :id="'my2'">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>分攤費用共用作業項目</span>
                        </h4>
                    </div>
                    <div class="card-body myNotification">
                        <div class="row">
                            <div class="col-12 sub-item">
                                <div class="row" style="margin-bottom: 20px;">
                                    <div class="table-responsive">
                                        <table class="newTable">
                                            <caption>分攤費用共用作業項目資料表</caption>
                                            <thead style="position: sticky;top: 0;" class="myNew">
                                            <tr>
                                                <th style="width: 50px;">種類</th>
                                                <th style="min-width: 110px;">共用作業項目</th>
                                                <th style="min-width: 120px;">軟硬體名稱</th>
                                                <th style="min-width: 80px;">分攤總費用</th>
                                                <th style="width: 80px;">提列年度</th>
                                                <th style="width: 70px;">明細</th>
                                            </tr>
                                            </thead>

                                            <tbody class="exesTable">
                                            <tr v-for="(exes, exes_index) in apportionData.exesData">
                                                <td>{{ exes.worTitle }}</td>
                                                <td>
                                                    {{ exes.iteTitle }}
                                                </td>
                                                <td>
                                                    {{ exes.exeTitle }}
                                                </td>
                                                <td style="min-width: 80px;">
                                                    {{ exes.exeCost }}
                                                </td>
                                                <td>
                                                    {{ exes.exeStartYear }}
                                                </td>
                                                <td>
                                                    <vue-feather v-if="1 !== parseInt(exes.exeStatus)" type="fast-forward" size="20" style="cursor: pointer;" class="m-r-10 m-clean"
                                                                 @click="scrollToElement(exes.exeId)"></vue-feather>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" :id="'my3'" style="position: static;">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>分攤費用共用作業項目-詳細資訊</span>
                        </h4>
                    </div>
                    <div class="card-body">
                        <div v-for="exes in apportionData.exesData" class="card" :id="'ite_'+exes.exeId">
                            <div class="card-body mt-2">
                                <div class="row myShowDetail">
                                    <h4 class="myCardTitle">項目資訊</h4>
                                    <div class="d-flex mb-5 row">
                                        <div class="col-xl-2 col-md-2 col-sm-4 col-4">
                                            <label class="row-label row-title">種類</label>
                                            <label class="row-text">{{ exes.worTitle }}</label>
                                        </div>
                                        <div class="col-xl-2 col-md-4 col-sm-8 col-8">
                                            <label class="row-label row-title">共用作業項目</label>
                                            <label class="row-text">{{ exes.iteTitle }}</label>
                                        </div>
                                        <div class="col-xl-4 col-md-12 col-sm-12 col-12">
                                            <label class="row-label row-title">分攤原則</label>
                                            <label class="row-text">{{ exes.disTitle}}</label>
                                        </div>
                                        <div class="col-xl-4 col-md-12 col-sm-12 col-12">
                                            <label class="row-label row-title">計算基礎</label>
                                            <label class="row-text">{{ exes.manTitle }}</label>
                                        </div>

                                        <div :class="3 === parseInt(exes.worId) ? 'col-xl-2 col-md-3 col-sm-4 col-6' : 'col-xl-4 col-md-3 col-sm-4 col-6'">
                                            <label class="row-label row-title">軟硬體名稱</label>
                                            <label class="row-text">{{ exes.exeTitle }}</label>
                                        </div>
                                        <template v-if="3 === parseInt(exes.worId)">
                                            <div class="col-xl-1 col-md-3 col-sm-4 col-3">
                                                <label class="row-label row-title">PM人天數</label>
                                                <label class="row-text">{{ exes.exePM}}</label>
                                            </div>
                                            <div class="col-xl-1 col-md-3 col-sm-4 col-3">
                                                <label class="row-label row-title">SP人天數</label>
                                                <label class="row-text">{{ exes.exeSP}}</label>
                                            </div>
                                        </template>


                                        <div class="col-xl-2 col-md-3 col-sm-4 col-6">
                                            <label class="row-label row-title">分攤總費用</label>
                                            <label class="row-text">{{ exes.exeCost}}</label>
                                        </div>
                                        <div class="col-xl-2 col-md-3 col-sm-4 col-6">
                                            <label class="row-label row-title">提列年度</label>
                                            <label class="row-text">{{ exes.exeStartYear}}</label>
                                        </div>
                                        <div class="col-xl-2 col-md-3 col-sm-4 col-6">
                                            <label class="row-label row-title">攤提月數(個)</label>
                                            <label class="row-text">{{ exes.exeMonth }}</label>
                                        </div>
                                        <div class="col-xl-2 col-md-12 col-sm-12 col-12">
                                            <label class="row-label row-title">費用攤提起始年月</label>
                                            <label class="row-text">{{ exes.exeCreateMonth.substring(0, 4) }}/{{ exes.exeCreateMonth.substring(4) }}</label>
                                        </div>
                                        <div v-if="null !== exes.exeCreateMonth && 0 !== exes.exeMonth"
                                             class="col-12">
                                            <div class="card-body">
                                                <ul class="nav nav-tabs" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <a class="nav-link active" id="profile-tab"
                                                           data-bs-toggle="tab"
                                                           :href="'#exe_'+exes.exeId" role="tab"
                                                           aria-controls="profile" aria-selected="false"
                                                           tabindex="-1">各公司年度分攤費用</a>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <a class="nav-link" id="home-tab"
                                                           data-bs-toggle="tab"
                                                           :href="'#ann_'+exes.exeId" role="tab"
                                                           aria-controls="home" aria-selected="true">各年度分攤費用</a>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <a class="nav-link" id="contact-tab"
                                                           data-bs-toggle="tab"
                                                           :href="'#fil_'+exes.exeId" role="tab"
                                                           aria-controls="contact" aria-selected="false"
                                                           tabindex="-1">附件資料</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content" id="myTabContent">
                                                    <div class="tab-pane fade show active" :id="'exe_'+exes.exeId"
                                                         role="tabpanel" aria-labelledby="profile-tab">
                                                        <!-- 待簽列表 -->
                                                        <template v-for="ann in exes.annualData">
                                                            <template
                                                                    v-if="parseInt(ann.annYear) === parseInt(apportionData.appYear)">
                                                                <table class="newTable">
                                                                    <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th v-for="sub in ann.subsidiaryData">
                                                                            {{ this.$root.getCompanyTitle('', sub.comCode) }}
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-if="1 !== parseInt(exes.manId)">
                                                                        <td>分攤數量</td>
                                                                        <td v-for="sub in ann.subsidiaryData">
                                                                            {{ sub.subAmount }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>分攤比例</td>
                                                                        <td v-for="sub in ann.subsidiaryData">
                                                                            {{ sub.subPercent }}%
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>分攤金額</td>
                                                                        <td v-for="sub in ann.subsidiaryData">
                                                                            {{ sub.subCost }}
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </template>
                                                        </template>
                                                        <!-- 待簽列表 -->
                                                    </div>
                                                    <div class="tab-pane fade"
                                                         :id="'ann_'+exes.exeId"
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
                                                                            {{ ann.annStartMonth.substring(0, 4) }}/{{ ann.annStartMonth.substring(4) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>費用迄止</td>
                                                                        <td v-for="(ann, idx) in exes.annualData">
                                                                            {{ ann.annEndMonth.substring(0, 4) }}/{{ ann.annEndMonth.substring(4) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>費用</td>
                                                                        <td v-for="ann in exes.annualData">
                                                                            {{ ann.annCost }}
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
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
                                                                    <div class="badge badge-success">Active
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <!-- <a href="#" class="btn btn-primary">詳細內容</a>  -->
                                                                    <div class="action-btns"><a
                                                                            href="javascript:void(0);"
                                                                            class="action-btn btn-view bs-tooltip me-2"
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title=""
                                                                            data-bs-original-title="View"
                                                                            aria-label="View">
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="feather feather-eye">
                                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                            <circle cx="12" cy="12"
                                                                                    r="3"></circle>
                                                                        </svg>
                                                                    </a></div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>資訊作業系統</td>
                                                                <td>2017-01-09</td>
                                                                <td>
                                                                    <div class="badge badge-success">Active
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="action-btns"><a
                                                                            href="javascript:void(0);"
                                                                            class="action-btn btn-view bs-tooltip me-2"
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title=""
                                                                            data-bs-original-title="View"
                                                                            aria-label="View">
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="feather feather-eye">
                                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                            <circle cx="12" cy="12"
                                                                                    r="3"></circle>
                                                                        </svg>
                                                                    </a></div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>資訊作業系統</td>
                                                                <td>2017-01-11</td>
                                                                <td>
                                                                    <div class="badge badge-danger">Not Active
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="action-btns"><a
                                                                            href="javascript:void(0);"
                                                                            class="action-btn btn-view bs-tooltip me-2"
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title=""
                                                                            data-bs-original-title="View"
                                                                            aria-label="View">
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="feather feather-eye">
                                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                            <circle cx="12" cy="12"
                                                                                    r="3"></circle>
                                                                        </svg>
                                                                    </a></div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>資訊作業系統</td>
                                                                <td>2017-01-11</td>
                                                                <td>
                                                                    <div class="badge badge-success">Active
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="action-btns"><a
                                                                            href="javascript:void(0);"
                                                                            class="action-btn btn-view bs-tooltip me-2"
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title=""
                                                                            data-bs-original-title="View"
                                                                            aria-label="View">
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                class="feather feather-eye">
                                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                            <circle cx="12" cy="12"
                                                                                    r="3"></circle>
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

            <!-- 立約書人 -->
            <div class="col-12" :id="'my4'">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>立約書人</span>
                        </h4>
                    </div>
                    <div class="card-body myNotification">
                        <div class="row" style="margin-bottom: 20px">
                            <label class="myFont16 p-t-10">管理維運公司</label>
                            <div class="table-responsive">
                                <table class="newTable">
                                    <caption>維運公司簽核人員資料表</caption>
                                    <thead style="position: sticky;top: 0;"
                                           class="myNew">
                                    <tr>
                                        <th style="min-width: 120px;"
                                            scope="col">公司
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">部門
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">科別
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">部門主管
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">科別主管
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">承辦人
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">承辦人連絡電話
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{ iMemberData.comTitle }}</td>
                                        <td>{{ iMemberData.memBu2 }}</td>
                                        <td>{{ iMemberData.memBu3 }}</td>
                                        <td>{{ iMemberData.memLV2Name }}</td>
                                        <td>{{ iMemberData.memLV1Name }}</td>
                                        <td>{{ iMemberData.memLV0Name }}</td>
                                        <td>{{ iMemberData.memPhone }}</td>
                                    </tr>
                                    <tr v-for="mmem in mMemberData">
                                        <td>{{ mmem.comTitle }}</td>
                                        <td>{{ mmem.memBu2 }}</td>
                                        <td>{{ mmem.memBu3 }}</td>
                                        <td>{{ mmem.memLV2Name }}</td>
                                        <td>{{ mmem.memLV1Name }}</td>
                                        <td>{{ mmem.memLV0Name }}</td>
                                        <td>{{ mmem.memPhone }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row" style="margin-bottom: 20px">
                            <label class="myFont16 p-t-10">使用公司</label>
                            <div class="table-responsive">
                                <table class="newTable">
                                    <caption>使用公司簽核人員資料表</caption>
                                    <thead style="position: sticky;top: 0;"
                                           class="myNew">
                                    <tr>
                                        <th style="min-width: 120px;"
                                            scope="col">公司
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">部門
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">科別
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">部門主管
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">科別主管
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">承辦人
                                        </th>
                                        <th style="min-width: 120px;"
                                            scope="col">承辦人連絡電話
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="umem in uMemberData">
                                        <td>{{ umem.comTitle }}</td>
                                        <td>{{ umem.memBu2 }}</td>
                                        <td>{{ umem.memBu3 }}</td>
                                        <td>{{ umem.memLV2Name }}</td>
                                        <td>{{ umem.memLV1Name }}</td>
                                        <td>{{ umem.memLV0Name }}</td>
                                        <td>{{ umem.memPhone }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div class="myFont16 mt-2">維運窗口：<span
                                    class="data">
                                                                                        <div class="d-flex m-tb">
                                                                                            <div v-for="con in contactData"
                                                                                                 class="form-check-inline">
                                                                                                <label v-if="con.comId.includes(per.comId)"
                                                                                                       class="form-check-label">
                                                                                                        <vue-feather
                                                                                                                v-if="con.perKey === iMemberData.memLVCKey"
                                                                                                                type="key"
                                                                                                                size="20"
                                                                                                                style="margin-bottom: -4px;"></vue-feather>
                                                                                                    {{ con.perName + ' ' + con.perPositionName }}
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </span></div>
                            <div class="myFont16">使用窗口：<span
                                    class="data">
                                                                                        <div class="d-flex m-tb">
                                                                                            <template
                                                                                                    v-for="com in apportionData.conCompany">
                                                                                                <template
                                                                                                        v-for="con in contactData">
                                                                                                <div v-if="con.comCode.includes(com)"
                                                                                                     class="form-check-inline">
                                                                                                    <label class="form-check-label">
                                                                                                        {{ con.perName + ' ' + con.perPositionName }}
                                                                                                    </label>
                                                                                                </div>
                                                                                                </template>
                                                                                            </template>
                                                                                        </div>
                                                                                    </span></div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-6" style="padding-bottom: 20px;">
                <button type="button"  @click="$router.push(`/apportion/up/${apportionData.appId}`)"
                        class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">修改
                </button>
            </div>

        </div>
    </section>
    </template>
    <template v-else>
        <vue-feather type="settings" animation="spin" animation-speed="slow"></vue-feather>
    </template>
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
        name: "Apportion_sl",
        mixins: [exesMixin],
        data() {
            return {
                isLoading: false,
                per: JSON.parse(Cookies.get('per')),
                viewFile: false,
                viewFileUrl: '',
                viewFilePDF: false,
                viewFileDOCK: false,
                viewFileXLSE: false,
                isSidebarVisible: false,
                msg: '',//理由
                apportionData: [],
                iMemberData: [],//發起
                mMemberData: [],//維運
                uMemberData: [],//使用
                contactData: [],
                theWidth: 0,
                testWidth: 0,
                infoData: {},//系統資訊
                countCostData: {},//
                countTotelCostData: {},//

                currentYear: 0,//當期年份


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
                const appId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=apportion&appId=${appId}` : `/api/adm/apportion/${appId}`),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                    this.$api.get(this.$test ? '/api/?type=info' : '/api/iform/info/List'),
                ];
                Promise.all(apiRequests)
                    .then(([apportionResponse, contactResponse, infoResponse]) => {
                        //contactResponse
                        this.contactData = contactResponse.data.data;

                        //apportionResponse
                        this.apportionData = apportionResponse.data.data;

                        if (this.apportionData?.memberData !== undefined) {
                            const memberList = this.apportionData?.memberData;
                            if (memberList.length > 0) {
                                this.iMemberData = memberList.find(member => member.memType === '0');
                                this.mMemberData = memberList.filter(member => member.memType === '1');
                                this.uMemberData = memberList.filter(member => member.memType === '2');
                            }
                        }
                        // infoResponse
                        this.infoData = infoResponse.data.data;
                        this.currentYear = parseInt(this.infoData.infYear);




                        this.apportionData.itemData.forEach((item) => {
                            item.iteProportion = item.iteProportion && '' !== item.iteProportion ? JSON.parse(item.iteProportion) : item.iteProportion;
                            item.manRatio = item.manRatio && '' !== item.manRatio ? JSON.parse(item.manRatio) : item.manRatio;
                        });
                        if (this.apportionData?.conCompany !== undefined) {
                            this.apportionData.conCompany = this.apportionData?.conCompany ? this.apportionData.conCompany.split('|') : null;
                        }
                        this.countCost();
                        if (this.apportionData?.conWork !== undefined) {
                            this.apportionData.conWork = this.apportionData.conWork.split('|');
                        }



                        this.countCost();

                        this.isLoading = true;
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
                            subsidiaryData: nowYear === this.currentYear ? this.getCost(subsidiarySet, lastCost) : subsidiaryDefault,
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
                            subsidiaryData: nowYear === this.currentYear ? this.getCost(subsidiarySet, lastCost) : subsidiaryDefault,
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
                            subsidiaryData: nowYear === this.currentYear ? this.getCost(subsidiarySet, lastCost) : subsidiaryDefault,
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
                            subsidiaryData: nowYear === this.currentYear ? this.getCost(subsidiarySet, lastCost) : subsidiaryDefault,
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
                this.countTotelCostData = {};
                const companyCodes = this.apportionData.conCompany;

                this.apportionData.itemData.forEach(item => {
                    const iteId = item.iteId;
                    const iteTitle = item.iteTitle;

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
                        this.countCostData[iteId].costSum = comCost;
                    });
                });
                companyCodes.forEach(comCode => {
                    const comCost = 0;
                    this.countTotelCostData[comCode] = comCost;

                    // 将 comCost 累加到 costSum 中
                    this.countTotelCostData.costSum = comCost;
                });

            },
            countCost() {
                this.defaultCountData();
                this.apportionData.exesData.forEach(exes => {
                    exes.annualData.forEach(ann => {
                        if (parseInt(ann.annYear) === parseInt(this.currentYear)) {
                            ann.subsidiaryData.forEach(sub => {
                                this.countCostData[parseInt(exes.iteId)][sub.comCode] += parseInt(sub.subCost);
                                this.countCostData[parseInt(exes.iteId)].costSum += parseInt(sub.subCost);
                                this.countTotelCostData[sub.comCode] += parseInt(sub.subCost);
                                this.countTotelCostData.costSum += parseInt(sub.subCost);
                            });
                        }
                    });
                });
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