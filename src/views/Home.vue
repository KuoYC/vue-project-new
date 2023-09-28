<template>
    <section class="section">
        <!-- breadcrumb -->
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">首頁</h4>
            </li>
            <!-- <li class="breadcrumb-item">
              <a href="index.html">
                <i data-feather="home"></i></a>
            </li>
            <li class="breadcrumb-item active">Dashboard</li> -->
        </ul>
        <!-- breadcrumb -->
        <!-- 主要內容 -->
        <div class="row ">
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <!-- <div class="card-icon card-icon-large"><i class="fa fa-award"></i></div> -->
                        <div class="card-content" style="color: #6c757d;">
                            <span class="myFont18">我的待簽單</span>
                            <h4 class="card-title">5份</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <!-- <div class="card-icon card-icon-large"><i class="fa fa-briefcase"></i></div> -->
                        <div class="card-content" style="color: #6c757d;">
                            <span class="myFont18">簽核中文件</span>
                            <h4 class="card-title">1份</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <!-- <div class="card-icon card-icon-large"><i class="fa fa-globe"></i></div> -->
                        <div class="card-content" style="color: #6c757d;">
                            <span class="myFont18">已完成文件</span>
                            <h4 class="card-title">10份</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <div class="card-content" style="color: #6c757d;">

                            <span class="myFont18">未讀通知</span>
                            <h4 class="card-title">2,658則</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- 公告 -->
            <div class="col-12 myRwd">
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-bullhorn" style="margin-right: 10px;font-size: 17px;color: black;">
                            公告
                        </i>
                    </div>
                    <div class="card-body myNotification">
                        <table class="table">
                            <thead style="position: sticky;top: 0;" class="myNew">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">標題</th>
                                <th scope="col">發布日期</th>
                                <th scope="col">查看</th>
                            </tr>
                            </thead>
                            <tbody class="myNew">
                            <tr>
                                <th scope="row"><span class="badge badge-success">提醒</span></th>
                                <td>資訊作業系統已於2024-01-01正式上線</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="" data-bs-original-title="View"
                                                                aria-label="View">
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" class="feather feather-eye">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </a></div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><span class="badge badge-danger">緊急</span></th>
                                <td>資訊作業系統已於2024-01-01正式上線</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="" data-bs-original-title="View"
                                                                aria-label="View">
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" class="feather feather-eye">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </a></div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><span class="badge badge-primary">重要</span></th>
                                <td>資訊作業系統已於2024-01-01正式上線</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="" data-bs-original-title="View"
                                                                aria-label="View">
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" class="feather feather-eye">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </a></div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><span class="badge badge-info">好康</span></th>
                                <td>資訊作業系統已於2024-01-01正式上線</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="" data-bs-original-title="View"
                                                                aria-label="View">
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" class="feather feather-eye">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </a></div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><span class="badge badge-secondary">一般</span></th>
                                <td>資訊作業系統已於2024-01-01正式上線</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="" data-bs-original-title="View"
                                                                aria-label="View">
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" class="feather feather-eye">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </a></div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>資訊作業系統已於2024-01-01正式上線</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="" data-bs-original-title="View"
                                                                aria-label="View">
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" class="feather feather-eye">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </a></div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>資訊作業系統已於2024-01-01正式上線</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                data-toggle="tooltip" data-placement="top"
                                                                title="" data-bs-original-title="View"
                                                                aria-label="View">
                                        <svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" class="feather feather-eye">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </a></div>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- <div class="card">
                  <div class="boxs mail_listing">
                    <div class="inbox-center table-responsive" style="height:480px ;">
                      <table class="table table-hover">
                        <div class="card-header">
                          <i class="fas fa-bullhorn" style="margin-right: 10px;font-size: 17px;color: black;">
                            公告
                          </i>
                        </div>
                        <thead>
                          <tr>
                            <th class="text-center"
                              style="font-size:large;background-color: #fff;border-top: 1px solid var(--bs-border-color); border-bottom: 1px solid var(--bs-border-color);">
                            </th>
                            <th class="hidden-xs" colspan="5"
                              style="background-color: #fff;border-top: 1px solid var(--bs-border-color); border-bottom: 1px solid var(--bs-border-color);">
                              <div class="float-end">
                                <div class="email-btn-group m-l-15">
                                  <a href="#" class="col-dark-gray waves-effect m-r-20" data-bs-toggle="tooltip"
                                    data-bs-original-title="previous">
                                    <i class="material-icons">navigate_before</i>
                                  </a>
                                  <a href="#" class="col-dark-gray waves-effect m-r-20" data-bs-toggle="tooltip"
                                    data-bs-original-title="next">
                                    <i class="material-icons">navigate_next</i>
                                  </a>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="unread">
                            <td class="tbl-checkbox">
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Nelson Lane</td>
                            <td class="max-texts">
                              <a href="#">
                                <span class="badge badge-primary">Work</span>
                                Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> 12:30 PM </td>
                          </tr>
                          <tr class="unread">
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons text-warning">star</i>
                            </td>
                            <td class="hidden-xs">Kerry Mann</td>
                            <td class="max-texts">
                              <a href="#">Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 13 </td>
                          </tr>
                          <tr class="unread">
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Adam Peters</td>
                            <td class="max-texts">
                              <a href="#">
                                <span class="badge badge-secondary">Shopping</span>
                                Lorem ipsum perspiciatis unde omnis</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 12 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Lula Reese</td>
                            <td class="max-texts">
                              <a href="#">
                                <span class="badge badge-success">Family</span>
                                Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 12 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Nelson Lane</td>
                            <td class="max-texts">
                              <a href="#">
                                Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 12 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons text-warning">star</i>
                            </td>
                            <td class="hidden-xs">Kerry Mann</td>
                            <td class="max-texts">
                              <a href="#">Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 11 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Adam Peters</td>
                            <td class="max-texts">
                              <a href="#">
                                <span class="badge badge-info">Office</span>
                                Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 11 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Lula Reese</td>
                            <td class="max-texts">
                              <a href="#">
                                Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 11 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Nelson Lane</td>
                            <td class="max-texts">
                              <a href="#">
                                <span class="badge badge-danger">Work</span>
                                Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 10 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons text-warning">star</i>
                            </td>
                            <td class="hidden-xs">Kerry Mann</td>
                            <td class="max-texts">
                              <a href="#">Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 10 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Adam Peters</td>
                            <td class="max-texts">
                              <a href="#">
                                <span class="badge badge-secondary">Shopping</span>
                                Lorem ipsum perspiciatis unde omnis</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 10 </td>
                          </tr>
                          <tr>
                            <td class="tbl-checkbox">
                              <label class="form-check-label">
                                <input type="checkbox">
                                <span class="form-check-sign"></span>
                              </label>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">star_border</i>
                            </td>
                            <td class="hidden-xs">Lula Reese</td>
                            <td class="max-texts">
                              <a href="#">
                                Lorem ipsum perspiciatis unde omnis iste natus</a>
                            </td>
                            <td class="hidden-xs">
                              <i class="material-icons">attach_file</i>
                            </td>
                            <td class="text-end"> May 09 </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="row">
                      <div class="col-sm-7 ">
                        <p class="p-15">Showing 1 - 15 of 200</p>
                      </div>
                    </div>
                  </div>
                </div> -->
            </div>
            <!-- 公告 -->
            <!-- 待簽文件 -->
            <div class="col-12 myRwd myPadding">
                <div class="card ">
                    <div class="card-header">
                        <h4>我的待簽單</h4>
                    </div>
                    <div class="card-body" style="padding: 10px;">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li v-for="(com, index) in companyData" class="nav-item" role="presentation">
                                <a :class="index === 0 ? 'nav-link active' : 'nav-link'"
                                   :id="'pills-' + com.comId + '-tab'"
                                   :data-bs-target="'#pills-' + com.comId"
                                   :href="'#pills-' + com.comId"
                                   role="tab"
                                   :aria-controls="'pills-' + com.comId"
                                   :aria-selected="index === 0 ? 'true' : 'false'"
                                   tabindex="-1">{{ com.comTitle }}(<span>{{
                        com.comId }}</span>)</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div v-for="(com, index) in companyData" :key="index"
                                 :class="index === 0 ? 'tab-pane fade show active' : 'tab-pane fade'"
                                 :id="'pills-' + com.comId" role="tabpanel"
                                 :aria-labelledby="'pills-' + com.comId + '-tab'">
                                <div class="card-body" style="padding: 0px;">
                                    <div class="table-responsive">
                                        <!-- 待簽列表 -->
                                        <table class="table table-bordered table-md">
                                            <tbody>
                                            <tr>
                                                <th>編號{{ com.comId }}</th>
                                                <th>名稱</th>
                                                <th>創建日期</th>
                                                <th>狀態</th>
                                                <th>查看</th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>資訊作業系統</td>
                                                <td>2017-01-09</td>
                                                <td>
                                                    <div class="badge badge-success">Active</div>
                                                </td>
                                                <td>
                                                    <!-- <a href="#" class="btn btn-primary">詳細內容</a>  -->
                                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                                data-toggle="tooltip"
                                                                                data-placement="top" title=""
                                                                                data-bs-original-title="View"
                                                                                aria-label="View">
                                                        <svg
                                                                xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24"
                                                                fill="none" stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round" class="feather feather-eye">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    </a></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>資訊作業系統</td>
                                                <td>2017-01-09</td>
                                                <td>
                                                    <div class="badge badge-success">Active</div>
                                                </td>
                                                <td>
                                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                                data-toggle="tooltip"
                                                                                data-placement="top" title=""
                                                                                data-bs-original-title="View"
                                                                                aria-label="View">
                                                        <svg
                                                                xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24"
                                                                fill="none" stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round" class="feather feather-eye">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    </a></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>資訊作業系統</td>
                                                <td>2017-01-11</td>
                                                <td>
                                                    <div class="badge badge-danger">Not Active</div>
                                                </td>
                                                <td>
                                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                                data-toggle="tooltip"
                                                                                data-placement="top" title=""
                                                                                data-bs-original-title="View"
                                                                                aria-label="View">
                                                        <svg
                                                                xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24"
                                                                fill="none" stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round" class="feather feather-eye">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    </a></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>資訊作業系統</td>
                                                <td>2017-01-11</td>
                                                <td>
                                                    <div class="badge badge-success">Active</div>
                                                </td>
                                                <td>
                                                    <div class="action-btns"><a href="javascript:void(0);"
                                                                                class="action-btn btn-view bs-tooltip me-2"
                                                                                data-toggle="tooltip"
                                                                                data-placement="top" title=""
                                                                                data-bs-original-title="View"
                                                                                aria-label="View">
                                                        <svg
                                                                xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24"
                                                                fill="none" stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round" class="feather feather-eye">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    </a></div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!-- 待簽列表 -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 待簽文件 -->

        </div>

        <!-- 主要內容 -->
    </section>
