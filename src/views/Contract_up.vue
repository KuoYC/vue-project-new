<template>
    <template v-if="0 === conId">
        <section class="section">
            <ul class="breadcrumb breadcrumb-style ">
                <li class="breadcrumb-item">
                    <h4 class="page-title m-b-0">表單申請</h4>
                </li>
                <li class="breadcrumb-item">文件操作</li>
            </ul>
            <div class="section-body">
                <div class="row">
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
                                                    <h4>新增共用計畫書</h4>
                                                </div>
                                                <hr>
                                            </h4>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                <label class="row-label row-title row-title-font">請選擇要新增的共用計畫書類型：</label>
                                                <select v-model="temId" class="form-control">
                                                    <option disabled value="">請選擇</option>
                                                    <template v-for="tem in templateData">
                                                        <option :value="tem.temId">{{ tem.temTitle }}</option>
                                                    </template>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                <label class="row-text"
                                                       style="display: inline-block; border-color: #54ca68; color: #54ca68;"><input
                                                        type="checkbox" v-model="merge"
                                                        class="form-check-input"/> 讓費用與計畫書一起進行簽核</label>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-6" style="padding-bottom: 20px;">
                                                <button type="button" @click="createContract"
                                                        :disabled="'' === temId"
                                                        class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">
                                                    開始
                                                </button>
                                            </div>
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
                        <router-link :to="`/paper`">
                            <vue-feather type="link"></vue-feather>
                            列表
                        </router-link>
                    </li>
                    <li class="breadcrumb-item">操作</li>
                </ul>
                <div class="section-body">
                    <div class="contract-serial mb-2" style="width: 100%;">
                        <div class="d-inline mr-2" style="text-align:left;">
                            <label class="row-text"
                                   style="display: inline-block; border-color: #54ca68; color: #54ca68;"><input
                                    type="checkbox" v-model="merge"
                                    class="form-check-input"/> 與費用一起送簽</label>
                        </div>
                        <div v-if="1 === parseInt(contractData.conLock)" class="d-inline mr-2" style="text-align:right; float: right;">
                            <button type="button"
                                    @click="contractActionTo('ex', contractData.conId)"
                                    class="m-l-5 m-r-5 btn btn-success btn-border-radius waves-effect myFont16">費用
                            </button>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div id="myMainDocument" class="col-12">
                            <div class="row">
                                <template v-for="(area, parentIndex) in contractData.conValue">
                                    <div class="col-12" :id="'my'+parentIndex">
                                        <div v-if="area.areaType === '1'" class="card contract-title">
                                            <div class="author-box-name d-flex justify-content-between"
                                                 style="margin-bottom: 20px;padding: 10px 25px;border-bottom-color: #f9f9f9;">
                                                <h4 class="myCardTitle" style="font-size: x-large; min-width: 250px;">
                                                    {{ contractData.conTitle }}
                                                    <span class="sp-note"> - {{ contractData.temTitle }}</span>
                                                    <vue-feather v-if="area.areaNote !== ''"
                                                                 v-tooltip="{ content: area.areaNote, placement: 'right' }"
                                                                 type="help-circle" size="20"
                                                                 stroke="blue"></vue-feather>
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
                                                        class="date myFont16">{{ contractData.perBu1}}  {{ contractData.perBu2 }}</span>
                                                </div>
                                                <div class="myFont16Title" style="margin: 0 10px;">申請人： <span
                                                        class="date myFont16">{{ contractData.perName }}</span>
                                                </div>
                                                <div class="myFont16Title" style="margin: 0 10px;">聯絡電話： <span
                                                        class="date myFont16">{{ contractData.perPhone1 }} {{ contractData.perPhone2 }} {{ contractData.perPhone3 }}</span>
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
                                        <div v-if="area.areaType === '2'" class="card">
                                            <div class="card-header justify-content-between">
                                                <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center"
                                          style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                        <vue-feather type="tag" size="20"
                                                     style="transform: rotate(135deg); padding-right: 0px;"
                                                     class="m-r-5"></vue-feather>{{ area.areaTitle }}</span>
                                                    <vue-feather v-if="area.areaNote !== ''"
                                                                 v-tooltip="{ content: area.areaNote, placement: 'right' }"
                                                                 type="help-circle" size="20"
                                                                 stroke="blue"></vue-feather>
                                                </h4>
                                            </div>
                                            <div class="card-body myNotification">
                                                <p>僅供各公司簽核參考，實際收付款以當年度分攤收付款簽呈為主。</p>
                                                <div class="table-responsive">
                                                    <Exp
                                                            :exp="area.areaValue"
                                                            :companyUse="contractData.conCompany"
                                                    />
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
                                                                 type="help-circle" size="20"
                                                                 stroke="blue"></vue-feather>
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
                                                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                        <label class="row-label row-title">共用計劃書名稱</label>
                                                                        <input type="text"
                                                                               v-model="contractData.conTitle"
                                                                               class="row-text"
                                                                               style="background-color: white;"
                                                                               placeholder="請輸入文字">
                                                                    </div>
                                                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                        <label class="row-label row-title">共用計劃框架</label>
                                                                        <select class="row-text"
                                                                                v-model="contractData.frmId">
                                                                            <option value="0">請選擇框架</option>
                                                                            <option v-for="frm in frameData"
                                                                                    :value="frm.frmId">{{
                                                                                frm.frmTitle }}
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                        <label class="row-label row-title">生效日期</label>
                                                                        <DatePicker format="yyyy-MM-dd"
                                                                                    v-model="contractData.conDate"
                                                                                    locale="zh-tw"
                                                                                    :enable-time-picker="false"
                                                                                    placeholder="未填寫將以簽核完成日為依據"
                                                                                    style="max-width: 280px;"/>
                                                                    </div>
                                                                    <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                        <label class="row-label row-title">維運公司</label>
                                                                        <label class="row-text">{{ contractData.comTitle
                                                                            }}</label>
                                                                    </div>
                                                                    <div v-if="1 === parseInt(contractData.conLock)"
                                                                         class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                        <label class="row-label row-title">作業種類</label>
                                                                        <div class="my-list">
                                                                            <ul style="padding-left: 0px;">
                                                                                <li v-for="(option, idx) in contractData.conWork">
                                                                                    <span class="row-text">{{ this.$root.getWorkTitle(option) }}</span>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else
                                                                         class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                        <label class="row-label row-title">作業種類</label>
                                                                        <div class="my-list">
                                                                            <ul>
                                                                                <li v-for="wor in workData"
                                                                                    class="form-check">
                                                                                    <input class="form-check-input"
                                                                                           type="checkbox"
                                                                                           :value="wor.worId"
                                                                                           v-model="contractData.conWork"
                                                                                           :id="'wor_'+wor.worId">
                                                                                    <label class="form-check-label"
                                                                                           :for="'wor_'+wor.worId">{{
                                                                                        wor.worTitle }}</label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="1 === parseInt(contractData.conLock)"
                                                                         class="col-12">
                                                                        <label class="row-label row-title">使用公司</label>
                                                                        <div class="my-list">
                                                                            <ul style="padding-left: 0px;">
                                                                                <li v-for="option in contractData.conCompany">
                                                                                    <span class="row-text">{{ this.$root.getCompanyTitle('', option) }}</span>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else class="col-12">
                                                                        <label class="row-label row-title">使用公司</label>
                                                                        <div class="my-list">
                                                                            <ul>
                                                                                <li v-for="com in companyData"
                                                                                    class="form-check">
                                                                                    <input class="form-check-input"
                                                                                           type="checkbox"
                                                                                           :value="com.comCode"
                                                                                           v-model="contractData.conCompany"
                                                                                           :id="'com_'+com.comCode">
                                                                                    <label class="form-check-label"
                                                                                           :for="'com_'+com.comCode">{{
                                                                                        com.comTitle }}</label>
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
                                                                    <select class="row-text" v-model="col.value">
                                                                        <option disabled value="">請選擇</option>
                                                                        <template v-for="sou in sourceData">
                                                                            <option v-if="parseInt(sou.catId) === parseInt(sou.id)"
                                                                                    :value="sou.souTitle">
                                                                                {{ sou.souTitle }}
                                                                            </option>
                                                                        </template>
                                                                    </select>
                                                                </div>
                                                            </template>
                                                            <template v-if="col.type.startsWith('word')">
                                                                <div>
                                                                    <label v-if="col.name !== '' || col.tip !== ''"
                                                                           class="row-label row-title">{{
                                                                        col.name }}
                                                                        <vue-feather v-if="col.tip !== ''"
                                                                                     v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                     type="help-circle" size="20"
                                                                                     stroke="blue"></vue-feather>
                                                                    </label>
                                                                    <template v-for="cat in categoryData">
                                                                        <div v-if="parseInt(cat.catId) === parseInt(col.id)"
                                                                             class="row">
                                                                            <p class="myFont16">{{ cat.catWord }}</p>
                                                                        </div>
                                                                    </template>
                                                                </div>
                                                            </template>
                                                            <template v-if="col.type === 'work_area'">
                                                                <template v-if="1 === parseInt(contractData.conLock)">
                                                                    <label v-if="col.name !== '' || col.tip !== ''"
                                                                           class="myFont16">{{
                                                                        col.name }}
                                                                        <vue-feather v-if="col.tip !== ''"
                                                                                     v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                     type="help-circle" size="20"
                                                                                     stroke="blue"></vue-feather>
                                                                    </label>

                                                                    <span class="myFont16 d-flex align-center row-title"><vue-feather
                                                                            type="chevrons-right"
                                                                            size="20"></vue-feather>共用作業項目與費用分攤原則</span>
                                                                    <div v-for="wor in contractData.conWork" class="row"
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
                                                                                <template
                                                                                        v-for="ite in contractData.itemData">
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
                                                                            type="chevrons-right"
                                                                            size="20"></vue-feather>共用作業項目之固定分攤比例</span>
                                                                    <div class="row" style="margin-bottom: 20px">
                                                                        <div class="table-responsive">
                                                                            <table class="newTable">
                                                                                <caption>共用作業項目之固定分攤比例</caption>
                                                                                <thead style="position: sticky;top: 0;"
                                                                                       class="myNew">
                                                                                <tr>
                                                                                    <th style="min-width: 140px;"
                                                                                        scope="col">共用作業項目
                                                                                    </th>
                                                                                    <th v-for="com in companyData"
                                                                                        style="max-width: 80px;"
                                                                                        scope="col">{{com.comTitle}}
                                                                                    </th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                <template
                                                                                        v-for="ite in contractData.itemData">
                                                                                    <tr v-if="'1' === ite.manType && typeof ite.iteProportion === 'object'">
                                                                                        <td>{{ ite.iteTitle }}</td>
                                                                                        <template
                                                                                                v-for="com in companyData">
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
                                                                                    <th style="min-width: 140px;"
                                                                                        scope="col">共用作業項目
                                                                                    </th>
                                                                                    <th v-for="com in companyData"
                                                                                        style="max-width: 80px;"
                                                                                        scope="col">{{com.comTitle}}
                                                                                    </th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                <template
                                                                                        v-for="ite in contractData.itemData">
                                                                                    <tr v-if="'1' === ite.manType && typeof ite.iteProportion === 'object'">
                                                                                        <td>{{ ite.iteTitle }}</td>
                                                                                        <template
                                                                                                v-for="com in companyData">
                                                                                            <td v-if="ite.iteSubsidiaries.includes(com.comCode)">
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
                                                                            type="chevrons-right"
                                                                            size="20"></vue-feather>服務時間與權限控管</span>
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
                                                                                    <th style="width: 80px;"
                                                                                        scope="col">服務時間
                                                                                    </th>
                                                                                    <th style="min-width: 120px;"
                                                                                        scope="col">權限控管及資料管制
                                                                                    </th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                <tr v-for="ite in contractData.itemData">
                                                                                    <td>{{ ite.iteTitle }}</td>
                                                                                    <td>{{ ite.iteTime }}</td>
                                                                                    <td>{{ ite.iteControl }}</td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                                <template v-else>
                                                                    <label v-if="col.name !== '' || col.tip !== ''"
                                                                           class="myFont16 p-t-10">{{
                                                                        col.name }}
                                                                        <vue-feather v-if="col.tip !== ''"
                                                                                     v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                     type="help-circle" size="20"
                                                                                     stroke="blue"></vue-feather>
                                                                    </label>
                                                                    <Item v-for="(item, item_index) in contractData.itemData"
                                                                          :key="item.uniqueId"
                                                                          :idx="item_index"
                                                                          :item="item"
                                                                          :workData="workData"
                                                                          :workUse="contractData.conWork"
                                                                          :timeData="timeData"
                                                                          :distributionData="distributionData"
                                                                          :manner="manner"
                                                                          :companyData="companyData"
                                                                          :companyUse="contractData.conCompany"
                                                                          @remove-item="removeItemData"
                                                                          ref="ItemComp"
                                                                          class="mb-2"
                                                                    />
                                                                    <div class=" mt-2 d-flex justify-content">
                                                                        <button type="button" @click="addItemData"
                                                                                class="btn btn-icon icon-left btn-outline-success myFont16"
                                                                                style="border-radius: 6px;">新增一筆
                                                                        </button>
                                                                    </div>
                                                                </template>
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
                                                                                        :companyUse="contractData.comCode"
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
                                                                                        :companyUse="contractData.comCode"
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
                                                                                        :companyUse="contractData.conCompany"
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
                                                                                                    v-for="com in contractData.conCompany">
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
                                                                    <vue-feather type="paperclip"
                                                                                 size="20"></vue-feather>
                                                                    <label class="myFont16 col-4 p-t-10">{{
                                                                        filMeetingFiles.length +
                                                                        filPlanFiles.length + filOtherFiles.length
                                                                        }}則附加檔案</label>
                                                                    <!-- 這裡放附檔 -->
                                                                    <div>
                                                                        <FileUpload
                                                                                :titleString="'會議記錄-拖放文件到此處或點擊選擇文件'"
                                                                                :multiple="true"
                                                                                @file-selected="files=>handleFilesSelected(files, 'meeting')"
                                                                                class="col-4"
                                                                        />
                                                                        <FileUpload
                                                                                :titleString="'專案規劃報告-拖放文件到此處或點擊選擇文件'"
                                                                                :multiple="true"
                                                                                @file-selected="files=>handleFilesSelected(files, 'plan')"
                                                                                class="col-4"
                                                                        />
                                                                        <FileUpload
                                                                                :titleString="'其他-拖放文件到此處或點擊選擇文件'"
                                                                                :multiple="true"
                                                                                @file-selected="files=>handleFilesSelected(files, 'other')"
                                                                                class="col-4"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </template>
                                                            <template v-if="col.type === 'select'">
                                                                <div class="d-flex justify-content-between align-center"
                                                                     style="margin-bottom: 20px; max-width: 450px;">
                                                                    <label v-if="col.name !== '' || col.tip !== ''"
                                                                           class="myFont16 col-4 p-t-10">{{ col.name }}
                                                                        <vue-feather v-if="col.tip !== ''"
                                                                                     v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                     type="help-circle" size="20"
                                                                                     stroke="blue"></vue-feather>
                                                                    </label>
                                                                    <select class="form-control" v-model="col.value">
                                                                        <!-- 選項列表 -->
                                                                        <option v-for="option in col.option.split('|')"
                                                                                :value="option">
                                                                            {{ option }}
                                                                        </option>
                                                                    </select>
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
                                                                    <div v-for="option in col.option.split('|')"
                                                                         class="form-check p-t-10">
                                                                        <input class="form-check-input" type="radio"
                                                                               :value="option"
                                                                               v-model="col.value"
                                                                               :id="'rdo_'+parentIndex+'_'+childIndex">
                                                                        <label class="form-check-label"
                                                                               :for="'rdo_'+parentIndex+'_'+childIndex">{{
                                                                            option
                                                                            }}</label>
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
                                                                    <div v-for="option in col.option.split('|')"
                                                                         class="form-check p-t-10">
                                                                        <input class="form-check-input" type="checkbox"
                                                                               :value="option"
                                                                               v-model="col.checkedOptions"
                                                                               :id="'cbx_'+parentIndex+'_'+childIndex">
                                                                        <label class="form-check-label"
                                                                               :for="'cbx_'+parentIndex+'_'+childIndex">{{
                                                                            option
                                                                            }}</label>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                            <template v-if="col.type === 'text'">
                                                                <div class="d-flex justify-content-between align-center"
                                                                     style="margin-bottom: 20px; max-width: 450px;">
                                                                    <label v-if="col.name !== '' || col.tip !== ''"
                                                                           class="myFont16 col-4 p-t-10">{{ col.name }}
                                                                        <vue-feather v-if="col.tip !== ''"
                                                                                     v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                     type="help-circle" size="20"
                                                                                     stroke="blue"></vue-feather>
                                                                    </label>
                                                                    <input type="text" class="form-control"
                                                                           v-model="col.value"
                                                                           placeholder="請輸入文字">
                                                                </div>
                                                            </template>
                                                            <template v-if="col.type === 'box'">
                                                                <div class="row" style="margin-bottom: 20px;">
                                                                    <label v-if="col.name !== '' || col.tip !== ''"
                                                                           class="myFont16 col-4 p-t-10">{{ col.name }}
                                                                        <vue-feather v-if="col.tip !== ''"
                                                                                     v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                                     type="help-circle" size="20"
                                                                                     stroke="blue"></vue-feather>
                                                                    </label>
                                                                    <textarea class="my-form-control"
                                                                              v-model="col.value"
                                                                              spellcheck="false"
                                                                              placeholder="請輸入標題"
                                                                              style="margin-left: 10px;"></textarea>
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
                    </div>
                </div>
                <div class="col-6" style="padding-bottom: 20px;">
                    <button type="button"
                            @click="$router.push(`/contract/sl/${contractData.conId}`)"
                            class="m-r-5 btn btn-outline-info btn-border-radius waves-effect myFont16">
                        查看
                    </button>
                    <button type="button" @click="updateContract"
                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">儲存
                    </button>
                    <button v-if="merge" type="button" @click="updateContract(true)"
                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">儲存並重新建立費用
                    </button>
                    <button v-if="1 === parseInt(contractData.conLock)" type="button"
                            @click="openContractLock"
                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                        解除項目鎖定(將刪除費用資料)
                    </button>
                    <button type="button" @click="deleteContract(contractData.conId)"
                            class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">刪除
                    </button>
                    <button type="button" @click="cleanContract(contractData.conId)"
                            class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                        撤案
                    </button>
                </div>
            </section>

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
                                    <button type="button" @click="updateContract"
                                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                        儲存
                                    </button>
                                    <button v-if="merge" type="button" @click="updateContract(true)"
                                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                        儲存並重新建立費用
                                    </button>
                                    <button v-if="1 === parseInt(contractData.conLock)" type="button"
                                            @click="openContractLock"
                                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                        解除項目鎖定(將刪除費用資料)
                                    </button>
                                    <button type="button"
                                            @click="deleteContract(contractData.conId)"
                                            class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                                        刪除
                                    </button>
                                    <button type="button" @click="cleanContract(contractData.conId)"
                                            class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                                        撤案
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="p-15 border-bottom">
                            <h6 class="font-medium m-b-10">文件架構</h6>
                            <ul class="contact-list">
                                <li v-for="(item, index) in contractData.conValue" class="nav-item" ref="tp">
                                    <a class="nav-link myFont16" href="javascript:void(0);"
                                       @click="scrollToElement('my' + index)">
                                        {{ '1' === item.areaType ? contractData.temTitle : item.areaTitle }}
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
        </template>
        <template v-else>
            <vue-feather type="settings" animation="spin" animation-speed="slow"></vue-feather>
        </template>
    </template>
