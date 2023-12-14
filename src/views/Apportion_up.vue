<template>
    <template v-if="0 === appId">
        <section class="section">
            <ul class="breadcrumb breadcrumb-style ">
                <li class="breadcrumb-item">
                    <h4 class="page-title m-b-0">表單申請</h4>
                </li>
                <li class="breadcrumb-item">費用操作</li>
            </ul>
            <div class="section-body">
                <div class="row">
                    <!-- 主要內容 -->
                    <div class="card">
                        <div class="boxs mail_listing">
                            <div class="inbox-body no-pad">
                                <section class="mail-list">
                                    <div class="mail-sender">
                                        <div class="d-flex mb-4 mt-2">
                                            <div class="flex-grow-1">
                                                <div class="myFont16Title">請選擇要新增的共用計畫書： <span class="date myFont16">
                                                <Multiselect
                                                        v-model="con"
                                                        :options="options"
                                                        :searchable="true"
                                                        :loading="isLoading"
                                                        @search-change="loadContract"
                                                        placeholder="搜尋計畫書"
                                                        :value="[]"
                                                        label="name"
                                                        track-by="id"
                                                >
                                                    <template #noOptions>請輸入搜尋文字</template>
                                                    <template #noResult>查無資料</template>
                                                </Multiselect>
                                            </span></div>
                                            </div>
                                        </div>
                                        <div class="col-6" style="padding-bottom: 20px;">
                                            <button type="button" @click="createApportion"
                                                    :disabled="'' === conId"
                                                    class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">
                                                開始
                                            </button>
                                        </div>

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </template>
    <template v-else>
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
                    <li class="breadcrumb-item">費用操作</li>
                </ul>
                <div class="section-body">
                    <div class="contract-serial mb-2" style="width: 100%;">
                        <div class="d-inline mr-2" style="text-align:left;">
                            <button class="btn btn-success" type="button"
                                    @click="$router.push(`/contract/up/${apportionData.conId}`)">
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
                                    {{ apportionData.temExes }}
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
                                            <template v-if="apportionData.conDate">{{ apportionData.conDate }}</template>
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
                                            <td v-for="(option, idx) in apportionData.conCompany">{{ cou[option] }}
                                            </td>
                                            <td>{{ cou.costSum }}</td>
                                        </tr>
                                        <tr>
                                            <td>合計</td>
                                            <td v-for="(option, idx) in apportionData.conCompany">{{
                                                countTotelCostData[option]
                                                }}
                                            </td>
                                            <td>{{ countTotelCostData.costSum }}</td>
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
                                                        <th style="width: 20px;"></th>
                                                        <th style="width: 50px;">種類</th>
                                                        <th style="min-width: 110px;">共用作業項目</th>
                                                        <th style="min-width: 120px;">軟硬體名稱</th>
                                                        <th style="min-width: 80px;" colspan="3">分攤總費用</th>
                                                        <th style="width: 80px;">提列年度</th>
                                                        <th style="width: 70px;">操作</th>
                                                    </tr>
                                                    </thead>

                                                    <tbody class="exesTable">
                                                    <Exes v-for="(exes, exes_index) in apportionData.exesData"
                                                          :key="exes.uniqueId"
                                                          :idx="exes_index"
                                                          :exes="exes"
                                                          :itemData="apportionData.itemData"
                                                          :nowYear="parseInt(exes.exeStartYear)"
                                                          :infoData="infoData"
                                                          :PM="parseInt(infoData.infPM)"
                                                          :SP="parseInt(infoData.infSP)"
                                                          @remove-exes="removeExesData"
                                                          @scrollExes="scrollToIteElement"
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
                                <template v-for="(exes, index) in apportionData.exesData">
                                    <div class="card" :id="'ite_'+exes.uniqueId">
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
                                                        <input :disabled="1 === parseInt(exes.exeStatus)"
                                                               type="number"
                                                               v-model="exes.exeMonth" class="row-text"
                                                               style="width: 80px;" placeholder="1" min="1"
                                                               onclick="this.select();"/>
                                                    </div>
                                                    <div class="col-xl-2 col-md-12 col-sm-12 col-12">
                                                        <label class="row-label row-title">費用攤提起始年月</label>
                                                        <DatePicker format="yyyy/MM"
                                                                    v-model="exes.exeCreateMonth"
                                                                    :disabled="1 === parseInt(exes.exeStatus)"
                                                                    :enable-time-picker="false"
                                                                    placeholder="起始年月"
                                                                    locale="zh"
                                                                    month-picker
                                                                    @closed="mathAnnual(exes)"
                                                                    style="width: 140px;"/>
                                                    </div>
                                                    <div v-if="null !== exes.exeCreateMonth && 0 !== exes.exeMonth"
                                                         class="col-12">
                                                        <div class="card-body">
                                                            <ul class="nav nav-tabs" role="tablist">
                                                                <li class="nav-item" role="presentation">
                                                                    <a class="nav-link active" id="home-tab"
                                                                       data-bs-toggle="tab"
                                                                       :href="'#ann_'+exes.uniqueId" role="tab"
                                                                       aria-controls="home" aria-selected="true">各年度分攤費用</a>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <a class="nav-link" id="profile-tab"
                                                                       data-bs-toggle="tab"
                                                                       :href="'#exe_'+exes.uniqueId" role="tab"
                                                                       aria-controls="profile" aria-selected="false"
                                                                       tabindex="-1">各公司年度分攤費用</a>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <a class="nav-link" id="contact-tab"
                                                                       data-bs-toggle="tab"
                                                                       :href="'#fil_'+exes.uniqueId" role="tab"
                                                                       aria-controls="contact" aria-selected="false"
                                                                       tabindex="-1">附件資料</a>
                                                                </li>
                                                            </ul>
                                                            <div class="tab-content">
                                                                <div class="tab-pane fade show active"
                                                                     :id="'ann_'+exes.uniqueId">
                                                                    <div class="card-body" style="padding: 0px;">
                                                                        <Annual
                                                                                :annualData="exes.annualData"
                                                                                :exes="exes"
                                                                                :currentYear="currentYear"
                                                                                :appYear="parseInt(apportionData.appYear)"
                                                                                @math-company="mathCompany"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade"
                                                                     :id="'exe_'+exes.uniqueId">
                                                                    <!-- 待簽列表 -->
                                                                    <div class="card-body" style="padding: 0px;">
                                                                        <template v-for="ann in exes.annualData">
                                                                            <template
                                                                                    v-if="parseInt(ann.annYear) === parseInt(currentYear)">
                                                                                <Subsidiary
                                                                                        :exesData="exes"
                                                                                        :annualData="ann"
                                                                                        :subsidiaryData="ann.subsidiaryData"
                                                                                        @getCount="countCost"
                                                                                />
                                                                            </template>
                                                                        </template>
                                                                    </div>
                                                                    <!-- 待簽列表 -->
                                                                </div>
                                                                <div class="tab-pane fade"
                                                                     :id="'fil_'+exes.uniqueId">
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
                                                                                <div class="badge badge-success">
                                                                                    Active
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
                                                                                <div class="badge badge-success">
                                                                                    Active
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
                                                                                <div class="badge badge-danger">Not
                                                                                    Active
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
                                                                                <div class="badge badge-success">
                                                                                    Active
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
                                </template>
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
                                <template v-if="-1 === parseInt(apportionData.conApp)">
                                    <div class="row" style="margin-bottom: 20px">
                                        <label class="myFont16 p-t-10">管理維運公司</label>
                                        <div class="table-responsive">
                                            <table class="newTable">
                                                <caption>維運公司簽核人員資料表</caption>
                                                <thead style="position: sticky;top: 0;"
                                                       class="myNew">
                                                <tr>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">公司
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">部門
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">科別
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">部門主管
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">科別主管
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">承辦人
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">承辦人連絡電話
                                                    </th>
                                                    <th style="width: 20px;"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <Member
                                                            :key="iMemberData.uniqueId"
                                                            :member="iMemberData"
                                                            :companyData="companyData"
                                                            :companyUse="apportionData.comCode"
                                                            :use_close="false"
                                                            :use_contact="true"
                                                            :lv_disabled="true"
                                                            ref="iMemberComp"
                                                    />
                                                </tr>
                                                <tr v-for="mmem in mMemberData">
                                                    <Member
                                                            :key="mmem.uniqueId"
                                                            :member="mmem"
                                                            :use_close="true"
                                                            :lv_disabled="false"
                                                            :companyData="companyData"
                                                            :companyUse="apportionData.comCode"
                                                            @remove-member="uniqueId=>removeMember(uniqueId, 'M')"
                                                            ref="mMemberComp"
                                                    />
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class=" mt-2 d-flex justify-content">
                                        <button type="button"
                                                @click="addMember('M', per.perBu1Code)"
                                                class="btn btn-icon icon-left btn-outline-success myFont16"
                                                style="border-radius: 6px;">新增一筆
                                        </button>
                                    </div>
                                    <div class="row" style="margin-bottom: 20px">
                                        <label class="myFont16 p-t-10">使用公司</label>
                                        <div class="table-responsive">
                                            <table class="newTable">
                                                <caption>使用公司簽核人員資料表</caption>
                                                <thead style="position: sticky;top: 0;"
                                                       class="myNew">
                                                <tr>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">公司
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">部門
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">科別
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">部門主管
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">科別主管
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">承辦人
                                                    </th>
                                                    <th class="text-center"
                                                        style="min-width: 120px;"
                                                        scope="col">承辦人連絡電話
                                                    </th>
                                                    <th style="width: 20px;"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="umem in uMemberData">
                                                    <Member
                                                            :key="umem.uniqueId"
                                                            :member="umem"
                                                            :use_close="true"
                                                            :lv_disabled="false"
                                                            :companyData="companyData"
                                                            :companyUse="apportionData.conCompany"
                                                            @remove-member="uniqueId=>removeMember(uniqueId, 'U')"
                                                            ref="uMemberComp"
                                                    />
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class=" mt-2 d-flex justify-content">
                                        <button type="button"
                                                @click="addMember('U', per.perBu1Code)"
                                                class="btn btn-icon icon-left btn-outline-success myFont16"
                                                style="border-radius: 6px;">新增一筆
                                        </button>
                                    </div>
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
                                </template>
                                <template v-else>
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
                                </template>
                            </div>
                        </div>
                    </div>

                    <div class="col-6" style="padding-bottom: 20px;">
                        <button type="button"
                                @click="$router.push(`/apportion/sl/${apportionData.appId}`)"
                                class="m-r-5 btn btn-outline-info btn-border-radius waves-effect myFont16">
                            查看
                        </button>
                        <button type="button" @click="updateApportion"
                                class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">儲存
                        </button>
                        <button v-if="-1 === parseInt(apportionData.conApp)" type="button" @click="deleteApportion(apportionData.appId)"
                                class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">刪除
                        </button>
                        <button v-if="-1 === parseInt(apportionData.conApp)" type="button" @click="cleanApportion(apportionData.appId)"
                                class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                            撤案
                        </button>
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
                                        <button type="button"
                                                @click="$router.push(`/contract/sl/${contractData.conId}`)"
                                                class="m-r-5 btn btn-outline-info btn-border-radius waves-effect myFont16">
                                            查看
                                        </button>
                                        <button type="button" @click="updateApportion"
                                                class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                            儲存
                                        </button>
                                        <button v-if="-1 === parseInt(apportionData.conApp)" type="button"
                                                @click="deleteApportion(apportionData.appId)"
                                                class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                                            刪除
                                        </button>
                                        <button v-if="-1 === parseInt(apportionData.conApp)" type="button" @click="cleanApportion(apportionData.appId)"
                                                class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                                            撤案
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="p-15 border-bottom">
                                <h6 class="font-medium m-b-10">文件架構</h6>
                                <ul class="contact-list">
                                    <li  class="nav-item" ref="tp">
                                        <a class="nav-link myFont16" href="javascript:void(0);"
                                           @click="scrollToElement('my0')">
                                            {{ apportionData.temExes }}
                                        </a>
                                    </li>
                                    <li  class="nav-item" ref="tp">
                                        <a class="nav-link myFont16" href="javascript:void(0);"
                                           @click="scrollToElement('my1')">
                                            資訊共用計畫摘要
                                        </a>
                                    </li>
                                    <li  class="nav-item" ref="tp">
                                        <a class="nav-link myFont16" href="javascript:void(0);"
                                           @click="scrollToElement('my2')">
                                            {{ apportionData.appYear }}年各公司分攤費用
                                        </a>
                                    </li>
                                    <li  class="nav-item" ref="tp">
                                        <a class="nav-link myFont16" href="javascript:void(0);"
                                           @click="scrollToElement('my3')">
                                            分攤費用共用作業項目
                                        </a>
                                    </li>
                                    <li  class="nav-item" ref="tp">
                                        <a class="nav-link myFont16" href="javascript:void(0);"
                                           @click="scrollToElement('my4')">
                                            分攤費用共用作業項目-詳細資訊
                                        </a>
                                    </li>
                                    <li  class="nav-item" ref="tp">
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
</template>

