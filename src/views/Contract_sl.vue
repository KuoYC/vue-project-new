<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">簽核單項</h4>
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
                                                                <h4 class="myCardTitle" href="#"><i
                                                                        class="material-icons m-r-5">library_books</i>{{
                                                                    area.areaTitle }}
                                                                </h4>
                                                                <div v-if="parentIndex === 0">
                                                                    <!-- 這裡放創文日期 -->
                                                                    <div class="myFont16Title">
                                                                        文件序號：<span
                                                                            class="date float-end myFont16">{{ contractData.conSerial }}</span>
                                                                    </div>
                                                                    <div class="myFont16Title">
                                                                        建檔日期：<span
                                                                            class="date float-end myFont16">{{ this.$root.formatDate(contractData.conCreateTime)}}</span>
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
                                          <i class="material-icons"
                                             style="margin-right: 8px;">label_outline</i>{{ col.name }}</span>
                                                                            </div>
                                                                            <!-- 這裡放權限控管及資料管制 -->
                                                                            <span class="date myFont16">
                                                                            <template v-if="col.type === 'subject'">
                                                                                <h4><b style="font-weight: 600;">{{ contractData.conTitle }}</b></h4>
                                                                                <div class="flex-grow-1">
                                                                                    <!-- 這裡放承辦單位 -->
                                                                                    <div class="myFont16Title">承辦單位：<span
                                                                                            class="date myFont16">{{ contractData.perBu2}}  {{ contractData.perBu3}}</span></div>
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
                                                                                              class="date myFont16">新增</span>
                                                                                        <span v-if="contractData.conType === '1'"
                                                                                              class="date myFont16">變更</span>
                                                                                        <span v-if="contractData.conType === '2'"
                                                                                              class="date myFont16">終止</span>
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
                                                                                    <tr v-for="(ite, iteIndex) in itemData">
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
                                                                                            {{ ite.disTitle}}
                                                                                        </td>
                                                                                    </tr>
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
                                                                                        <th v-if="showContact">窗口</th>
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
                                                                                        <td v-if="showContact">{{ iMemberData.memLVCName }}</td>
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
                                                                            </template>

                                                                            <template v-if="col.type === 'file_area'">
                                                                                <div class="replyBox m-t-20 myFont16">
                                                                      <span>
                                                                        <!-- 這裡放共幾則附檔 -->
                                                                        <i class="fa fa-paperclip mb-1"></i> <span>{{ conFileMeeting.length+conFilePlan.length+conFile.length }}則</span>附加檔案 </span>
                                                                                    <!-- 這裡放附檔 -->
                                                                                    <div>
                                                                                        <a href="javascript:void(0);"
                                                                                           @click="openViewFile(contractData.conFileMeeting)">{{ contractData.conFileMeeting}}</a> |
                                                                                        <a href="javascript:void(0);"
                                                                                           @click="openViewFile(contractData.conFileMeeting)">{{ contractData.conFileMeeting}}</a> |
                                                                                        <a v-for="option in contractData.conFile.splice('|')"
                                                                                           href="javascript:void(0);"
                                                                                           @click="openViewFile(option)">{{ option }}</a> |
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
                                <button type="button" id="closePdfViewer" @click="closeViewFile"
                                        class="btn btn-icon icon-left btn-primary myFont16"
                                        style="border-radius: 6px;">
                                    取消檢視
                                </button>
                            </div>
                            <embed :src="viewFileUrl" width="100%" height="95%"/>
                        </div>
                    </template>
                </div>


                <div class="col-6" style="padding-bottom: 20px;">
                    <button v-if="contractData.conStatus === '0' && contractData.comId === per.comId && contractData.perNo === per.perNo && contractData.perPosition === per.perPosition"
                            @click="releaseSign()"
                            type="button"
                            class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">發起
                    </button>
                    <button v-if="contractData.conStatus === '2' && contractData.comId === per.comId && contractData.perNo === per.perNo && contractData.perPosition === per.perPosition"
                            @click="releaseSign()"
                            type="button"
                            class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">重新發起
                    </button>
                    <button v-if="contractData.conStatus === '1' && checkMember()" type="button"
                            @click="signContract()"
                            class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">簽核
                    </button>
                    <div v-if="contractData.conStatus === '1' && checkMember()" class="form-group">
                        <div class="input-group mb-3">
                            <input
                                    type="text" class="form-control" v-model="msg"
                                    placeholder="理由"/>
                            <div class="input-group-append">
                                <button v-if="checkMember()" type="button" @click="rejectContract()"
                                        class="btn btn-danger btn-border-radius waves-effect myFont16">拒絕
                                </button>
                            </div>
                            <div class="input-group-append">
                                <button v-if="checkMember()" type="button" @click="backContract()"
                                        class="btn btn-danger btn-border-radius waves-effect myFont16">退回
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger btn-border-radius waves-effect myFont16"
                            @click="openViewFile">open
                    </button>
                </div>

            </div>
        </div>
    </section>
    <!-- 本案傳遞流程 -->

    <div class="col-12 myRwd" id="myView">
        <div class="card">
            <div class="card-header justify-content-between">
                <h4 class="myCardTitle" href="#"><i class="material-icons m-r-5">list</i>本案傳遞流程
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
                        <th scope="row"><span class="badge badge-success">發起</span></th>
                        <td>{{ iMemberData.comTitle}} {{ iMemberData.memBu2 }} {{ iMemberData.memBu3 }} {{
                            iMemberData.memLV0Name }} {{ iMemberData.memLV0PositionName }}
                        </td>
                        <td style="text-align: right;">
                            <a :class="iMemberData.memLV0Status === '0' || iMemberData.memLV0Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                               href="javascript:void(0);">
                                <template v-if="iMemberData.memLV0Status === '-1'">等待</template>
                                <template v-if="iMemberData.memLV0Status === '0'">待檢視</template>
                                <template v-if="iMemberData.memLV0Status === '1'">簽核中</template>
                                <template v-if="iMemberData.memLV0Status === '2'">退件<br>{{iMemberData.memLV0Time}}
                                    <template v-if="iMemberData.memLV0Msg !== ''"><br>{{ iMemberData.memLV0Msg }}
                                    </template>
                                </template>
                                <template v-if="iMemberData.memLV0Status === '3'">已完成<br>{{iMemberData.memLV0Time}}
                                </template>
                                <template v-if="iMemberData.memLV0Status === '4'">拒絕<br>{{iMemberData.memLV0Time}}
                                    <template v-if="iMemberData.memLV0Msg !== ''"><br>{{ iMemberData.memLV0Msg }}
                                    </template>
                                </template>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <th scope="row"><span class="badge badge-primary">窗口</span></th>
                        <td>{{ iMemberData.comTitle}} {{ iMemberData.memBu2 }} {{ iMemberData.memBu3 }} {{
                            iMemberData.memLVCName }} {{ iMemberData.memLVCPositionName }}
                        </td>
                        <td style="text-align: right;">
                            <a :class="iMemberData.memLVCStatus === '0' || iMemberData.memLVCStatus === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                               href="javascript:void(1);">
                                <template v-if="iMemberData.memLVCStatus === '-1'">等待</template>
                                <template v-if="iMemberData.memLVCStatus === '0'">待檢視</template>
                                <template v-if="iMemberData.memLVCStatus === '1'">簽核中</template>
                                <template v-if="iMemberData.memLVCStatus === '2'">退件<br>{{iMemberData.memLVCTime}}
                                    <template v-if="iMemberData.memLVCMsg !== ''"><br>{{ iMemberData.memLVCMsg }}
                                    </template>
                                </template>
                                <template v-if="iMemberData.memLVCStatus === '3'">已完成<br>{{iMemberData.memLVCTime}}
                                </template>
                                <template v-if="iMemberData.memLVCStatus === '4'">拒絕<br>{{iMemberData.memLVCTime}}
                                    <template v-if="iMemberData.memLVCMsg !== ''"><br>{{ iMemberData.memLVCMsg }}
                                    </template>
                                </template>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <th scope="row"><span class="badge badge-primary">簽核</span></th>
                        <td>{{ iMemberData.comTitle}} {{ iMemberData.memBu2 }} {{ iMemberData.memBu3 }} {{
                            iMemberData.memLV1Name }} {{ iMemberData.memLV1PositionName }}
                        </td>
                        <td style="text-align: right;">
                            <a :class="iMemberData.memLV1Status === '0' || iMemberData.memLV1Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                               href="javascript:void(1);">
                                <template v-if="iMemberData.memLV1Status === '-1'">等待</template>
                                <template v-if="iMemberData.memLV1Status === '0'">待檢視</template>
                                <template v-if="iMemberData.memLV1Status === '1'">簽核中</template>
                                <template v-if="iMemberData.memLV1Status === '2'">退件<br>{{iMemberData.memLV1Time}}
                                    <template v-if="iMemberData.memLV1Msg !== ''"><br>{{ iMemberData.memLV1Msg }}
                                    </template>
                                </template>
                                <template v-if="iMemberData.memLV1Status === '3'">已完成<br>{{iMemberData.memLV1Time}}
                                </template>
                                <template v-if="iMemberData.memLV1Status === '4'">拒絕<br>{{iMemberData.memLV1Time}}
                                    <template v-if="iMemberData.memLV1Msg !== ''"><br>{{ iMemberData.memLV1Msg }}
                                    </template>
                                </template>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <th scope="row"><span class="badge badge-primary">簽核</span></th>
                        <td>{{ iMemberData.comTitle}} {{ iMemberData.memBu2 }} {{ iMemberData.memBu3 }} {{
                            iMemberData.memLV2Name }} {{ iMemberData.memLV2PositionName }}
                        </td>
                        <td style="text-align: right;">
                            <a :class="iMemberData.memLV2Status === '0' || iMemberData.memLV2Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                               href="javascript:void(2);">
                                <template v-if="iMemberData.memLV2Status === '-1'">等待</template>
                                <template v-if="iMemberData.memLV2Status === '0'">待檢視</template>
                                <template v-if="iMemberData.memLV2Status === '1'">簽核中</template>
                                <template v-if="iMemberData.memLV2Status === '2'">拒絕<br>{{iMemberData.memLV2Time}}
                                    <template v-if="iMemberData.memLV2Msg !== ''"><br>{{ iMemberData.memLV2Msg }}
                                    </template>
                                </template>
                                <template v-if="iMemberData.memLV2Status === '3'">已完成<br>{{iMemberData.memLV2Time}}
                                </template>
                                <template v-if="iMemberData.memLV2Status === '4'">已完成<br>{{iMemberData.memLV2Time}}
                                    <template v-if="iMemberData.memLV2Msg !== ''"><br>{{ iMemberData.memLV2Msg }}
                                    </template>
                                </template>
                            </a>
                        </td>
                    </tr>
                    <template v-for="(mmem, idx) in mMemberData">
                        <tr>
                            <td>{{idx+5}}</td>
                            <th scope="row"><span class="badge badge-info">維運-水平會議</span></th>
                            <td>{{ mmem.comTitle}} {{ mmem.memBu2 }} {{ mmem.memBu3 }} {{ mmem.memLV0Name }} {{
                                mmem.memLV0PositionName }}
                            </td>
                            <td style="text-align: right;">
                                <a :class="mmem.memLV0Status === '0' || mmem.memLV0Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                   href="javascript:void(0);">
                                    <template v-if="mmem.memLV0Status === '-1'">等待</template>
                                    <template v-if="mmem.memLV0Status === '0'">待檢視</template>
                                    <template v-if="mmem.memLV0Status === '1'">簽核中</template>
                                    <template v-if="mmem.memLV0Status === '2'">退件<br>{{mmem.memLV0Time}}
                                        <template v-if="mmem.memLV0Msg !== ''"><br>{{ mmem.memLV0Msg }}</template>
                                    </template>
                                    <template v-if="mmem.memLV0Status === '3'">已完成<br>{{mmem.memLV0Time}}</template>
                                    <template v-if="mmem.memLV0Status === '4'">拒絕<br>{{mmem.memLV0Time}}
                                        <template v-if="mmem.memLV0Msg !== ''"><br>{{ mmem.memLV0Msg }}</template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th scope="row"><span class="badge badge-secondary"></span></th>
                            <td>{{ mmem.comTitle}} {{ mmem.memBu2 }} {{ mmem.memBu3 }} {{ mmem.memLV1Name }} {{
                                mmem.memLV1PositionName }}
                            </td>
                            <td style="text-align: right;">
                                <a :class="mmem.memLV1Status === '0' || mmem.memLV1Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                   href="javascript:void(1);">
                                    <template v-if="mmem.memLV1Status === '-1'">等待</template>
                                    <template v-if="mmem.memLV1Status === '0'">待檢視</template>
                                    <template v-if="mmem.memLV1Status === '1'">簽核中</template>
                                    <template v-if="mmem.memLV1Status === '2'">退件<br>{{mmem.memLV1Time}}
                                        <template v-if="mmem.memLV1Msg !== ''"><br>{{ mmem.memLV1Msg }}</template>
                                    </template>
                                    <template v-if="mmem.memLV1Status === '3'">已完成<br>{{mmem.memLV1Time}}</template>
                                    <template v-if="mmem.memLV1Status === '4'">拒絕<br>{{mmem.memLV1Time}}
                                        <template v-if="mmem.memLV1Msg !== ''"><br>{{ mmem.memLV1Msg }}</template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th scope="row"><span class="badge badge-success"></span></th>
                            <td>{{ mmem.comTitle}} {{ mmem.memBu2 }} {{ mmem.memBu3 }} {{ mmem.memLV2Name }} {{
                                mmem.memLV2PositionName }}
                            </td>
                            <td style="text-align: right;">
                                <a :class="mmem.memLV2Status === '0' || mmem.memLV2Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                   href="javascript:void(2);">
                                    <template v-if="mmem.memLV2Status === '-1'">等待</template>
                                    <template v-if="mmem.memLV2Status === '0'">待檢視</template>
                                    <template v-if="mmem.memLV2Status === '1'">簽核中</template>
                                    <template v-if="mmem.memLV2Status === '2'">退件<br>{{mmem.memLV2Time}}
                                        <template v-if="mmem.memLV2Msg !== ''"><br>{{ mmem.memLV2Msg }}</template>
                                    </template>
                                    <template v-if="mmem.memLV2Status === '3'">已完成<br>{{mmem.memLV2Time}}</template>
                                    <template v-if="mmem.memLV2Status === '4'"><br>{{mmem.memLV2Time}}
                                        <template v-if="mmem.memLV2Msg !== ''"><br>{{ mmem.memLV2Msg }}</template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                    </template>
                    <template v-for="(umem, idx) in uMemberData">
                        <tr>
                            <td>{{mMemberData.length+idx+5}}</td>
                            <th scope="row"><span class="badge badge-info">水平會議</span></th>
                            <td>{{ umem.comTitle}} {{ umem.memBu2 }} {{ umem.memBu3 }} {{ umem.memLV0Name }} {{
                                umem.memLV0PositionName }}
                            </td>
                            <td style="text-align: right;">
                                <a :class="umem.memLV0Status === '0' || umem.memLV0Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                   href="javascript:void(0);">
                                    <template v-if="umem.memLV0Status === '-1'">等待</template>
                                    <template v-if="umem.memLV0Status === '0'">待檢視</template>
                                    <template v-if="umem.memLV0Status === '1'">簽核中</template>
                                    <template v-if="umem.memLV0Status === '2'">退件<br>{{umem.memLV0Time}}
                                        <template v-if="umem.memLV0Msg !== ''"><br>{{ umem.memLV0Msg }}</template>
                                    </template>
                                    <template v-if="umem.memLV0Status === '3'">已完成<br>{{umem.memLV0Time}}</template>
                                    <template v-if="umem.memLV0Status === '4'">拒絕<br>{{umem.memLV0Time}}
                                        <template v-if="umem.memLV0Msg !== ''"><br>{{ umem.memLV0Msg }}</template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th scope="row"><span class="badge badge-secondary"></span></th>
                            <td>{{ umem.comTitle}} {{ umem.memBu2 }} {{ umem.memBu3 }} {{ umem.memLV1Name }} {{
                                umem.memLV1PositionName }}
                            </td>
                            <td style="text-align: right;">
                                <a :class="umem.memLV1Status === '0' || umem.memLV1Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                   href="javascript:void(1);">
                                    <template v-if="umem.memLV1Status === '-1'">等待</template>
                                    <template v-if="umem.memLV1Status === '0'">待檢視</template>
                                    <template v-if="umem.memLV1Status === '1'">簽核中</template>
                                    <template v-if="umem.memLV1Status === '2'">退件<br>{{umem.memLV1Time}}
                                        <template v-if="umem.memLV1Msg !== ''"><br>{{ umem.memLV1Msg }}</template>
                                    </template>
                                    <template v-if="umem.memLV1Status === '3'">已完成<br>{{umem.memLV1Time}}</template>
                                    <template v-if="umem.memLV1Status === '4'">拒絕<br>{{umem.memLV1Time}}
                                        <template v-if="umem.memLV1Msg !== ''"><br>{{ umem.memLV1Msg }}</template>
                                    </template>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th scope="row"><span class="badge badge-success"></span></th>
                            <td>{{ umem.comTitle}} {{ umem.memBu2 }} {{ umem.memBu3 }} {{ umem.memLV2Name }} {{
                                umem.memLV2PositionName }}
                            </td>
                            <td style="text-align: right;">
                                <a :class="umem.memLV2Status === '0' || umem.memLV2Status === '1' ? 'text-job text-danger myFont16' : 'text-job myFont16'"
                                   href="javascript:void(2);">
                                    <template v-if="umem.memLV2Status === '-1'">等待</template>
                                    <template v-if="umem.memLV2Status === '0'">待檢視</template>
                                    <template v-if="umem.memLV2Status === '1'">簽核中</template>
                                    <template v-if="umem.memLV2Status === '2'">退件<br>{{umem.memLV2Time}}
                                        <template v-if="umem.memLV2Msg !== ''"><br>{{ umem.memLV2Msg }}</template>
                                    </template>
                                    <template v-if="umem.memLV2Status === '3'">已完成<br>{{umem.memLV2Time}}</template>
                                    <template v-if="umem.memLV2Status === '4'">拒絕<br>{{umem.memLV2Time}}
                                        <template v-if="umem.memLV2Msg !== ''"><br>{{ umem.memLV2Msg }}</template>
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
                            <button type="button"
                                    class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">簽核
                            </button>
                            <button type="button" class="btn btn-danger btn-border-radius waves-effect myFont16">拒絕
                            </button>
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

    export default {
        name: "Contract_sl",
        data() {
            return {
                per: JSON.parse(Cookies.get('per')),
                showContact: true,
                viewFile: false,
                viewFileUrl: '',
                isSidebarVisible: false,
                msg: '',//理由
                contractData: {},
                conValue: [],
                itemData: [],
                iMemberData: [],//發起
                mMemberData: [],//維運
                uMemberData: [],//使用
                personData: [],


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
        components: {},
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
                    this.$api.get(this.$test ? `/api/?type=contract_item&conId=${conId}` : `/api/adm/getContractItem?conId=${conId}`),
                    this.$api.get(this.$test ? `/api/?type=contract_member&conId=${conId}` : `/api/adm/getMemberContract?conId=${conId}`),
                    this.$api.get(this.$test ? '/api/?type=personnel' : '/api/comm/getPersonnelList'),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, itemResponse, memberResponse, personnelResponse]) => {
                        //contractResponse
                        this.contractData = contractResponse.data.data;
                        this.conValue = this.contractData?.conValue ? JSON.parse(this.contractData.conValue) : null;
                        this.conFileMeeting = this.contractData?.conFileMeeting ? JSON.parse(this.contractData.conFileMeeting) : null;
                        this.conFilePlan = this.contractData?.conFilePlan ? JSON.parse(this.contractData.conFilePlan) : null;
                        this.conFile = this.contractData?.conFile ? JSON.parse(this.contractData.conFile) : null;

                        // itemResopnse
                        this.itemData = itemResponse.data.data;

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
            async releaseSign() {
                // 文件發起人必須與登入人資料一致
                if (this.iMemberData.comId === this.per.comId && this.iMemberData.memLV0 === this.per.perNo && this.iMemberData.memLV0Position === this.per.perPosition) {
                    try {
                        await this.defaultContract();//重置文件資訊與簽核人員資料
                        let msg = this.iMemberData.comTitle + ' '
                            + this.iMemberData.memBu2 + ' '
                            + this.iMemberData.memBu3 + ' '
                            + this.iMemberData.memLV0Name + ' '
                            + this.iMemberData.memLV0PositionName + ' '
                            + '發起簽核';
                        await this.updateContractStatus(1, '', msg);//修改文件狀態為進行中
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
                if (this.iMemberData.comId === this.per.comId && this.iMemberData.memNow === this.per.perNo && this.iMemberData.memNowPosition === this.per.perPosition) {
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
                    if (mem.comId === this.per.comId && mem.memNow === this.per.perNo && mem.memNowPosition === this.per.perPosition) {
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
                    if (mem.comId === this.per.comId && mem.memNow === this.per.perNo && mem.memNowPosition === this.per.perPosition) {
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
                                    await this.updateContractStatus(3, dayjs().format('YYYY-MM-DD'), '文件簽核完成');
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
                                        await this.updateContractStatus(3, dayjs().format('YYYY-MM-DD'), '文件簽核完成');
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
                                    await this.updateContractStatus(3, dayjs().format('YYYY-MM-DD'), '文件簽核完成');
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
                if (this.iMemberData.memNow === this.per.perNo && this.iMemberData.memNowPosition === this.per.perPosition) {
                    const isLV = this.getMemberLV(this.iMemberData);
                    if (isLV) {
                        upMember = this.createUpMember(this.iMemberData, isLV, 4, true);
                    }
                }
                this.mMemberData.forEach((mem) => {
                    if (mem.memNow === this.per.perNo && mem.memNowPosition === this.per.perPosition) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 4, false);
                        }
                    }
                });
                this.uMemberData.forEach((mem) => {
                    if (mem.memNow === this.per.perNo && mem.memNowPosition === this.per.perPosition) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 4, false);
                        }
                    }
                });
                if (upMember) {
                    try {
                        await this.updateMember(upMember);
                        await this.updateContractStatus(4, '', '文件終止');
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
                if (this.iMemberData.comId === this.per.comId && this.iMemberData.memNow === this.per.perNo && this.iMemberData.memNowPosition === this.per.perPosition) {
                    const isLV = this.getMemberLV(this.iMemberData);
                    if (isLV) {
                        upMember = this.createUpMember(this.iMemberData, isLV, 2, true);
                    }
                }
                this.mMemberData.forEach((mem) => {
                    if (mem.comId === this.per.comId && mem.memNow === this.per.perNo && mem.memNowPosition === this.per.perPosition) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 2, false);
                        }
                    }
                });
                this.uMemberData.forEach((mem) => {
                    if (mem.comId === this.per.comId && mem.memNow === this.per.perNo && mem.memNowPosition === this.per.perPosition) {
                        const isLV = this.getMemberLV(mem);
                        if (isLV) {
                            upMember = this.createUpMember(mem, isLV, 2, false);
                        }
                    }
                });
                if (upMember) {
                    try {
                        await this.updateMember(upMember);
                        await this.updateContractStatus(2, '', '文件退回');
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
                const positionNameNext = this.getLVPositionNameNext(mem, isLV, first);
                let conLogMsg = null;
                let nextLV = null;
                let nextLVPosition = null;
                let nextLVStatus = null;
                let nextLogMsg = null;
                let memStatus = null;
                if (signType === 3) {
                    conLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 簽核完成 ${msg !== '' ? ':' + msg : ''}`
                    switch (isLV) {
                        case '0':
                            nextLV = first ? mem.memLVC : mem.memLV1;
                            nextLVPosition = first ? mem.memLVCPosition : mem.memLV1Position;
                            nextLVStatus = 0;
                            nextLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                            memStatus = 1;
                            break;
                        case 'C':
                            nextLV = mem.memLV1;
                            nextLVPosition = mem.memLV1Position;
                            nextLVStatus = 0;
                            nextLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                            memStatus = 1;
                            break;
                        case '1':
                            nextLV = mem.memLV2;
                            nextLVPosition = mem.memLV2Position;
                            nextLVStatus = 0;
                            nextLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionNameNext} 待檢視`;
                            memStatus = 1;
                            break;
                        case '2':
                            nextLV = 'null';
                            nextLVPosition = 'null';
                            nextLVStatus = -1;
                            memStatus = signType;
                    }
                }
                else {
                    if (signType === 2) {
                        conLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 退件 ${msg !== '' ? ':' + msg : ''}`
                    }
                    else if (signType === 4) {
                        conLogMsg = `${comTitle} ${memBu2} ${memBu3} ${positionName} 拒絕 ${msg !== '' ? ':' + msg : ''}`
                    }
                    else if (signType === 0) {
                        nextLV = mem.memLV0;
                        nextLVPosition = mem.memLV0Position;
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
                    [`memLV${nextLV}Status`]: signType === 3 && '' !== nextLV ? 0 : null,
                    memNow: nextLV,
                    memNowPosition: nextLVPosition,
                    memNowStatus: nextLVStatus,
                    memStatus: memStatus,
                    conLogMsg: conLogMsg,
                    conLogMsgNext: `${nextLogMsg}`,
                };
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
                if (mem.comId === this.per.comId && mem.memLV0 === this.per.perNo && mem.memLV0Position === this.per.perPosition) {
                    return '0';
                }
                if (mem.comId === this.per.comId && mem.memLVC === this.per.perNo && mem.memLVCPosition === this.per.perPosition) {
                    return 'C';
                }
                if (mem.memLV1 === this.per.perNo && mem.memLV1Position === this.per.perPosition) {
                    return '1';
                }
                if (mem.memLV2 === this.per.perNo && mem.memLV2Position === this.per.perPosition) {
                    return '2';
                }
                return null; // 如果都不满足条件，则返回 null
            },
            // checkParallelTypeSign 查驗平行簽核是否皆已完成
            async checkParallelTypeSign(memberType) {
                try {
                    const response = await this.$api.get(
                        this.$test ? `/api/?type=contract_member&conId=${this.contractData.conId}&memType=${memberType}` : `/api/adm/getMemberContract?ctId=${ctId}&mbType=${type}`
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
                        this.$test ? '/api/?type=member_status' : '/api/adm/member/update',
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
                    memNow: 'null',
                    memNowPosition: 'null',
                    memNowStatus: -1,
                };
                try {
                    const response = await this.$api.put(
                        this.$test ? '/api/?type=member_status_all' : '/api/adm/member/update',
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
            async updateContractStatus(status, date, msg) {
                const payload = {
                    conId: this.contractData.conId,
                    conStatus: status,
                    conDate: date,
                    conLogMsg: msg,
                };
                try {

                    await this.$api.put(
                        this.$test ? '/api/?type=contract_status' : '/api/adm/contract/updateStatus',
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
                        this.$test ? '/api/?type=contract_default' : '/api/adm/contract/updateStatus',
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
            closeViewFile() {
                this.viewFile = false;
                this.viewFileUrl = '';
            },
            openViewFile(url) {
                this.viewFileUrl = 'https://digitaldreams.tw/pdf/doc.pdf';
                this.viewFile = true;
            },

            // checkMember 確認權限
            checkMember() {
                let ckMember = false;
                if (this.iMemberData.comId === this.per.comId && this.iMemberData.memNow === this.per.perNo && this.iMemberData.memNowPosition === this.per.perPosition) {
                    ckMember = true;
                }
                this.mMemberData.forEach(mem => {
                    if (mem.comId === this.per.comId && mem.memNow === this.per.perNo && mem.memNowPosition === this.per.perPosition) {
                        ckMember = true;
                    }
                });
                this.uMemberData.forEach(mem => {
                    if (mem.comId === this.per.comId && mem.memNow === this.per.perNo && mem.memNowPosition === this.per.perPosition) {
                        ckMember = true;
                    }
                });
                return ckMember;
            },

            //側邊功能按鈕
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
</style>