</template>

<script>
    import Cookies from 'js-cookie'
    import Item from '@/components/Item.vue';
    import Member from '@/components/Member.vue';
    import Exp from '@/components/Exp.vue';
    import DatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import FileUpload from '@/components/FileUpload.vue';
    import cloneDeep from 'lodash/cloneDeep';
    import {memberMixin} from '@/mixins/memberMixin.js';
    import {itemMixin} from '@/mixins/itemMixin.js';
    import {fileMixin} from '@/mixins/fileMixin.js';
    import {controlBoxMixin} from '@/mixins/controlBoxMixin.js';
    import {contractActionMixin} from '@/mixins/contractActionMixin.js';
    import {signMixin} from '@/mixins/signMixin.js';

    export default {
        name: "Contract_up",
        mixins: [memberMixin, itemMixin, fileMixin, controlBoxMixin, contractActionMixin, signMixin],
        data() {
            return {
                isLoading: false,
                per: JSON.parse(Cookies.get('per')),
                isSidebarVisible: false,//管理面板使用
                conId: parseInt(this.$route.params.id),
                merge: false,//是否一起送

                //新增使用
                temId: '',
                templateData: [],

                workData: [],//作業種類
                companyData: [],//公司
                frameData: [],//框架
                categoryData: [],//選單類型
                sourceData: [],//選單類型
                contractType: [{text: '新增', value: 0}, {text: '變更', value: 1}, {text: '終止', value: 2},],
                distributionData: [],
                manner: [],
                contactData: [],

                contractData: [],
                account: '',
                // conValue: [],//temStyle
                // conWork: [],//作業種類
                // conCompany: [],//使用公司
                // itemData: [],//作業項目
                timeData: [],

                personnelData: [],

                iMemberData: {},//發起
                mMemberData: [],//維運
                uMemberData: [],//使用


                dpFormat: {
                    inputFormat: 'yyyy/MM/dd',
                    // weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    // months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                },

                filMeetingFiles: [], // 存储会议记录文件
                filPlanFiles: [],    // 存储專案規劃報告文件
                filOtherFiles: [],   // 存储其他文件

                conFileMeeting: [],
                conFilePlan: [],
                conFile: [],

                delFileMeeting: {},
                delFilePlan: {},
                delFile: {},


            };
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
            Exp,
            DatePicker,
            FileUpload,
        },
        methods: {
            defaultData() {
                this.conId = parseInt(this.$route.params.id); // 取得路由參數 id
                this.per = JSON.parse(Cookies.get('per'));
                if (this.conId === 0) {
                    this.fetchTemplate();
                }
                else {
                    this.fetchFirst();
                }
            },
            fetchTemplate() {
                // this.temId = this.$route.params.tem;
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=template' : '/api/iform/template'),
                ];

                Promise.all(apiRequests)
                    .then(([templateResponse]) => {
                        //workResponse
                        this.templateData = templateResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            createContract() {
                this.$api
                    .get(this.$test ? `/api/?type=contractId` : `/api/iform/contractId`, {
                        params: {
                            temId: this.temId,
                            perKey: this.per.perKey,
                            conType: 0,
                            comCode: this.per.perBu1Code,
                            conApp: this.merge ? 0 : -1,
                        }
                    })
                    .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                            let log = this.createSignLog(response.data.conId, 0, this.per.perKey, -1, '建立', -1);
                            this.updateContractStatus(response.data.conId, -1, null, log);//修改文件狀態為進行中
                            this.$router.push(`/contract/up/${response.data.conId}`);
                        } else {
                            console.log('err');
                        }

                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });

            },
            fetchFirst() {
                // this.temId = this.$route.params.tem;
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=work' : '/api/iform/work'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                    this.$api.get(this.$test ? '/api/?type=frame' : '/api/iform/frame'),
                    this.$api.get(this.$test ? '/api/?type=category' : '/api/iform/category'),
                    this.$api.get(this.$test ? '/api/?type=source' : '/api/iform/source'),
                    this.$api.get(this.$test ? '/api/?type=distribution' : '/api/iform/distribution'),
                    this.$api.get(this.$test ? '/api/?type=manner' : '/api/iform/manner/List'),

                    this.$api.get(this.$test ? `/api/?type=contract&conId=${this.conId}` : `/api/iform/contract/${this.conId}`),
                    this.$api.get(this.$test ? '/api/?type=personnel' : '/api/iform/personnel'),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                ];

                Promise.all(apiRequests)
                    .then(([workResponse, companyResponse, frameResponse, categoryResponse, sourceResponse, distributionResponse, mannerResponse, contractResponse, personnelResponse, contactResponse]) => {
                        //workResponse
                        this.workData = workResponse.data.data;
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //frameResponse
                        this.frameData = frameResponse.data.data;
                        //categoryResponse
                        this.categoryData = categoryResponse.data.data;
                        //sourceResponse
                        this.sourceData = sourceResponse.data.data;
                        this.timeData = this.sourceData.filter(item => parseInt(item.catId) === 1);
                        //distributionResponse
                        this.distributionData = distributionResponse.data.data;
                        //mannerResponse
                        this.manner = mannerResponse.data.data;
                        //contactResponse
                        this.contactData = contactResponse.data.data;

                        //contractResponse
                        this.contractData = contractResponse.data.data;
                        if (0 <= parseInt(this.contractData.conApp)) {
                            this.merge = true;
                        }
                        // if ('0' != this.contractData.conStatus) {
                        //     this.$router.push(`/contract/${this.contractData.temId}/sl/${this.contractData.conId}`);
                        // }
                        if (this.contractData?.conWork !== undefined) {
                            this.contractData.conWork = this.contractData.conWork.split('|');
                        }
                        if (this.contractData?.conCompany !== undefined) {
                            this.contractData.conCompany = this.contractData.conCompany.split('|');
                        }

                        this.conFileMeeting = this.contractData?.conFileMeeting ? this.contractData.conFileMeeting.split('|') : null;
                        this.conFilePlan = this.contractData?.conFilePlan ? this.contractData.conFilePlan.split('|') : null;
                        this.conFile = this.contractData?.conFile ? this.contractData.conFile.split('|') : null;
                        this.contractData.conValue = JSON.parse(this.contractData.conValue);
                        this.contractData.conValue.forEach(area => {
                            area.colItem.forEach(item => {
                                if (item.type === 'check') {
                                    const selectedOptions = item.value.split('|');
                                    item.checkedOptions = selectedOptions.map(option => option.trim());
                                }
                            })
                            if ('2' === area.areaType) {
                                if (!area.areaValue) {
                                    const areaValue = {expData:[], expSum:0};
                                    this.companyData.forEach(com => {
                                        areaValue.expData.push({
                                            comId: com.comId,
                                            comCode: com.comCode,
                                            comTitle: com.comTitle,
                                            comValue: 0,
                                            comPercent: 0,
                                        });
                                    });
                                    area.areaValue = areaValue;
                                }
                                console.log(area.areaValue);
                            }
                        });
                        const memberList = this.contractData.memberData;
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

                        if (this.contractData.itemData?.length > 0) {
                            this.contractData.itemData.forEach(item => {
                                item.uniqueId = this.$root.generateUniqueId();
                                item.iteSubsidiaries = '' !== item.iteSubsidiaries ? item.iteSubsidiaries.split('|') : item.iteSubsidiaries;
                                item.iteProportion = item.iteProportion && '' !== item.iteProportion ? JSON.parse(item.iteProportion) : item.iteProportion;
                                if (!item.iteProportion || item.iteProportion === '') {
                                    item.iteProportion = this.companyData.map(company => ({
                                        comCode: company.comCode,
                                        p: '0',
                                    }));
                                } else {
                                    // 檢查哪些 this.companyData.comCode 不在 item.iteProportion 中
                                    const missingCompanyIds = this.companyData
                                        .map(company => company.comCode)
                                        .filter(comCode => !item.iteProportion.some(pp => pp.comCode === comCode));

                                    // 將缺少的公司添加到 item.iteProportion 中
                                    missingCompanyIds.forEach(comCode => {
                                        item.iteProportion.push({
                                            comCode: comCode,
                                            p: '0',
                                        });
                                    });
                                }
                            });
                        }

                        //personnelResponse
                        this.personnelData = personnelResponse.data.data;
                        this.isLoading = true;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async updateContract(toApportion = false) {
                const memberList = [];
                memberList.push(this.iMemberData);
                this.$root.addDataPush(memberList, this.mMemberData);
                this.$root.addDataPush(memberList, this.uMemberData);
                const payload = cloneDeep(this.contractData);
                payload.itemData.forEach(item => {
                    item.iteSubsidiaries = item.iteSubsidiaries ? item.iteSubsidiaries.join('|') : item.iteSubsidiaries;
                    item.iteProportion = JSON.stringify(item.iteProportion);
                });
                payload.conValue.forEach(area => {
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
                payload.conValue = JSON.stringify(payload.conValue);
                payload.conWork = this.contractData.conWork.filter(val => val !== '').join('|');
                payload.conCompany = this.contractData.conCompany.filter(val => val !== '').join('|');
                payload.memberData = memberList;
                payload.conStatus = 0;
                payload.conApp = this.merge ? (parseInt(this.contractData.conApp) > -1 ? parseInt(this.contractData.conApp) : 0) : -1;


                // const formData = new FormData();
                // this.$root.addFilesToFormData(formData, this.filMeetingFiles, 'conFileMeeting[]');
                // this.$root.addFilesToFormData(formData, this.filPlanFiles, 'conFilePlan[]');
                // this.$root.addFilesToFormData(formData, this.filOtherFiles, 'conFile[]');

                // const payload = {
                //     conId: this.contractData.conId,
                //     conTitle: this.contractData.conTitle,
                //     frmId: this.contractData.frmId,
                //     conDate: this.contractData.conDate,
                //     conWork: cloneDeep(this.conWork).join('|'),
                //     conCompany: cloneDeep(this.conCompany).join('|'),
                //     conValue: JSON.stringify(conValue),
                //     itemList: itemList,
                //     memberList: memberList,
                //     // delFileMeeting: this.delFileMeeting ? Object.keys(cloneDeep(this.delFileMeeting)).join('|') : null,
                //     // delFilePlan: this.delFilePlan ? Object.keys(cloneDeep(this.delFilePlan)).join('|') : null,
                //     // delFile: this.delFile ? Object.keys(cloneDeep(this.delFile)).join('|') : null,
                // };

                console.log(payload);

                // for (const key in payload) {
                //     formData.append(key, dataToAppend[key]);
                // }

                await this.saveContract(payload, this.contractData.conId, null);
                if (toApportion === true) {
                    await this.cleanApportionByContract(this.contractData.conId);
                    this.contractActionTo('re', this.contractData.conId);
                }
                else {
                    // this.$router.push(`/contract/sl/${this.contractData.conId}`);
                    this.$router.go(0);
                }
            },
            async openContractLock() {
                const payload = {conId: this.contractData.conId, conLock: 0};
                await this.$api
                    .put(this.$test ? '/api/?type=contractLock' : '/api/iform/contractLock', payload)
                    .then(response => {
                        console.log(response);
                        if (response.status === 200) {
                            this.$router.go(0);
                        } else {
                            console.log('err');
                        }
                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });
            },

            deleteFile(fileString, type) {
                switch (type) {
                    case 'meeting':
                        if (this.delFileMeeting && this.isFileInDelFile(fileString, type)) {
                            delete this.delFileMeeting[fileString];
                        }
                        else {
                            this.delFileMeeting[fileString] = true;
                        }
                        break;
                    case 'plan':
                        if (this.delFilePlan && this.isFileInDelFile(fileString, type)) {
                            delete this.delFilePlan[fileString];
                        }
                        else {
                            this.delFilePlan[fileString] = true;
                        }
                        break;
                    case 'other':
                        if (this.delFile && this.isFileInDelFile(fileString, type)) {
                            delete this.delFile[fileString];
                        }
                        else {
                            this.delFile[fileString] = true;
                        }
                        break;
                }
            },
            isFileInDelFile(fileString, type) {
                switch (type) {
                    case 'meeting':
                        return this.delFileMeeting.hasOwnProperty(fileString);
                    case 'plan':
                        return this.delFilePlan.hasOwnProperty(fileString);
                    case 'other':
                        return this.delFile.hasOwnProperty(fileString);
                }
            },
        },
    };
</script>

<style scoped>
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
</style>
