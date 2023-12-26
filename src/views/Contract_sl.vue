<template>
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
                <li class="breadcrumb-item">查看</li>
            </ul>


            <div class="section-body">
                <div v-if="'3' === contractData.conStatus || (per.perKey === contractData.perKey && 1 === parseInt(contractData.conLock))"
                     class="contract-serial mb-2" style="text-align:right;">
                    <button type="button"
                            @click="contractActionTo('ex', contractData.conId)"
                            class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">費用
                    </button>
                </div>
                <div class="d-flex">
                    <!-- 主要內容 -->
                    <div id="myMainDocument" :class="viewFile ? 'col-6' : 'col-12'">
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
                                                             type="help-circle" size="20" stroke="grey"></vue-feather>
                                            </h4>
                                            <div class="contract-serial">
                                                <!-- 這裡放文件序號 -->
                                                <div style="font-weight: 400; text-align: right;">
                                                    <span v-if="0 === parseInt(contractData.conStatus)" class="st-success myFont16">草稿</span>
                                                    <span v-if="1 === parseInt(contractData.conStatus)" class="st-warning myFont16">簽核中</span>
                                                    <span v-if="3 === parseInt(contractData.conStatus)" class="st-success myFont16">已歸檔</span>
                                                    <span v-if="4 === parseInt(contractData.conStatus)" class="st-secondary myFont16">撤案</span>
                                                </div>
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
                                    <div v-if="area.areaType === '2' && area.areaValue && area.areaValue?.expSum && area.areaValue.expSum > 0"
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
                                                             type="help-circle" size="20" stroke="grey"></vue-feather>
                                            </h4>
                                        </div>
                                        <div class="card-body myNotification">
                                            <p>僅供各公司簽核參考，實際收付款以當年度分攤收付款簽呈為主。</p>
                                            <label class="row-label">預計分攤總額</label>
                                            <label class="row-text">{{ area.areaValue.expSum }}</label>
                                            <div class="table-responsive mt-2">
                                                <table class="newTable" style="width: auto;">
                                                    <caption>各公司預計分攤費用參考</caption>
                                                    <thead style="position: sticky;top: 0;" class="myNew">
                                                    <tr>
                                                        <th style="min-width: 100px;"
                                                            scope="col"></th>
                                                        <template v-for="com in area.areaValue.expData">
                                                            <th v-if="contractData.conCompany.includes(com.comCode)"
                                                                scope="col"
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
                                                        <template v-for="com in area.areaValue.expData">
                                                            <td v-if="contractData.conCompany.includes(com.comCode)">
                                                                <input type="text" disabled
                                                                       :value="com.comPercent + '%'"
                                                                       class="form-control"/>
                                                            </td>
                                                        </template>
                                                    </tr>
                                                    <!--<tr>-->
                                                    <!--<td>-->
                                                    <!--分攤比例-->
                                                    <!--</td>-->
                                                    <!--<template v-for="com in expData">-->
                                                    <!--<td v-if="conCompany.includes(com.comCode)">-->
                                                    <!--{{ (com.comValue / expSum * 100).toFixed(2) }}%-->
                                                    <!--</td>-->
                                                    <!--</template>-->
                                                    <!--</tr>-->
                                                    <tr>
                                                        <td>
                                                            分攤費用
                                                        </td>
                                                        <template v-for="com in area.areaValue.expData">
                                                            <td v-if="contractData.conCompany.includes(com.comCode)">
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
                                                             type="help-circle" size="20" stroke="grey"></vue-feather>
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
                                                                             stroke="grey"></vue-feather>
                                                            </label>
                                                            <div class="row">
                                                                <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                    <label class="row-label row-title">共用計劃書名稱</label>
                                                                    <span class="row-text">{{ contractData.conTitle }}</span>
                                                                </div>
                                                                <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                    <label class="row-label row-title">共用計劃框架</label>
                                                                    <label class="row-text">{{ contractData.frmTitle
                                                                        }}</label>
                                                                </div>
                                                                <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                    <label class="row-label row-title">生效日期</label>
                                                                    <label class="row-text">
                                                                        <template v-if="contractData.conDate">{{
                                                                            contractData.conDate }}
                                                                        </template>
                                                                        <template v-else>未填寫將以簽核完成日為依據</template>
                                                                    </label>
                                                                </div>
                                                                <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                    <label class="row-label row-title">維運公司</label>
                                                                    <label class="row-text">{{ contractData.comTitle
                                                                        }}</label>
                                                                </div>
                                                                <div class="col-xl-4 col-md-6 col-sm-6 col-12">
                                                                    <label class="row-label row-title">作業種類</label>
                                                                    <div class="d-flex my-list">
                                                                        <ul style="padding-left: 0px;">
                                                                            <li v-for="(option, idx) in contractData.conWork">
                                                                                <span class="row-text">{{ this.$root.getWorkTitle(option) }}</span>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12">
                                                                    <label class="row-label row-title">使用公司</label>
                                                                    <div class="d-flex my-list">
                                                                        <ul style="padding-left: 0px;">
                                                                            <li v-for="option in contractData.conCompany">
                                                                                <span class="row-text">{{ this.$root.getCompanyTitle('', option) }}</span>
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
                                                                                 stroke="grey"></vue-feather>
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
                                                                                 stroke="grey"></vue-feather>
                                                                </label>
                                                                <p>{{ col.value }}</p>
                                                            </div>
                                                        </template>
                                                        <template v-if="col.type === 'work_area'">
                                                            <label v-if="col.name !== '' || col.tip !== ''"
                                                                   class="myFont16">{{
                                                                col.name }}
                                                                <vue-feather v-if="col.tip !== ''"
                                                                             v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                             type="help-circle" size="20"
                                                                             stroke="grey"></vue-feather>
                                                            </label>

                                                            <span class="myFont16 d-flex align-center row-title"><vue-feather
                                                                    type="grid" stroke="#26a862" size="20"></vue-feather>費用分攤原則</span>
                                                            <div class="row" style="margin-bottom: 20px">
                                                                <div class="table-responsive">
                                                                    <table class="newTable">
                                                                        <caption>共用作業項目</caption>
                                                                        <thead style="position: sticky;top: 0;"
                                                                               class="myNew">
                                                                        <tr>
                                                                            <th style="min-width: 140px;"
                                                                                scope="col">共用作業項目
                                                                            </th>
                                                                            <th style="min-width: 40px;"
                                                                                scope="col">作業種類
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
                                                                        <template v-for="ite in contractData.itemData">
                                                                            <tr>
                                                                                <td>{{ ite.iteTitle }}</td>
                                                                                <td>{{ ite.worTitle }}</td>
                                                                                <td>{{ ite.disTitle }}</td>
                                                                                <td>{{ ite.manTitle }}</td>
                                                                                <td>{{ 0 === parseInt(ite.manType) ? '--' : ite.iteTypeNote }}</td>
                                                                            </tr>
                                                                        </template>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <span class="myFont16 d-flex align-center row-title"
                                                                  style="padding-top: 10px;"><vue-feather
                                                                    type="grid" stroke="#26a862" size="20"></vue-feather>固定分攤比例</span>
                                                            <div class="row" style="margin-bottom: 20px">
                                                                <div class="table-responsive">
                                                                    <table class="newTable">
                                                                        <caption>固定分攤比例</caption>
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
                                                                        <template v-for="ite in contractData.itemData">
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
                                                                        type="grid" stroke="#26a862" size="20"></vue-feather>使用公司</span>
                                                                <div class="table-responsive">
                                                                    <table class="newTable">
                                                                        <caption>使用公司</caption>
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
                                                                        <template v-for="ite in contractData.itemData">
                                                                            <tr>
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
                                                                    type="grid" stroke="#26a862" size="20"></vue-feather>服務時間與權限控管</span>
                                                            <div class="row" style="margin-bottom: 20px">
                                                                <div class="table-responsive">
                                                                    <table class="newTable">
                                                                        <caption>服務時間與權限控管</caption>
                                                                        <thead style="position: sticky;top: 0;"
                                                                               class="myNew">
                                                                        <tr>
                                                                            <th style="min-width: 140px;"
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
                                                        <template v-if="col.type === 'sign'">
                                                            <label v-if="col.name !== '' || col.tip !== ''"
                                                                   class="myFont16 col-4 p-t-10">{{ col.name }}
                                                                <vue-feather v-if="col.tip !== ''"
                                                                             v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                             type="help-circle" size="20"
                                                                             stroke="grey"></vue-feather>
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
                                                            </div>

                                                        </template>
                                                        <template v-if="col.type === 'file_area'">
                                                            <label v-if="col.name !== '' || col.tip !== ''"
                                                                   class="myFont16 mb-1">{{
                                                                col.name }}
                                                                <vue-feather v-if="col.tip !== ''"
                                                                             v-tooltip="{ content: col.tip, placement: 'right' }"
                                                                             type="help-circle" size="20"
                                                                             stroke="grey"></vue-feather>
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
                                                                                 stroke="grey"></vue-feather>
                                                                </label>
                                                                <span class="row-text">{{ col.value }}</span>
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
                                                                                 stroke="grey"></vue-feather>
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
                                                                                 stroke="grey"></vue-feather>
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
                                                                                 stroke="grey"></vue-feather>
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
                                                                                 stroke="grey"></vue-feather>
                                                                </label>
                                                                <label class="row-text-full">{{ col.value }}</label>
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
                    <button @click="exportPDF" type="button"
                            class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">
                        PDF
                    </button>
                    <button v-if="1 === parseInt(contractData.conStatus) && checkMember()"
                            @click="signContract(contractData.conId, 0 <= parseInt(contractData.conApp) ? contractData.conApp : 0, 0 <= parseInt(contractData.conApp) ? 2 : 0)"
                            type="button"
                            class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                        簽核
                    </button>
                    <button
                            v-if="1 === parseInt(contractData.conStatus) && checkMember()"
                            @click="backContract(contractData.conId, 0 <= parseInt(contractData.conApp) ? contractData.conApp : 0, 0 <= parseInt(contractData.conApp) ? 2 : 0)"
                            :disabled="msg === ''"
                            type="button"
                            class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">退回
                    </button>
                    <input v-if="1 === parseInt(contractData.conStatus) && checkMember()"
                           type="text" class="form-control" v-model="msg"
                           placeholder="退回請填寫源由"/>

                    <template v-if="contractData.perKey === per.perKey">
                        <button v-if="0 === parseInt(contractData.conStatus)"
                                @click="releaseSign(contractData.conId, 0 <= parseInt(contractData.conApp) ? contractData.conApp : 0, 0 <= parseInt(contractData.conApp) ? 2 : 0)"
                                type="button"
                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                            提交
                        </button>
                        <button v-if="3 === parseInt(contractData.appStatus) && 0 === parseInt(contractData.conInh)"
                                type="button"
                                @click="contractActionTo('ch', contractData.conId)"
                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                            變更
                        </button>
                        <button v-if="3 === parseInt(contractData.appStatus) && 0 === parseInt(contractData.conInh)"
                                type="button"
                                @click="contractActionTo('tp', contractData.conId)"
                                class="m-r-5 btn btn-outline-dark btn-border-radius waves-effect myFont16">
                            終止
                        </button>
                        <button v-if="1 === parseInt(contractData.conStatus)" type="button"
                                @click="cleanContract(contractData.conId)"
                                class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                            撤案
                        </button>
                        <button v-if="0 === parseInt(contractData.conStatus)" type="button"
                                @click="$router.push(`/contract/up/${contractData.conId}`)"
                                class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                            修改
                        </button>
                        <button v-if="-1 === parseInt(contractData.conStatus) || 0 === parseInt(contractData.conStatus) || 2 === parseInt(contractData.conStatus)"
                                type="button"
                                @click="deleteContract(contractData.conId)"
                                class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                            刪除
                        </button>
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
                        <button type="button" @click="showTransfer" class="btn btn-icon icon-left btn-success myFont16"
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
            <!-- 本案傳遞流程 -->
            <div v-if="viewTransfer" class="col-4">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h4 class="myCardTitle" href="#">
                            <vue-feather type="list" size="20" class="m-r-5"></vue-feather>
                            本案傳遞紀錄
                        </h4>
                        <button type="button" @click="closeTransfer" class="btn btn-icon icon-left btn-success myFont16"
                                style="border-radius: 6px;">
                            關閉
                        </button>
                    </div>
                    <div class="card-body myNotification viewBox">
                        <div class="row">
                            <div class="col-12">
                                <div class="activities" style="padding-top: 10px;">
                                    <div v-for="log in signLogData" class="activity">
                                        <div v-if="'-1' === log.sglStatus" class="activity-icon bg-info text-white">
                                            <vue-feather type="file" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <div v-if="'0' === log.sglStatus" class="activity-icon bg-success text-white">
                                            <vue-feather type="edit" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <template v-if="'1' === log.sglStatus">
                                            <div v-if="'0' === log.memId" class="activity-icon bg-warning text-white">
                                                <vue-feather type="flag" style="padding-top: 13px;"></vue-feather>
                                            </div>
                                            <template v-else>
                                                <div v-if="'-1' === log.sglMemberStatus"
                                                     class="activity-icon bg-success text-white">
                                                    <vue-feather type="more-horizontal"
                                                                 style="padding-top: 13px;"></vue-feather>
                                                </div>
                                                <div v-if="'0' === log.sglMemberStatus"
                                                     class="activity-icon bg-success text-white">
                                                    <vue-feather type="eye" style="padding-top: 13px;"></vue-feather>
                                                </div>
                                                <div v-if="'1' === log.sglMemberStatus"
                                                     class="activity-icon bg-success text-white">
                                                    <vue-feather type="edit-2" style="padding-top: 13px;"></vue-feather>
                                                </div>
                                                <div v-if="'2' === log.sglMemberStatus"
                                                     class="activity-icon bg-danger text-white">
                                                    <vue-feather type="rotate-cw"
                                                                 style="padding-top: 13px;"></vue-feather>
                                                </div>
                                                <div v-if="'3' === log.sglMemberStatus"
                                                     class="activity-icon bg-success text-white">
                                                    <vue-feather type="check" style="padding-top: 13px;"></vue-feather>
                                                </div>
                                            </template>
                                        </template>
                                        <div v-if="'2' === log.sglStatus" class="activity-icon bg-danger text-white">
                                            <vue-feather type="rotate-cw" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <div v-if="'3' === log.sglStatus" class="activity-icon bg-warning text-white">
                                            <vue-feather type="star" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <div v-if="'4' === log.sglStatus" class="activity-icon bg-dark text-white">
                                            <vue-feather type="trash-2" style="padding-top: 13px;"></vue-feather>
                                        </div>
                                        <div class="activity-detail">
                                            <div class="mb-2">
                                                <span v-if="'-1' === log.sglStatus" class="text-job">建立</span>
                                                <span v-if="'0' === log.sglStatus" class="text-job">草稿</span>
                                                <span v-if="'1' === log.sglStatus && '0' === log.memId"
                                                      class="text-job">發起</span>
                                                <span v-if="'1' === log.sglStatus && '0' !== log.memId && '0' === log.memType"
                                                      class="text-job">發起</span>
                                                <span v-if="'1' === log.sglStatus && '0' !== log.memId && '1' === log.memType"
                                                      class="text-job">維運</span>
                                                <span v-if="'1' === log.sglStatus && '0' !== log.memId && '2' === log.memType"
                                                      class="text-job">使用</span>
                                                <span v-if="'2' === log.sglStatus" class="text-job">退回</span>
                                                <span v-if="'3' === log.sglStatus" class="text-job">已歸檔</span>
                                                <span v-if="'4' === log.sglStatus" class="text-job">撤回</span>
                                                <template
                                                        v-if="'1' === log.sglStatus && ('0' === log.memId || ('0' !== log.memId && ('0' === log.memType || '1' === log.memType || '2' === log.memType)))">
                                                    <span class="bullet"></span>
                                                    <span v-if="'-1' === log.sglMemberStatus" class="text-job">等待</span>
                                                    <span v-if="'0' === log.sglMemberStatus" class="text-job">待檢視</span>
                                                    <span v-if="'1' === log.sglMemberStatus" class="text-job">待簽</span>
                                                    <span v-if="'2' === log.sglMemberStatus" class="text-job">退回</span>
                                                    <span v-if="'3' === log.sglMemberStatus" class="text-job">完成</span>
                                                </template>
                                                <span class="bullet"></span>
                                                <span class="text-job">{{ log.sglCreateTime }}</span>
                                            </div>
                                            <p>{{ log.perBu2 }} {{ log.perBu3 }} {{ log.perName }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <div class="setting-panel-header">管理面板
                    </div>
                    <div class="p-15 border-bottom">
                        <div class="col-lg-12">
                            <div class="m-l-20">
                                <button @click="exportPDF" type="button"
                                        class="m-r-5 btn btn-outline-primary btn-border-radius waves-effect myFont16">
                                    PDF
                                </button>
                                <button v-if="1 === parseInt(contractData.conStatus) && checkMember()"
                                        @click="signContract(contractData.conId, 0 <= parseInt(contractData.conApp) ? contractData.conApp : 0, 0 <= parseInt(contractData.conApp) ? 2 : 0)"
                                        type="button"
                                        class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                    簽核
                                </button>
                                <button
                                        v-if="1 === parseInt(contractData.conStatus) && checkMember()"
                                        @click="backContract(contractData.conId, 0 <= parseInt(contractData.conApp) ? contractData.conApp : 0, 0 <= parseInt(contractData.conApp) ? 2 : 0)"
                                        :disabled="msg === ''"
                                        type="button"
                                        class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">退回
                                </button>
                                <input v-if="1 === parseInt(contractData.conStatus) && checkMember()"
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
                                    <button v-if="0 === parseInt(contractData.conStatus)"
                                            @click="releaseSign(contractData.conId, 0 <= parseInt(contractData.conApp) ? contractData.conApp : 0, 0 <= parseInt(contractData.conApp) ? 2 : 0)"
                                            type="button"
                                            class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                        提交
                                    </button>
                                    <button v-if="3 === parseInt(contractData.conStatus)" type="button"
                                            @click="contractActionTo('ch', contractData.conId)"
                                            class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                        變更
                                    </button>
                                    <button v-if="3 === parseInt(contractData.conStatus)" type="button"
                                            @click="contractActionTo('tp', contractData.conId)"
                                            class="m-r-5 btn btn-outline-dark btn-border-radius waves-effect myFont16">
                                        終止
                                    </button>
                                    <button v-if="1 === parseInt(contractData.conStatus)" type="button"
                                            @click="cleanContract(contractData.conId)"
                                            class="m-r-5 btn btn-outline-secondary btn-border-radius waves-effect myFont16">
                                        撤案
                                    </button>
                                    <button v-if="0 === parseInt(contractData.conStatus)" type="button"
                                            @click="$router.push(`/contract/up/${contractData.conId}`)"
                                            class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                        修改
                                    </button>
                                    <button v-if="-1 === parseInt(contractData.conStatus) || 0 === parseInt(contractData.conStatus) || 2 === parseInt(contractData.conStatus)"
                                            @click="deleteContract(contractData.conId)"
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
                            <li v-for="(item, index) in contractData.conValue" class="nav-item">
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
    import {signMixin} from '@/mixins/signMixin.js';
    import {saveAs} from 'file-saver';

    export default {
        name: "Contract_sl",
        mixins: [controlBoxMixin, contractActionMixin, signMixin],
        data() {
            return {
                isLoading: false,
                showConcat: true,//顯示窗口
                viewTransfer: false,//顯示log
                per: JSON.parse(Cookies.get('per')),
                conId: parseInt(this.$route.params.id),

                viewFile: false,
                viewFileUrl: '',
                viewFilePDF: false,
                viewFileDOCK: false,
                viewFileXLSE: false,
                isSidebarVisible: false,
                msg: '',//理由
                contractData: {},
                signLogData: [],
                // conValue: [],
                // itemData: [],
                iMemberData: [],//發起
                mMemberData: [],//維運
                uMemberData: [],//使用
                contactData: [],
                // conCompany: {},//使用公司

                templateStyleData: [],
                subsidiaryData: [],
                // workData: {},
                // itemList: [], // 新增一個空的數組
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
                this.conId = parseInt(this.$route.params.id); // 取得路由參數 id
                this.per = JSON.parse(Cookies.get('per'));
                this.fetchFirst();
            },
            fetchFirst() {
                window.scrollTo(0, 0);
                const conId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=contract&conId=${conId}` : `/api/adm/contract/${conId}`),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company/List'),
                    this.$api.get(this.$test ? `/api/?type=signLog&conId=${conId}` : `/api/iform/signLog/${conId}`),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, contactResponse, companyResponse, LogResponse]) => {
                        //contactResponse
                        this.contactData = contactResponse.data.data;

                        //contractResponse
                        this.contractData = contractResponse.data.data;
                        if (this.contractData?.conValue !== undefined) {
                            this.contractData.conValue = this.contractData?.conValue ? JSON.parse(this.contractData.conValue) : null;
                        }
                        this.conFileMeeting = this.contractData?.conFileMeeting ? this.contractData.conFileMeeting.split('|') : null;
                        this.conFilePlan = this.contractData?.conFilePlan ? this.contractData.conFilePlan.split('|') : null;
                        this.conFile = this.contractData?.conFile ? this.contractData.conFile.split('|') : null;
                        if (this.contractData?.conCompany !== undefined) {
                            this.contractData.conCompany = this.contractData?.conCompany ? this.contractData.conCompany.split('|') : null;
                        }
                        if (-1 === parseInt(this.contractData.conStatus)) {
                            this.$router.push(`/contract/up/${this.contractData.conId}`);
                        }

                        if (this.contractData?.itemData !== undefined) {
                            this.contractData.itemData.forEach((item) => {
                                item.iteProportion = item.iteProportion && '' !== item.iteProportion ? JSON.parse(item.iteProportion) : item.iteProportion;
                            });
                        }
                        if (this.contractData?.conWork !== undefined) {
                            this.contractData.conWork = this.contractData.conWork.split('|');
                        }

                        if (this.contractData?.memberData !== undefined) {
                            const memberList = this.contractData?.memberData;
                            this.iMemberData = memberList.find(member => member.memType === '0');
                            this.mMemberData = memberList.filter(member => member.memType === '1');
                            this.uMemberData = memberList.filter(member => member.memType === '2');
                        }
                        //contactResponse
                        this.companyData = companyResponse.data.data;


                        //LogResponse
                        this.signLogData = LogResponse.data.data;

                        this.isLoading = true;
                    })
                    .catch(error => {
                        console.error(error);
                    });
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
