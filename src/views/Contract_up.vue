<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">簽核單項</h4>
            </li>
            <li class="breadcrumb-item">修改文件</li>
        </ul>
        <div class="section-body">
            <div class="row">
                <div class="d-flex">
                    <!-- 主要內容 -->
                    <div id="myMainDocument" class="col-12">
                        <template v-for="(area, parentIndex) in conValue" class="col-12">
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
                                                                    area.areaTitle }}</h4>
                                                                <div v-if="parentIndex === 0">
                                                                    <!-- 這裡放創文日期 -->
                                                                    <div class="myFont16Title">
                                                                        文件序號：<span class="data float-end myFont16">{{ contractData.conSerial }}</span>
                                                                    </div>
                                                                    <div class="myFont16Title">
                                                                        建檔日期：<span class="data float-end myFont16">{{ this.$root.formatDate(contractData.conCreateTime)}}</span>
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
                                                                                <span v-if="col.name !== ''"
                                                                                      class="myFont16 d-flex align-center"
                                                                                      style="background-color:#6777ef ;color: white;border-radius: 6px;padding: 0.3rem 0.8rem;font-weight: 400;">
                                                                                    <i class="material-icons"
                                                                                       style="margin-right: 8px;">label_outline</i>{{ col.name }}
                                                                                </span>
                                                                            </div>
                                                                            <!-- 這裡放權限控管及資料管制 -->
                                                                            <span class="data myFont16">
                                                                        <template v-if="col.type === 'subject'">
                                                                            <h4><b style="font-weight: 600;"><input
                                                                                    type="text"
                                                                                    v-model="contractData.conTitle"
                                                                                    class="form-control"
                                                                                    placeholder="文件名稱"/></b></h4>
                                                                            <div class="flex-grow-1">
                                                                                <!-- 這裡放承辦單位 -->
                                                                                <div class="myFont16">承辦單位：<span
                                                                                        class="data">{{ this.contractData.perBu1}}  {{ this.contractData.perBu2 }}</span></div>
                                                                                <!-- 這裡放承辦人 -->
                                                                                <div class="myFont16">承辦人：<span
                                                                                        class="data">{{ this.contractData.perName }}</span></div>
                                                                                <!-- 這裡放聯絡電話 -->
                                                                                <div class="myFont16">聯絡電話：<span
                                                                                        class="data">{{ this.contractData.perPhon1 }} {{ this.contractData.perPhon2 }} {{ this.contractData.perPhon3 }}</span></div>
                                                                                <br>
                                                                                <!-- 這裡放承辦單位 -->
                                                                                <div class="myFont16">申請類型：<span
                                                                                        class="data">
                                                                                    <div class="d-flex m-tb">
                                                                                        <div v-for="cType in contractType"
                                                                                             class="form-check-inline">
                                                                                            <input class="form-check-input"
                                                                                                   type="radio"
                                                                                                   v-model="contractData.conType"
                                                                                                   :value="cType.value"
                                                                                                   :id="'type_' + cType.value">
                                                                                            <label class="form-check-label"
                                                                                                   :for="'type_' + cType.value">
                                                                                                {{ cType.text }}
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </span></div>
                                                                                <!-- 這裡放計劃框架 -->
                                                                                <div class="myFont16">計劃框架：<span
                                                                                        class="data">{{ contractData.temTitle }}</span></div>
                                                                                <!-- 這裡放管理維運公司 -->
                                                                                <div class="myFont16">管理維運公司：<span
                                                                                        class="data">{{ this.$root.getCompanyTitle(contractData.comId, '')}}</span></div>
                                                                                <!-- 這裡放生效日期 -->
                                                                                <div class="myFont16">生效日期：<span
                                                                                        class="data">
                                                                                    <div class="d-flex m-tb">
                                                                                    <DatePicker
                                                                                            v-model="contractData.conDate"
                                                                                            format="yyyy-MM-dd"
                                                                                            locale="zh-tw"
                                                                                            :enable-time-picker="false"
                                                                                            placeholder="未填寫將以簽核完成日為依據"
                                                                                            style="width: auto;"/>
                                                                                    </div>
                                                                                </span>
                                                                                </div>
                                                                                <!-- 這裡放使用公司 -->
                                                                                <div class="myFont16">使用公司：<span
                                                                                        class="data">
                                                                                    <div class="d-flex m-tb">
                                                                                        <div v-for="com in companyData"
                                                                                             class="form-check-inline">
                                                                                            <input class="form-check-input"
                                                                                                   type="checkbox"
                                                                                                   :value="com.comCode"
                                                                                                   v-model="conCompany"
                                                                                                   :id="'com_'+com.comCode">
                                                                                            <label class="form-check-label"
                                                                                                   :for="'com_'+com.comCode">
                                                                                                {{ com.comTitle }}
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </span></div>
                                                                                <!-- 這裡放作業種類 -->
                                                                                <div class="myFont16">作業種類：<span
                                                                                        class="data">
                                                                                    <div class="d-flex m-tb">
                                                                                        <div v-for="(wor, worIndex) in workData"
                                                                                             class="form-check-inline">
                                                                                            <input class="form-check-input"
                                                                                                   type="checkbox"
                                                                                                   :value="wor.worId"
                                                                                                   v-model="conWork"
                                                                                                   :id="'wor_'+wor.worId">
                                                                                            <label class="form-check-label"
                                                                                                   :for="'wor_'+wor.worId">
                                                                                                {{ wor.worTitle }}
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </span></div>
                                                                            </div>
                                                                        </template>
                                                                        <template v-if="col.type.startsWith('list')">
                                                                                <!-- 選項列表 -->
                                                                                <div class="replyBox m-t-20 myFont16">
                                                                                    <select v-model="col.value"
                                                                                            class="form-control">
                                                                                        <option disabled
                                                                                                value="">請選擇</option>
                                                                                        <template
                                                                                                v-for="sou in sourceData">
                                                                                            <template
                                                                                                    v-if="parseInt(sou.catId) === parseInt(col.id)">
                                                                                                <option :value="sou.souTitle">
                                                                                                    {{ sou.souTitle }}
                                                                                                </option>
                                                                                            </template>
                                                                                        </template>
                                                                                    </select>
                                                                                </div>
                                                                        </template>
                                                                        <template v-if="col.type.startsWith('word')">
                                                                            <div class="replyBox m-t-20 myFont16">
                                                                                <template v-for="cat in categoryData">
                                                                                    <template
                                                                                            v-if="parseInt(cat.catId) === parseInt(col.id)">
                                                                                        <label class="form-label">{{ cat.catWord }}</label>
                                                                                    </template>
                                                                                </template>
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
                                                                                    <Item v-for="(item, item_index) in itemData"
                                                                                          :key="item.uniqueId"
                                                                                          :idx="item_index"
                                                                                          :item="item"
                                                                                          :workData="workData"
                                                                                          :workUse="conWork"
                                                                                          :timeData="timeData"
                                                                                          :distributionData="distributionData"
                                                                                          :manner="manner"
                                                                                          :companyData="companyData"
                                                                                          :companyUse="conCompany"
                                                                                          @remove-item="removeItemData"
                                                                                          ref="ItemComp"
                                                                                    />
                                                                                </tbody>
                                                                            </table>
                                                                            <p>
                                                                                <vue-feather type="plus"
                                                                                             class="btn btn-success btn-icon"
                                                                                             @click="addItemData"></vue-feather>
                                                                            </p>
                                                                        </template>
                                                                        <template v-if="col.type === 'sign'">
                                                                            <label>維運</label>
                                                                            <table class="myTable myTableMemberI">
                                                                                <caption>發起維運公司簽核人員資料表</caption>
                                                                                <thead>
                                                                                <tr>
                                                                                    <th>公司</th>
                                                                                    <th>部門</th>
                                                                                    <th>科別</th>
                                                                                    <th>部門主管</th>
                                                                                    <th>科別主管</th>
                                                                                    <th>窗口</th>
                                                                                    <th>承辦人</th>
                                                                                    <th>承辦人連絡電話</th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                <tr>
                                                                                    <Member
                                                                                            :key="iMemberData.uniqueId"
                                                                                            :member="iMemberData"
                                                                                            :companyData="companyData"
                                                                                            :companyUse="conCompany"
                                                                                            :use_close="false"
                                                                                            :use_contact="true"
                                                                                            :lv_disabled="true"
                                                                                            ref="iMemberComp"
                                                                                    />
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table v-if="mMemberData.length !== 0"
                                                                                   class="myTable myTableMemberM">
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
                                                                                        <Member
                                                                                                :key="mmem.uniqueId"
                                                                                                :member="mmem"
                                                                                                :use_close="true"
                                                                                                :lv_disabled="false"
                                                                                                :companyData="companyData"
                                                                                                :companyUse="conCompany"
                                                                                                @remove-member="uniqueId => removeMember(uniqueId, 'M')"
                                                                                                ref="mMemberComp"
                                                                                        />
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <p><vue-feather type="plus"
                                                                                            class="btn btn-success btn-icon"
                                                                                            @click="addMember('M')"></vue-feather></p>
                                                                            <label>使用</label>
                                                                            <table v-if="uMemberData.length !== 0"
                                                                                   class="myTable myTableMemberU">
                                                                                <caption>使用公司簽核人員資料表</caption>
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
                                                                                        <Member
                                                                                                :key="umem.uniqueId"
                                                                                                :member="umem"
                                                                                                :use_close="true"
                                                                                                :lv_disabled="false"
                                                                                                :companyData="companyData"
                                                                                                :companyUse="conCompany"
                                                                                                @remove-member="uniqueId=>removeMember(uniqueId, 'U')"
                                                                                                ref="uMemberComp"
                                                                                        />
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <p><vue-feather type="plus"
                                                                                            class="btn btn-success btn-icon"
                                                                                            @click="addMember('U')"></vue-feather></p>
                                                                        </template>
                                                                        <template v-if="col.type === 'file_area'">
                                                                            <div class="replyBox m-t-20 myFont16">
                                                                                <span><i
                                                                                        class="fa fa-paperclip mb-1"></i> <span>{{ conFile.length + conFileMeeting.length + conFilePlan.length }}則</span>附加檔案 </span>
                                                                                <!-- 這裡放附檔 -->
                                                                                <div class="row">
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
                                                                                <div>
                                                                                    <template v-if="conFileMeeting">
                                                                                        <template
                                                                                                v-for="(option, index) in conFileMeeting">
                                                                                            <a href="javascript:void(0);"
                                                                                               :class="{'delFile': isFileInDelFile(option, 'meeting')}"
                                                                                               @click="deleteFile(option, 'meeting')">會議記錄 {{ index+1 }}</a> |
                                                                                        </template>
                                                                                    </template>
                                                                                    <template v-if="conFilePlan">
                                                                                        <template
                                                                                                v-for="(option, index) in conFilePlan">
                                                                                            <a href="javascript:void(0);"
                                                                                               :class="{'delFile': isFileInDelFile(option, 'plan')}"
                                                                                               @click="deleteFile(option, 'plan')">專規劃報告 {{ index+1 }}</a> |
                                                                                        </template>
                                                                                    </template>
                                                                                    <template v-if="conFile">
                                                                                        <template
                                                                                                v-for="(option, index) in conFile">
                                                                                            <a href="javascript:void(0);"
                                                                                               :class="{'delFile': isFileInDelFile(option, 'other')}"
                                                                                               @click="deleteFile(option, 'other')">其他附件 {{ index+1 }}</a> |
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
                                                                                    <div class="help-tip"><p>{{ col.tip }}</p></div>
                                                                                </div>
                                                                            </template>
                                                                        </template>
                                                                        <template v-if="col.type === 'radio'">
                                                                            <template v-if="col.tip === ''">
                                                                                <div v-for="item in col.option.split('|')"
                                                                                     class="form-check-inline">
                                                                                    <input type="radio" :value="item"
                                                                                           class="form-check-input"
                                                                                           :id="'radio_'+parentIndex+'_'+childIndex">
                                                                                    <label class="form-check-label"
                                                                                           :for="'radio_'+parentIndex+'_'+childIndex">{{ item }}</label>
                                                                                </div>
                                                                            </template>
                                                                            <template v-else>
                                                                            <div class="myToolTipContainer d-flex"
                                                                                 style="width: 200px;">
                                                                                <!-- 以下放edit元件 -->
                                                                                <div v-for="item in col.option.split('|')"
                                                                                     class="form-check-inline">
                                                                                    <input type="radio" :value="item"
                                                                                           class="form-check-input"
                                                                                           :id="'radio_'+parentIndex+'_'+childIndex">
                                                                                    <label class="form-check-label"
                                                                                           :for="'radio_'+parentIndex+'_'+childIndex">{{ item }}</label>
                                                                                </div>
                                                                                <!-- 以上放edit元件 -->
                                                                                <div class="help-tip"><p>{{ col.tip }}</p></div>
                                                                            </div>
                                                                            </template>
                                                                        </template>
                                                                        <template v-if="col.type === 'check'">
                                                                            <template v-if="col.tip === ''">
                                                                                <div v-for="item in col.option.split('|')"
                                                                                     class="form-check-inline">
                                                                                    <input type="checkbox" :value="item"
                                                                                           class="form-check-input"
                                                                                           :id="'radio_'+parentIndex+'_'+childIndex">
                                                                                    <label class="form-check-label"
                                                                                           :for="'radio_'+parentIndex+'_'+childIndex">{{ item }}</label>
                                                                                </div>
                                                                            </template>
                                                                            <template v-else>
                                                                            <div class="myToolTipContainer d-flex"
                                                                                 style="width: 200px;">
                                                                              <!-- 以下放edit元件 -->
                                                                                <div v-for="item in col.option.split('|')"
                                                                                     class="form-check-inline">
                                                                                    <input type="checkbox" :value="item"
                                                                                           class="form-check-input"
                                                                                           :id="'radio_'+parentIndex+'_'+childIndex">
                                                                                    <label class="form-check-label"
                                                                                           :for="'radio_'+parentIndex+'_'+childIndex">{{ item }}</label>
                                                                                </div>
                                                                                <!-- 以上放edit元件 -->
                                                                                <div class="help-tip"><p>{{ col.tip }}</p></div>
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
                                                                                <div class="help-tip"><p>{{ col.tip }}</p></div>
                                                                            </div>
                                                                            </template>
                                                                        </template>
                                                                        <template v-if="col.type === 'box'">
                                                                            <template v-if="col.tip === ''">
                                                                            <textarea class="form-control"></textarea>
                                                                            </template>
                                                                            <template v-else>
                                                                            <div class="myToolTipContainer d-flex"
                                                                                 style="width: 200px;">
                                                                              <!-- 以下放edit元件 -->
                                                                            <textarea class="form-control"></textarea>
                                                                                <!-- 以上放edit元件 -->
                                                                            <div class="help-tip"><p>{{ col.tip }}</p></div>
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
                </div>

                <div class="col-6" style="padding-bottom: 20px;">
                    <button type="button" @click="updateContract"
                            class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">儲存
                    </button>
                </div>

            </div>
        </div>
    </section>
    <!-- 浮動控制版 -->
    <div :class="isSidebarVisible ? 'settingSidebar showSettingPanel' : 'settingSidebar'" ref="sidebar">
        <a href="javascript:void(0)" class="settingPanelToggle" @click="sidebarClick"> <i
                class="fa fa-spin fa-cog"></i>
        </a>
        <div class="settingSidebar-body ps-container ps-theme-default">
            <div class=" fade show active">
                <div class="setting-panel-header">管理面板</div>
                <div class="p-15 border-bottom">
                    <div class="col-lg-12">
                        <div class="m-l-20">
                            <button type="button" @click="updateContract"
                                    class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">儲存
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">文件架構</h6>
                    <ul class="contact-list">
                        <li v-for="(item, index) in conValue" class="nav-item" ref="tp">
                            <a class="nav-link myFont16" href="javascript:void(0);"
                               @click="scrollToElement('my' + index)">
                                {{ item.areaTitle }}
                            </a>
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


<style scoped>
    .textBox {
        border-style: dashed;
        border-color: darkgray;
        border-width: thin;
    }

    .delFile {
        text-decoration: line-through;
    }
</style>
