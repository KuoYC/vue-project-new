<template>
    <template v-if="isLoading">
        <section class="section">
            <ul class="breadcrumb breadcrumb-style ">
                <li class="breadcrumb-item">
                    <h4 class="page-title m-b-0">待簽核文件</h4>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="`/review`">
                        <vue-feather type="link"></vue-feather>
                        列表
                    </router-link>
                </li>
                <li class="breadcrumb-item">查看待簽核費用</li>
            </ul>
            <div class="section-body">
                <div class="contract-serial mb-2" style="width: 100%;">
                    <div class="d-inline mr-2" style="text-align:left;">
                        <router-link :to="`/review_contract/${apportionData.conId}`" class="btn btn-success">
                            文件
                        </router-link>
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

                <div id="myMainDocument">
                    <div class="col-12" :id="'my0'">
                        <div class="card contract-title">
                            <div class="author-box-name d-flex justify-content-between"
                                 style="margin-bottom: 20px;padding: 10px 25px;border-bottom-color: #f9f9f9;">
                                <h4 class="myCardTitle" style="font-size: x-large;">
                                    {{ apportionData.conTitle }}
                                    <span class="sp-note"> - {{ apportionData.appYear + apportionData.temExes }}</span>
                                </h4>
                                <div class="contract-serial">
                                    <!-- 這裡放文件序號 -->
                                    <div style="font-weight: 400; text-align: right;">
                                        <span v-if="0 === parseInt(apportionData.appStatus)"
                                              class="st-success myFont16">草稿</span>
                                        <span v-if="1 === parseInt(apportionData.appStatus)"
                                              class="st-warning myFont16">簽核中</span>
                                        <span v-if="3 === parseInt(apportionData.appStatus)"
                                              class="st-success myFont16">已歸檔</span>
                                        <span v-if="4 === parseInt(apportionData.appStatus)"
                                              class="st-secondary myFont16">撤案</span>
                                    </div>
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
                    <div class="col-12" :id="'my1'">
                        <div class="card">
                            <div class="card-header justify-content-between">
                                <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>資訊共用計畫摘要</span>
                                </h4>
                            </div>
                            <div class="card-body myNotification">
                                <div class="row" style="margin-bottom: 20px">
                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                        <label class="row-label row-title">共用計劃書名稱</label>
                                        <span class="row-text">{{ apportionData.conTitle }}</span>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                        <label class="row-label row-title">共用計劃框架</label>
                                        <label class="row-text">{{ apportionData.frmTitle }}</label>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                        <label class="row-label row-title">生效日期</label>
                                        <label class="row-text">
                                            <template v-if="apportionData.conDate">{{ apportionData.conDate }}
                                            </template>
                                            <template v-else>未填寫將以簽核完成日為依據</template>
                                        </label>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                        <label class="row-label row-title">維運公司</label>
                                        <label class="row-text">{{ apportionData.comTitle }}</label>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                        <label class="row-label row-title">作業種類</label>
                                        <div class="d-flex my-list">
                                            <ul style="padding-left: 0px;">
                                                <li v-for="(option, idx) in apportionData.conWork">
                                                    <span class="row-text">{{ this.$root.getWorkTitle(option) }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label class="row-label row-title">使用公司</label>
                                        <div class="d-flex my-list">
                                            <ul style="padding-left: 0px;">
                                                <li v-for="option in apportionData.conCompany">
                                                    <span class="row-text">{{ this.$root.getCompanyTitle('', option) }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="card" :id="'my2'">
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
                                            <td v-for="(option, idx) in apportionData.conCompany">{{
                                                this.$root.formatNumber(cou[option]) }}
                                            </td>
                                            <td>{{ this.$root.formatNumber(cou.costSum) }}</td>
                                        </tr>
                                        <tr>
                                            <td>合計</td>
                                            <td v-for="(option, idx) in apportionData.conCompany">{{
                                                this.$root.formatNumber(countTotelCostData[option]) }}
                                            </td>
                                            <td>{{ this.$root.formatNumber(countTotelCostData.costSum) }}</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="card" :id="'my3'">
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
                                                            {{ this.$root.formatNumber(exes.exeCost) }}
                                                        </td>
                                                        <td>
                                                            {{ exes.exeStartYear }}
                                                        </td>
                                                        <td>
                                                            <vue-feather v-if="1 !== parseInt(exes.exeStatus)"
                                                                         type="fast-forward" size="20"
                                                                         style="cursor: pointer;" class="m-r-10 m-clean"
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
                        <div class="card" :id="'my4'" style="position: static;">
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
                                                    <label class="row-text">{{ this.$root.formatNumber(exes.exeCost)
                                                        }}</label>
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
                                                    <label class="row-text">{{ exes.exeCreateMonth.substring(0, 4) }}/{{
                                                        exes.exeCreateMonth.substring(4) }}</label>
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
                                                                   tabindex="-1">{{ apportionData.appYear
                                                                    }}年各公司年度分攤費用</a>
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
                                                            <div class="tab-pane fade show active"
                                                                 :id="'exe_'+exes.exeId"
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
                                                                                    {{ this.$root.getCompanyTitle('',
                                                                                    sub.comCode) }}
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
                                                                                    {{
                                                                                    this.$root.formatNumber(sub.subCost)
                                                                                    }}
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
                                                                                    {{ ann.annStartMonth.substring(0, 4)
                                                                                    }}/{{ ann.annStartMonth.substring(4)
                                                                                    }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>費用迄止</td>
                                                                                <td v-for="(ann, idx) in exes.annualData">
                                                                                    {{ ann.annEndMonth.substring(0, 4)
                                                                                    }}/{{
                                                                                    ann.annEndMonth.substring(4) }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>費用</td>
                                                                                <td v-for="ann in exes.annualData">
                                                                                    {{
                                                                                    this.$root.formatNumber(ann.annCost)
                                                                                    }}
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
                    <div class="col-12" :id="'my5'">
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
                                    </span>
                                    </div>
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
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-6" style="padding-bottom: 20px;">
                    <button @click="exportPDF" type="button"
                            class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">
                        PDF
                    </button>
                    <button v-if="1 === parseInt(apportionData.appStatus) && checkMember()"
                            @click="signContract(0 <= parseInt(apportionData.conApp) ? apportionData.conId : 0, apportionData.appId, 0 <= parseInt(apportionData.conApp) ? 2 : 1)"
                            type="button"
                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                        簽核
                    </button>
                    <button
                            v-if="1 === parseInt(apportionData.appStatus) && checkMember()"
                            @click="backContract(0 <= parseInt(apportionData.conApp) ? apportionData.conId : 0, apportionData.appId, 0 <= parseInt(apportionData.conApp) ? 2 : 1)"
                            :disabled="msg === ''"
                            type="button"
                            class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">退回
                    </button>
                    <input v-if="1 === parseInt(apportionData.appStatus) && checkMember()"
                           type="text" class="form-control" v-model="msg"
                           placeholder="退回請填寫源由"/>

                    <template v-if="apportionData.perKey === per.perKey">
                        <button v-if="0 === parseInt(apportionData.appStatus)"
                                @click="releaseSign(0 <= parseInt(apportionData.conApp) ? apportionData.conId : 0, apportionData.appId, 0 <= parseInt(apportionData.conApp) ? 2 : 1)"
                                type="button"
                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                            提交
                        </button>
                        <button v-if="3 === parseInt(apportionData.appStatus) && 0 === parseInt(apportionData.appInh)"
                                type="button"
                                @click="apportionActionTo('ch', apportionData.appId)"
                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                            變更
                        </button>
                        <button v-if="3 === parseInt(apportionData.appStatus) && 0 === parseInt(apportionData.appInh)"
                                type="button"
                                @click="apportionActionTo('tp', apportionData.appId)"
                                class="m-r-5 btn btn-outline-dark btn-border-radius waves-effect myFont16">
                            終止
                        </button>
                        <button v-if="1 === parseInt(apportionData.appStatus)" type="button"
                                @click="cleanApportion(apportionData.appId)"
                                class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                            撤案
                        </button>
                        <button v-if="0 === parseInt(apportionData.appStatus)" type="button"
                                @click="$router.push(`/apportion/up/${apportionData.appId}`)"
                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                            修改
                        </button>
                        <button v-if="-1 === parseInt(apportionData.appStatus) || 0 === parseInt(apportionData.appStatus) || 2 === parseInt(apportionData.appStatus)"
                                type="button"
                                @click="deleteContract(apportionData.appId)"
                                class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                            刪除
                        </button>
                    </template>

                </div>

            </div>

            <div class="col-12" id="myView">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle" href="#">
                            <vue-feather type="list" size="20" class="m-r-5"></vue-feather>
                            本案傳遞流程
                        </h4>
                    </div>
                    <div class="card-body myNotification">
                        <table class="table">
                            <!-- <thead style="position: sticky;top: 0;" class="myNew">
                              <tr>
                                <th scope="col"></th>
                                <th scope="col">標題</th>
                                <th scope="col">發布日期</th>
                                <th scope="col">查看</th>
                              </tr>
                            </thead> -->
                            <tbody class="myNew transfer">
                            <tr>
                                <td>1</td>
                                <th scope="row"><span class="badge badge-success">起簽</span></th>
                                <td class="bm-1"><span class="sign-title">管理維運公司承辦人</span><br>{{ iMemberData.comTitle}}
                                    {{
                                    iMemberData.memBu2
                                    }} {{ iMemberData.memBu3 }} {{
                                    iMemberData.memLV0Name }} {{ iMemberData.memLV0PositionName }}
                                </td>
                                <td style="text-align: right;">
                                    <a :class="iMemberData.memLV0Status === '0' || iMemberData.memLV0Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                       href="javascript:void(0);">
                                        <template v-if="iMemberData.memLV0Status === '-1'">等待</template>
                                        <template v-if="iMemberData.memLV0Status === '0'">待檢視</template>
                                        <template v-if="iMemberData.memLV0Status === '1'">簽核中</template>
                                        <template v-if="iMemberData.memLV0Status === '2'">退件<br><span class="time-msg">{{iMemberData.memLV0Time}}</span>
                                            <template v-if="iMemberData.memLV0Msg !== ''"><br><span class="other-msg">{{ iMemberData.memLV0Msg }}</span>
                                            </template>
                                        </template>
                                        <template v-if="iMemberData.memLV0Status === '3'">已完成<br><span class="time-msg">{{iMemberData.memLV0Time}}</span>
                                        </template>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <th scope="row"><span class="badge badge-primary">會辦</span></th>
                                <td class="bm-1"><span class="sign-title">管理維運公司窗口</span><br>{{ iMemberData.comTitle}}
                                    <template v-if="iMemberData.memLVCKey !== ''">{{ iMemberData.memBu2 }} {{
                                        iMemberData.memBu3
                                        }} {{
                                        iMemberData.memLVCName }} {{ iMemberData.memLVCPositionName }}
                                    </template>
                                </td>
                                <td style="text-align: right;">
                                    <a :class="iMemberData.memLVCStatus === '0' || iMemberData.memLVCStatus === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                       href="javascript:void(0);">
                                        <template v-if="iMemberData.memLVCStatus === '-1'">等待</template>
                                        <template v-if="iMemberData.memLVCStatus === '0'">待檢視</template>
                                        <template v-if="iMemberData.memLVCStatus === '1'">簽核中</template>
                                        <template v-if="iMemberData.memLVCStatus === '2'">退件<br><span class="time-msg">{{iMemberData.memLVCTime}}</span>
                                            <template v-if="iMemberData.memLVCMsg !== ''"><br><span class="other-msg">{{ iMemberData.memLVCMsg }}</span>
                                            </template>
                                        </template>
                                        <template v-if="iMemberData.memLVCStatus === '3'">已完成<br><span class="time-msg">{{iMemberData.memLVCTime}}</span>
                                        </template>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <th scope="row"><span class="badge badge-primary">簽核</span></th>
                                <td class="bm-1"><span class="sign-title">管理維運公司科級主管</span><br>{{ iMemberData.comTitle}}
                                    {{
                                    iMemberData.memBu2 }} {{ iMemberData.memBu3 }} {{
                                    iMemberData.memLV1Name }} {{ iMemberData.memLV1PositionName }}
                                </td>
                                <td style="text-align: right;">
                                    <a :class="iMemberData.memLV1Status === '0' || iMemberData.memLV1Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                       href="javascript:void(0);">
                                        <template v-if="iMemberData.memLV1Status === '-1'">等待</template>
                                        <template v-if="iMemberData.memLV1Status === '0'">待檢視</template>
                                        <template v-if="iMemberData.memLV1Status === '1'">簽核中</template>
                                        <template v-if="iMemberData.memLV1Status === '2'">退件<br><span class="time-msg">{{iMemberData.memLV1Time}}</span>
                                            <template v-if="iMemberData.memLV1Msg !== ''"><br><span class="other-msg">{{ iMemberData.memLV1Msg }}</span>
                                            </template>
                                        </template>
                                        <template v-if="iMemberData.memLV1Status === '3'">已完成<br><span class="time-msg">{{iMemberData.memLV1Time}}</span>
                                        </template>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <th scope="row"><span class="badge badge-primary">簽核</span></th>
                                <td class="bm-1"><span class="sign-title">管理維運公司部級主管(含以上)</span><br>{{
                                    iMemberData.comTitle}} {{
                                    iMemberData.memBu2 }} {{ iMemberData.memBu3 }} {{
                                    iMemberData.memLV2Name }} {{ iMemberData.memLV2PositionName }}
                                </td>
                                <td style="text-align: right;">
                                    <a :class="iMemberData.memLV2Status === '0' || iMemberData.memLV2Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                       href="javascript:void(0);">
                                        <template v-if="iMemberData.memLV2Status === '-1'">等待</template>
                                        <template v-if="iMemberData.memLV2Status === '0'">待檢視</template>
                                        <template v-if="iMemberData.memLV2Status === '1'">簽核中</template>
                                        <template v-if="iMemberData.memLV2Status === '2'">退回<br><span class="time-msg">{{iMemberData.memLV2Time}}</span>
                                            <template v-if="iMemberData.memLV2Msg !== ''"><br><span class="other-msg">{{ iMemberData.memLV2Msg }}</span>
                                            </template>
                                        </template>
                                        <template v-if="iMemberData.memLV2Status === '3'">已完成<br><span class="time-msg">{{iMemberData.memLV2Time}}</span>
                                        </template>
                                    </a>
                                </td>
                            </tr>
                            <template v-for="(mmem, idx) in mMemberData">
                                <tr>
                                    <td>{{idx+5}}</td>
                                    <th scope="row"><span class="badge badge-primary">水平會簽</span></th>
                                    <td class="bm-1"><span class="sign-title">平行維運公司承辦人</span><br>{{ mmem.comTitle}} {{
                                        mmem.memBu2 }} {{
                                        mmem.memBu3 }} {{ mmem.memLV0Name }} {{
                                        mmem.memLV0PositionName }}
                                    </td>
                                    <td style="text-align: right;">
                                        <a :class="mmem.memLV0Status === '0' || mmem.memLV0Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                           href="javascript:void(0);">
                                            <template v-if="mmem.memLV0Status === '-1'">等待</template>
                                            <template v-if="mmem.memLV0Status === '0'">待檢視</template>
                                            <template v-if="mmem.memLV0Status === '1'">簽核中</template>
                                            <template v-if="mmem.memLV0Status === '2'">退件<br><span class="time-msg">{{mmem.memLV0Time}}</span>
                                                <template v-if="mmem.memLV0Msg !== ''"><br><span class="other-msg">{{ mmem.memLV0Msg }}</span>
                                                </template>
                                            </template>
                                            <template v-if="mmem.memLV0Status === '3'">已完成<br><span class="time-msg">{{mmem.memLV0Time}}</span>
                                            </template>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <th scope="row"><span class="badge badge-secondary"></span></th>
                                    <td class="bm-1"><span class="sign-title">管理維運公司科級主管</span><br>{{ mmem.comTitle}} {{
                                        mmem.memBu2 }} {{
                                        mmem.memBu3 }} {{ mmem.memLV1Name }} {{
                                        mmem.memLV1PositionName }}
                                    </td>
                                    <td style="text-align: right;">
                                        <a :class="mmem.memLV1Status === '0' || mmem.memLV1Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                           href="javascript:void(0);">
                                            <template v-if="mmem.memLV1Status === '-1'">等待</template>
                                            <template v-if="mmem.memLV1Status === '0'">待檢視</template>
                                            <template v-if="mmem.memLV1Status === '1'">簽核中</template>
                                            <template v-if="mmem.memLV1Status === '2'">退件<br><span class="time-msg">{{mmem.memLV1Time}}</span>
                                                <template v-if="mmem.memLV1Msg !== ''"><br><span class="other-msg">{{ mmem.memLV1Msg }}</span>
                                                </template>
                                            </template>
                                            <template v-if="mmem.memLV1Status === '3'">已完成<br><span class="time-msg">{{mmem.memLV1Time}}</span>
                                            </template>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <th scope="row"><span class="badge badge-success"></span></th>
                                    <td class="bm-1"><span class="sign-title">管理維運公司部級主管(含以上)</span><br>{{
                                        mmem.comTitle}}
                                        {{ mmem.memBu2 }}
                                        {{ mmem.memBu3 }} {{ mmem.memLV2Name }} {{
                                        mmem.memLV2PositionName }}
                                    </td>
                                    <td style="text-align: right;">
                                        <a :class="mmem.memLV2Status === '0' || mmem.memLV2Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                           href="javascript:void(0);">
                                            <template v-if="mmem.memLV2Status === '-1'">等待</template>
                                            <template v-if="mmem.memLV2Status === '0'">待檢視</template>
                                            <template v-if="mmem.memLV2Status === '1'">簽核中</template>
                                            <template v-if="mmem.memLV2Status === '2'">退件<br><span class="time-msg">{{mmem.memLV2Time}}</span>
                                                <template v-if="mmem.memLV2Msg !== ''"><br><span class="other-msg">{{ mmem.memLV2Msg }}</span>
                                                </template>
                                            </template>
                                            <template v-if="mmem.memLV2Status === '3'">已完成<br><span class="time-msg">{{mmem.memLV2Time}}</span>
                                            </template>
                                            <template v-if="mmem.memLV2Status === '4'"><br><span class="time-msg">{{mmem.memLV2Time}}</span>
                                                <template v-if="mmem.memLV2Msg !== ''"><br><span class="other-msg">{{ mmem.memLV2Msg }}</span>
                                                </template>
                                            </template>
                                        </a>
                                    </td>
                                </tr>
                            </template>
                            <template v-for="(umem, idx) in uMemberData">
                                <tr>
                                    <td>{{mMemberData.length+idx+5}}</td>
                                    <th scope="row"><span class="badge badge-info">水平會簽</span></th>
                                    <td class="bm-1"><span class="sign-title">使用公司承辦人</span><br>{{ umem.comTitle}} {{
                                        umem.memBu2 }} {{
                                        umem.memBu3 }} {{ umem.memLV0Name }} {{
                                        umem.memLV0PositionName }}
                                    </td>
                                    <td style="text-align: right;">
                                        <a :class="umem.memLV0Status === '0' || umem.memLV0Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                           href="javascript:void(0);">
                                            <template v-if="umem.memLV0Status === '-1'">等待</template>
                                            <template v-if="umem.memLV0Status === '0'">待檢視</template>
                                            <template v-if="umem.memLV0Status === '1'">簽核中</template>
                                            <template v-if="umem.memLV0Status === '2'">退件<br><span class="time-msg">{{umem.memLV0Time}}</span>
                                                <template v-if="umem.memLV0Msg !== ''"><br><span class="other-msg">{{ umem.memLV0Msg }}</span>
                                                </template>
                                            </template>
                                            <template v-if="umem.memLV0Status === '3'">已完成<br><span class="time-msg">{{umem.memLV0Time}}</span>
                                            </template>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <th scope="row"><span class="badge badge-secondary"></span></th>
                                    <td class="bm-1"><span class="sign-title">使用公司科級主管</span><br>{{ umem.comTitle}} {{
                                        umem.memBu2 }} {{
                                        umem.memBu3 }} {{ umem.memLV1Name }} {{
                                        umem.memLV1PositionName }}
                                    </td>
                                    <td style="text-align: right;">
                                        <a :class="umem.memLV1Status === '0' || umem.memLV1Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                           href="javascript:void(0);">
                                            <template v-if="umem.memLV1Status === '-1'">等待</template>
                                            <template v-if="umem.memLV1Status === '0'">待檢視</template>
                                            <template v-if="umem.memLV1Status === '1'">簽核中</template>
                                            <template v-if="umem.memLV1Status === '2'">退件<br><span class="time-msg">{{umem.memLV1Time}}</span>
                                                <template v-if="umem.memLV1Msg !== ''"><br><span class="other-msg">{{ umem.memLV1Msg }}</span>
                                                </template>
                                            </template>
                                            <template v-if="umem.memLV1Status === '3'">已完成<br><span class="time-msg">{{umem.memLV1Time}}</span>
                                            </template>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <th scope="row"><span class="badge badge-success"></span></th>
                                    <td class="bm-1"><span class="sign-title">使用公司部級主管(含以上)</span><br>{{ umem.comTitle}}
                                        {{
                                        umem.memBu2 }} {{
                                        umem.memBu3 }} {{ umem.memLV2Name }} {{
                                        umem.memLV2PositionName }}
                                    </td>
                                    <td style="text-align: right;">
                                        <a :class="umem.memLV2Status === '0' || umem.memLV2Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                           href="javascript:void(0);">
                                            <template v-if="umem.memLV2Status === '-1'">等待</template>
                                            <template v-if="umem.memLV2Status === '0'">待檢視</template>
                                            <template v-if="umem.memLV2Status === '1'">簽核中</template>
                                            <template v-if="umem.memLV2Status === '2'">退件<br><span class="time-msg">{{umem.memLV2Time}}</span>
                                                <template v-if="umem.memLV2Msg !== ''"><br><span class="other-msg">{{ umem.memLV2Msg }}</span>
                                                </template>
                                            </template>
                                            <template v-if="umem.memLV2Status === '3'">已完成<br><span class="time-msg">{{umem.memLV2Time}}</span>
                                            </template>
                                        </a>
                                    </td>
                                </tr>
                            </template>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- 浮動控制版 -->
            <div :class="isSidebarVisible ? 'settingSidebar showSettingPanel' : 'settingSidebar'" ref="sidebar">
                <a href="javascript:void(0)" class="settingPanelToggle" @click="sidebarClick"> <i
                        class="fa fa-spin fa-cog"></i>
                </a>
                <div class="settingSidebar-body ps-container ps-theme-default" style="overflow-y:auto;">
                    <div class=" fade show active">
                        <div class="setting-panel-header">管理面板</div>
                        <div class="p-15 border-bottom">
                            <div class="col-lg-12">
                                <div class="m-l-20">
                                    <button @click="exportPDF" type="button"
                                            class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">
                                        PDF
                                    </button>
                                    <button v-if="1 === parseInt(apportionData.appStatus) && checkMember()"
                                            @click="signContract(0 <= parseInt(apportionData.conApp) ? apportionData.conId : 0, apportionData.appId, 0 <= parseInt(apportionData.conApp) ? 2 : 1)"
                                            type="button"
                                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                        簽核
                                    </button>
                                    <button
                                            v-if="1 === parseInt(apportionData.appStatus) && checkMember()"
                                            @click="backContract(0 <= parseInt(apportionData.conApp) ? apportionData.conId : 0, apportionData.appId, 0 <= parseInt(apportionData.conApp) ? 2 : 1)"
                                            :disabled="msg === ''"
                                            type="button"
                                            class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                                        退回
                                    </button>
                                    <input v-if="1 === parseInt(apportionData.appStatus) && checkMember()"
                                           type="text" class="form-control" v-model="msg"
                                           placeholder="退回請填寫源由"/>
                                </div>
                            </div>
                        </div>
                        <template v-if="apportionData.perKey === per.perKey">
                            <div class="setting-panel-header">文件操作
                            </div>
                            <div class="p-15 border-bottom">
                                <div class="col-lg-12">
                                    <div class="m-l-20">
                                        <button v-if="0 === parseInt(apportionData.appStatus)"
                                                @click="releaseSign(0 <= parseInt(apportionData.conApp) ? apportionData.conId : 0, apportionData.appId, 0 <= parseInt(apportionData.conApp) ? 2 : 1)"
                                                type="button"
                                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                            提交
                                        </button>
                                        <button v-if="3 === parseInt(apportionData.appStatus) && 0 === parseInt(apportionData.appInh)"
                                                type="button"
                                                @click="apportionActionTo('ch', apportionData.appId)"
                                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                            變更
                                        </button>
                                        <button v-if="3 === parseInt(apportionData.appStatus) && 0 === parseInt(apportionData.appInh)"
                                                type="button"
                                                @click="apportionActionTo('tp', apportionData.appId)"
                                                class="m-r-5 btn btn-outline-dark btn-border-radius waves-effect myFont16">
                                            終止
                                        </button>
                                        <button v-if="1 === parseInt(apportionData.appStatus)" type="button"
                                                @click="cleanApportion(apportionData.appId)"
                                                class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                                            撤案
                                        </button>
                                        <button v-if="0 === parseInt(apportionData.appStatus)" type="button"
                                                @click="$router.push(`/apportion/up/${apportionData.appId}`)"
                                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                            修改
                                        </button>
                                        <button v-if="-1 === parseInt(apportionData.appStatus) || 0 === parseInt(apportionData.appStatus) || 2 === parseInt(apportionData.appStatus)"
                                                type="button"
                                                @click="deleteContract(apportionData.appId)"
                                                class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                                            刪除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="p-15 border-bottom">
                            <h6 class="font-medium m-b-10">文件架構</h6>
                            <ul class="contact-list">
                                <li class="nav-item" ref="tp">
                                    <a class="nav-link myFont16" href="javascript:void(0);"
                                       @click="scrollToElement('my0')">
                                        {{ apportionData.temExes }}
                                    </a>
                                </li>
                                <li class="nav-item" ref="tp">
                                    <a class="nav-link myFont16" href="javascript:void(0);"
                                       @click="scrollToElement('my1')">
                                        資訊共用計畫摘要
                                    </a>
                                </li>
                                <li class="nav-item" ref="tp">
                                    <a class="nav-link myFont16" href="javascript:void(0);"
                                       @click="scrollToElement('my2')">
                                        {{ apportionData.appYear }}年各公司分攤費用
                                    </a>
                                </li>
                                <li class="nav-item" ref="tp">
                                    <a class="nav-link myFont16" href="javascript:void(0);"
                                       @click="scrollToElement('my3')">
                                        分攤費用共用作業項目
                                    </a>
                                </li>
                                <li class="nav-item" ref="tp">
                                    <a class="nav-link myFont16" href="javascript:void(0);"
                                       @click="scrollToElement('my4')">
                                        分攤費用共用作業項目-詳細資訊
                                    </a>
                                </li>
                                <li class="nav-item" ref="tp">
                                    <a class="nav-link myFont16" href="javascript:void(0);"
                                       @click="scrollToElement('my5')">
                                        立約書人
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!--<div class="p-15 border-bottom">-->
                        <!--<div class="theme-setting-options">-->
                        <!--<label class="m-b-0">-->
                        <!--<input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input"-->
                        <!--id="mini_sidebar_setting">-->
                        <!--<span class="custom-switch-indicator"></span>-->
                        <!--<span class="control-label p-l-10">縮小右側控制板</span>-->
                        <!--</label>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<div class="p-15 border-bottom">-->
                        <!--<div class="theme-setting-options">-->
                        <!--<label class="m-b-0">-->
                        <!--<input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input"-->
                        <!--id="">-->
                        <!--<span class="custom-switch-indicator"></span>-->
                        <!--<span class="control-label p-l-10">開啟所有區塊</span>-->
                        <!--</label>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <!-- 浮動控制版 -->

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
    import {controlBoxMixin} from '@/mixins/controlBoxMixin.js';
    import {signMixin} from '@/mixins/signMixin.js';
    import DatePicker from '@vuepic/vue-datepicker';

    export default {
        name: "ReviewApportion",
        mixins: [exesMixin, controlBoxMixin, signMixin],
        data() {
            return {
                isLoading: false,
                per: JSON.parse(Cookies.get('per')),
                viewFile: false,
                viewFileUrl: '',
                viewFilePDF: false,
                viewFileDOCK: false,
                viewFileXLSE: false,
                isSidebarVisible: false,//管理面板使用
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
                if (this.apportionData.conCompany) {
                    companyCodes.forEach(comCode => {
                        const comCost = 0;
                        this.countTotelCostData[comCode] = comCost;

                        // 将 comCost 累加到 costSum 中
                        this.countTotelCostData.costSum = comCost;
                    });
                }

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
            async exportPDF() {
                try {
                    // const logoImage = new Image();
                    // logoImage.src = '/layouts/assets/img/logo.png';

                    const element = document.getElementById('myMainDocument');
                    // element.insertBefore(logoImage, element.firstChild);

                    // await new Promise((resolve) => {
                    //     logoImage.onload = resolve;
                    // });

                    const options = {
                        margin: [10, 10, 10, 10], // 页边距，单位为mm
                        filename: 'exported.pdf',
                        image: {type: 'png'},
                        jsPDF: {unit: 'mm', format: 'a4'},
                    };

                    html2pdf()
                        .set(options)
                        .from(element)
                        .save();

                    // 移除插入的图像，以避免在网页上显示
                    // element.removeChild(logoImage);
                } catch (error) {
                    console.error(error);
                }
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

    #exportBox img {
        display: none;
    }

    .textBox {
        /*border-style: dashed;*/
        /*border-color: darkgray;*/
        /*border-width: thin;*/
    }

    .textRowBox {
        border-style: double;
        border-color: black;
        border-width: unset;
    }

    .sign-title {
        color: #a9a9a9;
        font-size: 14px;
    }

    .time-msg {
        font-size: 12px;
    }

    .other-msg {

    }

    .form-check {
        font-size: 16px;
    }

    .my-list ul li {
        float: left;
        list-style: none;
        margin-right: 10px;
    }

    .contract-title .myNotification {
        min-height: auto !important;
    }

    .d-flex i {
        padding-right: 10px;
    }

    .transfer > tr > td {
        height: 60px !important;
    }

    .transfer .bm-1 {
        border-bottom: 1px solid #ccc;
    }
</style>