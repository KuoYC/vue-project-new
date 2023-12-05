<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">樣板管理</h4>
            </li>
            <li class="breadcrumb-item"><router-link :to="`/template`"><vue-feather type="link"></vue-feather>樣板列表</router-link></li>
            <li class="breadcrumb-item">查看樣板</li>
        </ul>
        <div class="section-body">
            <template v-for="(item, parentIndex) in tpData" class="col-12">
                    <div class="col-12 myRwd" :id="'my'+parentIndex">
                        <div v-if="item.areaType === '1'" class="card contract-title">
                            <div class="author-box-name d-flex justify-content-between"
                                 style="margin-bottom: 20px;padding: 10px 25px;border-bottom-color: #f9f9f9;">
                                <h4 class="myCardTitle" style="font-size: x-large;">
                                    {{ tpName }}
                                    <vue-feather v-if="item.areaNote !== ''" v-tooltip="{ content: item.areaNote, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                </h4>
                                <div class="contract-serial">
                                    <!-- 這裡放文件序號 -->
                                    <div style="font-weight: 400;">文件序號：<span class="date" style="font-style: italic; color: #e3e3e3;">文件建檔後產生</span>
                                    </div>
                                    <!-- 這裡放創文日期 -->
                                    <div style="font-weight: 400;">創文日期：<span class="date" style="font-style: italic; color: #e3e3e3;">文件建檔後產生</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body myNotification d-flex">
                                <div class="myFont16Title" style="margin: 0 10px;">申請單位： <span class="date myFont16" style="font-style: italic; color: #e3e3e3;">自動帶入</span></div>
                                <div class="myFont16Title" style="margin: 0 10px;">申請人： <span class="date myFont16" style="font-style: italic; color: #e3e3e3;">自動帶入</span></div>
                                <div class="myFont16Title" style="margin: 0 10px;">聯絡電話： <span
                                        class="date myFont16" style="font-style: italic; color: #e3e3e3;">自動帶入</span></div>
                            </div>
                            <div class="card-body myNotification d-flex">
                                <div class="myFont16Title" style="margin: 0 10px;">申請類型： <span class="date myFont16" style="font-style: italic; color: #e3e3e3;">自動帶入</span></div>
                            </div>
                        </div>
                        <div v-else-if="item.areaType === '2'" class="card">
                            <div class="card-header justify-content-between">
                                <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center" style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                    <vue-feather type="tag" size="20" style="transform: rotate(135deg); padding-right: 0px;"
                                                 class="m-r-5"></vue-feather>{{ item.areaTitle }}</span>
                                    <vue-feather v-if="item.areaNote !== ''" v-tooltip="{ content: item.areaNote, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                </h4>
                            </div>
                            <div class="card-body myNotification">
                                <p>僅供各公司簽核參考，實際收付款以當年度分攤收付款簽呈為主。</p>
                                <div class="table-responsive">
                                    <table class="newTable">
                                        <caption>預計分攤費用資料表</caption>
                                        <thead style="position: sticky;top: 0;" class="myNew">
                                        <tr>
                                            <th style="min-width: 100px;"
                                                scope="col"></th>
                                            <th v-for="com in companyData"
                                                scope="col" style="min-width:120px; max-width: 120px;">{{ com.comTitle }}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                分攤比例
                                            </td>
                                            <td v-for="com in companyData">
                                                0%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                分攤費用
                                            </td>
                                            <td v-for="com in companyData">
                                                <input type="text" class="form-control"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div v-else class="card">
                            <div class="card-header justify-content-between">
                                <h4 class="myCardTitle">
                                    <span class="myFont16 d-flex align-center" style="background-color: #26a862; color: white; border-radius: 6px; padding: 0.3rem 0.8rem; font-weight: 400;">
                                    <vue-feather type="tag" size="20" style="transform: rotate(135deg); padding-right: 0px;"
                                                 class="m-r-5"></vue-feather>{{ item.areaTitle }}</span>
                                    <vue-feather v-if="item.areaNote !== ''" v-tooltip="{ content: item.areaNote, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                </h4>
                            </div>
                            <div class="card-body myNotification">
                                <div class="row">
                                    <template v-for="(col, childIndex) in item.colItem" class="row">
                                        <div :class="['col-' + col.width + ' sub-item']">
                                                <template v-if="col.type === 'subject'">
                                                    <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 col-4 p-t-10">{{ col.name }}
                                                        <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                    </label>
                                                    <div class="row">
                                                        <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                            <label class="myFont16 col-4  p-t-10">共用計劃書名稱</label>
                                                            <input type="text" class="form-control" style="background-color: white;"
                                                                   placeholder="請輸入文字">
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                            <label class="myFont16 col-4  p-t-10">共用計劃框架</label>
                                                            <select class="form-control">
                                                                <option>請選擇框架</option>
                                                                <option v-for="frm in frameData" :value="frm.frmId">{{ frm.frmTitle }}</option>
                                                            </select>
                                                        </div>
                                                        <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                            <label class="myFont16 col-4  p-t-10">生效日期</label>
                                                            <DatePicker format="yyyy-MM-dd"
                                                                        locale="zh-tw"
                                                                        :enable-time-picker="false"
                                                                        placeholder="未填寫將以簽核完成日為依據"
                                                                        style="width: auto;"/>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                            <label class="myFont16 col-4  p-t-10">維運公司</label>
                                                            <input disabled type="text" class="form-control" placeholder="自動帶入" style="background-color: white; font-style: italic; color: #e3e3e3;">
                                                        </div>
                                                    </div>

                                                    <div class="row" style="padding-left: 8px;">
                                                        <label class="myFont16 mb-1">使用公司</label>
                                                        <div class="d-flex">
                                                            <div v-for="com in companyData" class="form-check">
                                                                <input class="form-check-input" type="checkbox" :id="'com_'+com.comId" checked="">
                                                                <label class="form-check-label" :for="'com_'+com.comId">{{ com.comTitle }}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="padding-left: 8px;">
                                                        <label class="myFont16 mb-1">作業種類</label>
                                                        <div class="d-flex">
                                                            <div v-for="wor in workData" class="form-check">
                                                                <input class="form-check-input" type="checkbox" :id="'wor_'+wor.worId" checked="">
                                                                <label class="form-check-label" :for="'wor_'+wor.worId">{{ wor.worTitle }}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-if="col.type.startsWith('list')">
                                                    <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 p-t-10">{{ col.name }}
                                                        <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                    </label>
                                                    <select class="form-control">
                                                        <template v-for="option in sourceData">
                                                            <option v-if="String(option.catId) === String(col.id)">
                                                                {{ option.souTitle }}
                                                            </option>
                                                        </template>
                                                    </select>
                                                </template>
                                                <template v-if="col.type.startsWith('word')">
                                                    <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 p-t-10">{{ col.name }}
                                                        <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                    </label>
                                                    <template v-for="option in categoryData">
                                                        <div v-if="String(option.catId) === String(col.id)" class="row">
                                                            <p class="myFont16">{{ option.catWord }}</p>
                                                        </div>
                                                    </template>
                                                </template>
                                                <template v-if="col.type === 'work_area'">
                                                    <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 p-t-10">{{ col.name }}
                                                        <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                    </label>
                                                    <div style="border-radius: 3px; border: 1px solid #ced4da;">
                                                        <div style="background-color:#EAF7ED ;padding-top: 10px;padding-left: 10px;">
                                                            <div class="row">
                                                                <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                                    <label class="myFont16 col-4 p-t-10">共用作業項目</label>
                                                                    <input type="text" class="form-control" placeholder="請輸入文字">
                                                                </div>
                                                                <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                                    <label class="myFont16 col-4 p-t-10">作業種類</label>
                                                                    <select class="form-control">
                                                                        <!-- 選項列表 -->
                                                                        <option v-for="wor in workData"
                                                                                :value="wor.worId">
                                                                            {{ wor.worTitle }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style="padding:10px 10px;">
                                                            <div class="row">
                                                                <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                                    <label class="myFont16 col-4 p-t-10">費用分攤原則</label>
                                                                    <input type="text" class="form-control" placeholder="請輸入文字">
                                                                </div>
                                                                <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                                    <label class="myFont16 col-4 p-t-10">計算基礎</label>
                                                                    <input type="text" class="form-control" placeholder="請輸入文字">
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                                    <label class="myFont16 col-4 p-t-10">服務時間</label>
                                                                    <input type="text" class="form-control" placeholder="請輸入文字">
                                                                </div>
                                                            </div>

                                                            <div class="row" style="padding-left: 20px;">
                                                                <label class="myFont16 col-4 p-t-10" style="padding-left: 0;">權限控管及資料管制</label>
                                                                <textarea class="my-form-control" spellcheck="false" placeholder="請輸入標題" style="width: 98%;"></textarea>
                                                            </div>

                                                            <div class="row" style="padding-left: 8px;margin-top: 20px;">
                                                                <label class="myFont16 mb-1">使用公司</label>
                                                                <div class="d-flex my-list">
                                                                    <ul>
                                                                        <li v-for="com in companyData" class="form-check">
                                                                            <input class="form-check-input" type="checkbox" :id="['cbx_com_' + com.comId]" checked="">
                                                                            <label class="form-check-label" :for="['cbx_com_' + com.comId]">{{ com.comTitle }}</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div class="row" style="padding-left: 8px;">
                                                                <label class="myFont16 mb-1">使用公司固定分攤比例</label>
                                                                <div class="d-flex my-list" style="overflow-x: auto;">
                                                                    <ul>
                                                                        <li v-for="com in companyData" class="" style="margin-bottom: 20px; width: 190px;">
                                                                            <label class="myFont16 p-t-10" style="float: left; padding-right: 10px;">{{ com.comTitle }}</label>
                                                                            <input type="text" class="form-control" placeholder="0" style="width: 60px; float: left;">
                                                                            <label class="myFont16 p-t-10" style="float: end; padding-left: 10px;">%</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class=" mt-2 d-flex justify-content">
                                                        <button type="button" class="btn btn-icon icon-left btn-outline-success myFont16" style="border-radius: 6px;">新增一筆</button>
                                                    </div>
                                                </template>
                                                <template v-if="col.type === 'sign'">
                                                    <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 col-4 p-t-10">{{ col.name }}
                                                        <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                    </label>
                                                    <div class="row" style="margin-bottom: 20px">
                                                        <label class="myFont16 p-t-10">管理維運公司</label>
                                                        <div class="table-responsive">
                                                            <table class="newTable">
                                                                <caption>維運公司簽核人員資料表</caption>
                                                                <thead style="position: sticky;top: 0;" class="myNew">
                                                                <tr>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">公司</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">部門</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">科別</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">承辦人</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">科別主管</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">部門主管</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">承辦人連絡電話</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇公司</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇部門</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇科別</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇部門主管</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇科別主管</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇承辦人</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" class="form-control"/>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class=" mt-2 d-flex justify-content">
                                                        <button type="button" class="btn btn-icon icon-left btn-outline-success myFont16" style="border-radius: 6px;">新增一筆</button>
                                                    </div>
                                                    <div class="row" style="margin-bottom: 20px">
                                                        <label class="myFont16 p-t-10">使用公司</label>
                                                        <div class="table-responsive">
                                                            <table class="newTable">
                                                                <caption>使用公司簽核人員資料表</caption>
                                                                <thead style="position: sticky;top: 0;" class="myNew">
                                                                <tr>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">公司</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">部門</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">科別</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">承辦人</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">科別主管</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">部門主管</th>
                                                                    <th style="min-width: 120px;"
                                                                        scope="col">承辦人連絡電話</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇公司</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇部門</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇科別</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇部門主管</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇科別主管</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control">
                                                                            <option value="">選擇承辦人</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" class="form-control"/>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class=" mt-2 d-flex justify-content">
                                                        <button type="button" class="btn btn-icon icon-left btn-outline-success myFont16" style="border-radius: 6px;">新增一筆</button>
                                                    </div>

                                                </template>
                                                <template v-if="col.type === 'file_area'">
                                                    <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 mb-1">{{ col.name }}
                                                        <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                    </label>
                                                    <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                        <vue-feather type="paperclip" size="20"></vue-feather>
                                                        <label class="myFont16 col-4 p-t-10">3則附加檔案</label>
                                                        <!-- 這裡放附檔 -->
                                                        <div>
                                                            <a href="#">顧問報告.pdf</a> |
                                                            <a href="#">顧問報告.pdf</a> |
                                                            <a href="#">顧問報告.pdf</a> |
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-if="col.type === 'select'">
                                                    <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                        <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 col-4 p-t-10">{{ col.name }}
                                                            <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                        </label>
                                                        <select class="form-control">
                                                            <!-- 選項列表 -->
                                                            <option v-for="option in col.option.split('|')"
                                                                    :value="option">
                                                                {{ option }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </template>
                                                <template v-if="col.type === 'radio'">
                                                    <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                        <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 col-4 p-t-10">{{ col.name }}
                                                            <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                        </label>
                                                        <div v-for="option in col.option.split('|')" class="form-check p-t-10">
                                                            <input class="form-check-input" type="radio" :value="option" :id="'rdo_'+parentIndex+'_'+childIndex">
                                                            <label class="form-check-label" :for="'rdo_'+parentIndex+'_'+childIndex">{{ option }}</label>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-if="col.type === 'check'">
                                                    <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                        <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 col-4 p-t-10">{{ col.name }}
                                                            <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                        </label>
                                                        <div v-for="option in col.option.split('|')" class="form-check p-t-10">
                                                            <input class="form-check-input" type="checkbox" :value="option" :id="'cbx_'+parentIndex+'_'+childIndex">
                                                            <label class="form-check-label" :for="'cbx_'+parentIndex+'_'+childIndex">{{ option }}</label>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-if="col.type === 'text'">
                                                    <div class="d-flex justify-content-between align-center" style="margin-bottom: 20px; max-width: 450px;">
                                                        <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 col-4 p-t-10">{{ col.name }}
                                                            <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                        </label>
                                                        <input type="text" class="form-control" placeholder="請輸入文字">
                                                    </div>
                                                </template>
                                                <template v-if="col.type === 'box'">
                                                    <div class="row" style="margin-bottom: 20px;">
                                                        <label v-if="col.name !== '' || col.tip !== ''" class="myFont16 col-4 p-t-10">{{ col.name }}
                                                            <vue-feather v-if="col.tip !== ''" v-tooltip="{ content: col.tip, placement: 'right' }" type="help-circle" size="20" stroke="blue"></vue-feather>
                                                        </label>
                                                        <textarea class="my-form-control" spellcheck="false" placeholder="請輸入標題"></textarea>
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
    </section>


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
                                <template v-if="item.areaType === '1'">
                                    {{ tpName }}
                                </template>
                                <template v-else>
                                    {{ item.areaTitle }}
                                </template>
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
    import { controlBoxMixin } from '@/mixins/controlBoxMixin.js';
    import DatePicker from '@vuepic/vue-datepicker';

    export default {
        name: "Template_sl",
        mixins: [controlBoxMixin],
        components: {
            draggable,
            DatePicker,
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
                distributionData: [],//費用分攤
                workData: [],//作業種類
                companyData: [],//公司
                categoryData: [],//選單類型
                sourceData: [],//選單類型
                frameData: [],//框架類型
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
                colWidthData: ['6', '12'],
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

                    {text: "共用作業項目區塊", type: "work_area", name: "", tip: '', width: "12", id: 0},
                    {text: "附件區塊", type: "file_area", name: "", tip: '', width: "12", id: 0},
                    {text: "簽核流程區塊", type: "sign", name: "", tip: '', width: "12", id: 0},
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
                    this.$api.get(this.$test ? '/api/?type=frame' : '/api/iform/frame'),
                    this.$api.get(this.$test ? '/api/?type=category' : '/api/iform/category'),
                    this.$api.get(this.$test ? '/api/?type=source' : '/api/iform/source'),
                    this.$api.get(this.$test ? '/api/?type=distribution' : '/api/iform/distribution'),
                ];
                Promise.all(apiRequests)
                    .then(([templateResponse, workResponse, companyResponse, frameResponse, categoryResponse, sourceResponse, distributionResponse]) => {
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                        this.tpName = this.templateData.temTitle;
                        this.tpData = JSON.parse(this.templateData.temStyle);
                        console.log(this.tpData);
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
    }
    .contract-title .myNotification {
        min-height: auto !important;
    }
    .d-flex i {
        padding-right: 10px;
    }

</style>
