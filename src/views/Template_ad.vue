<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">樣板管理</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/template`"><vue-feather type="link"></vue-feather>樣板列表</router-link></li>
            <li class="breadcrumb-item">新增樣板</li>
        </ul>
        <div class="section-body">
            <div class="row">
                <!-- 主要內容 -->
                <draggable v-model="tpData" class="col-12" :group="tpAreaGroup" :itemKey="tpKey">
                    <template #item="{ element, index: parentIndex }">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 item">
                            <div class="card">
                                <div class="boxs mail_listing">
                                    <div class="inbox-body no-pad">
                                        <section class="mail-list">
                                            <div class="mail-sender">
                                                <div class="mail-heading">
                                                    <div class="vew-mail-header">
                                                        <div class="author-box-name d-flex justify-content-between"
                                                             style="margin-bottom: 20px;">
                                                            <h4 class="myCardTitle" href="#"
                                                                @mouseover="showDeleteButton"
                                                                @mouseout="hideDeleteButton"><vue-feather type="book" size="20" class="m-r-5"></vue-feather><a
                                                                    style="color: red; display: none;"
                                                                    class="m-clean"
                                                                    @click="deleteArea(parentIndex)">X</a>{{
                                                                element.areaTitle }}
                                                            </h4>
                                                            <div v-if="parentIndex === 0">
                                                                <!-- 這裡放創文日期 -->
                                                                <div class="myFont16" style="font-weight: 400;">
                                                                    文件序號：<span
                                                                        class="data float-end" style="font-style: italic; color: #e3e3e3;">文件建檔後產生</span></div>
                                                                <div class="myFont16" style="font-weight: 400;">
                                                                    建檔日期：<span
                                                                        class="data float-end" style="font-style: italic; color: #e3e3e3;">文件建檔後產生</span></div>
                                                                <!-- 這裡放計劃框架 -->
                                                                <div class="myFont16" style="font-weight: 400;">
                                                                    生效日期：<span
                                                                        class="data float-end" style="font-style: italic; color: #e3e3e3;">簽核完成後產生</span></div>
                                                                <!-- 這裡放計劃框架 -->
                                                                <div class="myFont16" style="font-weight: 400;">
                                                                    計劃框架：<span
                                                                        class="data float-end">{{ tpName }}</span></div>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <draggable v-model="element.colItem" class="row"
                                                                   :itemKey="tpKey" :group="tpGroup">
                                                            <template #item="{ element, index: childIndex }">
                                                                <div :class="['col-lg-' + element.width + ' sub-item']">
                                                                    <div class="d-flex mb-4 mt-2">
                                                                        <div class="flex-grow-1">
                                                                            <hr v-if="childIndex !== 0"/>
                                                                            <a style="color: red;" class="m-clean"
                                                                               @click="deleteItem(parentIndex, childIndex)">X</a>
                                                                            <div class="author-box-name d-flex"
                                                                                 style="margin-bottom: 20px;">
                                <span v-if="element.name !== ''" class="myFont16 d-flex align-center"
                                      style="background-color:#6777ef ;color: white;border-radius: 6px;padding: 0.3rem 0.8rem;font-weight: 400;">
                                  <vue-feather type="tag" size="20" style="transform: rotate(135deg);" class="m-r-10"></vue-feather>{{ element.name }}</span>
                                                                            </div>
                                                                            <!-- 這裡放權限控管及資料管制 -->
                                                                            <span class="data myFont16">
                                                                    <template v-if="element.type === 'subject'">
                                                                        <h4><b style="font-weight: 600;"><input
                                                                                type="text" class="form-control"
                                                                                placeholder="文件名稱"/></b></h4>
                                                                        <div class="flex-grow-1">
                                                                            <!-- 這裡放承辦單位 -->
                                                                            <div class="myFont16">申請類型：<span
                                                                                    class="data">
                                                                                <div v-for="cType in contractType" class="form-check-inline">
                                                                                    <input class="form-check-input"
                                                                                           type="radio" :id="'type_'+ cType.value">
                                                                                    <label class="form-check-label"
                                                                                           for="'type_'+ cType.value">
                                                                                        {{ cType.text }}
                                                                                    </label>
                                                                                </div>
                                                                            </span></div>
                                                                            <!-- 這裡放管理維運公司 -->
                                                                            <div class="myFont16">管理維運公司：<span
                                                                                    class="data" style="font-style: italic; color: #e3e3e3;">依發起人公司顯示</span>
                                                                            </div>
                                                                            <!-- 這裡放承辦單位 -->
                                                                            <div class="myFont16">承辦單位：<span
                                                                                    class="data" style="font-style: italic; color: #e3e3e3;">依發起人單位顯示</span></div>
                                                                            <!-- 這裡放承辦人 -->
                                                                            <div class="myFont16">承辦人：<span
                                                                                    class="data" style="font-style: italic; color: #e3e3e3;">依發起人顯示</span></div>
                                                                            <!-- 這裡放聯絡電話 -->
                                                                            <div class="myFont16">聯絡電話：<span
                                                                                    class="data" style="font-style: italic; color: #e3e3e3;">依發起人顯示</span>
                                                                            </div>
                                                                            <!-- 這裡放使用公司 -->
                                                                            <div class="myFont16">使用公司：<span
                                                                                    class="data">
                                                                                <div v-for="(company, com) in companyData"
                                                                                     class="form-check-inline">
                                                                                    <input class="form-check-input"
                                                                                           type="checkbox"
                                                                                           :id="'com_'+com">
                                                                                    <label class="form-check-label"
                                                                                           :for="'com_'+com">
                                                                                        {{ company.comTitle }}
                                                                                    </label>
                                                                                </div>
                                                                            </span></div>
                                                                            <!-- 這裡放作業種類 -->
                                                                            <div class="myFont16">作業種類：<span
                                                                                    class="data">
                                                                                <div v-for="(work, wor) in workData"
                                                                                     class="form-check-inline">
                                                                                    <input class="form-check-input"
                                                                                           type="radio"
                                                                                           :id="'wor_'+wor">
                                                                                    <label class="form-check-label"
                                                                                           for="'wor_'+wor">
                                                                                        {{ work.worTitle }}
                                                                                    </label>
                                                                                </div>
                                                                            </span></div>
                                                                        </div>
                                                                    </template>
                                                                    <template v-if="element.type.startsWith('list')">
                                                                        <select class="form-control">
                                                                            <!-- 選項列表 -->
                                    <div class="replyBox m-t-20 myFont16">
                                                                            <template v-for="option in sourceData">
                                                                                <template
                                                                                        v-if="option.catId === element.id">
                                                                                    <option>
                                                                                        {{ option.souTitle }}
                                                                                    </option>
                                                                                </template>
                                                                            </template>
                                    </div>
                                                                        </select>
                                                                    </template>
                                                                    <template v-if="element.type.startsWith('word')">
                                                                        <template v-for="option in categoryData">
                                                                            <template
                                                                                    v-if="option.catId === element.id">
                                    <div class="replyBox m-t-20 myFont16">
                          <span>{{ option.catWord }}</span>
                                    </div>
                                                                            </template>
                                                                        </template>
                                                                    </template>

                                                                    <template v-if="element.type === 'work_area'">
                                                                            <div class="table-responsive">
                                                                                <table class="myTable myTableItem">
                                                                                <caption>作業項目資料表</caption>
                                                                                    <thead>
                                                                                    <tr>
                                                                                        <th class="text-center"
                                                                                            scope="col">序號</th>
                                                                                        <th class="text-center"
                                                                                            scope="col">作業項目</th>
                                                                                        <th class="text-center"
                                                                                            scope="col">作業種類</th>
                                                                                        <th class="text-center"
                                                                                            scope="col">服務時間</th>
                                                                                        <th class="text-center"
                                                                                            scope="col">本項目使用公司</th>
                                                                                        <th class="text-center"
                                                                                            scope="col">權限控管及資料管制</th>
                                                                                        <th class="text-center"
                                                                                            scope="col">分攤比例原則</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <a style="color: red;">X</a>
                                                                                            123
                                                                                        </td>
                                                                                        <td>
                                                                                            <input type="text"
                                                                                                   class="form-control"/>
                                                                                        </td>
                                                                                        <td>
                                                                                            <select class="form-control">
                                                                                    <!-- 選項列表 -->
                                                                                    <option v-for="work in workData">{{ work.worTitle }}</option>
                                                                                </select>
                                                                                        </td>
                                                                                        <td>
                                                                                            <select class="form-control">
                                                                                    <!-- 選項列表 -->
                                                                                    <option>請選擇</option>
                                                                                    <option>時間一</option>
                                                                                    <option>時間二</option>
                                                                                    <option>時間三</option>
                                                                                </select>
                                                                                        </td>
                                                                                        <td>
                                                                                <div v-for="(company, com) in companyData"
                                                                                     class="form-check-inline">
                                                                                    <input class="form-check-input"
                                                                                           type="checkbox"
                                                                                           :id="'com_'+com">
                                                                                    <label class="form-check-label"
                                                                                           :for="'com_'+com">
                                                                                        {{ company.comTitle }}
                                                                                    </label>
                                                                                </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <input type="text"
                                                                                                   class="form-control"/>
                                                                                        </td>
                                                                                        <td>
                                                                                            <select class="form-control">
                                                                                                <option value="" disabled>請選擇</option>
                                                                                                <option v-for="distribution in distributionData" :value="distribution.disId">{{ distribution.disTitle }}</option>
                                                                                            </select>

                                                                                        </td>
                                                                                    </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        <p><button class="btn btn-success btn-icon">
                                                                            <vue-feather type="plus"></vue-feather>
                                                                        </button></p>
                                                                    </template>
                                                                    <template v-if="element.type === 'sign'">
                                                                                <label>維運</label>
                                                                                <div class="table-responsive">
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
                                                                                            <td>
                                                                                                X公司
                                                                                            </td>
                                                                                            <td>
                                                                                                X部門
                                                                                            </td>
                                                                                            <td>
                                                                                                X科別
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">承辦人</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">科別主管</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">部門主管</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">窗口</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td class="text-center">
                                                                                                02-2222-2222#222
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                                <div class="table-responsive">
                                                                                    <table class="myTable myTableMemberM">
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
                                                                                        <tr>
                                                                                            <td>
                                                                                                X公司
                                                                                            </td>
                                                                                            <td>
                                                                                                X部門
                                                                                            </td>
                                                                                            <td>
                                                                                                X科別
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">承辦人</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">科別主管</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">部門主管</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td class="text-center">
                                                                                                02-2222-2222#222
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <a style="color: red;">X</a>
                                                                                                X公司
                                                                                            </td>
                                                                                            <td>
                                                                                                X部門
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">部門主管</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                X科別
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">科別主管</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">承辦人</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td class="text-center">
                                                                                                02-2222-2222#222
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                                <p><button
                                                                                        class="btn btn-success btn-icon">
                                                                                <vue-feather type="plus"></vue-feather>
                                                                                </button></p>
                                                                                <label>使用</label>
                                                                                <div class="table-responsive">
                                                                                    <table class="myTable myTableMemberU">
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
                                                                                        <tr>
                                                                                            <td>
                                                                                                <a style="color: red;">X</a>
                                                                                                X公司
                                                                                            </td>
                                                                                            <td>
                                                                                                X部門
                                                                                            </td>
                                                                                            <td>
                                                                                                X科別
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">承辦人</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">科別主管</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td>
                                                                                                <select class="form-select">
                                                                                                    <option value="">部門主管</option>
                                                                                                </select>
                                                                                            </td>
                                                                                            <td class="text-center">
                                                                                                02-2222-2222#222
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                                <p><button
                                                                                        class="btn btn-success btn-icon">
                                                                                    <vue-feather type="plus"></vue-feather>
                                                                                </button></p>
                                                                    </template>

                                                                    <template v-if="element.type === 'file_area'">
                                                                        <div class="replyBox m-t-20 myFont16">
                                                              <span>
                                                                <!-- 這裡放共幾則附檔 -->
                                                                <i class="fa fa-paperclip mb-1"></i> <span>3則</span>附加檔案 </span>
                                                                            <!-- 這裡放附檔 -->
                                                                            <div>
                                                                                <a href="#">顧問報告.pdf</a> |
                                                                                <a href="#">顧問報告.pdf</a> |
                                                                                <a href="#">顧問報告.pdf</a> |
                                                                            </div>
                                                                        </div>
                                                                    </template>

                                                                    <template v-if="element.type === 'select'">
                                                                        <template v-if="element.tip === ''">
                                                                        <select class="form-control">
                                                                            <!-- 選項列表 -->
                                                                            <option v-for="option in element.option.split('|')"
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
                                                                            <option v-for="option in element.option.split('|')"
                                                                                    :value="option">
                                                                                {{ option }}
                                                                            </option>
                                                                        </select>
                                                                            <!-- 以上放edit元件 -->
                                                                          <div class="help-tip">
                                                                            <p>{{ element.tip }}</p>
                                                                          </div>
                                                                        </div>
                                                                        </template>
                                                                    </template>
                                                                    <template v-if="element.type === 'radio'">
                                                                        <template v-if="element.tip === ''">
                                                                            <div v-for="option in element.option.split('|')"
                                                                                 class="form-check-inline">
                                                                                    <input type="radio" :value="option"
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
                                                                            <div v-for="option in element.option.split('|')"
                                                                                 class="form-check-inline">
                                                                                    <input type="radio" :value="option"
                                                                                           class="form-check-input"
                                                                                           :id="'radio_'+parentIndex+'_'+childIndex">

                                                                                    <label class="form-check-label"
                                                                                           :for="'radio_'+parentIndex+'_'+childIndex">{{ option }}</label>
                                                                            </div>
                                                                            <!-- 以上放edit元件 -->
                                                                          <div class="help-tip">
                                                                            <p>{{ element.tip }}</p>
                                                                          </div>
                                                                        </div>
                                                                        </template>
                                                                    </template>
                                                                    <template v-if="element.type === 'check'">
                                                                        <template v-if="element.tip === ''">
                                                                            <div v-for="option in element.option.split('|')"
                                                                                 class="form-check-inline">
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
                                                                            <div v-for="option in element.option.split('|')"
                                                                                 class="form-check-inline">
                                                                                    <input type="checkbox"
                                                                                           :value="option"
                                                                                           class="form-check-input"
                                                                                           :id="'radio_'+parentIndex+'_'+childIndex">

                                                                                    <label class="form-check-label"
                                                                                           :for="'radio_'+parentIndex+'_'+childIndex">{{ option }}</label>
                                                                            </div>
                                                                            <!-- 以上放edit元件 -->
                                                                          <div class="help-tip">
                                                                            <p>{{ element.tip }}</p>
                                                                          </div>
                                                                        </div>
                                                                        </template>
                                                                    </template>
                                                                    <template v-if="element.type === 'text'">
                                                                        <template v-if="element.tip === ''">
                                                                        <input type="text" class="form-control"/>
                                                                        </template>
                                                                        <template v-else>
                                                                        <div class="myToolTipContainer d-flex"
                                                                             style="width: 200px;">
                                                                          <!-- 以下放edit元件 -->
                                                                        <input type="text" class="form-control"/>
                                                                            <!-- 以上放edit元件 -->
                                                                          <div class="help-tip">
                                                                            <p>{{ element.tip }}</p>
                                                                          </div>
                                                                        </div>
                                                                        </template>
                                                                    </template>
                                                                    <template v-if="element.type === 'box'">
                                                                        <template v-if="element.tip === ''">
                                                                        <textarea class="form-control"></textarea>
                                                                        </template>
                                                                        <template v-else>
                                                                        <div class="myToolTipContainer d-flex"
                                                                             style="width: 200px;">
                                                                          <!-- 以下放edit元件 -->
                                                                        <textarea class="form-control"></textarea>
                                                                            <!-- 以上放edit元件 -->
                                                                          <div class="help-tip">
                                                                            <p>{{ element.tip }}</p>
                                                                          </div>
                                                                        </div>
                                                                        </template>
                                                                    </template>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                        </draggable>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>
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
                    <h6 class="font-medium m-b-10">樣板名稱</h6>
                    <ul class="contact-list">
                        <li class="nav-item">
                            <input type="text" class="form-control" v-model="tpName" placeholder="請輸入專案名稱"/>
                        </li>
                    </ul>
                    <div class="col-lg-12">
                        <div class="m-l-20">
                            <button @click="createTemplate"
                                    :disabled="tpData === '' || tpData.length === 0 || tpName === ''"
                                    type="button"
                                    class="m-r-5 btn btn-success btn-border-radius waves-effect myFont16">完成送出
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">欄位名稱</h6>
                    <ul class="contact-list">
                        <li class="nav-item">
                            <input type="text" class="form-control" v-model="colName" placeholder="請輸入欄位名稱"/>
                        </li>
                    </ul>
                    <h6 class="font-medium m-b-10">欄位說明</h6>
                    <ul class="contact-list">
                        <li class="nav-item">
                            <input type="text" class="form-control" v-model="colTip" placeholder="請輸入欄位說明"
                                   :disabled="!['select', 'radio', 'check', 'text', 'box'].includes(colType)"/>
                        </li>
                    </ul>
                    <div class="row">
                        <div class="col-lg-6">
                            <h6 class="font-medium m-b-10">寬度</h6>
                            <ul class="contact-list">
                                <li class="nav-item">
                                    <select v-model="colWidth" class="form-control">
                                        <option value="">請選擇</option>
                                        <option v-for="option in colWidthData" :value="option">{{ option }}</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <h6 class="font-medium m-b-10">類型</h6>
                            <ul class="contact-list">
                                <li class="nav-item">
                                    <select v-model="colType" class="form-control">
                                        <option value="">請選擇</option>
                                        <optgroup label="必選欄位">
                                            <option v-for="option in colNecessary" :value="option.type"
                                                    :data-id="option.id"
                                                    :disabled="hasType(option.type)">{{ option.text }}
                                            </option>
                                        </optgroup>
                                        <optgroup label="其他欄位">
                                            <option v-for="option in colCustomized" :value="option.type"
                                                    :data-id="option.id">{{
                                                option.text }}
                                            </option>
                                        </optgroup>
                                        <optgroup label="自訂選單">
                                            <template v-for="option in categoryData">
                                                <template v-if="option.catType === 'list'">
                                                    <option :value="option.catType+'-'+option.catId">{{ option.catTitle
                                                        }}
                                                    </option>
                                                </template>
                                            </template>
                                        </optgroup>
                                        <optgroup label="自訂文字">
                                            <template v-for="option in categoryData">
                                                <template v-if="option.catType === 'word'">
                                                    <option :value="option.catType+'-'+option.catId">{{ option.catTitle
                                                        }}
                                                    </option>
                                                </template>
                                            </template>
                                        </optgroup>
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h6 class="font-medium m-b-10">資料(僅多資料欄位適用)</h6>
                    <ul class="contact-list">
                        <li class="nav-item">
                            <input type="text" class="form-control" v-model="colOption" placeholder="請輸入資料並用|分開"
                                   :disabled="isTextDisabled()"/>
                        </li>
                    </ul>
                    <div class="col-lg-12">
                        <div class="m-l-20">
                            <button @click="setAddCol"
                                    :disabled="colWidth === '' || colType === '' || (['select', 'radio', 'check'].includes(colType) && colOption === '')"
                                    type="button"
                                    class="m-r-5 btn btn-primary btn-border-radius waves-effect myFont16">欄位生成
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-12 m-t-10 m-b-10">
                        <div class="m-l-20">
                            <draggable v-model="tpAddData" class="row" :group="tpAddGroup" :itemKey="tpKey" put="false">
                                <template #item="{ element, index }">
                                    <div :class="['col-' + element.width + ' layout-spacing sub-item m-move add-box']">
                                        {{ element.name }}
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>

                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">加入區域</h6>
                    <ul class="contact-list">
                        <li class="nav-item">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" v-model="txtAreaTitle" placeholder="區塊名稱"
                                       aria-label="Recipient's username" aria-describedby="button-addon2">
                                <button class="btn btn-primary _effect--ripple waves-effect waves-light" type="button"
                                        @click="setArea"
                                        :disabled="txtAreaTitle === ''">加入
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="p-15 border-bottom" style="height: 100px;">
                </div>
            </div>
        </div>
    </div>
    <!-- 浮動控制版 -->
