<template>
    <template v-if="isLoading">
        <section class="section">
            <ul class="breadcrumb breadcrumb-style ">
                <li class="breadcrumb-item">
                    <h4 class="page-title m-b-0">表單申請</h4>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="`/review/list`">
                        <vue-feather type="link"></vue-feather>
                        待辦文件列表
                    </router-link>
                </li>
                <li class="breadcrumb-item">查看文件</li>
            </ul>


            <div class="section-body">
                <div class="d-flex" id="exportPDF">
                    <!-- 主要內容 -->
                    <div id="myMainDocument" :class="viewFile ? 'col-6' : 'col-12'">
                        <div class="row">
                            <template v-for="(area, parentIndex) in conValue">
                                <div class="col-12" :id="'my'+parentIndex">
                                    <div v-if="area.areaType === '1'" class="card contract-title">
                                        <div class="author-box-name d-flex justify-content-between"
                                             style="margin-bottom: 20px;padding: 10px 25px;border-bottom-color: #f9f9f9;">
                                            <h4 class="myCardTitle" style="font-size: x-large;">
                                                {{ contractData.temTitle }}
                                                <vue-feather v-if="area.areaNote !== ''"
                                                             v-tooltip="{ content: area.areaNote, placement: 'right' }"
                                                             type="help-circle" size="20" stroke="blue"></vue-feather>
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
                                            <div class="myFont16Title" style="margin: 0 10px;">申請類型：
                                                <span v-if="'0' === contractData.conType"
                                                      class="date myFont16">新增</span>
                                                <span v-if="'1' === contractData.conType"
                                                      class="date myFont16">變更</span>
                                                <span v-if="'2' === contractData.conType"
                                                      class="date myFont16">終止</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="area.areaType === '2' && expSum > 0"
                                         class="card">
                                        <div class="card-header justify-content-between">
                                            <h4 class="myCardTitle">
                                                <div data-v-8aa5a2bd="" class="author-box-name d-flex"
                                                     style="margin-bottom: 20px;">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>{{ area.areaTitle }}</span>
                                                </div>
                                                <vue-feather v-if="area.areaNote !== ''"
                                                             v-tooltip="{ content: area.areaNote, placement: 'right' }"
                                                             type="help-circle" size="20" stroke="blue"></vue-feather>
                                            </h4>
                                        </div>
                                        <div class="card-body myNotification">
                                            <p>僅供各公司簽核參考，實際收付款以當年度分攤收付款簽呈為主。</p>
                                            <div class="table-responsive">
                                                <table class="newTable" style="width: auto;">
                                                    <caption>預計分攤費用資料表</caption>
                                                    <thead style="position: sticky;top: 0;" class="myNew">
                                                    <tr>
                                                        <th style="min-width: 100px;"
                                                            scope="col"></th>
                                                        <template v-for="com in expData">
                                                            <th v-if="conCompany.includes(com.comCode)" scope="col"
                                                                style="min-width:120px; max-width: 120px;">{{
                                                                com.comTitle }}
                                                            </th>
                                                        </template>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            分攤比例
                                                        </td>
                                                        <template v-for="com in expData">
                                                            <td v-if="conCompany.includes(com.comCode)">
                                                                {{ (com.comValue / expSum * 100).toFixed(2) }}%
                                                            </td>
                                                        </template>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            分攤費用
                                                        </td>
                                                        <template v-for="com in expData">
                                                            <td v-if="conCompany.includes(com.comCode)">
                                                                <input type="text" disabled :value="com.comValue"
                                                                       style="background-color: white;"
                                                                       class="form-control"/>
                                                            </td>
                                                        </template>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="area.areaType !== '1' && area.areaType !== '2'" class="card">
                                        <div class="card-header justify-content-between">
                                            <h4 class="myCardTitle">
                                                <span class="myFont16 d-flex align-center"
                                                      style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                                    <vue-feather type="tag" size="20"
                                                                 style="transform: rotate(135deg); padding-right: 0px;"
                                                                 class="m-r-5"></vue-feather>{{ area.areaTitle }}</span>
                                                <vue-feather v-if="area.areaNote !== ''"
                                                             v-tooltip="{ content: area.areaNote, placement: 'right' }"
                                                             type="help-circle" size="20" stroke="blue"></vue-feather>
                                            </h4>
                                        </div>
                                        <div class="card-body myNotification">
                                            <div class="row">
                                                <template v-for="(col, childIndex) in area.colItem">
                                                    <div :class="['col-' + col.width + ' sub-item']">
                                                        <template v-if="col.type === 'subject'">
                                                            <label v-if="col.name !== '' || col.tip !== ''"
                                                                   class="myFont16 col-4 p-t-10">{{ col.name }}
                                                                <vue-feather v-if="col.tip !== ''"
                                                                             v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                             type="help-circle" size="20"
                                                                             stroke="blue"></vue-feather>
                                                            </label>
                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <label class="row-label row-title">共用計劃書名稱</label>
                                                                    <input type="text" :value="contractData.conTitle"
                                                                           class="form-control row-text"
                                                                           style="background-color: white;" disabled>
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <label class="row-label row-title">共用計劃框架</label>
                                                                    <input type="text" :value="contractData.frmTitle"
                                                                           class="form-control row-text"
                                                                           style="background-color: white;" disabled>
                                                                </div>
                                                                <div class="col-4">
                                                                    <label class="row-label row-title">生效日期</label>
                                                                    <input type="text" :value="contractData.conDate"
                                                                           class="form-control row-text"
                                                                           style="background-color: white;"
                                                                           placeholder="未填寫將以簽核完成日為依據" disabled>
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <label class="row-label row-title">維運公司</label>
                                                                    <input disabled type="text"
                                                                           :value="contractData.comTitle"
                                                                           class="form-control row-text"
                                                                           style="background-color: white;">
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <label class="row-label row-title">使用公司</label>
                                                                    <div class="d-flex my-list">
                                                                        <ul style="padding-left: 0px;">
                                                                            <li v-for="option in this.conCompany">
                                                                                <input type="text" :value="this.$root.getCompanyTitle('',
                                                                                    option)"
                                                                                       disabled
                                                                                       class="form-control"
                                                                                       style="background-color: white; width: 90px !important;"/>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <label class="row-label row-title">作業種類</label>
                                                                    <div class="d-flex my-list">
                                                                        <ul style="padding-left: 0px;">
                                                                            <li v-for="(option, idx) in contractData.conWork.split('|')">
                                                                                <input type="text"
                                                                                       :value="this.$root.getWorkTitle(option)"
                                                                                       disabled
                                                                                       class="form-control"
                                                                                       style="background-color: white; width: 65px; !important;"/>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </template>
                                                        <template v-if="col.type.startsWith('list')">
                                                            <div>
                                                                <label v-if="col.name !== '' || col.tip !== ''"
                                                                       class="row-label row-title">{{
                                                                    col.name }}
                                                                    <vue-feather v-if="col.tip !== ''"
                                                                                 v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                 type="help-circle" size="20"
                                                                                 stroke="blue"></vue-feather>
                                                                </label>
                                                                <p>{{ col.value }}</p>
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type.startsWith('word')">
                                                            <!--word-->
                                                            <div>
                                                                <label v-if="col.name !== '' || col.tip !== ''"
                                                                       class="row-label row-title">{{
                                                                    col.name }}
                                                                    <vue-feather v-if="col.tip !== ''"
                                                                                 v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                 type="help-circle" size="20"
                                                                                 stroke="blue"></vue-feather>
                                                                </label>
                                                                <p>{{ col.value }}</p>
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'work_area_bk'">
                                                            <label v-if="col.name !== '' || col.tip !== ''"
                                                                   class="myFont16 p-t-10">{{
                                                                col.name }}
                                                                <vue-feather v-if="col.tip !== ''"
                                                                             v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                             type="help-circle" size="20"
                                                                             stroke="blue"></vue-feather>
                                                            </label>
                                                            <div v-for="(ite, iteIndex) in itemData"
                                                                 style="border-radius: 3px; border: 1px solid #ced4da;">
                                                                <div style="background-color:#EAF7ED ;padding-top: 10px;padding-left: 10px;">
                                                                    <div class="row">
                                                                        <div class="col-4">
                                                                            <label class="row-label row-title">共用作業項目</label>
                                                                            <input type="text" :value="ite.iteTitle"
                                                                                   disabled
                                                                                   style="background-color: white;"
                                                                                   class="form-control row-text">
                                                                        </div>
                                                                        <div class="col-4">
                                                                            <label class="row-label row-title">作業種類</label>
                                                                            <input type="text" :value="ite.worTitle"
                                                                                   disabled
                                                                                   style="background-color: white;"
                                                                                   class="form-control row-text">
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div style="padding:10px 10px;">
                                                                    <div class="row">
                                                                        <div class="col-4">
                                                                            <label class="row-label row-title">費用分攤原則</label>
                                                                            <input type="text" :value="ite.disTitle"
                                                                                   disabled
                                                                                   style="background-color: white;"
                                                                                   class="form-control row-text">
                                                                        </div>
                                                                        <div class="col-4">
                                                                            <label class="row-label row-title">計算基礎</label>
                                                                            <input type="text" :value="ite.manTitle"
                                                                                   disabled
                                                                                   style="background-color: white;"
                                                                                   class="form-control row-text">
                                                                        </div>
                                                                        <div v-if="'2' === ite.manType"
                                                                             class="col-4">
                                                                            <label class="row-label row-title">說明</label>
                                                                            <input type="text" :value="ite.iteTypeNote"
                                                                                   disabled
                                                                                   style="background-color: white;"
                                                                                   class="form-control row-text">
                                                                        </div>
                                                                    </div>

                                                                    <div class="row">
                                                                        <div class="col-4">
                                                                            <label class="row-label row-title">服務時間</label>
                                                                            <input type="text" :value="ite.iteTime"
                                                                                   disabled
                                                                                   style="background-color: white;"
                                                                                   class="form-control row-text">
                                                                        </div>
                                                                    </div>

                                                                    <div class="row">
                                                                        <div class="col-12">
                                                                            <label class="row-label row-title">權限控管及資料管制</label>
                                                                            <textarea class="form-control row-full"
                                                                                      spellcheck="false" disabled
                                                                                      style="background-color: white; width: 98%;">{{ ite.iteControl}}</textarea>
                                                                        </div>
                                                                    </div>

                                                                    <div class="row">
                                                                        <div class="col-12">
                                                                            <label class="row-label row-title">使用公司</label>
                                                                            <div class="d-flex my-list">
                                                                                <ul style="padding-left: 0px;">
                                                                                    <li v-for="(option, idx) in ite.iteSubsidiaries.split('|')">
                                                                                        <input type="text" :value="this.$root.getCompanyTitle('',
                                                                                        option)" disabled
                                                                                               class="form-control"
                                                                                               style="background-color: white; width: 90px; !important;"/>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div v-if="'1' === ite.manType && typeof ite.iteProportion === 'object'"
                                                                         class="row">
                                                                        <div class="col-12">
                                                                            <label class="row-label row-title">使用公司固定分攤比例</label>
                                                                            <div class="d-flex my-list">
                                                                                <ul style="padding-left: 0px;">
                                                                                    <template
                                                                                            v-for="pp in ite.iteProportion">
                                                                                        <li v-if="pp.p !== '0'">
                                                                                            <input type="text"
                                                                                                   :value="this.$root.getCompanyTitle('',
                                                                                                   pp.comCode) + '  ' + pp.p + '%'"
                                                                                                   disabled
                                                                                                   class="form-control"
                                                                                                   style="background-color: white; width: 120px; !important;"/>
                                                                                        </li>
                                                                                    </template>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'work_area'">
                                                            <label v-if="col.name !== '' || col.tip !== ''"
                                                                   class="myFont16">{{
                                                                col.name }}
                                                                <vue-feather v-if="col.tip !== ''"
                                                                             v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                             type="help-circle" size="20"
                                                                             stroke="blue"></vue-feather>
                                                            </label>

                                                            <span class="myFont16 d-flex align-center row-title"><vue-feather
                                                                    type="chevrons-right" size="20"></vue-feather>共用作業項目與費用分攤原則</span>
                                                            <div v-for="wor in workData" class="row"
                                                                 style="margin-bottom: 20px">
                                                                <label class="myFont16 p-t-10">{{
                                                                    this.$root.getWorkTitle(wor) }}</label>
                                                                <div class="table-responsive">
                                                                    <table class="newTable">
                                                                        <caption>共用作業項目</caption>
                                                                        <thead style="position: sticky;top: 0;"
                                                                               class="myNew">
                                                                        <tr>
                                                                            <th style="width: 140px;"
                                                                                scope="col">共用作業項目
                                                                            </th>
                                                                            <th style="width: 280px;"
                                                                                scope="col">費用分攤原則
                                                                            </th>
                                                                            <th style="width: 140px;"
                                                                                scope="col">計算基礎
                                                                            </th>
                                                                            <th style="width: auto;"
                                                                                scope="col">費用分攤原則說明
                                                                            </th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <template v-for="ite in itemData">
                                                                            <tr v-if="wor === ite.worId">
                                                                                <td>{{ ite.iteTitle }}</td>
                                                                                <td>{{ ite.disTitle }}</td>
                                                                                <td>{{ ite.manTitle }}</td>
                                                                                <td>{{ ite.iteTypeNote }}</td>
                                                                            </tr>
                                                                        </template>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <span class="myFont16 d-flex align-center row-title"
                                                                  style="padding-top: 10px;"><vue-feather
                                                                    type="chevrons-right" size="20"></vue-feather>共用作業項目之固定分攤比例</span>
                                                            <div class="row" style="margin-bottom: 20px">
                                                                <div class="table-responsive">
                                                                    <table class="newTable">
                                                                        <caption>共用作業項目之固定分攤比例</caption>
                                                                        <thead style="position: sticky;top: 0;"
                                                                               class="myNew">
                                                                        <tr>
                                                                            <th style="width: auto;"
                                                                                scope="col">使用公司
                                                                            </th>
                                                                            <th v-for="com in companyData"
                                                                                style="width: 120px;"
                                                                                scope="col">{{com.comTitle}}
                                                                            </th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <template v-for="ite in itemData">
                                                                            <tr v-if="'1' === ite.manType && typeof ite.iteProportion === 'object'">
                                                                                <td>{{ ite.iteTitle }}</td>
                                                                                <template v-for="com in companyData">
                                                                                    <template
                                                                                            v-for="pp in ite.iteProportion">
                                                                                        <td v-if="pp.comCode === com.comCode">
                                                                                            {{ pp.p + '%' }}
                                                                                        </td>
                                                                                    </template>
                                                                                </template>
                                                                            </tr>
                                                                        </template>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div class="row" style="margin-bottom: 20px">
                                                                <span class="myFont16 d-flex align-center row-title"
                                                                      style="padding-top: 10px;"><vue-feather
                                                                        type="chevrons-right" size="20"></vue-feather>共用作業項目之使用公司</span>
                                                                <div class="table-responsive">
                                                                    <table class="newTable">
                                                                        <caption>共用作業項目之使用公司</caption>
                                                                        <thead style="position: sticky;top: 0;"
                                                                               class="myNew">
                                                                        <tr>
                                                                            <th style="width: auto;"
                                                                                scope="col">使用公司
                                                                            </th>
                                                                            <th v-for="com in companyData"
                                                                                style="width: 120px;"
                                                                                scope="col">{{com.comTitle}}
                                                                            </th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <template v-for="ite in itemData">
                                                                            <tr v-if="'1' === ite.manType && typeof ite.iteProportion === 'object'">
                                                                                <td>{{ ite.iteTitle }}</td>
                                                                                <template v-for="com in companyData">
                                                                                    <td v-if="ite.iteSubsidiaries.split('|').includes(com.comCode)">
                                                                                        <vue-feather
                                                                                                type="check-square"></vue-feather>
                                                                                    </td>
                                                                                    <td v-else>
                                                                                        <vue-feather
                                                                                                type="square"></vue-feather>
                                                                                    </td>
                                                                                </template>
                                                                            </tr>
                                                                        </template>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <span class="myFont16 d-flex align-center row-title"
                                                                  style="padding-top: 10px;"><vue-feather
                                                                    type="chevrons-right" size="20"></vue-feather>服務時間與權限控管</span>
                                                            <div class="row" style="margin-bottom: 20px">
                                                                <div class="table-responsive">
                                                                    <table class="newTable">
                                                                        <caption>服務時間與權限控管</caption>
                                                                        <thead style="position: sticky;top: 0;"
                                                                               class="myNew">
                                                                        <tr>
                                                                            <th style="width: 140px;"
                                                                                scope="col">共用作業項目
                                                                            </th>
                                                                            <th style="width: 280px;"
                                                                                scope="col">服務時間
                                                                            </th>
                                                                            <th style="width: auto;"
                                                                                scope="col">權限控管及資料管制
                                                                            </th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <tr v-for="ite in itemData">
                                                                            <td>{{ ite.iteTitle }}</td>
                                                                            <td>{{ ite.iteTime }}</td>
                                                                            <td>{{ ite.iteControl }}</td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'sign'">
                                                            <label v-if="col.name !== '' || col.tip !== ''"
                                                                   class="myFont16 col-4 p-t-10">{{ col.name }}
                                                                <vue-feather v-if="col.tip !== ''"
                                                                             v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                             type="help-circle" size="20"
                                                                             stroke="blue"></vue-feather>
                                                            </label>
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
                                                            <div v-if="showConcat">
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
                                                                                                    v-for="com in conCompany">
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
                                                        <template v-if="col.type === 'file_area'">
                                                            <label v-if="col.name !== '' || col.tip !== ''"
                                                                   class="myFont16 mb-1">{{
                                                                col.name }}
                                                                <vue-feather v-if="col.tip !== ''"
                                                                             v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                             type="help-circle" size="20"
                                                                             stroke="blue"></vue-feather>
                                                            </label>
                                                            <div class="d-flex justify-content-between align-center"
                                                                 style="margin-bottom: 20px;">
                                                                <vue-feather type="paperclip" size="20"></vue-feather>
                                                                <label class="myFont16 col-4 p-t-10">{{(conFile ?
                                                                    conFile.length : 0) + (conFileMeeting ?
                                                                    conFileMeeting.length : 0) + (conFilePlan ?
                                                                    conFilePlan.length : 0) }}則附加檔案</label>
                                                                <!-- 這裡放附檔 -->
                                                                <div>
                                                                    <template v-if="conFileMeeting">
                                                                        <template
                                                                                v-for="(option, index) in conFileMeeting">
                                                                            <a href="javascript:void(0);"
                                                                               @click="openViewFile(contractData.filePath+option)">會議記錄
                                                                                {{ index+1 }}</a> |
                                                                        </template>
                                                                    </template>
                                                                    <template v-if="conFilePlan">
                                                                        <template
                                                                                v-for="(option, index) in conFilePlan">
                                                                            <a href="javascript:void(0);"
                                                                               @click="openViewFile(contractData.filePath+option)">專規劃報告
                                                                                {{ index+1 }}</a> |
                                                                        </template>
                                                                    </template>
                                                                    <template v-if="conFile">
                                                                        <template
                                                                                v-for="(option, index) in conFile">
                                                                            <a href="javascript:void(0);"
                                                                               @click="openViewFile(contractData.filePath+option)">其他附件
                                                                                {{ index+1 }}</a> |
                                                                        </template>
                                                                    </template>
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'select'">
                                                            <div>
                                                                <label v-if="col.name !== '' || col.tip !== ''"
                                                                       class="row-label row-title">{{ col.name }}
                                                                    <vue-feather v-if="col.tip !== ''"
                                                                                 v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                 type="help-circle" size="20"
                                                                                 stroke="blue"></vue-feather>
                                                                </label>
                                                                <input type="text" :value="col.value" disabled
                                                                       style="background-color: white;"
                                                                       class="form-control">
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'radio'">
                                                            <div class="d-flex justify-content-between align-center"
                                                                 style="margin-bottom: 20px; max-width: 450px;">
                                                                <label v-if="col.name !== '' || col.tip !== ''"
                                                                       class="myFont16 col-4 p-t-10">{{ col.name }}
                                                                    <vue-feather v-if="col.tip !== ''"
                                                                                 v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                 type="help-circle" size="20"
                                                                                 stroke="blue"></vue-feather>
                                                                </label>
                                                                <div v-for="option in col.value.split('|')"
                                                                     class="form-check p-t-10">
                                                                    <input class="form-check-input" type="radio"
                                                                           :value="option"
                                                                           :id="'rdo_'+parentIndex+'_'+childIndex">
                                                                    <label class="form-check-label"
                                                                           :for="'rdo_'+parentIndex+'_'+childIndex">{{
                                                                        option }}</label>
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'check'">
                                                            <div class="d-flex justify-content-between align-center"
                                                                 style="margin-bottom: 20px; max-width: 450px;">
                                                                <label v-if="col.name !== '' || col.tip !== ''"
                                                                       class="myFont16 col-4 p-t-10">{{ col.name }}
                                                                    <vue-feather v-if="col.tip !== ''"
                                                                                 v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                 type="help-circle" size="20"
                                                                                 stroke="blue"></vue-feather>
                                                                </label>

                                                                <div v-for="option in col.value.split('|')"
                                                                     class="form-check p-t-10">
                                                                    <input class="form-check-input" type="checkbox"
                                                                           :value="option"
                                                                           :id="'cbx_'+parentIndex+'_'+childIndex">
                                                                    <label class="form-check-label"
                                                                           :for="'cbx_'+parentIndex+'_'+childIndex">{{
                                                                        option }}</label>
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'text'">
                                                            <div>
                                                                <label v-if="col.name !== '' || col.tip !== ''"
                                                                       class="row-label row-title">{{ col.name }}
                                                                    <vue-feather v-if="col.tip !== ''"
                                                                                 v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                 type="help-circle" size="20"
                                                                                 stroke="blue"></vue-feather>
                                                                </label>
                                                                <input type="text" :value="col.value" disabled
                                                                       style="background-color: white;"
                                                                       class="form-control row-text">
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'box'">
                                                            <div>
                                                                <label v-if="col.name !== '' || col.tip !== ''"
                                                                       class="row-label row-title">{{ col.name }}
                                                                    <vue-feather v-if="col.tip !== ''"
                                                                                 v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                 type="help-circle" size="20"
                                                                                 stroke="blue"></vue-feather>
                                                                </label>
                                                                <textarea class="form-control" disabled
                                                                          style="background-color: white;"
                                                                          spellcheck="false">{{ col.value }}</textarea>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </template>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <template v-if="viewFile">
                        <div id="myPdfViewer" class="col-6" style="height: 75vh; position: sticky; top:100px;">
                            <div class="card-header d-flex justify-content-end">
                                <!--<a download="" :href="viewFileUrl" target="_blank"-->
                                <!--class="btn btn-icon icon-left btn-primary myFont16"-->
                                <!--style="border-radius: 6px;">-->
                                <!--下載檔案-->
                                <!--</a>-->
                                <button type="button" @click="downloadViewFile(viewFileUrl)"
                                        class="btn btn-icon icon-left btn-primary myFont16"
                                        style="border-radius: 6px;">
                                    下載檔案
                                </button>
                                <button type="button" id="closePdfViewer" @click="closeViewFile"
                                        class="btn btn-icon icon-left btn-primary myFont16"
                                        style="border-radius: 6px;">
                                    取消檢視
                                </button>
                            </div>
                            <embed v-if="viewFilePDF" :src="viewFileUrl" width="100%" height="100%"/>
                            <!--<vue-office-pdf v-if="viewFilePDF" :src="viewFileUrl" style="width: 100%;height: 95%;"/>-->
                            <vue-office-docx v-if="viewFileDOCK" :src="viewFileUrl" style="width: 100%;height: 95%;"/>
                            <vue-office-excel v-if="viewFileXLSE" :src="viewFileUrl" style="width: 100%;height: 95%;"/>
                        </div>
                    </template>
                </div>

                <div class="col-6" style="padding-bottom: 20px;">
                    <template v-if="'3' === contractData.conStatus">
                        <button type="button"
                                @click="actionTo('ex', contractData.conId)"
                                class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">費用
                        </button>
                        <button v-if="contractData.conStatus === '3'" @click="exportPDF" type="button"
                                class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">
                            PDF
                        </button>
                    </template>
                    <button v-if="contractData.conStatus === '1' && checkMember()"
                            @click="signContract()"
                            type="button"
                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                        簽核
                    </button>
                    <button
                            v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                            @click="backContract()"
                            :disabled="msg === ''"
                            type="button"
                            class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">退回
                    </button>
                    <input v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                           type="text" class="form-control" v-model="msg"
                           placeholder="退回請填寫源由"/>

                    <template v-if="contractData.perKey === per.perKey">
                        <button v-if="contractData.conStatus === '0'"
                                @click="releaseSign"
                                type="button"
                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                            發起
                        </button>
                        <template v-if="'3' === contractData.conStatus">
                            <button v-if="'0' === contractData.conInh" type="button"
                                    @click="actionTo('ch', contractData.conId)"
                                    class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                變更
                            </button>
                            <button v-if="'0' === contractData.conInh" type="button"
                                    @click="actionTo('tp', contractData.conId)"
                                    class="m-r-5 btn btn-outline-dark btn-border-radius waves-effect myFont16">
                                終止
                            </button>
                        </template>
                        <template v-if="'0' === contractData.conStatus || '1' === contractData.conStatus">
                            <button type="button" @click="cleanContract(contractData.conId)"
                                    class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                                撤案
                            </button>
                        </template>
                        <template v-if="'0' === contractData.conStatus">
                            <button type="button"
                                    @click="$router.push(`/contract/up/${contractData.conId}`)"
                                    class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                修改
                            </button>
                        </template>
                        <template v-if="'0' === contractData.conStatus || '2' === contractData.conStatus">
                            <button type="button"
                                    @click="deleteContract(contractData.conId)"
                                    class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                                刪除
                            </button>
                        </template>
                    </template>

                </div>

            </div>

        </section>
        <!-- 本案傳遞流程 -->
        <div class="row">
            <div :class="viewTransfer ? 'col-8' : 'col-12'" id="myView">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle" href="#">
                            <vue-feather type="list" size="20" class="m-r-5"></vue-feather>
                            本案傳遞流程
                        </h4>
                        <button type="button" @click="showTransfer" class="btn btn-icon icon-left btn-primary myFont16"
                                style="border-radius: 6px;">
                            查看傳遞紀錄
                        </button>
                    </div>
                    <div class="card-body myNotification viewBox">
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
                                <td class="bm-1"><span class="sign-title">管理維運公司承辦人</span><br>{{ iMemberData.comTitle}} {{
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
                                <td class="bm-1"><span class="sign-title">管理維運公司科級主管</span><br>{{ iMemberData.comTitle}} {{
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
                                    <td class="bm-1"><span class="sign-title">管理維運公司部級主管(含以上)</span><br>{{ mmem.comTitle}}
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
                                    <td class="bm-1"><span class="sign-title">使用公司部級主管(含以上)</span><br>{{ umem.comTitle}} {{
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
            <!-- 本案傳遞流程 -->
            <div v-if="viewTransfer" class="col-4">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle" href="#">
                            <vue-feather type="list" size="20" class="m-r-5"></vue-feather>
                            本案傳遞紀錄
                        </h4>
                        <button type="button" @click="closeTransfer" class="btn btn-icon icon-left btn-primary myFont16"
                                style="border-radius: 6px;">
                            關閉
                        </button>
                    </div>
                    <div class="card-body myNotification viewBox">
                        <div class="row">
                            <div class="col-12">
                                <div class="activities" style="padding-top: 10px;">
                                    <div v-for="log in contractLogData" class="activity">
                                        <div v-if="'-1' === log.colStatus" class="activity-icon bg-info text-white">
                                            <vue-feather type="file" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <div v-if="'0' === log.colStatus" class="activity-icon bg-success text-white">
                                            <vue-feather type="edit" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <template v-if="'1' === log.colStatus">
                                            <div v-if="'0' === log.memId" class="activity-icon bg-warning text-white">
                                                <vue-feather type="flag" style="padding-top: 13px;"></vue-feather>
                                            </div>
                                            <template v-else>
                                                <div v-if="'-1' === log.colMemberStatus" class="activity-icon bg-success text-white">
                                                    <vue-feather type="more-horizontal" style="padding-top: 13px;"></vue-feather>
                                                </div>
                                                <div v-if="'0' === log.colMemberStatus" class="activity-icon bg-success text-white">
                                                    <vue-feather type="eye" style="padding-top: 13px;"></vue-feather>
                                                </div>
                                                <div v-if="'1' === log.colMemberStatus" class="activity-icon bg-success text-white">
                                                    <vue-feather type="edit-2" style="padding-top: 13px;"></vue-feather>
                                                </div>
                                                <div v-if="'2' === log.colMemberStatus" class="activity-icon bg-danger text-white">
                                                    <vue-feather type="rotate-cw" style="padding-top: 13px;"></vue-feather>
                                                </div>
                                                <div v-if="'3' === log.colMemberStatus" class="activity-icon bg-success text-white">
                                                    <vue-feather type="check" style="padding-top: 13px;"></vue-feather>
                                                </div>
                                            </template>
                                        </template>
                                        <div v-if="'2' === log.colStatus" class="activity-icon bg-danger text-white">
                                            <vue-feather type="rotate-cw" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <div v-if="'3' === log.colStatus" class="activity-icon bg-warning text-white">
                                            <vue-feather type="star" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <div v-if="'4' === log.colStatus" class="activity-icon bg-dark text-white">
                                            <vue-feather type="trash-2" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <div class="activity-detail">
                                            <div class="mb-2">
                                                <span v-if="'-1' === log.colStatus" class="text-job">建立</span>
                                                <span v-if="'0' === log.colStatus" class="text-job">草稿</span>
                                                <span v-if="'1' === log.colStatus && '0' === log.memId" class="text-job">發起</span>
                                                <span v-if="'1' === log.colStatus && '0' !== log.memId && '0' === log.memType" class="text-job">發起</span>
                                                <span v-if="'1' === log.colStatus && '0' !== log.memId && '1' === log.memType" class="text-job">維運</span>
                                                <span v-if="'1' === log.colStatus && '0' !== log.memId && '2' === log.memType" class="text-job">使用</span>
                                                <span v-if="'2' === log.colStatus" class="text-job">退回</span>
                                                <span v-if="'3' === log.colStatus" class="text-job">已歸檔</span>
                                                <span v-if="'4' === log.colStatus" class="text-job">撤回</span>
                                                <template v-if="'1' === log.colStatus && ('0' === log.memId || ('0' !== log.memId && ('0' === log.memType || '1' === log.memType || '2' === log.memType)))">
                                                    <span class="bullet"></span>
                                                    <span v-if="'-1' === log.colMemberStatus" class="text-job">等待</span>
                                                    <span v-if="'0' === log.colMemberStatus" class="text-job">待檢視</span>
                                                    <span v-if="'1' === log.colMemberStatus" class="text-job">待簽</span>
                                                    <span v-if="'2' === log.colMemberStatus" class="text-job">退回</span>
                                                    <span v-if="'3' === log.colMemberStatus" class="text-job">完成</span>
                                                </template>
                                                <span class="bullet"></span>
                                                <span class="text-job">{{ log.colCreateTime }}</span>
                                            </div>
                                            <p>{{ log.perBu2 }}  {{ log.perBu3 }} {{ log.perName }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 本案傳遞流程 -->


        <!-- 浮動控制版 -->
        <div :class="isSidebarVisible ? 'settingSidebar showSettingPanel' : 'settingSidebar'" ref="sidebar">
            <a href="javascript:void(0)" class="settingPanelToggle" @click="sidebarClick"> <i
                    class="fa fa-spin fa-cog"></i>
            </a>
            <div class="settingSidebar-body ps-container ps-theme-default" style="overflow-y:auto;">
                <div class=" fade show active">
                    <div class="setting-panel-header">管理面板
                    </div>
                    <div class="p-15 border-bottom">
                        <div class="col-lg-12">
                            <div class="m-l-20">
                                <template v-if="'3' === contractData.conStatus">
                                    <button type="button"
                                            @click="actionTo('ex', contractData.conId)"
                                            class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">費用
                                    </button>
                                    <button v-if="contractData.conStatus === '3'" @click="exportPDF" type="button"
                                            class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">
                                        PDF
                                    </button>
                                </template>
                                <button v-if="contractData.conStatus === '1' && checkMember()"
                                        @click="signContract()"
                                        type="button"
                                        class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                    簽核
                                </button>
                                <button
                                        v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                                        @click="backContract()"
                                        :disabled="msg === ''"
                                        type="button"
                                        class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">退回
                                </button>
                                <input v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                                       type="text" class="form-control" v-model="msg"
                                       placeholder="退回請填寫源由"/>
                            </div>
                        </div>
                    </div>
                    <template v-if="contractData.perKey === per.perKey">
                        <div class="setting-panel-header">文件操作
                        </div>
                        <div class="p-15 border-bottom">
                            <div class="col-lg-12">
                                <div class="m-l-20">
                                    <button v-if="contractData.conStatus === '0'"
                                            @click="releaseSign"
                                            type="button"
                                            class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                        發起
                                    </button>
                                    <template v-if="'3' === contractData.conStatus">
                                        <button type="button" @click="actionTo('ch', contractData.conId)"
                                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                            變更
                                        </button>
                                        <button type="button" @click="actionTo('tp', contractData.conId)"
                                                class="m-r-5 btn btn-outline-dark btn-border-radius waves-effect myFont16">
                                            終止
                                        </button>
                                    </template>
                                    <template v-if="'0' === contractData.conStatus || '1' === contractData.conStatus">
                                        <button type="button"
                                                @click="cleanContract(contractData.conId)"
                                                class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                                            撤案
                                        </button>
                                    </template>
                                    <template v-if="'0' === contractData.conStatus">
                                        <button type="button" @click="$router.push(`/contract/up/${contractData.conId}`)"
                                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                            修改
                                        </button>
                                    </template>
                                    <template v-if="'0' === contractData.conStatus || '2' === contractData.conStatus">
                                        <button type="button"
                                                @click="deleteContract(contractData.conId)"
                                                class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                                            刪除
                                        </button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="p-15 border-bottom">
                        <h6 class="font-medium m-b-10">文件架構</h6>
                        <ul class="contact-list">
                            <li v-for="(item, index) in conValue" class="nav-item">
                                <a class="nav-link myFont16" href="javascript:void(0);"
                                   @click="scrollToElement('my' + index)">
                                    {{ '1' === item.areaType ? contractData.temTitle : item.areaTitle }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="p-15 border-bottom">
                        <h6 class="font-medium m-b-10">簽核紀錄</h6>
                        <ul class="contact-list">
                            <li class="nav-item">
                                <a class="nav-link myFont16" href="javascript:void(0);"
                                   @click="scrollToElement('myView')">本文件傳遞流程</a>
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
    </template>
    <template v-else>
        <vue-feather type="settings" animation="spin" animation-speed="slow"></vue-feather>
    </template>
</template>
<script>
    import Cookies from 'js-cookie'
    import dayjs from 'dayjs';
    import html2canvas from 'html2canvas';
    import html2pdf from 'html2pdf.js';
    import jsPDF from 'jspdf';
    import VueOfficeDocx from '@vue-office/docx';
    import '@vue-office/docx/lib/index.css';
    import VueOfficeExcel from '@vue-office/excel';
    import '@vue-office/excel/lib/index.css';
    import VueOfficePdf from '@vue-office/pdf';
    import {controlBoxMixin} from '@/mixins/controlBoxMixin.js';
    import {contractActionMixin} from '@/mixins/contractActionMixin.js';
    import {saveAs} from 'file-saver';

    export default {
        name: "Review_sl",
        mixins: [controlBoxMixin, contractActionMixin],
        data() {
            return {
                isLoading: false,
                showConcat: true,
                viewTransfer:false,
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
                conCompany: {},//使用公司
                expData: [],//預計分攤
                expSum: 0,

                templateStyleData: [],
                subsidiaryData: [],
                workData: {},
                itemList: [], // 新增一個空的數組
                iMemberList: [],//發起
                mMemberList: [],//維運
                uMemberList: [],//使用

                conFileMeeting: [],
                conFilePlan: [],
                conFile: [],
            };
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
            // 添加全域點擊事件監聽器
            window.addEventListener('click', this.handleGlobalClick);
        },
        beforeUnmount() {
            // 在元件銷毀之前移除事件監聽器
            window.removeEventListener('click', this.handleGlobalClick);
        },
        methods: {
            defaultData() {

            },
            fetchFirst() {
                window.scrollTo(0, 0);
                const conId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=contract&conId=${conId}` : `/api/adm/contract/${conId}`),
                    this.$api.get(this.$test ? `/api/?type=contractItem` : `/api/iform/contractItem/List`, {params: {conId: conId}}),
                    this.$api.get(this.$test ? `/api/?type=contractMember` : `/api/iform/contractMember/List`, {params: {conId: conId}}),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company/List'),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, itemResponse, memberResponse, contactResponse, companyResponse]) => {
                        //contactResponse
                        this.contactData = contactResponse.data.data;

                        //contractResponse
                        this.contractData = contractResponse.data.data;
                        this.conValue = this.contractData?.conValue ? JSON.parse(this.contractData.conValue) : null;
                        this.conFileMeeting = this.contractData?.conFileMeeting ? this.contractData.conFileMeeting.split('|') : null;
                        this.conFilePlan = this.contractData?.conFilePlan ? this.contractData.conFilePlan.split('|') : null;
                        this.conFile = this.contractData?.conFile ? this.contractData.conFile.split('|') : null;
                        this.conCompany = this.contractData?.conCompany ? this.contractData.conCompany.split('|') : null;
                        if (Array.isArray(this.conValue)) {
                            this.conValue.forEach(area => {
                                if ('2' === area.areaType && area.areaValue) {
                                    this.expData = area.areaValue;
                                    this.expData.forEach(exp => {
                                        this.expSum += exp.comValue;
                                    });
                                }
                            });
                        }

                        // itemResopnse
                        this.itemData = itemResponse.data.data;
                        this.itemData.forEach((item) => {
                            item.iteProportion = item.iteProportion && '' !== item.iteProportion ? JSON.parse(item.iteProportion) : item.iteProportion;
                        });

                        // memberResponse
                        this.iMemberData = memberResponse.data.data.find(member => member.memType === '0');
                        this.mMemberData = memberResponse.data.data.filter(member => member.memType === '1');
                        this.uMemberData = memberResponse.data.data.filter(member => member.memType === '2');

                        //contactResponse
                        this.companyData = companyResponse.data.data;

                        this.workData = this.contractData.conWork.split('|');
                        this.isLoading = true;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            // 發起簽核 releaseSign
            async releaseSign() {
                // 文件發起人必須與登入人資料一致
                if (this.iMemberData.comId === this.per.comId && this.iMemberData.memLV0Key === this.per.perKey) {
                    try {
                        await this.defaultContract();//重置文件資訊與簽核人員資料
                        let log = this.createContractLog(this.contractData.conId, 0, this.per.perKey, 3, '發起', 1);
                        await this.updateContractStatus(this.contractData.conId, 1, null, log);//修改文件狀態為進行中
                        const upMember = this.createUpMember(this.iMemberData, '0', 3, true);
                        await this.updateMember(upMember);//修改簽核組別資訊
                        alert('發起成功');
                        this.$router.go(0);

                    } catch (error) {
                        console.error('Edit failed:', error);
                    }
                }
                else {
                    alert('您並非發起人');
                }
            },

            // signContract 簽核作業
            async signContract() {
                let iMemberEnd = false;//維運平行簽核
                let upMember = null;
                if (this.iMemberData.comId === this.per.comId && (this.iMemberData.memNowKey === this.per.perKey || (this.iMemberData.memNowKey === '' && this.iMemberData.memLVCKey === '' && this.contactData.some(contact => contact.perKey.includes(this.per.perKey))))) {
                    const isLV = this.getMemberLV(this.iMemberData);
                    if (isLV) {
                        upMember = this.createUpMember(this.iMemberData, isLV, 3, true);
                        if (isLV === '2') {
                            iMemberEnd = true;
                        }
                    }
                }
                let mMemberEnd = false;
                this.mMemberData.forEach((mem) => {
                    if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 3, false);
                            if (isLV === '2') {
                                mMemberEnd = true;
                            }
                        }
                    }
                });

                let uMemberEnd = false;
                this.uMemberData.forEach((mem) => {
                    if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 3, false);
                            if (isLV === '2') {
                                uMemberEnd = true;
                            }
                        }
                    }
                });
                if (upMember) {
                    try {
                        await this.updateMember(upMember);
                        if (iMemberEnd) {
                            if (this.mMemberData.length > 0) {
                                for (let mem of this.mMemberData) {
                                    upMember = this.createUpMember(mem, '0', 0, false);
                                    try {
                                        await this.updateMember(upMember);
                                        alert('簽核完成');
                                        this.$router.go(0);
                                    } catch (error) {
                                        console.error('Edit failed:', error);
                                    }
                                }
                            }
                            else if (this.uMemberData.length > 0) {
                                for (let mem of this.uMemberData) {
                                    upMember = this.createUpMember(mem, '0', 0, false);
                                    try {
                                        await this.updateMember(upMember);
                                        alert('簽核完成');
                                        this.$router.go(0);
                                    } catch (error) {
                                        console.error('Edit failed:', error);
                                    }
                                }
                            }
                            else {
                                try {
                                    let log = this.createContractLog(this.contractData.conId, 0, '', 3, '文件簽核完成', 3);
                                    await this.updateContractStatus(this.contractData.conId, 3, dayjs().format('YYYY-MM-DD'), log);
                                    await this.clearMemberAll();
                                    alert('文件簽核完成');
                                    this.$router.go(0);
                                } catch (error) {
                                    console.error('Edit failed:', error);
                                }
                            }
                        }
                        else if (mMemberEnd) {
                            const mMemberParallel = await this.checkParallelTypeSign(1);
                            if (mMemberParallel) {
                                if (this.uMemberData.length > 0) {
                                    for (let mem of this.uMemberData) {
                                        upMember = this.createUpMember(mem, '0', 0, false);
                                        try {
                                            await this.updateMember(upMember);
                                            alert('簽核完成');
                                            this.$router.go(0);
                                        } catch (error) {
                                            console.error('Edit failed:', error);
                                        }
                                    }
                                    this.$router.go(0);
                                }
                                else {
                                    try {
                                        let log = this.createContractLog(this.contractData.conId, 0, '', 3, '文件簽核完成', 3);
                                        await this.updateContractStatus(this.contractData.conId, 3, dayjs().format('YYYY-MM-DD'), log);
                                        await this.clearMemberAll();
                                        alert('文件簽核完成');
                                        this.$router.go(0);
                                    } catch (error) {
                                        console.error('Edit failed:', error);
                                    }
                                }
                            }
                            else {
                                alert('簽核完成');
                                this.$router.go(0);
                            }
                        }
                        else if (uMemberEnd) {
                            const uMemberParallel = await this.checkParallelTypeSign(2);
                            if (uMemberParallel) {
                                try {
                                    let log = this.createContractLog(this.contractData.conId, 0, '', 3, '文件簽核完成', 3);
                                    await this.updateContractStatus(this.contractData.conId, 3, dayjs().format('YYYY-MM-DD'), log);
                                    await this.clearMemberAll();
                                    alert('文件簽核完成');
                                    this.$router.go(0);
                                } catch (error) {
                                    console.error('Edit failed:', error);
                                }
                            }
                            else {
                                alert('簽核完成');
                                this.$router.go(0);
                            }
                        }
                        else {
                            alert('簽核完成');
                            this.$router.go(0);
                        }
                    } catch (error) {
                        console.error('Edit failed:', error);
                    }
                }
                this.$router.go(0);
            },
            // backContract 退回
            async backContract() {
                let upMember = null;
                if (this.iMemberData.comId === this.per.comId && this.iMemberData.memNowKey === this.per.perKey) {
                    const isLV = this.getMemberLV(this.iMemberData);
                    if (isLV) {
                        upMember = this.createUpMember(this.iMemberData, isLV, 2, true);
                    }
                }
                this.mMemberData.forEach((mem) => {
                    if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 2, false);
                        }
                    }
                });
                this.uMemberData.forEach((mem) => {
                    if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 2, false);
                        }
                    }
                });
                if (upMember) {
                    try {
                        await this.updateMember(upMember);
                        let log = this.createContractLog(this.contractData.conId, upMember.memId, upMember.LVKey, 2, '文件退回', 2);
                        await this.updateContractStatus(this.contractData.conId, 2, null, log);
                        await this.clearMemberAll();
                        this.$router.push(`/contract/${this.$route.params.tem}/list`);

                    } catch (error) {
                        console.error('Edit failed:', error);
                    }
                }
                this.$router.go(0);
            },

            // 產生執行資料
            createUpMember(mem, isLV, signType, first) {//signType :0 開始待檢視 3簽核 2退件
                const conId = mem.conId;
                const memId = mem.memId;
                const time = signType === 0 ? null : dayjs().format('YYYY-MM-DD HH:mm:ss');
                const msg = signType === 0 || signType === 3 ? null : this.msg;
                const comTitle = this.$root.getCompanyTitle(mem.comId, '');
                const memBu2 = mem.memBu2;
                const memBu3 = mem.memBu3;
                const positionName = this.getLVPositionName(mem, isLV);
                const LVKey = this.getLVKey(mem, isLV);
                const positionNameNext = this.getLVPositionNameNext(mem, isLV, first);
                let conLogMsg = null;
                let isNext = null;
                let nextLVKey = null;
                let nextLVStatus = null;
                let nextLogMsg = null;
                let memStatus = null;
                let memLVCKey = null;
                let memLVCName = null;
                let memLVCPositionName = null;
                let conStatus = 1;
                if (signType === 3) {
                    conLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 簽核完成 ${msg !== null ? ':' + msg : ''}`
                    switch (isLV) {
                        case '0':
                            isNext = first ? 'C' : '1';
                            nextLVKey = first ? '' : mem.memLV1Key;
                            nextLVStatus = 0;
                            nextLogMsg = first ? '窗口人員 待檢視' : `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                            memStatus = 1;
                            break;
                        case 'C':
                            memLVCKey = this.per.perKey;
                            memLVCName = this.per.perName;
                            memLVCPositionName = this.per.perPositionName;
                            isNext = '1';
                            nextLVKey = mem.memLV1Key;
                            nextLVStatus = 0;
                            nextLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                            memStatus = 1;
                            break;
                        case '1':
                            isNext = '2';
                            nextLVKey = mem.memLV2Key;
                            nextLVStatus = 0;
                            nextLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                            memStatus = 1;
                            break;
                        case '2':
                            isNext = '';
                            nextLVKey = '';
                            nextLVStatus = -1;
                            memStatus = signType;
                    }
                }
                else {
                    if (signType === 2) {
                        conStatus = 2;
                        conLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 退件 ${msg !== '' ? ':' + msg : null}`
                    }
                    else if (signType === 0) {
                        nextLVKey = mem.memLV0Key;
                        nextLVStatus = 0;
                        conLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 待檢視`
                    }
                    memStatus = signType;
                }


                return {
                    conId: conId,
                    memId: memId,
                    [`memLV${isLV}Status`]: signType,
                    [`memLV${isLV}Time`]: time,
                    [`memLV${isLV}Msg`]: msg,
                    [`memLV${isNext}Status`]: signType === 3 && '' !== isNext ? 0 : null,
                    memLVCKey: memLVCKey,
                    memLVCName: memLVCName,
                    memLVCPositionName: memLVCPositionName,
                    LVKey: LVKey,
                    memNowKey: nextLVKey,
                    memNowStatus: nextLVStatus,
                    memStatus: memStatus,
                    conLog: this.createContractLog(this.contractData.conId, memId, LVKey, signType, conLogMsg, conStatus),
                    conLogNext: nextLogMsg ? this.createContractLog(this.contractData.conId, memId, nextLVKey, nextLVStatus, nextLogMsg, conStatus) : null,
                };
            },

            //取得姓名與職稱
            getLVKey(mem, isLV) {
                switch (isLV) {
                    case '0':
                        return `${mem.memLV0Key}`;
                    case 'C':
                        return `${mem.memLVCKey}`;
                    case '1':
                        return `${mem.memLV1Key}`;
                    case '2':
                        return `${mem.memLV2Key}`;
                    default:
                        return '';
                }
            },
            //取得姓名與職稱
            getLVPositionName(mem, isLV) {
                switch (isLV) {
                    case '0':
                        return `${mem.memLV0Name} ${mem.memLV0PositionName}`;
                    case 'C':
                        return `${mem.memLVCName} ${mem.memLVCPositionName}`;
                    case '1':
                        return `${mem.memLV1Name} ${mem.memLV1PositionName}`;
                    case '2':
                        return `${mem.memLV2Name} ${mem.memLV2PositionName}`;
                    default:
                        return '';
                }
            },
            //取得下一位姓名與職稱
            getLVPositionNameNext(mem, isLV, first) {
                switch (isLV) {
                    case '0':
                        return first ? `${mem.memLVCName} ${mem.memLVCPositionName}` : `${mem.memLV1Name} ${mem.memLV1PositionName}`;
                    case 'C':
                        return `${mem.memLV1Name} ${mem.memLV1PositionName}`;
                    case '1':
                        return `${mem.memLV2Name} ${mem.memLV2PositionName}`;
                    default:
                        return '';
                }
            },
            //取得對應等級
            getMemberLV(mem) {
                if (mem.memLV0Key === this.per.perKey) {
                    return '0';
                }
                if (mem.memNowKey === '') {
                    return 'C';
                }
                if (mem.memLV1Key === this.per.perKey) {
                    return '1';
                }
                if (mem.memLV2Key === this.per.perKey) {
                    return '2';
                }
                return null; // 如果都不满足条件，则返回 null
            },
            // checkParallelTypeSign 查驗平行簽核是否皆已完成
            async checkParallelTypeSign(memberType) {
                try {
                    const response = await this.$api.get(
                        this.$test ? `/api/?type=contractMember` : `/api/iform/contractMember/List`
                        , {params: {conId: this.contractData.conId, memType: memberType}}
                    );

                    if (response.status === 200) {
                        const data = response.data.data;
                        data.forEach((mem) => {
                            if (mem.memStatus !== '3') {
                                return false;
                            }
                        });
                    } else {
                        console.log('err');
                    }
                } catch (error) {
                    console.error('Edit failed:', error);
                }
                return true;
            },
            // updateMember 修改簽核人員簽核狀態
            async updateMember(payload) {
                try {
                    const response = await this.$api.put(
                        this.$test ? '/api/?type=memberStatus' : '/api/iform/memberStatus',
                        payload
                    );

                    if (response.status === 200) {
                        return true;
                    } else {
                        console.log('err');
                    }
                } catch (error) {
                    console.error('Edit failed:', error);
                }
                return false;

            },
            // clearMemberAll 重置所有簽核人員狀態
            async clearMemberAll() {
                const payload = {
                    conId: this.contractData.conId,
                    memNow: '',
                    memNowPosition: '',
                    memNowStatus: -1,
                };
                try {
                    const response = await this.$api.put(
                        this.$test ? '/api/?type=memberStatusAll' : '/api/iform/memberStatusAll',
                        payload
                    );

                    if (response.status === 200) {
                        return true;
                    } else {
                        console.log('err');
                    }
                } catch (error) {
                    console.error('Edit failed:', error);
                }
                return false;

            },
            // defaultContract 重置文件狀態
            async defaultContract() {
                // 修改文件狀態為草稿模式，並重置所有簽核人員訊息狀態與時間
                try {
                    const payload = {
                        conId: this.contractData.conId,
                    };

                    const response = await this.$api.put(
                        this.$test ? '/api/?type=contractDefault' : '/api/iform/contractDefault',
                        payload
                    );

                    if (response.status === 200) {
                        console.log('Edit successful:', response.data.data);
                        return true;
                    } else {
                        console.log('err');
                    }
                } catch (error) {
                    console.error('Edit failed:', error);
                }
                return false;
            },


            async exportPDF() {
                try {
                    const logoImage = new Image();
                    logoImage.src = '/layouts/assets/img/logo.png';

                    const element = document.getElementById('exportBox');
                    element.insertBefore(logoImage, element.firstChild);

                    await new Promise((resolve) => {
                        logoImage.onload = resolve;
                    });

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
                    element.removeChild(logoImage);
                } catch (error) {
                    console.error(error);
                }
            },
            async downloadViewFile(file_url) {
                const segments = file_url.split('/');
                const fileName = segments[segments.length - 1];

                try {
                    const response = await fetch(file_url);
                    const blob = await response.blob();

                    saveAs(blob, fileName);
                } catch (error) {
                    console.error('下载失败', error);
                }
            },
            closeViewFile() {
                this.viewFilePDF = false;
                this.viewFileDOCK = false;
                this.viewFileXLSE = false;
                this.viewFile = false;
                this.viewFileUrl = '';
            },
            openViewFile(url) {
                this.viewFilePDF = false;
                this.viewFileDOCK = false;
                this.viewFileXLSE = false;

                if (url.endsWith(".docx")) {
                    this.viewFileDOCK = true;
                }
                else if (url.endsWith(".xlsx")) {
                    this.viewFileXLSE = true;
                }
                else if (url.endsWith(".pdf") || url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif")) {
                    this.viewFilePDF = true;
                }

                if (this.viewFilePDF || this.viewFileDOCK || this.viewFileXLSE) {
                    this.viewFileUrl = url;
                    this.viewFile = true;
                }
            },

            // checkMember 確認權限
            checkMember() {
                let ckMember = false;
                if (this.iMemberData.memNowKey === this.per.perKey || (this.iMemberData.memNowKey === '' && this.iMemberData.memLVCKey === '' && this.contactData.some(contact => contact.perKey.includes(this.per.perKey)))) {
                    ckMember = true;
                }
                this.mMemberData.forEach(mem => {
                    if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                        ckMember = true;
                    }
                });
                this.uMemberData.forEach(mem => {
                    if (mem.comId === this.per.comId && mem.memNowKey === this.per.perKey) {
                        ckMember = true;
                    }
                });
                return ckMember;
            },
            async actionTo(action, conId) {
                switch (action) {
                    case 'ch':
                    case 'tp':
                        await this.$api
                            .get(this.$test ? `/api/?type=contractCopy` : `/api/iform/contractCopy`, {
                                params: {
                                    conId: conId,
                                    conType: action === 'ch' ? 1 : 2,
                                    conMark: 0,
                                    conStatus: 0,
                                }
                            })
                            .then(response => {
                                console.log(response);
                                if (response.status === 200) {
                                    //response.data.conId
                                    this.$router.push(`/contract/${this.temId}/up/${response.data.conId}`);
                                } else {
                                    console.log('err');
                                }

                            })
                            .catch(error => {
                                console.error('Edit failed:', error);
                            });

                        break;
                    case 'ex':
                        await this.$api
                            .get(this.$test ? `/api/?type=apportion` : `/api/iform/apportion`, {
                                params: {
                                    conId: conId,
                                    appMark: 0,
                                    appInh: 0,
                                }
                            })
                            .then(response => {
                                console.log(response);
                                if (response.status === 200) {
                                    if (response.data.data.length > 0) {
                                        this.$router.push(`/apportion/sl/${response.data.data[0].appId}`);
                                    }
                                    else {
                                        this.$api
                                            .get(this.$test ? `/api/?type=apportionId` : `/api/iform/apportionId`, {
                                                params: {
                                                    conId: conId,
                                                }
                                            })
                                            .then(response => {
                                                console.log(response);
                                                if (response.status === 200) {
                                                    this.$router.push(`/apportion/${conId}/ad/${response.data.appId}`);
                                                } else {
                                                    console.log('err');
                                                }

                                            })
                                            .catch(error => {
                                                console.error('Edit failed:', error);
                                            });
                                    }
                                } else {
                                    console.log('err');
                                }

                            })
                            .catch(error => {
                                console.error('Edit failed:', error);
                            });
                }
            },
            async exportPDF() {
                this.showConcat = false;
                try {
                    const logoImage = new Image();
                    logoImage.src = '/assets/img/logo-banner.png';

                    const element = document.getElementById('exportPDF');
                    element.insertBefore(logoImage, element.firstChild);

                    await new Promise((resolve) => {
                        logoImage.onload = resolve;
                    });

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
                    element.removeChild(logoImage);
                    this.showConcat = true;
                } catch (error) {
                    console.error(error);
                }
            },


        },
    }
</script>

<style scoped>
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

    .card {
        border-style: double;
        border-width: 1px;
        border-color: white;
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
