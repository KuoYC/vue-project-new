<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">簽核單項</h4>
            </li>
            <li class="breadcrumb-item">新增文件</li>
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
                                                                    <div class="myFont16" style="font-weight: 400;">
                                                                        文件序號：<span
                                                                            class="data float-end"
                                                                            style="font-style: italic; color: #e3e3e3;">文件建檔後產生</span>
                                                                    </div>
                                                                    <div class="myFont16" style="font-weight: 400;">
                                                                        建檔日期：<span
                                                                            class="data float-end"
                                                                            style="font-style: italic; color: #e3e3e3;">文件建檔後產生</span>
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
                                                                             style="margin-right: 8px;">label_outline</i>{{ col.name }}</span>
                                                                            </div>
                                                                            <!-- 這裡放權限控管及資料管制 -->
                                                                            <span class="data myFont16">
                                                                        <template v-if="col.type === 'subject'">
                                                                            <h4><b style="font-weight: 600;"><input
                                                                                    v-model="conTitle"
                                                                                    type="text" class="form-control"
                                                                                    placeholder="文件名稱"/></b></h4>
                                                                            <div class="flex-grow-1">
                                                                                <!-- 這裡放承辦單位 -->
                                                                                <div class="myFont16">承辦單位：<span
                                                                                        class="data">{{ this.per.perBu1}}  {{ this.per.perBu2 }}</span></div>
                                                                                <!-- 這裡放承辦人 -->
                                                                                <div class="myFont16">承辦人：<span
                                                                                        class="data">{{ this.per.perName }}</span></div>
                                                                                <!-- 這裡放聯絡電話 -->
                                                                                <div class="myFont16">聯絡電話：<span
                                                                                        class="data">{{ this.per.perPhon1 }} {{ this.per.perPhon2 }} {{ this.per.perPhon3 }}</span>
                                                                                </div>
                                                                                <br>
                                                                                <!-- 這裡放承辦單位 -->
                                                                                <div class="myFont16">申請類型：<span
                                                                                        class="data">
                                                                                    <div class="d-flex m-tb">
                                                                                        <div v-for="cType in contractType"
                                                                                             class="form-check-inline">
                                                                                            <input class="form-check-input"
                                                                                                   type="radio"
                                                                                                   v-model="conType"
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
                                                                                        class="data">{{ templateData.temTitle }}</span>
                                                                                </div>
                                                                                <!-- 這裡放管理維運公司 -->
                                                                                <div class="myFont16">管理維運公司：<span
                                                                                        class="data">{{ this.$root.getCompanyTitle(per.comId, '')}}</span>
                                                                                </div>
                                                                                <!-- 這裡放生效日期 -->
                                                                                <div class="myFont16">生效日期：<span
                                                                                        class="data">
                                                                                    <div class="d-flex m-tb">
                                                                                    <DatePicker v-model="conDate"
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
                                                                                        <template
                                                                                                v-for="sou in sourceData">
                                                                                            <option disabled
                                                                                                    value="">請選擇</option>
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
                                                                                        <tr v-for="(item, item_index) in itemData">
                                                                                            <Item
                                                                                                    :key="item.uniqueId"
                                                                                                    :idx="item_index"
                                                                                                    :item="item"
                                                                                                    :workData="workData"
                                                                                                    :workUse="conWork"
                                                                                                    :timeData="timeData"
                                                                                                    :distributionData="distributionData"
                                                                                                    :companyData="companyData"
                                                                                                    :companyUse="conCompany"
                                                                                                    @remove-item="removeItemData"
                                                                                                    ref="ItemComp"
                                                                                            />
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                            <p><vue-feather type="plus"
                                                                                            @click="addItemData"
                                                                                            class="btn btn-success btn-icon"></vue-feather></p>
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
                                                                                                <th>承辦人</th>
                                                                                                <th>科別主管</th>
                                                                                                <th>部門主管</th>
                                                                                                <th>窗口</th>
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
                                                                                            <th>承辦人</th>
                                                                                            <th>科別主管</th>
                                                                                            <th>部門主管</th>
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
                                                                                                        @remove-member="removeMemberMData"
                                                                                                        ref="mMemberComp"
                                                                                                />
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <p><vue-feather type="plus"
                                                                                                    class="btn btn-success btn-icon"
                                                                                                    @click="addMemberMData"></vue-feather></p>
                                                                                    <label>使用</label>
                                                                                    <table v-if="uMemberData.length !== 0"
                                                                                           class="myTable myTableMemberU">
                                                                                        <caption>使用公司簽核人員資料表</caption>
                                                                                                <thead>
                                                                                                <tr>
                                                                                                    <th>公司</th>
                                                                                                    <th>部門</th>
                                                                                                    <th>科別</th>
                                                                                                    <th>承辦人</th>
                                                                                                    <th>科別主管</th>
                                                                                                    <th>部門主管</th>
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
                                                                                                                @remove-member="removeMemberUData"
                                                                                                                ref="uMemberComp"
                                                                                                        />
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                    <p><vue-feather type="plus"
                                                                                                    class="btn btn-success btn-icon"
                                                                                                    @click="addMemberUData"></vue-feather></p>
                                                                        </template>

                                                                        <template v-if="col.type === 'file_area'">
                                                                            <div class="replyBox m-t-20 myFont16">
                                                                                <span>
                                                                                    <!-- 這裡放共幾則附檔 -->
                                                                                    <i class="fa fa-paperclip mb-1"></i> <span>3則</span>附加檔案 </span>
                                                                                <!-- 這裡放附檔 -->
                                                                                <div class="row">
                                                                                    <FileUpload
                                                                                            :titleString="'會議記錄-拖放文件到此處或點擊選擇文件'"
                                                                                            :multiple="true"
                                                                                            @file-selected="handleMeetingFilesSelected"
                                                                                            class="col-4"
                                                                                    />
                                                                                    <FileUpload
                                                                                            :titleString="'專案規劃報告-拖放文件到此處或點擊選擇文件'"
                                                                                            :multiple="true"
                                                                                            @file-selected="handlePlanFilesSelected"
                                                                                            class="col-4"
                                                                                    />
                                                                                    <FileUpload
                                                                                            :titleString="'其他-拖放文件到此處或點擊選擇文件'"
                                                                                            :multiple="true"
                                                                                            @file-selected="handleOtherFilesSelected"
                                                                                            class="col-4"
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <a href="#">顧問報告.pdf</a> |
                                                                                    <a href="#">顧問報告.pdf</a> |
                                                                                    <a href="#">顧問報告.pdf</a> |
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
                                                                                <div v-for="item in col.option.split('|')"
                                                                                     class="form-check-inline">
                                                                                        <input type="radio"
                                                                                               :value="item"
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
                                                                                        <input type="radio"
                                                                                               :value="item"
                                                                                               class="form-check-input"
                                                                                               :id="'radio_'+parentIndex+'_'+childIndex">

                                                                                        <label class="form-check-label"
                                                                                               :for="'radio_'+parentIndex+'_'+childIndex">{{ item }}</label>
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
                                                                                <div v-for="item in col.option.split('|')"
                                                                                     class="form-check-inline">
                                                                                    <input type="checkbox"
                                                                                           :value="item"
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
                                                                                        <input type="checkbox"
                                                                                               :value="item"
                                                                                               class="form-check-input"
                                                                                               :id="'radio_'+parentIndex+'_'+childIndex">

                                                                                        <label class="form-check-label"
                                                                                               :for="'radio_'+parentIndex+'_'+childIndex">{{ item }}</label>
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
                                                                            <input type="text" class="form-control"/>
                                                                            </template>
                                                                            <template v-else>
                                                                            <div class="myToolTipContainer d-flex"
                                                                                 style="width: 200px;">
                                                                              <!-- 以下放edit元件 -->
                                                                            <input type="text" class="form-control"/>
                                                                                <!-- 以上放edit元件 -->
                                                                              <div class="help-tip">
                                                                                <p>{{ col.tip }}</p>
                                                                              </div>
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
                </div>
                <div class="col-6" style="padding-bottom: 20px;">
                    <button type="button" @click="createContract"
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
                <div class="setting-panel-header">管理面板
                </div>
                <div class="p-15 border-bottom">
                    <div class="col-lg-12">
                        <div class="m-l-20">
                            <button type="button" @click="createContract"
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
            </div>
        </div>
    </div>
    <!-- 浮動控制版 -->
