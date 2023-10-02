<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">樣板管理</h4>
            </li>
            <li class="breadcrumb-item">查看樣板</li>
        </ul>
        <div class="section-body">
            <div class="row">
                <!-- 主要內容 -->
                <template v-for="(item, parentIndex) in tpData" class="col-12" :group="tpAreaGroup" :itemKey="tpKey">
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
                                                                item.areaTitle }}
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
                                                        <template v-for="(col, childIndex) in item.colItem" class="row"
                                                                   :itemKey="tpKey" :group="tpGroup">
                                                                <div :class="['col-lg-' + col.width + ' sub-item']">
                                                                    <div class="d-flex mb-4 mt-2">
                                                                        <div class="flex-grow-1">
                                                                            <hr v-if="childIndex !== 0"/>
                                                                            <div class="author-box-name d-flex"
                                                                                 style="margin-bottom: 20px;">
                                <span v-if="col.name !== ''" class="myFont16 d-flex align-center"
                                      style="background-color:#6777ef ;color: white;border-radius: 6px;padding: 0.3rem 0.8rem;font-weight: 400;">
                                  <i class="material-icons" style="margin-right: 8px;">label_outline</i>{{ col.name }}</span>
                                                                            </div>
                                                                            <!-- 這裡放權限控管及資料管制 -->
                                                                            <span class="data myFont16">
                                                                    <template v-if="col.type === 'subject'">
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
                                                                    <template v-if="col.type.startsWith('list')">
                                                                        <select class="form-control">
                                                                            <!-- 選項列表 -->
                                    <div class="replyBox m-t-20 myFont16">
                                                                            <template v-for="option in sourceData">
                                                                                <template
                                                                                        v-if="option.catId === col.id">
                                                                                    <option>
                                                                                        {{ option.souTitle }}
                                                                                    </option>
                                                                                </template>
                                                                            </template>
                                    </div>
                                                                        </select>
                                                                    </template>
                                                                    <template v-if="col.type.startsWith('word')">
                                                                        <template v-for="option in categoryData">
                                                                            <template
                                                                                    v-if="option.catId === col.id">
                                    <div class="replyBox m-t-20 myFont16">
                          <span>{{ option.catWord }}</span>
                                    </div>
                                                                            </template>
                                                                        </template>
                                                                    </template>

                                                                    <template v-if="col.type === 'work_area'">
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
                                                                                                <option value=""
                                                                                                        disabled>請選擇</option>
                                                                                                <option v-for="distribution in distributionData"
                                                                                                        :value="distribution.disId">{{ distribution.disTitle }}</option>
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
                                                                    <template v-if="col.type === 'sign'">
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

                                                                    <template v-if="col.type === 'file_area'">
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
                                                                            <div v-for="option in col.option.split('|')"
                                                                                 class="form-check-inline">
                                                                                    <input type="radio" :value="option"
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
                                                                            <div v-for="option in col.option.split('|')"
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
                    <h6 class="font-medium m-b-10">簽核文件</h6>
                    <div class="col-lg-12">
                        <div class="m-l-20">
                            <button type="button"
                                    class="m-r-5 btn btn-info btn-border-radius waves-effect myFont16">簽核
                            </button>
                            <button type="button"
                                    class="btn btn-danger btn-border-radius waves-effect myFont16">拒絕
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">文件操作</h6>
                    <ul class="contact-list">
                        <li class="nav-item">
                            <a class="nav-link myFont16" href="javascript:void(0);">
                                <i class="fas fa-file-download"></i> 下載WORD檔
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link myFont16" href="javascript:void(0);">
                                <i class="fas fa-file-download"></i> 下載PDF檔
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link myFont16" href="javascript:void(0);">
                                <i class="fas fa-clone"></i> 複製公文
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link myFont16" href="javascript:void(0);">
                                <i class="fas fa-history"></i> 公文修改紀錄
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">文件架構</h6>
                    <ul class="contact-list">
                        <li v-for="(item, index) in tpData" class="nav-item">
                            <a class="nav-link myFont16" href="javascript:void(0);" @click="scrollToElement('my' + index)">
                                {{ item.areaTitle }}
                            </a>
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

    export default {
        name: "Template_sl",
        components: {
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
        computed: {
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
                templateData: null,
                temId: 0,
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
                tpAreaGroup: {//樣板區塊
                    pull: false,
                    put: false,
                },
                tpGroup: {//樣板
                    put: false,
                    pull: false,
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
                    //         },
                    //         {
                    //             name: '單選按鈕',
                    //             width: '6',
                    //             type: 'radio',
                    //             option: '1|2|3',
                    //             value: '3',
                    //             id: 0,
                    //         },
                    //         {
                    //             name: '勾選方塊',
                    //             width: '6',
                    //             type: 'check',
                    //             option: '1|2|3',
                    //             value: '2',
                    //             id: 0,
                    //         },
                    //         {
                    //             name: '單行文字',
                    //             width: '6',
                    //             type: 'text',
                    //             option: '1|2|3',
                    //             value: '1',
                    //             id: 0,
                    //         },
                    //         {
                    //             name: '多行文字',
                    //             width: '6',
                    //             type: 'box',
                    //             option: '1|2|3',
                    //             value: '1',
                    //             id: 0,
                    //         },
                    //     ]
                    // },
                ],
                tpKey: "tp", // 使用tp作為itemKey，您也可以根據需要更改
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
                this.temId = this.$route.params.id; // 取得路由參數 id
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=template&temId=${this.temId}` : `/api/iform/template/${this.temId}`),
                    this.$api.get(this.$test ? '/api/?type=work' : '/api/iform/work'),
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                    this.$api.get(this.$test ? '/api/?type=category' : '/api/iform/category'),
                    this.$api.get(this.$test ? '/api/?type=source' : '/api/iform/source'),
                    this.$api.get(this.$test ? '/api/?type=distribution' : '/api/iform/distribution'),
                ];
                Promise.all(apiRequests)
                    .then(([templateResponse, workResponse, companyResponse, categoryResponse, sourceResponse, distributionResponse]) => {
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                        this.tpName = this.templateData.temTitle;
                        this.tpData = JSON.parse(this.templateData.temStyle);
                        console.log(this.tpData);
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
            hasType(type) {
                return this.tpData.some(area => {
                    return area.colItem.some(item => item.type === type);
                });
            },
            handleGlobalClick(event) {
                const sidebar = this.$refs.sidebar;
                if (this.isSidebarVisible && !sidebar.contains(event.target)) {
                    // 如果側邊欄可見且點擊事件不在側邊欄內部，則隱藏側邊欄
                    this.isSidebarVisible = false;
                }
            },
            sidebarClick(){
                if (!this.isSidebarVisible) {
                    this.isSidebarVisible = true;
                }
                else {
                    this.isSidebarVisible = false;
                }
            },
            scrollToElement(element_id) {
                // 取得要捲動到的目標元素
                const targetElement = document.getElementById(element_id);

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
