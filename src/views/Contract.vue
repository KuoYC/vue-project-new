<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">簽核單項</h4>
            </li>
            <li class="breadcrumb-item">{{ templateData.temTitle }}</li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <ul class="nav nav-pills p-3 mb-3 rounded-pill align-items-center">
                            <li class="nav-item">
                                <router-link :to="`/contract/${templateData.temId}/ad`" class="btn btn-danger add_link">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                                         fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${searchType === 0 ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   @click="getContractList(0)"
                                   id="all-category">
                                    <i data-feather="check-circle"></i><span class="d-md-block">所有簽單</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${searchType === 1 ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   id="note-work"> <i data-feather="briefcase"></i><span
                                        class="d-md-block">待處理</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${searchType === 2 ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   id="note-family"> <i data-feather="users"></i><span class="d-md-block">已處理</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${searchType === 3 ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   id="note-important"> <i data-feather="star"></i><span class="d-md-block">知/後會</span></a>
                            </li>
                            <!-- <li class="nav-item ms-auto">
                              <a href="#" class="btn btn-icon icon-left btn-dark rounded-pill" id="add-notes"><i
                                  class="fas fa-plus"></i> Add Notes</a>
                            </li> -->
                        </ul>
                        <table class="table table-borderless">
                            <thead>
                            <tr>
                                <th scope="col">公文主旨</th>
                                <th scope="col">承辦單位</th>
                                <!--<th scope="col">目前流程</th>-->
                                <th scope="col">更新時間</th>
                                <th scope="col">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="con in contractListData" style="border-bottom: 1px solid transparent; border-color: #f6f6f6;">
                                <th scope="row">{{ con.conTitle }}</th>
                                <td>{{ con.comTitle + '/' + con.perBu2 + '/' + con.perBu3}}</td>
                                <!--<td>後會 資訊處</td>-->
                                <td>{{ con.conUpdateTime}}</td>
                                <th scope="col">
                                    <div class="action-btns">
                                        <a href="javascript:void(0);" @click="actionTo('sl', con.conId)"
                                           class="action-btn btn-view bs-tooltip me-2" data-toggle="tooltip"
                                           data-placement="top">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                 stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 class="feather feather-eye">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </a>
                                        <template v-if="0 === con.conStatus">
                                            <a href="javascript:void(0);" @click="actionTo('up', con.conId)"
                                               class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip"
                                               data-placement="top">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     class="feather feather-edit-2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                </svg>
                                            </a>
                                            <a href="javascript:void(0);" @click="actionTo('dl', con.conId)"
                                               class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                               data-placement="top">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     class="feather feather-trash-2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                </svg>
                                            </a>
                                        </template>
                                    </div>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Cookies from 'js-cookie'

    export default {
        name: 'Contract',
        data() {
            return {
                per: Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null,
                contractData: [],
                contractListData: [],
                templateData: [],
                searchType: 0,
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
        methods: {
            defaultData() {
                // this.contractData = [
                //     {
                //         conId: 0,
                //         temId: 0,
                //         perNo: '',
                //         perPosition: '',
                //         comId: 0,
                //         conSerial: '',
                //         conTitle: '',
                //         conType: 0,
                //         conDate: '9999-99-99',
                //         conWord: '',
                //         conWork: '',
                //         conValue: '',
                //         conLog: '',
                //         conStatus: 0,
                //         conUpdateTime: '9999-99-99 99:99:99',
                //         conCreateTime: '9999-99-99 99:99:99'
                //     }
                // ];
            },
            fetchFirst() {
                const apiRequests = [
                    /** todo: api **/
                    this.$api.get(this.$test ? `/api/?type=contract&temId=${this.$route.params.tem}&perNo=${this.per.perNo}&perPosition=${this.per.perPosition}` : `/api/adm/contract/List?ctpId=${this.$route.params.ctp}`),
                    this.$api.get(this.$test ? `/api/?type=template&temId=${this.$route.params.tem}` : `/api/iform/template/${this.$route.params.tem}`),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, templateResponse]) => {
                        //contractResponse
                        this.contractData = contractResponse.data.data;
                        this.contractListData = this.contractData;
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            getContractList(search_type) {
                this.searchType = search_type;
                switch (search_type) {
                    case 0:
                        this.contractListData = this.contractData;
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    default:
                        this.searchType = 0;
                        this.contractListData = this.contractData;
                        break;

                }
            },
            actionTo(action, conId) {
                if (action === 'sl') {
                    this.$router.push(`/contract/${this.$route.params.tem}/sl/${conId}`);
                } else if (action === 'up') {
                    this.$router.push(`/contract/${this.$route.params.tem}/up/${conId}`);
                } else if (action === 'dl') {
                    /** todo:api**/
                    this.$api
                        .delete(this.$test ? '/api/api/?type=contract' : '/api/adm/contract/delete'
                            , {params: {ctId: templateId}})
                        .then(response => {
                            console.log(response.data);
                            if (response.status === 200) {
                                this.$router.go(0);
                            } else {
                                console.log('err');
                            }
                            console.log('Edit successful:', response.data);
                        })
                        .catch(error => {
                            console.error('Edit failed:', error);
                        });
                }
            },
            createContract() {
                this.$router.push(`/contract/${this.$route.params.tem}/ad`);
            }
        },
    };
</script>

<style scoped>
    li {
        list-style: none;
    }
</style>