</template>

<script>
    import Cookies from 'js-cookie'
    import Item from '@/components/Item.vue';
    import Member from '@/components/Member.vue';
    import DatePicker from '@vuepic/vue-datepicker';
    import FileUpload from '@/components/FileUpload.vue';

    import '@vuepic/vue-datepicker/dist/main.css';

    export default {
        name: "Contract_ad",
        data() {
            return {
                per: JSON.parse(Cookies.get('per')),
                isSidebarVisible: false,//管理面板使用
                temId: 0,

                workData: [//作業種類
                    {worId: '0', worTitle: ''},
                ],
                companyData: [//公司
                    {comId: '0', comTitle: '', comCode: ''},
                ],
                categoryData: [//選單類型
                    {catId: '0', catTitle: '', catType: '', catWord: ''},
                ],
                sourceData: [//選單類型
                    {souId: '0', catId: '0', souTitle: ''},
                ],
                contractType: [{text: '新增', value: 0}, {text: '變更', value: 1}, {text: '終止', value: 2},],

                conTitle: '',
                conType: '0',//申請類別
                conDate: null,//生效日期
                // conSerial:'xxxxxxx',//序號
                account: '',
                templateData: {
                    temId: '',
                    temTitle: '',
                    temStyle: '',
                }, // 存放樣板資料的陣列
                conValue: [],//temStyle
                conWork: [],//作業種類
                conCompany: [],//使用公司
                timeData: [],
                filMeetingFiles: [], // 存储会议记录文件
                filPlanFiles: [],    // 存储專案規劃報告文件
                folOtherFiles: [],   // 存储其他文件

                personnelData: [],

                iMemberData: {},//發起
                mMemberData: [],//維運
                uMemberData: [],//使用
                itemData: [],//作業項目


                dpFormat: {
                    inputFormat: 'yyyy/MM/dd',
                    // weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    // months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                },
            };
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
            DatePicker,
            FileUpload,
        },
        methods: {
            defaultData() {

            },
            fetchFirst() {
                this.temId = this.$route.params.tem;
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=template&temId=${this.$route.params.tem}` : `/api/adm/contractTemplate/${this.$route.params.ctp}`),
                    this.$api.get(this.$test ? '/api/?type=work' : ''),
                    this.$api.get(this.$test ? '/api/?type=company' : ''),
                    this.$api.get(this.$test ? '/api/?type=category' : ''),
                    this.$api.get(this.$test ? '/api/?type=source' : ''),
                    this.$api.get(this.$test ? '/api/?type=distribution' : ''),
                ];

                Promise.all(apiRequests)
                    .then(([templateResponse, workResponse, companyResponse, categoryResponse, sourceResponse, distributionResponse]) => {
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                        this.conValue = this.templateData?.temStyle ? JSON.parse(this.templateData.temStyle) : null;
                        //workResponse
                        this.workData = workResponse.data.data;
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //categoryResponse
                        this.categoryData = categoryResponse.data.data;
                        //sourceResponse
                        this.sourceData = sourceResponse.data.data;
                        this.timeData = this.sourceData.filter(item => parseInt(item.catId) === 1);
                        //distributionResponse
                        this.distributionData = distributionResponse.data.data;

                        //設定發起人
                        this.iMemberData = this.createMemberData('0', this.per.perBu1Code, true);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            generateUniqueId() {
                return Math.random().toString(36).substr(2, 9);
            },
            createContract() {
                const memberList = [];
                memberList.push(this.iMemberData);
                this.mMemberData.forEach(member => {
                    memberList.push(member);
                });
                this.uMemberData.forEach(member => {
                    memberList.push(member);
                });
                const itemList = [];
                this.itemData.forEach(item => {
                    itemList.push(item);
                });
                itemList.forEach(item => {
                    item.iteSubsidiaries = item.iteSubsidiaries.join('|');
                });

                this.conValue.forEach(area => {
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


                const formData = new FormData();
                this.filMeetingFiles.forEach(file => {
                    formData.append('contractFiles[]', file);
                });
                this.filPlanFiles.forEach(file => {
                    formData.append('contractFiles[]', file);
                });
                this.folOtherFiles.forEach(file => {
                    formData.append('contractFiles[]', file);
                });
                // const payload = {
                //     temId: this.temId,
                //     perNo: this.per.perNo,
                //     perPosition: this.per.perPosition,
                //     comId: this.per.comId,
                //     conTitle: this.conTitle,
                //     conType: this.conType,
                //     conDate: this.conDate,
                //     conWork: this.conWork.join('|'),
                //     conCompany: this.conCompany.join('|'),
                //     conValue: JSON.stringify(this.conValue),
                //     itemList: itemList,
                //     memberList: memberList,
                // };
                formData.append('temId', this.temId);
                formData.append('perNo', this.per.perNo);
                formData.append('perPosition', this.per.perPosition);
                formData.append('comId', this.per.comId);
                formData.append('conTitle', this.conTitle);
                formData.append('conType', this.conType);
                formData.append('conDate', this.conDate);
                formData.append('conWork', this.conWork.join('|'));
                formData.append('conCompany', this.conCompany.join('|'));
                formData.append('conValue', JSON.stringify(this.conValue));
                formData.append('itemList', JSON.stringify(itemList));
                formData.append('memberList', JSON.stringify(memberList));

                // console.log(JSON.stringify(payload));
                // this.$api
                //     .post(this.$test ? '/api/?type=contract' : '/api/adm/contract/addNew', payload)
                //     .then(response => {
                //         if (response.status === 200) {
                //             this.$router.push(`/contract/${this.$route.params.tem}/sl/${response.data.conId}`);
                //         } else {
                //             console.log('err');
                //         }
                //     })
                //     .catch(error => {
                //         console.error('Edit failed:', error);
                //     });
                this.$api
                    .post(this.$test ? '/api/?type=contract' : '/api/adm/contract/addNew', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // 设置请求头为 multipart/form-data
                        },
                    })
                    .then(response => {
                        if (response.status === 200) {
                            this.$router.push(`/contract/${this.$route.params.tem}/sl/${response.data.conId}`);
                        } else {
                            console.log('err');
                        }
                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });


            },
            addItemData() {
                this.itemData.push({
                    uniqueId: this.generateUniqueId(),
                    iteId: 0,
                    conId: 0,//
                    iteTitle: '',
                    worId: 0,//
                    iteTime: '',
                    iteSubsidiaries: [],//
                    iteControl: '',
                    disId: 0,//
                    iteTypeNote: '',//
                    iteDescription: '',
                    iteWord: '',
                    iteNote: '',
                },);
            },
            removeItemData(uniqueId) {
                const index = this.itemData.findIndex(item => item.uniqueId === uniqueId);
                if (index !== -1) {
                    this.itemData.splice(index, 1);
                }
            },
            addMemberMData() {
                this.mMemberData.push(
                    this.createMemberData('1', Cookies.get('perBu1Code')),);
            },
            addMemberUData() {
                this.uMemberData.push(
                    this.createMemberData('2', ''),);
            },
            createMemberData(memType, memBu1Code, first = false) {
                const memberData = {
                    uniqueId: this.generateUniqueId(),
                    memId: '0',
                    memType: memType,
                    memBu1Code: memBu1Code,
                    memBu2Code: first ? this.per.perBu2Code : '',
                    memBu2: first ? this.per.perBu2 : '',
                    memBu3Code: first ? this.per.perBu3Code : '',
                    memBu3: first ? this.per.perBu3 : '',
                    LV0: first ? this.per.perNo + '|' + this.per.perPosition : '',
                    memLV0: first ? this.per.perNo : '',
                    memLV0Name: first ? this.per.perName : '',
                    memLV0Position: first ? this.per.perPosition : '',
                    memLV0PositionName: first ? this.per.perPositionName : '',
                    LVC: '',
                    memLVC: '',
                    memLVCName: '',
                    memLVCPosition: '',
                    memLVCPositionName: '',
                    LV1: '',
                    memLV1: '',
                    memLV1Name: '',
                    memLV1Position: '',
                    memLV1PositionName: '',
                    LV2: '',
                    memLV2: '',
                    memLV2Name: '',
                    memLV2Position: '',
                    memLV2PositionName: '',
                    memPhone: first ? this.per.perPhone2 + ' ' + this.per.perPhone3 : '',
                };
                return memberData;

            },

            removeMemberMData(uniqueId) {
                const index = this.mMemberData.findIndex(item => item.uniqueId === uniqueId);
                if (index !== -1) {
                    this.mMemberData.splice(index, 1);
                }
            },
            removeMemberUData(uniqueId) {
                const index = this.uMemberData.findIndex(item => item.uniqueId === uniqueId);
                if (index !== -1) {
                    this.uMemberData.splice(index, 1);
                }
            },

            //File
            handleMeetingFilesSelected(files) {
                // 存储会议记录文件
                this.filMeetingFiles = files;
            },
            handlePlanFilesSelected(files) {
                // 存储專案規劃報告文件
                this.filPlanFiles = files;
            },
            handleOtherFilesSelected(files) {
                // 存储其他文件
                this.filOtherFiles = files;
            },


            //右方管理面板
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
    };
</script>

<style scoped>
</style>
