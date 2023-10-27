<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">資訊共用合約</h4>
            </li>
            <li class="breadcrumb-item">
                <router-link :to="`/contract/${contractData.temId}/list`">
                    <vue-feather type="link"></vue-feather>
                    {{ contractData.temTitle }}列表
                </router-link>
            </li>
            <li class="breadcrumb-item">查看文件</li>
        </ul>
        <div class="section-body">
            <div class="row">
                <div class="d-flex">
                    <!-- 主要內容 -->
                    <div id="myMainDocument" :class="viewFile ? 'col-6' : 'col-12'">
                        <template v-for="(area, parentIndex) in conValue">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 item" :id="'my'+parentIndex">
                                <div class="card">
                                    <div class="boxs mail_listing">
                                        <div class="inbox-body no-pad">
                                            <section class="mail-list">
                                                <div class="mail-sender">
                                                    <div class="mail-heading">
                                                        <div class="vew-mail-header">
                                                            <div class="author-box-name d-flex justify-content-between"
                                                                 style="margin-bottom: 20px;">
                                                                <h4 class="myCardTitle" href="#">
                                                                    <vue-feather type="book" size="20"
                                                                                 class="m-r-5"></vue-feather>
                                                                    {{ area.areaTitle }}
                                                                </h4>
                                                                <div v-if="parentIndex === 0">
                                                                    <!-- 這裡放創文日期 -->
                                                                    <div class="myFont16Title">
                                                                        文件序號：<span
                                                                            class="data float-end myFont16">{{ contractData.conSerial }}</span>
                                                                    </div>
                                                                    <div class="myFont16Title">
                                                                        建檔日期：<span
                                                                            class="data float-end myFont16">{{ this.$root.formatDate(contractData.conCreateTime)}}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr>
                                                            <template v-for="(col, childIndex) in area.colItem"
                                                                      class="row">
                                                                <div :class="['col-lg-' + col.width + ' sub-item']">
                                                                    <div class="d-flex mb-4 mt-2">
                                                                        <div class="flex-grow-1">
                                                                            <hr v-if="childIndex !== 0"/>
                                                                            <div class="author-box-name d-flex"
                                                                                 style="margin-bottom: 20px;">
                                        <span v-if="col.name !== ''" class="myFont16 d-flex align-center"
                                              style="background-color:#6777ef ;color: white;border-radius: 6px;padding: 0.3rem 0.8rem;font-weight: 400;">
                                          <vue-feather type="tag" size="20" style="transform: rotate(135deg);"
                                                       class="m-r-10"></vue-feather>{{ col.name }}</span>
                                                                            </div>
                                                                            <!-- 這裡放權限控管及資料管制 -->
                                                                            <span class="data myFont16">
                                                                            <template v-if="col.type === 'subject'">
                                                                                <h4><b style="font-weight: 600;">{{ contractData.conTitle }}</b></h4>
                                                                                <div class="flex-grow-1">
                                                                                    <!-- 這裡放承辦單位 -->
                                                                                    <div class="myFont16Title">承辦單位：<span
                                                                                            class="data myFont16">{{ contractData.perBu2}}  {{ contractData.perBu3}}</span></div>
                                                                                    <!-- 這裡放承辦人 -->
                                                                                    <div class="myFont16Title">承辦人：<span
                                                                                            class="data myFont16">{{ contractData.perName}}</span></div>
                                                                                    <!-- 這裡放聯絡電話 -->
                                                                                    <div class="myFont16Title">聯絡電話：<span
                                                                                            class="data myFont16">{{ contractData.perPhone1}}  {{ contractData.perPhone2}}  {{ contractData.perPhone3}}</span>
                                                                                    </div>
                                                                                    <br>
                                                                                    <!-- 這裡放計劃框架 -->
                                                                                    <div class="myFont16Title">計劃框架：<span
                                                                                            class="data myFont16">
                                                                                        {{ contractData.temTitle }}
                                                                                    </span></div>
                                                                                    <!-- 這裡放承辦單位 -->
                                                                                    <div class="myFont16Title">申請類型：
                                                                                        <span v-if="contractData.conType === '0'"
                                                                                              class="data myFont16">新增</span>
                                                                                        <span v-if="contractData.conType === '1'"
                                                                                              class="data myFont16">變更</span>
                                                                                        <span v-if="contractData.conType === '2'"
                                                                                              class="data myFont16">終止</span>
                                                                                    </div>
                                                                                    <!-- 這裡放管理維運公司 -->
                                                                                    <div class="myFont16Title">管理維運公司：<span
                                                                                            class="data myFont16">{{ contractData.comTitle }}</span>
                                                                                    </div>
                                                                                    <!-- 這裡放生效日期 -->
                                                                                    <div class="myFont16Title">生效日期：<span
                                                                                            class="data myFont16"
                                                                                            :style="contractData.conDate === '' || contractData.conDate === null ? 'font-style: italic; color: #e3e3e3;' : ''">{{ contractData.conDate === '' || contractData.conDate === null ? '簽核完成後產生' : contractData.conDate}}</span>
                                                                                    </div>
                                                                                    <!-- 這裡放使用公司 -->
                                                                                    <div class="myFont16Title">使用公司：<span
                                                                                            class="data myFont16">
                                                                                        <template
                                                                                                v-for="(option, idx) in contractData.conCompany.split('|')">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getCompanyTitle('', option)}}</template>
                                                                                    </span></div>
                                                                                    <!-- 這裡放作業種類 -->
                                                                                    <div class="myFont16Title">作業種類：<span
                                                                                            class="data myFont16">
                                                                                        <template
                                                                                                v-for="(option, idx) in contractData.conWork.split('|')">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getWorkTitle(option)}}</template>
                                                                                    </span></div>
                                                                                </div>
                                                                            </template>
                                                                            <template
                                                                                    v-if="col.type.startsWith('list')">
                                                                                    <div class="replyBox m-t-20 myFont16">
                                                                                        {{ col.value }}
                                                                                    </div>
                                                                            </template>
                                                                            <template
                                                                                    v-if="col.type.startsWith('word')">
                                                                                <div class="replyBox m-t-20 myFont16">
                                                                                    {{ col.value }}
                                                                                </div>
                                                                            </template>

                                                                            <template v-if="col.type === 'work_area'">
                                                                                <table class="myTable myTableItem">
                                                                                    <caption>作業項目資料表</caption>
                                                                                    <thead>
                                                                                    <tr>
                                                                                        <th>序號</th>
                                                                                        <th>作業項目</th>
                                                                                        <th>作業種類</th>
                                                                                        <th>服務時間</th>
                                                                                        <th>本項目使用公司</th>
                                                                                        <th>權限控管及資料管制</th>
                                                                                        <th>分攤比例原則</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                    <template
                                                                                            v-for="(ite, iteIndex) in itemData">
                                                                                    <tr>
                                                                                        <td>
                                                                                            {{ iteIndex+1 }}
                                                                                        </td>
                                                                                        <td>
                                                                                            <!--作業項目-->
                                                                                            {{ ite.iteTitle}}
                                                                                        </td>
                                                                                        <td>
                                                                                            <!--作業種類-->
                                                                                            {{ ite.worTitle}}
                                                                                        </td>
                                                                                        <td>
                                                                                            <!--服務時間-->
                                                                                            {{ ite.iteTime}}
                                                                                        </td>
                                                                                        <td>
                                                                                            <!--本項目使用公司-->
                                                                                            <template
                                                                                                    v-for="(option, idx) in ite.iteSubsidiaries.split('|')">{{ idx !== 0 ? '、' : ''}}{{ this.$root.getCompanyTitle('', option)}}</template>
                                                                                        </td>
                                                                                        <td>
                                                                                            <!--權限控管及資料管制-->
                                                                                            {{ ite.iteControl}}
                                                                                        </td>
                                                                                        <td>
                                                                                            <!--分攤比例原則-->
                                                                                            {{ ite.disTitle}}<br>{{ ite.manTitle}}
                                                                                            <p v-if="'' !== ite.iteTypeNote">{{ ite.iteTypeNote }}</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                        <tr v-if="'1' === ite.manType && typeof ite.iteProportion === 'object'">
                                                                                            <td colspan="7">
                                                                                                預計比例：
                                                                                                <template
                                                                                                        v-for="pp in ite.iteProportion">
                                                                                                    <span v-if="pp.p !== '0'"
                                                                                                          style="padding-right: 10px;">
                                                                                                        {{ this.$root.getCompanyTitle(pp.comId, '')}}：{{pp.p}}
                                                                                                    </span>
                                                                                                </template>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </template>
                                                                                    </tbody>
                                                                                </table>
                                                                            </template>
                                                                            <template v-if="col.type === 'sign'">
                                                                                <label>維運</label>
                                                                                <table class="myTable myTableMemberIv">
                                                                                    <caption>發起維運公司簽核人員資料表</caption>
                                                                                    <thead>
                                                                                    <tr>
                                                                                        <th>公司</th>
                                                                                        <th>部門</th>
                                                                                        <th>科別</th>
                                                                                        <th>部門主管</th>
                                                                                        <th>科別主管</th>
                                                                                        <th>承辦人</th>
                                                                                        <th>承辦人連絡電話</th>
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
                                                                                    </tbody>
                                                                                </table>
                                                                                <table v-if="mMemberData.length !== 0"
                                                                                       class="myTable myTableMemberMv">
                                                                                        <caption>維運公司簽核人員資料表</caption>
                                                                                        <thead>
                                                                                        <tr>
                                                                                            <th>公司</th>
                                                                                            <th>部門</th>
                                                                                            <th>科別</th>
                                                                                            <th>部門主管</th>
                                                                                            <th>科別主管</th>
                                                                                            <th>承辦人</th>
                                                                                            <th>承辦人連絡電話</th>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>
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
                                                                                <label>使用</label>
                                                                                <table v-if="uMemberData.length !== 0"
                                                                                       class="myTable myTableMemberUv">
                                                                                        <caption>使用公司簽核人員資料表</caption>
                                                                                            <thead>
                                                                                            <tr>
                                                                                                <th>公司</th>
                                                                                                <th>部門</th>
                                                                                                <th>科別</th>
                                                                                                <th>部門主管</th>
                                                                                                <th>科別主管</th>
                                                                                                <th>承辦人</th>
                                                                                                <th>承辦人連絡電話</th>
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

                                                                                <p></p>
                                                                                <div class="myFont16">維運窗口：<span
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

                                                                            </template>

                                                                            <template v-if="col.type === 'file_area'">
                                                                                <div class="replyBox m-t-20 myFont16">
                                                                      <span>
                                                                        <!-- 這裡放共幾則附檔 -->
                                                                        <i class="fa fa-paperclip mb-1"></i> <span>{{(conFile ? conFile.length : 0) + (conFileMeeting ? conFileMeeting.length : 0) + (conFilePlan ? conFilePlan.length : 0) }}則</span>附加檔案 </span>
                                                                                    <!-- 這裡放附檔 -->
                                                                                    <div>
                                                                                        <template v-if="conFileMeeting">
                                                                                            <template
                                                                                                    v-for="(option, index) in conFileMeeting">
                                                                                                <a href="javascript:void(0);"
                                                                                                   @click="openViewFile(contractData.filePath+option)">會議記錄 {{ index+1 }}</a> |
                                                                                            </template>
                                                                                        </template>
                                                                                        <template v-if="conFilePlan">
                                                                                            <template
                                                                                                    v-for="(option, index) in conFilePlan">
                                                                                                <a href="javascript:void(0);"
                                                                                                   @click="openViewFile(contractData.filePath+option)">專規劃報告 {{ index+1 }}</a> |
                                                                                            </template>
                                                                                        </template>
                                                                                        <template v-if="conFile">
                                                                                            <template
                                                                                                    v-for="(option, index) in conFile">
                                                                                                <a href="javascript:void(0);"
                                                                                                   @click="openViewFile(contractData.filePath+option)">其他附件 {{ index+1 }}</a> |
                                                                                            </template>
                                                                                        </template>
                                                                                    </div>
                                                                                </div>
                                                                            </template>

                                                                            <template v-if="col.type === 'select'">
                                                                                <template v-if="col.tip === ''">
                                                                                <select class="form-control">
                                                                                    <!-- 選項列表 -->
                                                                                    <option v-for="option in col.option.split('|')"
                                                                                            :value="option">
                                                                                        {{ option }}
                                                                                    </option>
                                                                                </select>
                                                                                </template>
                                                                                <template v-else>
                                                                                <div class="myToolTipContainer d-flex"
                                                                                     style="width: 200px;">
                                                                                  <!-- 以下放edit元件 -->
                                                                                <select class="form-control">
                                                                                    <!-- 選項列表 -->
                                                                                    <option v-for="option in col.option.split('|')"
                                                                                            :value="option">
                                                                                        {{ option }}
                                                                                    </option>
                                                                                </select>
                                                                                    <!-- 以上放edit元件 -->
                                                                                  <div class="help-tip">
                                                                                    <p>{{ col.tip }}</p>
                                                                                  </div>
                                                                                </div>
                                                                                </template>
                                                                            </template>
                                                                            <template v-if="col.type === 'radio'">
                                                                                <template v-if="col.tip === ''">
                                                                                    <div v-for="option in col.option.split('|')"
                                                                                         class="form-check form-check-inline">
                                                                                            <input type="radio"
                                                                                                   :value="option"
                                                                                                   class="form-check-input"
                                                                                                   :id="'radio_'+parentIndex+'_'+childIndex">

                                                                                            <label class="form-check-label"
                                                                                                   :for="'radio_'+parentIndex+'_'+childIndex">{{ option }}</label>
                                                                                    </div>
                                                                                </template>
                                                                                <template v-else>
                                                                                <div class="myToolTipContainer d-flex"
                                                                                     style="width: 200px;">
                                                                                  <!-- 以下放edit元件 -->
                                                                                    <div v-for="option in col.option.split('|')"
                                                                                         class="form-check form-check-inline">
                                                                                            <input type="radio"
                                                                                                   :value="option"
                                                                                                   class="form-check-input"
                                                                                                   :id="'radio_'+parentIndex+'_'+childIndex">

                                                                                            <label class="form-check-label"
                                                                                                   :for="'radio_'+parentIndex+'_'+childIndex">{{ option }}</label>
                                                                                    </div>
                                                                                    <!-- 以上放edit元件 -->
                                                                                  <div class="help-tip">
                                                                                    <p>{{ col.tip }}</p>
                                                                                  </div>
                                                                                </div>
                                                                                </template>
                                                                            </template>
                                                                            <template v-if="col.type === 'check'">
                                                                                <template v-if="col.tip === ''">
                                                                                    <div v-for="option in col.option.split('|')"
                                                                                         class="form-check form-check-inline">
                                                                                            <input type="checkbox"
                                                                                                   :value="option"
                                                                                                   class="form-check-input"
                                                                                                   :id="'radio_'+parentIndex+'_'+childIndex">

                                                                                            <label class="form-check-label"
                                                                                                   :for="'radio_'+parentIndex+'_'+childIndex">{{ option }}</label>
                                                                                    </div>
                                                                                </template>
                                                                                <template v-else>
                                                                                <div class="myToolTipContainer d-flex"
                                                                                     style="width: 200px;">
                                                                                  <!-- 以下放edit元件 -->
                                                                                    <div v-for="option in col.option.split('|')"
                                                                                         class="form-check form-check-inline">
                                                                                            <input type="checkbox"
                                                                                                   :value="option"
                                                                                                   class="form-check-input"
                                                                                                   :id="'radio_'+parentIndex+'_'+childIndex">

                                                                                            <label class="form-check-label"
                                                                                                   :for="'radio_'+parentIndex+'_'+childIndex">{{ option }}</label>
                                                                                    </div>
                                                                                    <!-- 以上放edit元件 -->
                                                                                  <div class="help-tip">
                                                                                    <p>{{ col.tip }}</p>
                                                                                  </div>
                                                                                </div>
                                                                                </template>
                                                                            </template>
                                                                            <template v-if="col.type === 'text'">
                                                                                <template v-if="col.tip === ''">
                                                                                <input type="text"
                                                                                       class="form-control"/>
                                                                                </template>
                                                                                <template v-else>
                                                                                <div class="myToolTipContainer d-flex"
                                                                                     style="width: 200px;">
                                                                                  <!-- 以下放edit元件 -->
                                                                                <input type="text"
                                                                                       class="form-control"/>
                                                                                    <!-- 以上放edit元件 -->
                                                                                  <div class="help-tip">
                                                                                    <p>{{ col.tip }}</p>
                                                                                  </div>
                                                                                </div>
                                                                                </template>
                                                                            </template>
                                                                            <template v-if="col.type === 'box'">
                                                                                <template v-if="col.tip === ''">
                                                                                <textarea
                                                                                        class="form-control"></textarea>
                                                                                </template>
                                                                                <template v-else>
                                                                                <div class="myToolTipContainer d-flex"
                                                                                     style="width: 200px;">
                                                                                  <!-- 以下放edit元件 -->
                                                                                <textarea
                                                                                        class="form-control"></textarea>
                                                                                    <!-- 以上放edit元件 -->
                                                                                  <div class="help-tip">
                                                                                    <p>{{ col.tip }}</p>
                                                                                  </div>
                                                                                </div>
                                                                                </template>
                                                                            </template>
                                                                                    </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <template v-if="viewFile">
                        <div id="myPdfViewer" class="col-6" style="height: 100vh; position: sticky; top:100px;">
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
                            <embed v-if="viewFilePDF" :src="viewFileUrl" width="100%" height="95%"/>
                            <!--<vue-office-pdf v-if="viewFilePDF" :src="viewFileUrl" style="width: 100%;height: 95%;"/>-->
                            <vue-office-docx v-if="viewFileDOCK" :src="viewFileUrl" style="width: 100%;height: 95%;"/>
                            <vue-office-excel v-if="viewFileXLSE" :src="viewFileUrl" style="width: 100%;height: 95%;"/>
                        </div>
                    </template>
                </div>


                <div class="col-6" style="padding-bottom: 20px;">
                    <button v-if="contractData.conStatus === '0' && contractData.comId === per.comId && contractData.perKey === per.perKey"
                            @click="releaseSign(0)"
                            type="button"
                            class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">發起
                    </button>
                    <button v-if="contractData.conStatus === '2' && contractData.comId === per.comId && contractData.perKey === per.perKey"
                            @click="releaseSign(2)"
                            type="button"
                            class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">重新發起
                    </button>
                    <button v-if="contractData.conStatus === '1' && checkMember()" type="button"
                            @click="signContract()"
                            class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">簽核
                    </button>
                    <button v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                            type="button"
                            @click="backContract()"
                            :disabled="msg === ''"
                            class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">退回
                    </button>
                    <button v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                            type="button"
                            @click="rejectContract()"
                            :disabled="msg === ''"
                            class="m-r-5 btn btn-danger btn-border-radius waves-effect myFont16">拒絕
                    </button>
                    <div v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                         class="form-group">
                        <div class="input-group mb-3">
                            <input
                                    type="text" class="form-control" v-model="msg"
                                    placeholder="退回或拒絕請填寫源由"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- 本案傳遞流程 -->

    <div class="col-12" id="myView">
        <div class="card">
            <div class="card-header justify-content-between">
                <h4 class="myCardTitle" href="#">
                    <vue-feather type="list" size="20" class="m-r-5"></vue-feather>
                    本案傳遞流程
                </h4>
                <button type="button" id="addBtn" class="btn btn-icon icon-left btn-primary myFont16"
                        style="border-radius: 6px;">
                    查看傳遞紀錄
                </button>
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
                    <tbody class="myNew">
                    <tr>
                        <td>1</td>
                        <th scope="row"><span class="badge badge-success">起簽</span></th>
                        <td><span class="sign-title">管理維運公司承辦人</span><br>{{ iMemberData.comTitle}} {{ iMemberData.memBu2
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
                                <template v-if="iMemberData.memLV0Status === '4'">拒絕<br><span class="time-msg">{{iMemberData.memLV0Time}}</span>
                                    <template v-if="iMemberData.memLV0Msg !== ''"><br><span class="other-msg">{{ iMemberData.memLV0Msg }}</span>
                                    </template>
                                </template>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <th scope="row"><span class="badge badge-primary">會辦</span></th>
                        <td><span class="sign-title">管理維運公司窗口</span><br>{{ iMemberData.comTitle}}
                            <template v-if="iMemberData.memLVCKey !== ''">{{ iMemberData.memBu2 }} {{ iMemberData.memBu3
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
                                <template v-if="iMemberData.memLVCStatus === '4'">拒絕<br><span class="time-msg">{{iMemberData.memLVCTime}}</span>
                                    <template v-if="iMemberData.memLVCMsg !== ''"><br><span class="other-msg">{{ iMemberData.memLVCMsg }}</span>
                                    </template>
                                </template>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <th scope="row"><span class="badge badge-primary">簽核</span></th>
                        <td><span class="sign-title">管理維運公司科級主管</span><br>{{ iMemberData.comTitle}} {{
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
                                <template v-if="iMemberData.memLV1Status === '4'">拒絕<br><span class="time-msg">{{iMemberData.memLV1Time}}</span>
                                    <template v-if="iMemberData.memLV1Msg !== ''"><br><span class="other-msg">{{ iMemberData.memLV1Msg }}</span>
                                    </template>
                                </template>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <th scope="row"><span class="badge badge-primary">簽核</span></th>
                        <td><span class="sign-title">管理維運公司部級主管(含以上)</span><br>{{ iMemberData.comTitle}} {{
                            iMemberData.memBu2 }} {{ iMemberData.memBu3 }} {{
                            iMemberData.memLV2Name }} {{ iMemberData.memLV2PositionName }}
                        </td>
                        <td style="text-align: right;">
                            <a :class="iMemberData.memLV2Status === '0' || iMemberData.memLV2Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                               href="javascript:void(0);">
                                <template v-if="iMemberData.memLV2Status === '-1'">等待</template>
                                <template v-if="iMemberData.memLV2Status === '0'">待檢視</template>
                                <template v-if="iMemberData.memLV2Status === '1'">簽核中</template>
                                <template v-if="iMemberData.memLV2Status === '2'">拒絕<br><span class="time-msg">{{iMemberData.memLV2Time}}</span>
                                    <template v-if="iMemberData.memLV2Msg !== ''"><br><span class="other-msg">{{ iMemberData.memLV2Msg }}</span>
                                    </template>
                                </template>
                                <template v-if="iMemberData.memLV2Status === '3'">已完成<br><span class="time-msg">{{iMemberData.memLV2Time}}</span>
                                </template>
                                <template v-if="iMemberData.memLV2Status === '4'">已完成<br><span class="time-msg">{{iMemberData.memLV2Time}}</span>
                                    <template v-if="iMemberData.memLV2Msg !== ''"><br><span class="other-msg">{{ iMemberData.memLV2Msg }}</span>
                                    </template>
                                </template>
                            </a>
                        </td>
                    </tr>
                    <template v-for="(mmem, idx) in mMemberData">
                        <tr>
                            <td>{{idx+5}}</td>
                            <th scope="row"><span class="badge badge-primary">水平會簽</span></th>
                            <td><span class="sign-title">平行維運公司承辦人</span><br>{{ mmem.comTitle}} {{ mmem.memBu2 }} {{
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
                                    <template v-if="mmem.memLV0Status === '4'">拒絕<br><span class="time-msg">{{mmem.memLV0Time}}</span>
                                        <template v-if="mmem.memLV0Msg !== ''"><br><span class="other-msg">{{ mmem.memLV0Msg }}</span>
                                        </template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th scope="row"><span class="badge badge-secondary"></span></th>
                            <td><span class="sign-title">管理維運公司科級主管</span><br>{{ mmem.comTitle}} {{ mmem.memBu2 }} {{
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
                                    <template v-if="mmem.memLV1Status === '4'">拒絕<br><span class="time-msg">{{mmem.memLV1Time}}</span>
                                        <template v-if="mmem.memLV1Msg !== ''"><br><span class="time-msg">{{ mmem.memLV1Msg }}</span>
                                        </template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th scope="row"><span class="badge badge-success"></span></th>
                            <td><span class="sign-title">管理維運公司部級主管(含以上)</span><br>{{ mmem.comTitle}} {{ mmem.memBu2 }}
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
                            <td><span class="sign-title">使用公司承辦人</span><br>{{ umem.comTitle}} {{ umem.memBu2 }} {{
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
                                    <template v-if="umem.memLV0Status === '4'">拒絕<br><span class="time-msg">{{umem.memLV0Time}}</span>
                                        <template v-if="umem.memLV0Msg !== ''"><br><span class="other-msg">{{ umem.memLV0Msg }}</span>
                                        </template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th scope="row"><span class="badge badge-secondary"></span></th>
                            <td><span class="sign-title">使用公司科級主管</span><br>{{ umem.comTitle}} {{ umem.memBu2 }} {{
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
                                    <template v-if="umem.memLV1Status === '4'">拒絕<br><span class="time-msg">{{umem.memLV1Time}}</span>
                                        <template v-if="umem.memLV1Msg !== ''"><br><span class="other-msg">{{ umem.memLV1Msg }}</span>
                                        </template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th scope="row"><span class="badge badge-success"></span></th>
                            <td><span class="sign-title">使用公司部級主管(含以上)</span><br>{{ umem.comTitle}} {{ umem.memBu2 }} {{
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
                                    <template v-if="umem.memLV2Status === '4'">拒絕<br><span class="time-msg">{{umem.memLV2Time}}</span>
                                        <template v-if="umem.memLV2Msg !== ''"><br><span class="other-msg">{{ umem.memLV2Msg }}</span>
                                        </template>
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
                            <button v-if="contractData.conStatus === '0' && contractData.comId === per.comId && contractData.perKey === per.perKey"
                                    @click="releaseSign(0)"
                                    type="button"
                                    class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">發起
                            </button>
                            <!--<button v-if="contractData.conStatus === '2' && contractData.comId === per.comId && contractData.perKey === per.perKey"-->
                                    <!--@click="releaseSign(2)"-->
                                    <!--type="button" class="btn btn-warning btn-border-radius waves-effect myFont16">重新發起-->
                            <!--</button>-->
                            <button v-if="contractData.conStatus === '1' && checkMember()"
                                    @click="signContract()"
                                    type="button" class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">
                                簽核
                            </button>
                            <button
                                    v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                                    @click="backContract()"
                                    :disabled="msg === ''"
                                    type="button" class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">退回
                            </button>
                            <button
                                    v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                                    @click="rejectContract()"
                                    :disabled="msg === ''"
                                    type="button" class="m-r-5 btn btn-danger btn-border-radius waves-effect myFont16">
                                拒絕
                            </button>
                            <input v-if="contractData.conStatus === '1' && checkMember() && iMemberData.memLVCStatus !== '0'"
                                   type="text" class="form-control" v-model="msg"
                                   placeholder="退回或拒絕請填寫源由"/>

                        </div>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">文件架構</h6>
                    <ul class="contact-list">
                        <li v-for="(item, index) in conValue" class="nav-item">
                            <a class="nav-link myFont16" href="javascript:void(0);"
                               @click="scrollToElement('my' + index)">
                                {{ item.areaTitle }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">簽核紀錄</h6>
                    <ul class="contact-list">
                        <li class="nav-item">
                            <a class="nav-link myFont16" href="javascript:void(0);" @click="scrollToElement('myView')">本文件傳遞流程</a>
                        </li>
                    </ul>
                </div>
                <div class="p-15 border-bottom">
                    <div class="theme-setting-options">
                        <label class="m-b-0">
                            <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input"
                                   id="mini_sidebar_setting">
                            <span class="custom-switch-indicator"></span>
                            <span class="control-label p-l-10">縮小右側控制板</span>
                        </label>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <div class="theme-setting-options">
                        <label class="m-b-0">
                            <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input"
                                   id="">
                            <span class="custom-switch-indicator"></span>
                            <span class="control-label p-l-10">開啟所有區塊</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 浮動控制版 -->
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
    import { saveAs } from 'file-saver';
    export default {
        name: "Contract_sl",
        mixins: [controlBoxMixin],
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
                personData: [],
                contactData: [],


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
                    this.$api.get(this.$test ? `/api/?type=contractItem` : `/api/iform/contractItem/List`, {params:{conId:conId}}),
                    this.$api.get(this.$test ? `/api/?type=contractMember` : `/api/iform/contractMember/List`, {params:{conId:conId}}),
                    this.$api.get(this.$test ? '/api/?type=personnel' : '/api/iform/personnel/List'),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, itemResponse, memberResponse, personnelResponse, contactResponse]) => {
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
                        personnelResponse
                        this.personData = personnelResponse.data.data;

                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            // 發起簽核 releaseSign
            async releaseSign(action = 0) {
                // 文件發起人必須與登入人資料一致
                if (this.iMemberData.comId === this.per.comId && this.iMemberData.memLV0Key === this.per.perKey) {
                    try {
                        await this.defaultContract();//重置文件資訊與簽核人員資料
                        let msg = this.iMemberData.comTitle + ' '
                            + this.iMemberData.memBu2 + ' '
                            + this.iMemberData.memBu3 + ' '
                            + this.iMemberData.memLV0Name + ' '
                            + this.iMemberData.memLV0PositionName + ' '
                            + (action === 2 ? '重新發起簽核' : '發起簽核');
                        let log = this.createMemberLog(this.iMemberData.memId, this.per.perKey, 3, msg, 1);
                        await this.updateContractStatus(1, null, log);//修改文件狀態為進行中
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
                                    let log = this.createMemberLog(0, '', 3, '文件簽核完成', 3);
                                    await this.updateContractStatus(3, dayjs().format('YYYY-MM-DD'), log);
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
                                        let log = this.createMemberLog(0, '', 3, '文件簽核完成', 3);
                                        await this.updateContractStatus(3, dayjs().format('YYYY-MM-DD'), log);
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
                                    let log = this.createMemberLog(0, '', 3, '文件簽核完成', 3);
                                    await this.updateContractStatus(3, dayjs().format('YYYY-MM-DD'), log);
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
            // rejectContract 拒絕
            async rejectContract() {
                let upMember = null;
                if (this.iMemberData.memNowKey === this.per.perKey) {
                    const isLV = this.getMemberLV(this.iMemberData);
                    if (isLV) {
                        upMember = this.createUpMember(this.iMemberData, isLV, 4, true);
                    }
                }
                this.mMemberData.forEach((mem) => {
                    if (mem.memNowKey === this.per.perKey) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 4, false);
                        }
                    }
                });
                this.uMemberData.forEach((mem) => {
                    if (mem.memNowKey === this.per.perKey) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 4, false);
                        }
                    }
                });
                if (upMember) {
                    try {
                        await this.updateMember(upMember);
                        let log = this.createMemberLog(upMember.memId, upMember.LVKey, 4, '文件終止', 4);
                        await this.updateContractStatus(4, null, log);
                        await this.clearMemberAll();
                        alert('文件終止');
                        this.$router.push(`/contract/${this.$route.params.tem}/list`);
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
                        let log = this.createMemberLog(upMember.memId, upMember.LVKey, 2, '文件退回', 2);
                        await this.updateContractStatus(2, null, log);
                        await this.clearMemberAll();
                        alert('文件已退回');
                        this.$router.push(`/contract/${this.$route.params.tem}/list`);
                    } catch (error) {
                        console.error('Edit failed:', error);
                    }
                }
                this.$router.go(0);
            },

            // 產生執行資料
            createUpMember(mem, isLV, signType, first) {//signType :0 開始待檢視 3簽核 2退件 4拒絕
                const conId = mem.conId;
                const memId = mem.memId;
                const time = signType === 0 ? null : dayjs().format('YYYY-MM-DD HH:mm:ss');
                const msg = signType === 0 || signType === 3 ? null : this.msg;
                const comTitle = this.$root.getCompanyTitle(mem.comId, '');
                const memBu2 = mem.memBu2;
                const memBu3 = mem.memBu3;
                const positionName = this.getLVPositionName(mem, isLV);
                const LVKey =this.getLVKey(mem, isLV);
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
                    else if (signType === 4) {
                        conStatus = 4;
                        conLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 拒絕 ${msg !== '' ? ':' + msg : null}`
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
                    LVKey:LVKey,
                    memNowKey: nextLVKey,
                    memNowStatus: nextLVStatus,
                    memStatus: memStatus,
                    conLog: this.createMemberLog(memId, LVKey, signType, conLogMsg, conStatus),
                    conLogNext: nextLogMsg ? this.createMemberLog(memId, nextLVKey, nextLVStatus, nextLogMsg, conStatus) : null,
                };
            },

            // 產生Log資料
            createMemberLog(memId, perKey, memStatus, msg, status) {
                const conId = this.$route.params.id; // 取得路由參數 id
                const contractLog = {
                    conId:conId,
                    memId:memId,
                    perKey:perKey,
                    colMemberStatus:memStatus,
                    colMsg:msg,
                    colStatus:status
                };
                return JSON.stringify(contractLog);
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
                        , {params:{conId:this.contractData.conId, memType:memberType}}
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
            // updateContractStatus(狀態, 生效日期, log) 修改文件簽核狀態
            async updateContractStatus(status, date, log) {
                const payload = {
                    conId: this.contractData.conId,
                    conStatus: status,
                    conDate: date,
                    conLog: log,
                };
                console.log(payload);
                try {

                    await this.$api.put(
                        this.$test ? '/api/?type=contractStatus' : '/api/iform/contractStatus',
                        payload
                    );
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
</style>