<script>
    import {ref} from 'vue';
    import Cookies from 'js-cookie'
    import Exes from '@/components/Exes.vue';
    import Annual from '@/components/Annual.vue';
    import Subsidiary from '@/components/Subsidiary.vue';
    import Member from '@/components/Member.vue';
    import VueOfficeDocx from '@vue-office/docx';
    import '@vue-office/docx/lib/index.css';
    import VueOfficeExcel from '@vue-office/excel';
    import '@vue-office/excel/lib/index.css';
    import {memberMixin} from '@/mixins/memberMixin.js';
    import VueOfficePdf from '@vue-office/pdf';
    import {apportionActionMixin} from '@/mixins/apportionActionMixin.js';
    import {exesMixin} from '@/mixins/exesMixin.js';
    import {controlBoxMixin} from '@/mixins/controlBoxMixin.js';
    import DatePicker from '@vuepic/vue-datepicker';
    import cloneDeep from 'lodash/cloneDeep';
    import Multiselect from 'vue-multiselect';
    import 'vue-multiselect/dist/vue-multiselect.css';

    export default {
        name: "Apportion_up",
        mixins: [apportionActionMixin, exesMixin, controlBoxMixin, memberMixin],
        data() {
            return {
                isLoading: false,
                appId: parseInt(this.$route.params.id),
                con:{},
                conId: 0,
                per: JSON.parse(Cookies.get('per')),
                isSidebarVisible: false,//管理面板使用
                options: [],

                companyData: [],//公司


                viewFile: false,
                viewFileUrl: '',
                viewFilePDF: false,
                viewFileDOCK: false,
                viewFileXLSE: false,
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
            Annual,
            Subsidiary,
            Multiselect,
            Member,
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
            },
            'con':function (newCon, oldCon) {
                this.conId = newCon.id;
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
                this.appId = parseInt(this.$route.params.id); // 取得路由參數 id
                this.per = JSON.parse(Cookies.get('per'));
                if (this.appId === 0) {
                }
                else {
                    this.fetchFirst();
                }
            },
            fetchFirst() {
                // this.testExes();
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=apportion&appId=${this.appId}` : `/api/adm/apportion/${appId}`),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                    this.$api.get(this.$test ? '/api/?type=info' : '/api/iform/info/List'),
                ];
                Promise.all(apiRequests)
                    .then(([apportionResponse, companyResponse, contactResponse, infoResponse]) => {
                        //contactResponse
                        this.contactData = contactResponse.data.data;
                        //companyResponse
                        this.companyData = companyResponse.data.data;

                        //apportionResponse
                        this.apportionData = apportionResponse.data.data;

                        const memberList = this.apportionData.memberData;
                        if (memberList.length > 0) {
                            memberList.forEach(member => {
                                member.uniqueId = this.$root.generateUniqueId();
                            });

                            this.iMemberData = memberList.find(member => member.memType === '0');
                            this.mMemberData = memberList.filter(member => member.memType === '1');
                            this.uMemberData = memberList.filter(member => member.memType === '2');
                        }
                        else {
                            this.iMemberData = {
                                uniqueId: this.$root.generateUniqueId(),
                                memId: '0',
                                memType: '0',
                                memBu1Code: this.per.perBu1Code,
                                memBu2Code: this.per.perBu2Code,
                                memBu2: this.per.perBu2,
                                memBu3Code: this.per.perBu3Code,
                                memBu3: this.per.perBu3,
                                memLV0Key: this.per.perKey,
                                memLV0Name: this.per.perName,
                                memLV0PositionName: this.per.perPositionName,
                                memLVCKey: '',
                                memLVCName: '',
                                memLVCPositionName: '',
                                memLV1Key: '',
                                memLV1Name: '',
                                memLV1PositionName: '',
                                memLV2Key: '',
                                memLV2Name: '',
                                memLV2PositionName: '',
                                memPhone: this.per.perPhone2 + ' ' + this.per.perPhone3,
                            };
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
                        this.apportionData.exesData.forEach((exes) => {
                            exes.uniqueId = this.$root.generateUniqueId();
                            exes.exeCreateMonth = {
                                year: parseInt(exes.exeCreateMonth.substring(0, 4)),
                                month: parseInt(exes.exeCreateMonth.substring(4)) - 1
                            };
                            switch (parseInt(exes.manType)) {
                                case 0:
                                    exes.ratio = JSON.parse(exes.manRatio);
                                    break;
                                case 1:
                                    exes.ratio = JSON.parse(exes.iteProportion);
                                    break;
                                case 2:
                                    break;

                            }
                            exes.annualData.forEach(ann => {
                                ann.annStartMonth = {
                                    year: parseInt(ann.annStartMonth.substring(0, 4)),
                                    month: parseInt(ann.annStartMonth.substring(4)) - 1
                                };
                                ann.annEndMonth = {
                                    year: parseInt(ann.annEndMonth.substring(0, 4)),
                                    month: parseInt(ann.annEndMonth.substring(4)) - 1
                                };
                                if (parseInt(ann.annYear) === this.currentYear) {
                                    if (ann.subsidiaryData.length === 0) {
                                        const subsidiaryDefault = this.subsidiaryDefault(exes);
                                        const subsidiarySet = this.subsidiaryCheck(exes, subsidiaryDefault);
                                        ann.subsidiaryData = this.getCost(subsidiarySet, ann.annCost, exes.manType);
                                        this.countCost();
                                    }
                                }
                            });
                            switch (parseInt(exes.manType)) {
                                case 0:
                                    exes.ratio = JSON.parse(exes.manRatio);
                                    break;
                                case 1:
                                    exes.ratio = JSON.parse(exes.iteProportion);
                                    break;
                                case 2:
                                    break;
                            }
                        });
                        if (this.apportionData?.conWork && this.apportionData?.conWork !== undefined) {
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
            scrollToIteElement(el) {
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

                    exes.annualData = [];
                    const totalCost = parseInt(exes.exeCost);//總金額
                    const createYear = exes.exeCreateMonth.year;//資料開始年
                    const createMonth = exes.exeCreateMonth.month;//資料開始月
                    const startYear = exes.exeStartYear;//開始計算年
                    const totalMonths = parseInt(exes.exeMonth);//需要總月數
                    const avgCost = Math.round(totalCost / totalMonths);//平均每月金額

                    let nowYear = parseInt(startYear);//當前計算年(提列年度)
                    let overMonth = totalMonths;//剩餘為分攤月
                    let lastCost = totalCost;//剩餘為分攤金額
                    const firstMonth = (nowYear - createYear) * 12 + (12 - createMonth);//第一個分攤年度需要的月數
                    console.log(avgCost);
                    console.log(overMonth);
                    console.log(firstMonth);


                    //計算總共需要年份
                    let start = exes.exeCreateMonth;
                    let end = this.getYearMonth(start, firstMonth);
                    let cost = parseInt((firstMonth > totalMonths ? totalMonths : firstMonth) * avgCost);
                    exes.annualData.push({
                        annYear: nowYear,
                        annStartMonth: start,
                        annEndMonth: end,
                        annMonth: firstMonth > totalMonths ? totalMonths : firstMonth,
                        annCost: cost,
                        // subsidiaryData: nowYear === this.currentYear ? this.getCost(subsidiarySet, cost, exes.manType) : subsidiaryDefault,
                    });
                    lastCost = lastCost - cost;
                    if (parseInt(this.apportionData.appYear) === nowYear) {
                        exes.exeYearCost = cost;
                    }
                    if (firstMonth < totalMonths) {
                        nowYear = nowYear + 1;
                        overMonth = overMonth - firstMonth;
                        cost = parseInt(avgCost * 12);
                        while (overMonth > 12) {
                            start = this.getYearMonth(end, 2);
                            end = this.getYearMonth(start, 12);
                            const lastDay = new Date(nowYear, 11 + 1, 0).getDate();
                            exes.annualData.push({
                                annYear: nowYear,
                                annStartMonth: start,
                                annEndMonth: end,
                                annMonth: 12,
                                annCost: cost,
                                // subsidiaryData: nowYear === this.currentYear ? this.getCost(subsidiarySet, cost, exes.manType) : subsidiaryDefault,
                            });
                            lastCost = lastCost - cost;
                            if (parseInt(this.apportionData.appYear) === nowYear) {
                                exes.exeYearCost = parseInt(avgCost * 12);
                            }
                            nowYear = nowYear + 1;
                            overMonth = overMonth - 12;
                        }
                        if (overMonth > 0) {
                            start = this.getYearMonth(end, 2);
                            end = this.getYearMonth(start, overMonth);
                            cost = parseInt(avgCost * overMonth);
                            exes.annualData.push({
                                annYear: nowYear,
                                annStartMonth: start,//new Date(nowYear, 0, 1),//{year: nowYear, month: 0, day: 1},
                                annEndMonth: end,
                                annMonth: overMonth,
                                annCost: lastCost,//cost,
                                // subsidiaryData: nowYear === this.currentYear ? this.getCost(subsidiarySet, cost, exes.manType) : subsidiaryDefault,
                            });
                            if (parseInt(this.apportionData.appYear) === nowYear) {
                                exes.exeYearCost = cost;
                            }
                        }
                    }


                    const subsidiaryDefault = this.subsidiaryDefault(exes);
                    const subsidiarySet = this.subsidiaryCheck(exes, subsidiaryDefault);
                    console.log(exes.ratio);
                    exes.annualData.forEach(ann => {
                        console.log('aa');
                        if (parseInt(ann.annYear) === this.currentYear) {
                            console.log(ann.annCost);
                            ann.subsidiaryData = this.getCost(subsidiarySet, ann.annCost, exes.manType);
                        }
                    });
                    this.countCost();
                }
                // exes.annualData.forEach(ann => {
                //     this.mathCompany(ann);
                // });
            },
            subsidiaryDefault(exes) {
                const subsidiariesArray = exes.iteSubsidiaries.split('|');
                const subsidiaryDefault = [];
                subsidiariesArray.forEach(comCode => {
                    subsidiaryDefault.push({
                        comCode: comCode,
                        subAmount: 0,
                        subPercent: 0,
                        subCost: 0,
                        subAmountOG: 0,
                        subPercentOG: 0,
                        subCostOG: 0,
                    })
                });
                return subsidiaryDefault;
            },
            subsidiaryCheck(exes, subsidiarySet) {
                switch (parseInt(exes.manType)) {
                    case 0:
                        subsidiarySet.forEach(sub => {
                            let subAmountTotal = 0;
                            exes.ratio.forEach(ite => {
                                if (sub.comCode === ite.comCode) {
                                    subAmountTotal += parseInt(ite.s);
                                }
                            });
                            exes.ratio.forEach(ite => {
                                if (sub.comCode === ite.comCode) {
                                    sub.subAmount = parseInt(ite.s);
                                    sub.subAmountOG = parseInt(ite.s);
                                    sub.subPercent = (parseInt(ite.s) / subAmountTotal * 100).toFixed(2);
                                    sub.subPercentOG = (parseInt(ite.s) / subAmountTotal * 100).toFixed(2);
                                }
                            });
                        });
                        break;
                    case 1:
                        subsidiarySet.forEach(sub => {
                            exes.ratio.forEach(ite => {
                                if (sub.comCode === ite.comCode) {
                                    sub.subPercent = parseFloat(ite.p).toFixed(2);
                                    sub.subPercentOG = parseFloat(ite.p).toFixed(2);
                                }
                            });
                        });
                        break;
                    case 2://
                        break;

                }
                return subsidiarySet;
            },
            getCost(subsidiaryList, cost, manType) {
                switch (parseInt(manType)) {
                    case 0:
                        let totalAmount = 0;
                        subsidiaryList.forEach(sub => {
                            totalAmount += parseInt(sub.subAmount);
                        });
                        subsidiaryList.forEach(sub => {
                            sub.subPercent = parseFloat(sub.subAmount / totalAmount * 100).toFixed(2);
                            sub.subPercentOG = parseFloat(sub.subAmount / totalAmount * 100).toFixed(2);
                            sub.subCost = Math.round(cost * sub.subPercent / 100);
                            sub.subCostOG = Math.round(cost * sub.subPercent / 100);
                        });
                        break;
                    case 1:
                        subsidiaryList.forEach(sub => {
                            sub.subCost = Math.round(cost * sub.subPercent / 100);
                            sub.subCostOG = Math.round(cost * sub.subPercent / 100);
                        });
                        console.log(subsidiaryList);
                        break;
                    case 2:
                        break;
                }
                return subsidiaryList;
            },
            mathCompany(ann) {
                if (ann?.subsidiaryData) {
                    ann.subsidiaryData.forEach(sub => {
                        sub.subCost = Math.round(ann.annCost * sub.subPercent / 100);
                        sub.subCostOG = Math.round(ann.annCost * sub.subPercent / 100);
                    });
                    this.countCost();
                }
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
            async updateApportion() {
                const payload = cloneDeep(this.apportionData);
                if (-1 === parseInt(this.apportionData.conApp)) {
                    const memberList = [];
                    memberList.push(this.iMemberData);
                    this.$root.addDataPush(memberList, this.mMemberData);
                    this.$root.addDataPush(memberList, this.uMemberData);
                    payload.memberData = memberList;
                }
                payload.appStatus = 0;

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

                payload.exesData.forEach(exe => {
                    exe.exeCreateMonth = String(exe.exeCreateMonth.year) + String(parseInt(exe.exeCreateMonth.month) + 1).padStart(2, '0');
                    exe.annualData.forEach(ann => {
                        ann.annStartMonth = String(ann.annStartMonth.year) + String(parseInt(ann.annStartMonth.month) + 1).padStart(2, '0');
                        ann.annEndMonth = String(ann.annEndMonth.year) + String(parseInt(ann.annEndMonth.month) + 1).padStart(2, '0');
                    });
                });

                console.log(payload);
                await this.saveApportion(payload, this.apportionData.appId);
                this.$router.push(`/apportion/sl/${this.apportionData.appId}`);


            },
            getYearMonth(nowYearMonth, num) {
                // 将传入的 nowYearMonth 转换为 Date 对象
                num = num - 1;
                const currentDate = new Date(nowYearMonth.year, nowYearMonth.month, 1);

                // 计算新日期
                currentDate.setMonth(currentDate.getMonth() + num);

                // 获取新日期的年份和月份
                const newYear = currentDate.getFullYear();
                const newMonth = currentDate.getMonth();

                // 返回结果
                return {year: newYear, month: newMonth};
            },
            createApportion() {
                this.$api
                    .get(this.$test ? `/api/?type=apportionId` : `/api/iform/apportionId`, {
                        params: {
                            conId: this.conId,
                            perKey: this.per.perKey,
                            comCode: this.per.comCode,
                        }
                    })
                    .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                            this.$router.push(`/apportion/up/${response.data.appId}`);
                        } else {
                            console.log('err');
                        }

                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
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

    .only-month .dp__month_picker_header {
        display: none !important;
    }
</style>