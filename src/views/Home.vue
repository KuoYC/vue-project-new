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
                            <h4 class="card-title">{{ contractData.length }}份</h4>
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
                            <h4 class="card-title">{{ contractSignData.length }}份</h4>
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
                            <h4 class="card-title">{{ contractOverData.length }}份</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-statistic-3">
                        <div class="card-content" style="color: #6c757d;">

                            <span class="myFont18">草稿文件</span>
                            <h4 class="card-title">{{ contractDraftData.length }}份</h4>
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
                        <vue-feather type="volume-2"></vue-feather>
                        <span style="margin-left: 10px; font-weight:bold;font-size: 17px;color: black;">
                            公告
                        </span>
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
                            <tr v-for="nws in newsData">
                                <th scope="row">
                                    <span v-if="'1' === nws.nwsType" class="badge badge-secondary">一般</span>
                                    <span v-if="'2' === nws.nwsType" class="badge badge-success">提醒</span>
                                    <span v-if="'3' === nws.nwsType" class="badge badge-primary">重要</span>
                                    <span v-if="'4' === nws.nwsType" class="badge badge-info">好康</span>
                                    <span v-if="'5' === nws.nwsType" class="badge badge-danger">緊急</span>
                                </th>
                                <td>{{ nws.nwsTitle }}</td>
                                <td>{{ this.$root.formatDate(nws.nwsRelease)}}</td>
                                <td>
                                    <div class="action-btns">
                                        <router-link :to="`/announcement/sl/${nws.nwsId}`"
                                                     class="action-btn btn-view bs-tooltip me-2"
                                                     data-toggle="tooltip" data-placement="top"
                                                     title="" data-bs-original-title="View"
                                                     aria-label="View">
                                            <vue-feather type="eye"></vue-feather>
                                        </router-link></div>
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
                <div class="card">
                    <div class="card-header">
                        <vue-feather type="edit-3"></vue-feather>
                        <span style="margin-left: 10px; font-weight:bold;font-size: 17px;color: black;">
                            我的待簽單
                        </span>
                    </div>
                    <div class="card-body myNotification">
                        <table class="table">
                            <thead style="position: sticky;top: 0;" class="myNew">
                            <tr>
                                <th scope="col">編號</th>
                                <th scope="col">框架</th>
                                <th scope="col">名稱</th>
                                <th scope="col">創建日期</th>
                                <th scope="col">查看</th>
                            </tr>
                            </thead>
                            <tbody class="myNew">
                            <tr v-for="con in contractData">
                                <td>{{ con.conSerial }}</td>
                                <td>{{ con.temTitle }}</td>
                                <td>{{ con.conTitle }}</td>
                                <td>{{ this.$root.formatDateTime(con.conCreateTime)}}</td>
                                <td>
                                    <!-- <a href="#" class="btn btn-primary">詳細內容</a>  -->
                                    <div class="action-btns"><router-link :to="`/contract/${con.temId}/sl/${con.conId}`"
                                                                          class="action-btn btn-view bs-tooltip me-2"
                                                                          data-toggle="tooltip"
                                                                          data-placement="top" title=""
                                                                          data-bs-original-title="View"
                                                                          aria-label="View">
                                        <vue-feather type="eye"></vue-feather>
                                    </router-link></div>
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
            <!-- 待簽文件 -->

        </div>

        <!-- 主要內容 -->
    </section>
</template>

<script>
    import Cookies from 'js-cookie'

    export default {
        name: "Home",
        data() {
            return {
                per: JSON.parse(Cookies.get('per')),
                newsData: [],
                companyData: [//公司
                    // {comId: 0, comTitle: '', comCode: ''},
                ],
                contractData:[],//待簽文件
                contractSignData:[],//簽核中文件
                contractOverData:[],//已完成文件
                contractDraftData:[],//草稿文件
            };
        },
        computed: {
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
        mounted(){
            this.defaultData();
            this.fetchFirst();
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                if (this.per) {
                    // this.companyData = this.$root.getCompanyData();
                    const apiRequests = [
                        this.$api.get(this.$test ? '/api/?type=news' : '/api/iform/news/List'),
                        this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {params:{action:2, conStatus:1, perKey:this.per.perKey, perBu1Code:this.per.perBu1Code}}),
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {params:{action:3, conStatus:1, perKey:this.per.perKey, perBu1Code:this.per.perBu1Code}}),
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {params:{action:5, conStatus:1, perKey:this.per.perKey, perBu1Code:this.per.perBu1Code}}),
                        this.$api.get(this.$test ? `/api/?type=contract` : '/api/iform/contract/List', {params:{action:0, conStatus:0, perKey:this.per.perKey, perBu1Code:this.per.perBu1Code}}),
                    ];
                    Promise.all(apiRequests)
                        .then(([newsResponse, companyResponse, contractResponse, contractSignResponse, contractOverResponse, contractDraftResponse]) => {
                            //newsResponse
                            this.newsData = newsResponse.data.data;
                            // companyResponse
                            this.companyData = companyResponse.data.data;
                            // contractResponse
                            this.contractData = contractResponse.data.data;
                            this.contractSignData = contractSignResponse.data.data;
                            // contractOverResponse
                            this.contractOverData = contractOverResponse.data.data;
                            // contractDraftResponse
                            this.contractDraftData = contractDraftResponse.data.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            },
        },
    }
</script>

<style scoped>

</style>