</template>

<script>
    import Cookies from 'js-cookie'
    import dayjs from 'dayjs';

    export default {
        name: "Home",
        data() {
            return {
                companyData: [//公司
                    // {comId: 0, comTitle: '', comCode: ''},
                ],

                contractDraft: [],
                contractDraftCount: 0,
                contractImplement: [],
                contractImplementCount: 0,
                contractBack: [],
                contractBackCount: 0,
                contractInitiate: [],
                contractInitiateCount: 0,
                contractMaintenance: [],
                contractMaintenanceCount: 0,
                contractUse: [],
                contractUseCount: 0,
                subsidiaryContractData: [{
                    subsidiaryData: [],
                    contractData: []
                }],
                iMemberList: [],//發起
                mMemberList: [],//維運
                uMemberList: [],//使用
            };
        },
        computed: {
        },
        watch: {
            // '$route': {
            //     handler(newRoute, oldRoute) {
            //         this.defaultData();
            //         this.fetchFirst();
            //     },
            //     immediate: true,
            // }
        },
        mounted(){
            this.defaultData();
            this.fetchFirst();
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                // this.companyData = this.$root.getCompanyData();
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                ];
                Promise.all(apiRequests)
                    .then(([companyResponse]) => {
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });

                // 使用axios或fetch等工具從API獲取資料並賦值給contract
                // 這裡只是一個示例
                // this.$api
                //     .get(this.$test ? '/api/?type=search_source' : '/api/iform/source')
                //     .then(response => {
                //         const data = response.data.data;
                //         this.subsidiaryContractData = data
                //             .filter(item => item.ssType === 'S')
                //             .map(item => {
                //                 return {
                //                     subsidiaryData: {
                //                         ssId: item.ssId,
                //                         ssTitle: item.ssTitle,
                //                         ssType: item.ssType,
                //                         ssCode: item.ssCode
                //                     },
                //                     contractData: []
                //                 };
                //             });
                //         this.$api
                //             .get(this.$test ? `/api/?type=contract_member&mbNow=${Cookies.get('account')}` : `/api/adm/getMemberContract?mbNow=${Cookies.get('account')}`)
                //             .then(response => {
                //                 const data = response.data.data;
                //                 // console.log(data);
                //                 this.contractInitiate = data.filter(item => item.mbType === 0);
                //                 this.contractInitiateCount = this.contractInitiate.length;
                //                 this.contractMaintenance = data.filter(item => item.mbType === 1);
                //                 this.contractMaintenanceCount = this.contractMaintenance.length;
                //                 this.contractUse = data.filter(item => item.mbType === 2);
                //                 this.contractUseCount = this.contractUse.length;
                //                 this.subsidiaryContractData.forEach(item => {
                //                     const ssId = item.subsidiaryData.ssId;
                //                     item.contractData = data.filter(contract => contract.ctSsId === ssId && contract.mbNow === Cookies.get('account'));
                //                 });
                //                 // console.log(this.subsidiaryContractData);
                //             })
                //             .catch(error => {
                //                 console.error(error);
                //             });
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });
                // this.$api
                //     .get(this.$test ? '/api/?type=contract' : '/api/adm/contract/List')
                //     .then(response => {
                //         const data = response.data.data;
                //         this.contractDraft = data.filter(item => item.ctStatus === 0);
                //         this.contractDraftCount = this.contractDraft.length;
                //         this.contractImplement = data.filter(item => item.ctStatus === 1);
                //         this.contractImplementCount = this.contractImplement.length;
                //         this.contractBack = data.filter(item => item.ctStatus === 2);
                //         this.contractBackCount = this.contractBack.length;
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });
            },
            redirectToEdit(ctpId, ctId) {
                this.$router.push(`/sign_contract/${ctpId}/sl/${ctId}`);

            },
            redirectToSign(ctId) {
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=contract_member&ctId=${ctId}` : `/api/adm/getMemberContract?ctId=${ctId}`),
                ];
                Promise.all(apiRequests)
                    .then(([memberResponse]) => {
                        //memberResponse
                        const memberData = memberResponse.data.data;
                        this.iMemberList = memberData.filter(item => item.mbType === 0);
                        this.mMemberList = memberData.filter(item => item.mbType === 1);
                        this.uMemberList = memberData.filter(item => item.mbType === 2);
                        this.iMemberList.forEach((item) => {
                            if (item.mbNow == Cookies.get('account')) {
                                if (item.mbLv0 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv0Status: 4,
                                        mbLv0Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbLv1Status: 1,
                                        mbNow: item.mbLv1,
                                        mbStatus: 1
                                    };
                                    this.updateMember(upMember);
                                }
                                if (item.mbLv1 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv1Status: 4,
                                        mbLv1Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbLv2Status: 1,
                                        mbNow: item.mbLv2,
                                        mbStatus: 1
                                    };
                                    this.updateMember(upMember);
                                }
                                if (item.mbLv2 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv2Status: 4,
                                        mbLv2Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbNow: 'null',
                                        mbStatus: 4
                                    };
                                    if (this.updateMember(upMember)) {
                                        if (this.checkSameTypeSign(ctId, 0)) {
                                            if (this.mMemberList.length == 0 && this.uMemberList.length == 0) {
                                                if (this.updateContractStatus(ctId, 3)) {
                                                    if (this.updateContractSignTime(ctId)) {
                                                        alert('文件簽核完成！！');
                                                        // this.$router.push(`/sign_contract/${this.$route.params.id}/list`);
                                                    }
                                                }
                                            } else {
                                                if (this.mMemberList.length != 0) {
                                                    this.mMemberList.forEach((next_item) => {
                                                        const upMember = {
                                                            mbId: next_item.mbId,
                                                            mbLv0Status: 1,
                                                            mbNow: next_item.mbLv0,
                                                            mbStatus: 1
                                                        };
                                                        this.updateMember(upMember);
                                                    });
                                                } else {
                                                    this.uMemberList.forEach((next_item) => {
                                                        const upMember = {
                                                            mbId: next_item.mbId,
                                                            mbLv0Status: 1,
                                                            mbNow: next_item.mbLv0,
                                                            mbStatus: 1
                                                        };
                                                        this.updateMember(upMember);
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        this.mMemberList.forEach((item) => {
                            if (item.mbNow == Cookies.get('account')) {
                                if (item.mbLv0 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv0Status: 4,
                                        mbLv0Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbLv1Status: 1,
                                        mbNow: item.mbLv1,
                                        mbStatus: 1
                                    };
                                    this.updateMember(upMember);
                                }
                                if (item.mbLv1 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv1Status: 4,
                                        mbLv1Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbLv2Status: 1,
                                        mbNow: item.mbLv2,
                                        mbStatus: 1
                                    };
                                    this.updateMember(upMember);
                                }
                                if (item.mbLv2 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv2Status: 4,
                                        mbLv2Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbNow: 'null',
                                        mbStatus: 4
                                    };
                                    if (this.updateMember(upMember)) {
                                        if (this.checkSameTypeSign(1)) {
                                            if (this.uMemberList.length === 0) {
                                                if (this.updateContractStatus(ctId, 3)) {
                                                    if (this.updateContractSignTime(ctId)) {
                                                        alert('文件簽核完成！！');
                                                        // this.$router.push(`/sign_contract/${this.$route.params.id}/list`);
                                                    }
                                                }
                                            } else {
                                                this.uMemberList.forEach((next_item) => {
                                                    const upMember = {
                                                        mbId: next_item.mbId,
                                                        mbLv0Status: 1,
                                                        mbNow: next_item.mbLv0,
                                                        mbStatus: 1
                                                    };
                                                    this.updateMember(upMember);
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        this.uMemberList.forEach((item) => {
                            if (item.mbNow == Cookies.get('account')) {
                                if (item.mbLv0 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv0Status: 4,
                                        mbLv0Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbLv1Status: 1,
                                        mbNow: item.mbLv1,
                                        mbStatus: 1
                                    };
                                    this.updateMember(upMember);
                                }
                                if (item.mbLv1 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv1Status: 4,
                                        mbLv1Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbLv2Status: 1,
                                        mbNow: item.mbLv2,
                                        mbStatus: 1
                                    };
                                    this.updateMember(upMember);
                                }
                                if (item.mbLv2 == Cookies.get('account')) {
                                    const upMember = {
                                        mbId: item.mbId,
                                        mbLv2Status: 4,
                                        mbLv2Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        mbNow: 'null',
                                        mbStatus: 4
                                    };
                                    if (this.updateMember(upMember)) {
                                        if (this.checkSameTypeSign(ctId, 1)) {
                                            if (this.updateContractStatus(ctId, 3)) {
                                                if (this.updateContractSignTime(ctId)) {
                                                    alert('文件簽核完成！！');
                                                    // this.$router.push(`/sign_contract/${this.$route.params.id}/list`);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        alert('簽核完成！！');
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async updateMember(payload) {
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
            async checkSameTypeSign(memType) {
                try {
                    const response = await this.$api.get(
                        this.$test ? `/api/?type=member&conId=${this.conId}&mbType=${memType}` : `/api/adm/getMemberContract?ctId=${ctId}&mbType=${type}`
                    );

                    if (response.status === 200) {
                        const data = response.data.data;
                        data.forEach((mem) => {
                            if (mem.memStatus !== '2' && mem.memStatus !== '3' && mem.memStatus !== '4') {
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
            async updateContractSignTime(ctId) {
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
            async updateContractStatus(ctId, status) {
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
            createContract() {
                this.$router.push(`/contract/ad`);
            }
        },
    }
</script>

<style scoped>

</style>