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
                        <template v-for="(area, parentIndex) in contractData.conValue">
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
                                                                                    <!-- 選項列表 -->
                                                                                    <div class="replyBox m-t-20 myFont16">
                                                                                        {{ col.value }}
                                                                                    </div>
                                                                                <!--<option v-for="option in col.option.split('|')" :value="option">-->
                                                                                <!--{{ option }}-->
                                                                                <!--</option>-->
                                                                            </template>
                                                                            <template
                                                                                    v-if="col.type.startsWith('word')">
                                                                                <div class="replyBox m-t-20 myFont16">
                                                                                    {{ col.value }}
                                                                                </div>
                                                                                <!--<label>{{ col.option }}</label>-->
                                                                            </template>

                                                                            <template v-if="col.type === 'work_area'">
                                                                                <table class="myTable myTableItem">
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
                                                                                        <div class="table-responsive">
                                                                                            <table class="myTable myTableMemberI">
                                                                                                <thead>
                                                                                                <tr>
                                                                                                    <th>公司</th>
                                                                                                    <th>部門</th>
                                                                                                    <th>部門主管</th>
                                                                                                    <th>科別</th>
                                                                                                    <th>科別主管</th>
                                                                                                    <th v-if="showContact">窗口</th>
                                                                                                    <th>承辦人</th>
                                                                                                    <th>承辦人連絡電話</th>
                                                                                                </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                <tr>
                                                                                                    <td>{{ iMemberData.comTitle }}</td>
                                                                                                    <td>{{ this.$root.getPersonDepartment(iMemberData.comId, iMemberData.memLV0, iMemberData.memLV0Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(iMemberData.comId, iMemberData.memLV2, iMemberData.memLV2Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonBranch(iMemberData.comId, iMemberData.memLV0, iMemberData.memLV0Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(iMemberData.comId, iMemberData.memLV1, iMemberData.memLV1Position) }}</td>
                                                                                                    <td v-if="showContact">{{ this.$root.getPersonName(iMemberData.comId, iMemberData.memLVC, iMemberData.memLVCPosition) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(iMemberData.comId, iMemberData.memLV0, iMemberData.memLV0Position) }}</td>
                                                                                                    <td>{{ iMemberData.memPhone }}</td>
                                                                                                </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                        <div v-if="mMemberData.length !== 0"
                                                                                             class="table-responsive">
                                                                                            <table class="myTable myTableMemberM">
                                                                                                <thead>
                                                                                                <tr>
                                                                                                    <th>公司</th>
                                                                                                    <th>部門</th>
                                                                                                    <th>部門主管</th>
                                                                                                    <th>科別</th>
                                                                                                    <th>科別主管</th>
                                                                                                    <th>承辦人</th>
                                                                                                    <th>承辦人連絡電話</th>
                                                                                                </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                <tr v-for="mmem in mMemberData">
                                                                                                    <td>{{ mmem.comTitle }}</td>
                                                                                                    <td>{{ this.$root.getPersonDepartment(mmem.comId, mmem.memLV2, mmem.memLV2Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(mmem.comId, mmem.memLV2, mmem.memLV2Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonBranch(mmem.comId, mmem.memLV2, mmem.memLV2Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(mmem.comId, mmem.memLV1, mmem.memLV1Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(mmem.comId, mmem.memLV0, mmem.memLV0Position) }}</td>
                                                                                                    <td>{{ mmem.memPhone }}</td>
                                                                                                </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                        <label>使用</label>
                                                                                            <div v-if="uMemberData.length !== 0"
                                                                                                 class="table-responsive">
                                                                                                <table class="myTable myTableMemberU">
                                                                                                    <thead>
                                                                                                    <tr>
                                                                                                        <th>公司</th>
                                                                                                        <th>部門</th>
                                                                                                        <th>部門主管</th>
                                                                                                        <th>科別</th>
                                                                                                        <th>科別主管</th>
                                                                                                        <th>承辦人</th>
                                                                                                        <th>承辦人連絡電話</th>
                                                                                                    </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                <tr v-for="umem in uMemberData">
                                                                                                    <td>{{ umem.comTitle }}</td>
                                                                                                    <td>{{ this.$root.getPersonDepartment(umem.comId, umem.memLV2, umem.memLV2Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(umem.comId, umem.memLV2, umem.memLV2Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonBranch(umem.comId, umem.memLV2, umem.memLV2Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(umem.comId, umem.memLV1, umem.memLV1Position) }}</td>
                                                                                                    <td>{{ this.$root.getPersonName(umem.comId, umem.memLV0, umem.memLV0Position) }}</td>
                                                                                                    <td>{{ umem.memPhone }}</td>
                                                                                                </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                            </template>

                                                                            <template v-if="col.type === 'file_area'">
                                                                                <div class="replyBox m-t-20 myFont16">
                                                                      <span>
                                                                        <!-- 這裡放共幾則附檔 -->
                                                                        <i class="fa fa-paperclip mb-1"></i> <span>{{ fileNum }}則</span>附加檔案 </span>
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
                                                                                         class="form-check form-check-primary form-check-inline">
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
                                                                                         class="form-check form-check-primary form-check-inline">
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
                                                                                         class="form-check form-check-primary form-check-inline">
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
                                                                                         class="form-check form-check-primary form-check-inline">
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
                    <button v-if="checkMember" type="button" @click="signContract(3)"
                            class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">簽核
                    </button>
                    <button v-if="contractData.conStatus === '0' && contractData.comId === comId && contractData.perNo === perNo && contractData.perPosition === perPosition"
                            @click="releaseSign"
                            type="button"
                            class="m-r-5 btn btn-warning btn-border-radius waves-effect myFont16">發起
                    </button>
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <input
                                    type="text" class="form-control" v-model="msg"
                                    placeholder="理由"/>
                            <div class="input-group-append">
                                <button v-if="checkMember" type="button" @click="signContract(4)"
                                        class="btn btn-danger btn-border-radius waves-effect myFont16">拒絕
                                </button>
                            </div>
                            <div class="input-group-append">
                                <button v-if="checkMember" type="button" @click="signContract(2)"
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
                        <td>{{ iMemberData.comTitle}} {{ this.$root.getPersonDepartment(iMemberData.comId,
                            iMemberData.memLV0, iMemberData.memLV0Position)}} {{
                            this.$root.getPersonBranch(iMemberData.comId, iMemberData.memLV0,
                            iMemberData.memLV0Position)}} {{ this.$root.getPersonName(iMemberData.comId,
                            iMemberData.memLV0, iMemberData.memLV0Position)}} {{
                            this.$root.getPersonPositionName(iMemberData.comId, iMemberData.memLV0,
                            iMemberData.memLV0Position)}}
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
                        <th scope="row"><span class="badge badge-primary">簽核</span></th>
                        <td>{{ iMemberData.comTitle}} {{ this.$root.getPersonDepartment(iMemberData.comId,
                            iMemberData.memLV1, iMemberData.memLV0Position)}} {{
                            this.$root.getPersonBranch(iMemberData.comId, iMemberData.memLV1,
                            iMemberData.memLV0Position)}} {{ this.$root.getPersonName(iMemberData.comId,
                            iMemberData.memLV1, iMemberData.memLV1Position)}} {{
                            this.$root.getPersonPositionName(iMemberData.comId, iMemberData.memLV1,
                            iMemberData.memLV1Position)}}
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
                        <td>3</td>
                        <th scope="row"><span class="badge badge-primary">簽核</span></th>
                        <td>{{ iMemberData.comTitle}} {{ this.$root.getPersonDepartment(iMemberData.comId,
                            iMemberData.memLV2, iMemberData.memLV0Position)}} {{
                            this.$root.getPersonBranch(iMemberData.comId, iMemberData.memLV2,
                            iMemberData.memLV2Position)}} {{ this.$root.getPersonName(iMemberData.comId,
                            iMemberData.memLV2, iMemberData.memLV2Position)}} {{
                            this.$root.getPersonPositionName(iMemberData.comId, iMemberData.memLV2,
                            iMemberData.memLV2Position)}}
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
                            <td>{{idx+4}}</td>
                            <th scope="row"><span class="badge badge-info">維運-水平會議</span></th>
                            <td>{{ mmem.comTitle}} {{ this.$root.getPersonDepartment(mmem.comId,
                                mmem.memLV0, mmem.memLV0Position)}} {{
                                this.$root.getPersonBranch(mmem.comId, mmem.memLV0,
                                mmem.memLV0Position)}} {{ this.$root.getPersonName(mmem.comId,
                                mmem.memLV0, mmem.memLV0Position)}} {{
                                this.$root.getPersonPositionName(mmem.comId, mmem.memLV0,
                                mmem.memLV0Position)}}
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
                            <td>{{ mmem.comTitle}} {{ this.$root.getPersonDepartment(mmem.comId,
                                mmem.memLV1, mmem.memLV1Position)}} {{
                                this.$root.getPersonBranch(mmem.comId, mmem.memLV1,
                                mmem.memLV1Position)}} {{ this.$root.getPersonName(mmem.comId,
                                mmem.memLV1, mmem.memLV1Position)}} {{
                                this.$root.getPersonPositionName(mmem.comId, mmem.memLV1,
                                mmem.memLV1Position)}}
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
                            <td>{{ mmem.comTitle}} {{ this.$root.getPersonDepartment(mmem.comId,
                                mmem.memLV2, mmem.memLV2Position)}} {{
                                this.$root.getPersonBranch(mmem.comId, mmem.memLV2,
                                mmem.memLV2Position)}} {{ this.$root.getPersonName(mmem.comId,
                                mmem.memLV2, mmem.memLV2Position)}} {{
                                this.$root.getPersonPositionName(mmem.comId, mmem.memLV2,
                                mmem.memLV2Position)}}
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
                            <td>{{mMemberData.length+idx+4}}</td>
                            <th scope="row"><span class="badge badge-info">水平會議</span></th>
                            <td>{{ umem.comTitle}} {{ this.$root.getPersonDepartment(umem.comId,
                                umem.memLV0, umem.memLV0Position)}} {{
                                this.$root.getPersonBranch(umem.comId, umem.memLV0,
                                umem.memLV0Position)}} {{ this.$root.getPersonName(umem.comId,
                                umem.memLV0, umem.memLV0Position)}} {{
                                this.$root.getPersonPositionName(umem.comId, umem.memLV0,
                                umem.memLV0Position)}}
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
                            <td>{{ umem.comTitle}} {{ this.$root.getPersonDepartment(umem.comId,
                                umem.memLV1, umem.memLV1Position)}} {{
                                this.$root.getPersonBranch(umem.comId, umem.memLV1,
                                umem.memLV1Position)}} {{ this.$root.getPersonName(umem.comId,
                                umem.memLV1, umem.memLV1Position)}} {{
                                this.$root.getPersonPositionName(umem.comId, umem.memLV1,
                                umem.memLV1Position)}}
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
                            <td>{{ umem.comTitle}} {{ this.$root.getPersonDepartment(umem.comId,
                                umem.memLV2, umem.memLV2Position)}} {{
                                this.$root.getPersonBranch(umem.comId, umem.memLV2,
                                umem.memLV2Position)}} {{ this.$root.getPersonName(umem.comId,
                                umem.memLV2, umem.memLV2Position)}} {{
                                this.$root.getPersonPositionName(umem.comId, umem.memLV2,
                                umem.memLV2Position)}}
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
                    <!--<h6 class="font-medium m-b-10">簽核文件</h6>-->
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
                        <li v-for="(item, index) in contractData.conValue" class="nav-item">
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
                showContact: true,
                viewFile: false,
                viewFileUrl: '',
                fileNum: 0,
                isSidebarVisible: false,
                perNo: Cookies.get('perNo'),
                perPosition: Cookies.get('perPosition'),
                perBu1Code: Cookies.get('perBu1Code'),
                comId: Cookies.get('comId'),
                msg: '',//理由
                contractData: {
                    // conId:'',
                    // temId:'',
                    // perNo:'',
                    // perPosition:'',
                    // comId:'',
                    // conSerial:'',
                    // conTitle:'',
                    // conType:'0',
                    // conDate:'',
                    // conWork:[],
                    // conCompany:[],
                    // conValue:[],
                    // conLog:'',
                    // conStatus:'',
                    // conUpdateTime:'',
                    // conCreateTime:'',
                    // ctPurpose: '',
                },
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
            // 添加全局点击事件监听器
            window.addEventListener('click', this.handleGlobalClick);
        },
        beforeUnmount() {
            // 在组件销毁之前移除事件监听器
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
                        this.contractData.conValue = JSON.parse(this.contractData.conValue);
                        let fileNum = 0;
                        if (this.contractData.conFileMeeting && '' !== this.contractData.conFileMeeting) {
                            fileNum += 1;
                        }
                        if (this.contractData.conFilePlan && '' !== this.contractData.conFilePlan) {
                            fileNum += 1;
                        }
                        if (this.contractData.conFile && '' !== this.contractData.conFile) {
                            let conFile = this.contractData.conFile.split('|');
                            fileNum += conFile.length;
                        }
                        this.fileNum = fileNum;
                        // this.contractData.conCompany = this.contractData.conCompany ? this.contractData.conCompany.split('|') : [];
                        // this.contractData.conWork = this.contractData.conWork ? this.contractData.conWork.split('|') : [];
                        // this.contractData.ctValue = this.contractData.ctValue ? JSON.parse(this.contractData.ctValue) : [];
                        // this.templateStyleData = this.contractData.ctValue;

                        // itemResopnse
                        this.itemData = itemResponse.data.data;

                        // memberResponse
                        const memberData = memberResponse.data.data;
                        this.iMemberData = memberData.find(member => member.memType === '0');
                        this.mMemberData = memberData.filter(member => member.memType === '1');
                        this.uMemberData = memberData.filter(member => member.memType === '2');

                        //itemSubsidiaryResponse
                        // const itemSubsidiaryData = itemSubsidiaryResponse.data.data;
                        // console.log(itemSubsidiaryData);
                        // this.itemList.forEach((item) => {
                        //     item.subsidiariesExes = itemSubsidiaryData.filter(sitem => sitem.ctiId === item.ctiId);
                        // });
                        // console.log(this.itemList);
                        personnelResponse
                        this.personData = personnelResponse.data.data;

                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            signContract(status) {// todo: signContract 簽核作業
                switch (status) {
                    case 2://退件
                        break;
                    case 3://簽核
                        this.iMemberList.forEach((mem) => {
                            if (mem.memNow === this.perNo && mem.memNowPosition === this.perPosition) {
                                if (mem.comId === this.comId && mem.memLV0 === this.perNo && mem.memLV0Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV0Status: 3,
                                        memLV0Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLVCStatus: 0,
                                        memNow: mem.memLVC,
                                        memNowPosition: mem.memLVCPosition,
                                        memStatus: 0,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                        conLogMsgNext: this.$root.getCompanyTitle(mem.comId, '') + ' '
                                            + this.$root.getPersonDepartment(mem.comId, mem.memLVC, mem.memLVCPosition) + ' '
                                            + this.$root.getPersonBranch(mem.comId, mem.memLVC, mem.memLVCPosition) + ' '
                                            + this.$root.getPersonName(mem.comId, mem.memLVC, mem.memLVCPosition) + ' '
                                            + this.$root.getPersonPositionName(mem.comId, mem.memLVC, mem.memLVCPosition) + ' '
                                            + '待檢視',
                                    };
                                    this.updateMember(upMember);
                                }
                                if (mem.memLVC === this.perNo && mem.memLVCPosition === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLVCStatus: 3,
                                        memLVCTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV1Status: 0,
                                        memNow: mem.memLV1,
                                        memNowPosition: mem.memLV1Position,
                                        memStatus: 0,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                        conLogMsgNext: this.$root.getCompanyTitle(mem.comId, '') + ' '
                                            + this.$root.getPersonDepartment(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonBranch(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonName(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonPositionName(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + '待檢視',
                                    };
                                    this.updateMember(upMember);
                                }
                                if (mem.memLV1 === this.perNo && mem.memLV1Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV1Status: 3,
                                        memLV1Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV2Status: 0,
                                        memNow: mem.memLV2,
                                        memNowPosition: mem.memLV2Position,
                                        memStatus: 0,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                        conLogMsgNext: this.$root.getCompanyTitle(mem.comId, '') + ' '
                                            + this.$root.getPersonDepartment(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonBranch(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonName(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonPositionName(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + '待檢視',
                                    };
                                    this.updateMember(upMember);
                                }
                                if (mem.memLV2 === this.perNo && mem.memLV2Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV2Status: 3,
                                        memLV2Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV1Status: 0,
                                        memNow: 'null',
                                        memNowPosition: 'null',
                                        memStatus: 3,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                    };
                                    if (this.updateMember(upMember)) {
                                        if (this.mMemberData.length !== 0) {
                                            this.mMemberList.forEach((next_mem) => {
                                                const upMember = {
                                                    memId: next_mem.memId,
                                                    memLV0Status: 0,
                                                    memNow: next_mem.mvmLV0,
                                                    memNowPosition: next_mem.memLV0Position,
                                                    memStatus: 0,
                                                    conLogMsg: this.$root.getCompanyTitle(next_mem.comId, '') + ' '
                                                        + this.$root.getPersonDepartment(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                        + this.$root.getPersonBranch(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                        + this.$root.getPersonName(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                        + this.$root.getPersonPositionName(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                        + '待檢視',
                                                };
                                                this.updateMember(upMember);
                                            });
                                        }
                                        else {
                                            if (this.uMemberData.length !== 0) {
                                                this.uMemberList.forEach((next_mem) => {
                                                    const upMember = {
                                                        memId: next_mem.memId,
                                                        memLV0Status: 0,
                                                        memNow: next_mem.mvmLV0,
                                                        memNowPosition: next_mem.memLV0Position,
                                                        memStatus: 0,
                                                        conLogMsg: this.$root.getCompanyTitle(next_mem.comId, '') + ' '
                                                            + this.$root.getPersonDepartment(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                            + this.$root.getPersonBranch(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                            + this.$root.getPersonName(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                            + this.$root.getPersonPositionName(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                            + '待檢視',
                                                    };
                                                    this.updateMember(upMember);
                                                });
                                            }

                                        }
                                    }
                                }
                            }
                        });
                        this.mMemberList.forEach((mem) => {
                            if (mem.memNow === this.perNo && mem.memNowPosition === this.perPosition) {
                                if (mem.comId === this.comId && mem.memLV0 === this.perNo && mem.memLV0Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV0Status: 3,
                                        memLV0Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV1Status: 0,
                                        memNow: mem.memLV1,
                                        memNowPosition: mem.memLV1Position,
                                        memStatus: 0,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                        conLogMsgNext: this.$root.getCompanyTitle(mem.comId, '') + ' '
                                            + this.$root.getPersonDepartment(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonBranch(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonName(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonPositionName(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + '待檢視',
                                    };
                                    this.updateMember(upMember);
                                }
                                if (mem.memLV1 === this.perNo && mem.memLV1Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV1Status: 3,
                                        memLV1Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV2Status: 0,
                                        memNow: mem.memLV2,
                                        memNowPosition: mem.memLV2Position,
                                        memStatus: 0,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                        conLogMsgNext: this.$root.getCompanyTitle(mem.comId, '') + ' '
                                            + this.$root.getPersonDepartment(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonBranch(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonName(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonPositionName(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + '待檢視',
                                    };
                                    this.updateMember(upMember);
                                }
                                if (mem.memLV2 === this.perNo && mem.memLV2Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV2Status: 3,
                                        memLV2Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV1Status: 0,
                                        memNow: 'null',
                                        memNowPosition: 'null',
                                        memStatus: 3,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                    };
                                    if (this.updateMember(upMember)) {
                                        if (this.checkSameTypeSign(1)) {
                                            if (this.uMemberData.length !== 0) {
                                                this.uMemberList.forEach((next_mem) => {
                                                    const upMember = {
                                                        memId: next_mem.memId,
                                                        memLV0Status: 0,
                                                        memNow: next_mem.mvmLV0,
                                                        memNowPosition: next_mem.memLV0Position,
                                                        memStatus: 0,
                                                        conLogMsg: this.$root.getCompanyTitle(next_mem.comId, '') + ' '
                                                            + this.$root.getPersonDepartment(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                            + this.$root.getPersonBranch(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                            + this.$root.getPersonName(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                            + this.$root.getPersonPositionName(next_mem.comId, next_mem.memLV0, next_mem.memLV0Position) + ' '
                                                            + '待檢視',
                                                    };
                                                    this.updateMember(upMember);
                                                });
                                            }
                                            else {
                                                const payload = {
                                                    conId: this.contractData.conId,
                                                    conStatus: 3,
                                                    conDate: this.contractData.conDate === '' ? dayjs().format('YYYY-MM-DD') : '',
                                                    conLogMsg: '簽核完成',
                                                };

                                                this.$api
                                                    .put(this.$test ? '/api/?type=contract_status' : '/api/adm/contract/updateStatus', payload)
                                                    .then(response => {
                                                        if (response.status === 200) {
                                                            alert('文件簽核完成');
                                                        } else {
                                                            console.log('err');
                                                        }
                                                        console.log('Edit successful:', response.data.data);
                                                    })
                                                    .catch(error => {
                                                        console.error('Edit failed:', error);
                                                    });

                                            }
                                        }
                                    }
                                }
                            }
                        });
                        this.uMemberList.forEach((mem) => {
                            if (mem.memNow === this.perNo && mem.memNowPosition === this.perPosition) {
                                if (mem.comId === this.comId && mem.memLV0 === this.perNo && mem.memLV0Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV0Status: 3,
                                        memLV0Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV1Status: 0,
                                        memNow: mem.memLV1,
                                        memNowPosition: mem.memLV1Position,
                                        memStatus: 0,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                        conLogMsgNext: this.$root.getCompanyTitle(mem.comId, '') + ' '
                                            + this.$root.getPersonDepartment(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonBranch(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonName(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + this.$root.getPersonPositionName(mem.comId, mem.memLV1, mem.memLV1Position) + ' '
                                            + '待檢視',
                                    };
                                    this.updateMember(upMember);
                                }
                                if (mem.memLV1 === this.perNo && mem.memLV1Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV1Status: 3,
                                        memLV1Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV2Status: 0,
                                        memNow: mem.memLV2,
                                        memNowPosition: mem.memLV2Position,
                                        memStatus: 0,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                        conLogMsgNext: this.$root.getCompanyTitle(mem.comId, '') + ' '
                                            + this.$root.getPersonDepartment(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonBranch(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonName(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + this.$root.getPersonPositionName(mem.comId, mem.memLV2, mem.memLV2Position) + ' '
                                            + '待檢視',
                                    };
                                    this.updateMember(upMember);
                                }
                                if (mem.memLV2 === this.perNo && mem.memLV2Position === this.perPosition) {
                                    const upMember = {
                                        memId: mem.memId,
                                        memLV2Status: 3,
                                        memLV2Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLV1Status: 0,
                                        memNow: 'null',
                                        memNowPosition: 'null',
                                        memStatus: 3,
                                        conLogMsg: this.$root.getCompanyTitle(this.comId, '') + ' '
                                            + this.$root.getPersonDepartment(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonBranch(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonName(this.comId, this.perNo, this.perPosition) + ' '
                                            + this.$root.getPersonPositionName(this.comId, this.perNo, this.perPosition) + ' '
                                            + '簽核完成',
                                    };
                                    if (this.updateMember(upMember)) {
                                        if (this.checkSameTypeSign(2)) {
                                            const payload = {
                                                conId: this.contractData.conId,
                                                conStatus: 3,
                                                conDate: this.contractData.conDate === '' ? dayjs().format('YYYY-MM-DD') : '',
                                                conLogMsg: '簽核完成',
                                            };

                                            this.$api
                                                .put(this.$test ? '/api/?type=contract_status' : '/api/adm/contract/updateStatus', payload)
                                                .then(response => {
                                                    if (response.status === 200) {
                                                        alert('文件簽核完成');
                                                    } else {
                                                        console.log('err');
                                                    }
                                                    console.log('Edit successful:', response.data.data);
                                                })
                                                .catch(error => {
                                                    console.error('Edit failed:', error);
                                                });

                                        }
                                    }
                                }
                            }
                        });
                        break;
                    case 4://拒絕
                        break;
                }
            },
            async checkSameTypeSign(memType) {// todo: checkSameTypeSign 查驗平行簽核是否皆已完成
                try {
                    const response = await this.$api.get(
                        this.$test ? `/api/?type=contract_member&conId=${this.conId}&mbType=${memType}` : `/api/adm/getMemberContract?ctId=${ctId}&mbType=${type}`
                    );

                    if (response.status === 200) {
                        const data = response.data.data;
                        data.forEach((mem) => {
                            if (mem.memStatus !== '3') {
                                return false;
                            }
                        });
                        return true;
                    } else {
                        console.log('err');
                    }
                } catch (error) {
                    console.error('Edit failed:', error);
                }
                return true;
            },
            async updateMember(payload) {// todo: updateMember 修改簽核人員簽核狀態
                try {
                    const response = await this.$api.put(
                        this.$test ? '/api/?type=contract_member' : '/api/adm/member/update',
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
                return true;

            },
            async updateContractSignTime() {
                const payload = {
                    ctId: ctId,
                    ctDate: dayjs().format('YYYY-MM-DD'),
                };
                console.log(payload);
                try {
                    const response = await this.$api.put(
                        this.$test ? '/api/?type=contract_time' : '/api/adm/contract/updateCtDate',
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
                return true;

            },
            async updateContractStatus(status) {
                try {
                    const payload = {
                        ctId: ctId,
                        ctStatus: status,
                    };

                    const response = await this.$api.put(
                        this.$test ? '/api/?type=contract_status' : '/api/adm/contract/updateStatus',
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

            releaseSign() {// todo: releaseSign 發起簽核
                const payload = {
                    conId: this.contractData.conId,
                    conStatus: 1,
                    conLogMsg: this.iMemberData.comTitle + ' '
                        + this.$root.getPersonDepartment(this.iMemberData.comId, this.iMemberData.memLV0, this.iMemberData.memLV0Position) + ' '
                        + this.$root.getPersonBranch(this.iMemberData.comId, this.iMemberData.memLV0, this.iMemberData.memLV0Position) + ' '
                        + this.$root.getPersonName(this.iMemberData.comId, this.iMemberData.memLV0, this.iMemberData.memLV0Position) + ' '
                        + this.$root.getPersonPositionName(this.iMemberData.comId, this.iMemberData.memLV0, this.iMemberData.memLV0Position) + ' '
                        + '發起簽核',
                };

                this.$api
                    .put(this.$test ? '/api/?type=contract_status' : '/api/adm/contract/updateStatus', payload)
                    .then(response => {
                        if (response.status === 200) {
                            this.$api
                                .get(this.$test ? `/api/?type=contract_member&memType=0&conId=${this.contractData.conId}` : `/api/adm/getMemberContract?mbType=0&conId=${this.contractData.conId}`)
                                .then(response => {
                                    const data = response.data.data[0];
                                    const upMember = {
                                        memId: data.memId,
                                        memLV0Status: 3,
                                        memLV0Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        memLVCStatus: data.memLVC !== '' ? 1 : '',
                                        memLV1Status: data.memLVC === '' ? 1 : '',
                                        memNow: data.memLVC === '' ? data.memLV1 : data.memLVC,
                                        memNowPosition: data.memLVC === '' ? data.memLV1Position : data.memLVCPosition,
                                        memNowStatus: 0,
                                        memStatus: 1
                                    };
                                    console.log(upMember);
                                    this.$api
                                        .put(this.$test ? '/api/?type=contract_member' : '/api/adm/member/update', upMember)
                                        .then(response => {
                                            if (response.status === 200) {
                                                // this.$router.push(`/contract/${this.$route.params.ctp}/sl/${this.contractData.conId}`);
                                                alert('發起成功');
                                                window.location.reload();
                                            }
                                        })
                                        .catch(error => {
                                        });
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                        } else {
                            console.log('err');
                        }
                        console.log('Edit successful:', response.data.data);
                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });

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

            //     window.open(`/contract/pdf/${this.$route.params.id}`);
            // },
            closeViewFile() {
                this.viewFile = false;
                this.viewFileUrl = '';
            },
            openViewFile(url) {
                this.viewFileUrl = 'https://digitaldreams.tw/pdf/doc.pdf';
                this.viewFile = true;
            },
            checkMember() {
                return true;
            },
            handleGlobalClick(event) {
                const sidebar = this.$refs.sidebar;
                if (this.isSidebarVisible && !sidebar.contains(event.target)) {
                    // 如果侧边栏可见且点击事件不在侧边栏内部，则隐藏侧边栏
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
                // 获取要滚动到的目标元素
                const targetElement = document.getElementById(el);

                if (targetElement) {
                    // 计算滚动目标位置（目标元素的顶部位置减去 70 像素）
                    const targetScrollPosition = targetElement.offsetTop - 70;

                    // 使用 scrollIntoView() 方法滚动到目标位置
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