</template>

<script>
    import draggable from 'vuedraggable';
    import Template from "./Template";
    import { controlBoxMixin } from '@/mixins/controlBoxMixin.js';

    export default {
        name: "Template_ad",
        mixins: [controlBoxMixin],
        components: {
            Template,
            draggable
        },
        watch: {
            '$route': {
                handler(newRoute, oldRoute) {
                    this.defaultData();
                    this.fetchFirst();
                },
                immediate: true,
            },
        },
        mounted() {
            // 添加全域點擊事件監聽器
            window.addEventListener('click', this.handleGlobalClick);
        },
        beforeUnmount() {
            // 在元件銷毀之前移除事件監聽器
            window.removeEventListener('click', this.handleGlobalClick);
        },
        data() {
            return {
                isSidebarVisible: false,
                distributionData: [//費用分攤
                    {disId: 0, disTitle: ''},
                ],
                workData: [//作業種類
                    {worId: 0, worTitle: ''},
                ],
                companyData: [//公司
                    {comId: 0, comTitle: '', comCode: ''},
                ],
                categoryData: [//選單類型
                    {catId: 0, catTitle: '', catType: '', catWord: ''},
                ],
                sourceData: [//選單類型
                    {souId: 0, catId: 0, souTitle: ''},
                ],
                contractType:[{text:'新增', value:0}, {text:'變更', value:1}, {text:'終止', value:2}, ],
                tpName: "",//樣板名稱
                tpAreaGroup: {//樣板區塊
                    pull: false,
                },
                tpGroup: {//樣板
                    put: true,
                    pull: true,
                },
                tpAddGroup: {//欲新增資料區塊
                    put: false,//放入
                    pull: true,//挪出
                },
                tpData: [//樣板資料
                    // {
                    //     areaTitle: 'Item 1',
                    //     colItem: [
                    //         // {
                    //         //     name: this.colName,
                    //         //     width: this.colWidth,
                    //         //     type: this.colType,
                    //         //     option: this.colOption
                    //         //     value: ''
                    //         // },
                    //         {
                    //             name: '下拉選單',
                    //             width: '6',
                    //             type: 'select',
                    //             option: '1|2|3',
                    //             value: '1',
                    //             id: 0,
                    //             check: [],
                    //         },
                    //         {
                    //             name: '單選按鈕',
                    //             width: '6',
                    //             type: 'radio',
                    //             option: '1|2|3',
                    //             value: '3',
                    //             id: 0,
                    //             check: [],
                    //         },
                    //         {
                    //             name: '勾選方塊',
                    //             width: '6',
                    //             type: 'check',
                    //             option: '1|2|3',
                    //             value: '2',
                    //             id: 0,
                    //             check: [],
                    //         },
                    //         {
                    //             name: '單行文字',
                    //             width: '6',
                    //             type: 'text',
                    //             option: '1|2|3',
                    //             value: '1',
                    //             id: 0,
                    //             check: [],
                    //         },
                    //         {
                    //             name: '多行文字',
                    //             width: '6',
                    //             type: 'box',
                    //             option: '1|2|3',
                    //             value: '1',
                    //             id: 0,
                    //             check: [],
                    //         },
                    //     ]
                    // },
                ],
                tpAddData: [//欲新增資料
                    // {name: '', width: '6', type:'', value:''},
                ],
                tpKey: "tp", // 使用tp作為itemKey，您也可以根據需要更改
                txtAreaTitle: "",//區塊名稱
                colName: "",//欄位名稱
                colTip: "",//欄位說明
                colWidth: "",//欄位寬度
                colType: "",//欄位類型
                colOption: "",//資料
                colCheck: [],//checkbox用
                colId: 0,
                colWidthData: ['3', '6', '12'],
                colNecessary: [//必要欄位
                    {text: "主旨", type: "subject", name: "主旨", tip: '', width: "12", id: 0},
                    // {text: "序號", type: "serial", name: "序號", tip: '', width: "12", id: 0},
                    // {text: "申請類別", type: "type", name: "申請類別", tip: '', width: "12", id: 0},
                    // {text: "共用計畫書名稱", type: "plan_name", name: "共用計畫書名稱", tip: "", width: "12", id: 0},
                    // {text: "共用計劃框架", type: "frame", name: "共用計劃框架", tip: '', width: "12", id: 0},
                    // {text: "生效日期", type: "take", name: "生效日期", tip: '', width: "12", id: 0},
                    // {text: "管理維運公司", type: "aegis", name: "管理維運公司", tip: '', width: "12", id: 0},
                    // {text: "使用公司", type: "company", name: "使用公司", tip: '', width: "12", id: 0},
                    // {text: "作業種類", type: "work", name: "作業種類", tip: '', width: "12", id: 0},

                    {text: "共用作業項目區塊", type: "work_area", name: "共用作業項目", tip: '', width: "12", id: 0},
                    {text: "附件區塊", type: "file_area", name: "附件", tip: '', width: "12", id: 0},
                    {text: "簽核流程區塊", type: "sign", name: "簽核流程", tip: '', width: "12", id: 0},
                ],
                colCustomized: [//自訂欄位
                    {text: "下拉選單", type: "select", tip: '', id: 0},
                    {text: "單選按鈕", type: "radio", tip: '', id: 0},
                    {text: "勾選方塊", type: "check", tip: '', id: 0},
                    {text: "單行文字", type: "text", tip: '', id: 0},
                    {text: "多行文字", type: "box", tip: '', id: 0},
                ],
                colEstablished: [//既定資料
                    {text: '', type: 'list', name: '', tip: '', width: '', id: 0},
                    {text: '', type: 'word', name: '', tip: '', width: '', id: 0},
                ]

            };
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=work' : '/api/iform/work/List'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company/List'),
                    this.$api.get(this.$test ? '/api/?type=category' : '/api/iform/category/List'),
                    this.$api.get(this.$test ? '/api/?type=source' : '/api/iform/source/List'),
                    this.$api.get(this.$test ? '/api/?type=distribution' : '/api/iform/distribution/List'),
                ];
                Promise.all(apiRequests)
                    .then(([workResponse, companyResponse, categoryResponse, sourceResponse, distributionResponse]) => {
                        //workResponse
                        this.workData = workResponse.data.data;
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //categoryResponse
                        this.categoryData = categoryResponse.data.data;
                        //sourceResponse
                        this.sourceData = sourceResponse.data.data;
                        //distributionResponse
                        this.distributionData = distributionResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            deleteArea(index) {
                this.tpData.splice(index, 1);
            },
            deleteItem(parentIndex, childIndex) {
                this.tpData[parentIndex].colItem.splice(childIndex, 1);
            },
            setAddCol() {
                if (this.tpAddData.length > 0) {
                    // 如果有資料，則替換第一筆資料
                    this.tpAddData.splice(0, 1, {
                        name: this.colName,
                        tip: this.colTip,
                        width: this.colWidth,
                        type: this.colType,
                        option: this.colOption,
                        value: '',
                        id: this.colId,
                        check: this.colCheck,
                    });
                } else {
                    // 如果沒有資料，則新增一筆資料
                    this.tpAddData.push({
                        name: this.colName,
                        tip: this.colTip,
                        width: this.colWidth,
                        type: this.colType,
                        option: this.colOption,
                        value: '',
                        id: this.colId,
                        check: this.colCheck,
                    });
                }
                this.colName = "";
                this.colTip = "";
                this.colType = "";
                this.colOption = "";
                this.colWidth = "";
                this.colCheck = [];
                this.colId = 0;
            },
            isTextDisabled() {
                if (this.colNecessary.some(item => this.colType === item.type)) {
                    let optionData = this.colNecessary.find(item => item.type === this.colType);
                    this.colName = optionData ? optionData.text : '';
                    this.colId = 0;
                    return true;
                }
                if (this.colCustomized.some(item => this.colType === item.type)) {
                    this.colId = 0;
                    return false;
                }
                if (this.colType.startsWith('list')) {
                    let id = parseInt(this.colType.replace(/^list-/, ''));
                    // let optionData = this.sourceData.filter(item => item.catId === id);
                    // let optionString = optionData.map(item => item.souTitle);
                    // this.colOption = optionString.join('|');
                    // this.colOption = id;
                    this.colId = id;
                }
                if (this.colType.startsWith('word')) {
                    let id = parseInt(this.colType.replace(/^word-/, ''));
                    // let optionData = this.categoryData.find(item => item.catId === id);
                    // this.colOption = optionData ? optionData.catWord : '';
                    // this.colOption = id;
                    this.colId = id;
                }
                return true;
            },
            setArea() {
                this.tpData.push({areaTitle: this.txtAreaTitle, colItem: []});
                this.txtAreaTitle = '';
            },
            showDeleteButton(event) {
                const deleteButton = event.currentTarget.querySelector('.m-clean');
                if (deleteButton) {
                    deleteButton.style.display = 'revert';
                }
            },
            hideDeleteButton(event) {
                const deleteButton = event.currentTarget.querySelector('.m-clean');
                if (deleteButton) {
                    deleteButton.style.display = 'none';
                }
            },
            hasType(type) {
                return this.tpData.some(area => {
                    return area.colItem.some(item => item.type === type);
                });
            },
            setDefData() {
                // this.colOption = '';
                // if (this.colNecessary.some(option => option.type === this.colType)) {
                //     const colNecessaryOption = this.colNecessary.find(option => option.type === this.colType);
                //     this.tpAddData = [{
                //         name: colNecessaryOption.name,
                //         width: colNecessaryOption.width,
                //         type: colNecessaryOption.type,
                //         option: "",
                //         value: "",
                //     }];
                //     this.colType = "";
                //     // console.log(this.tpAddData);
                //     // 如果選擇屬於 colNecessary 選項，執行特定動作
                //     // 在這裡添加您想執行的程式碼
                // }
                // else {
                //     this.tpAddData = [];
                // }
            },
            createTemplate() {
                const jsonData = JSON.stringify(this.tpData);
                const payload = {
                    temTitle: this.tpName,
                    temStyle: jsonData,
                };
                this.$api
                    .post(this.$test ? '/api/?type=template' : '/api/iform/template', payload)
                    .then(response => {
                        console.log(response.data);
                        if (response.status === 200) {
                            this.$router.push(`/template/sl/${response.data.temId}`);
                        } else {
                            console.log('err');
                        }

                    })
                    .catch(error => {
                        console.error('Edit failed:', error);
                    });
            },
        },
    };
</script>

<style scoped>

    .m-clean {
        cursor: pointer;
    }

    .item {
        min-height: 100px;
        border-style: double;
        border-width: 1px;
        border-color: white;
        background-color: #f2f2f2;
        cursor: move;
    }

    .item:hover {
        border-style: dashed;
        border-color: black;
        background-color: #f2f2f2;
    }

    .sub-item {
        border-style: double;
        border-width: 1px;
        border-color: white;
    }

    .sub-item:hover {
        border-style: dashed;
        border-color: black;
        background-color: #e6e6e6;
    }

    .m-move {
        cursor: move;
    }

    .add-box {
        background-color: #e3e3e3;
        min-height: 30px;
    }
</style>
