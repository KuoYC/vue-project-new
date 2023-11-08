<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">資訊共用合約</h4>
            </li>
            <li class="breadcrumb-item">{{ templateData.temTitle }}</li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <ul class="nav nav-pills p-3 mb-3 rounded-pill align-items-center">
                            <li class="nav-item">
                                <router-link :to="`/exes/${this.$route.params.tem}/ad`"
                                             class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2">
                                    <vue-feather type="plus" stroke="red"></vue-feather>
                                    <span class="d-md-block" style="color: red;">新增簽單</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${searchType === 0 ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   @click="getContractList(0)"
                                   id="all-category">
                                    <vue-feather type="check-circle"></vue-feather>
                                    <span class="d-md-block">所有簽單</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${searchType === 3 ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   @click="getContractList(3)"
                                   id="note-work">
                                    <vue-feather type="briefcase"></vue-feather>
                                    <span class="d-md-block">待處理</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${searchType === 4 ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   @click="getContractList(4)"
                                   id="note-family">
                                    <vue-feather type="users"></vue-feather>
                                    <span class="d-md-block">已處理</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${searchType === 6 ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   @click="getContractList(6)"
                                   id="note-important">
                                    <vue-feather type="star"></vue-feather>
                                    <span class="d-md-block">已完成</span></a>
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
                                <th scope="col">建檔時間</th>
                                <th scope="col">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="con in contractData"
                                style="border-bottom: 1px solid transparent; border-color: #f6f6f6;">
                                <th scope="row">{{ con.conTitle }}</th>
                                <td>{{ con.comTitle + '/' + con.perBu2 + '/' + con.perBu3}}</td>
                                <!--<td>後會 資訊處</td>-->
                                <td>{{ this.$root.formatDateTime(con.conUpdateTime) }}</td>
                                <td>{{ this.$root.formatDateTime(con.conCreateTime) }}</td>
                                <th scope="col">
                                    <div class="action-btns">
                                        <a href="javascript:void(0);" @click="actionTo('sl', con.conId)"
                                           class="action-btn btn-view bs-tooltip me-2" data-toggle="tooltip"
                                           data-placement="top">
                                            <vue-feather type="eye"></vue-feather>
                                        </a>
                                        <template v-if="'0' === con.conStatus || '2' === con.conStatus">
                                            <a href="javascript:void(0);" @click="actionTo('up', con.conId)"
                                               class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip"
                                               data-placement="top">
                                                <vue-feather type="edit-2"></vue-feather>
                                            </a>
                                            <a href="javascript:void(0);" @click="actionTo('dl', con.conId)"
                                               class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                               data-placement="top">
                                                <vue-feather type="trash-2"></vue-feather>
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
        name: 'Exes',
        data() {
            return {
                per: Cookies.get('per') ? JSON.parse(Cookies.get('per')) : null,
                contractData: [],
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
            },
            fetchFirst() {
                const contractPayload={
                    action:0,
                    temId:this.$route.params.tem,
                    perKey:this.per.perKey,
                    perBu1Code:this.per.perBu1Code,
                };
                const apiRequests = [
                    this.$api.get(this.$test ? `/api/?type=contract` : `/api/adm/contract`, { params: contractPayload }),
                    this.$api.get(this.$test ? `/api/?type=template&temId=${this.$route.params.tem}` : `/api/iform/template/${this.$route.params.tem}`),
                ];
                Promise.all(apiRequests)
                    .then(([contractResponse, templateResponse]) => {
                        //contractResponse
                        this.contractData = contractResponse.data.data;
                        //templateResponse
                        this.templateData = templateResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            async getContractList(search_type) {
                this.searchType = search_type;
                try {
                    const contractPayload={
                        action:this.searchType,
                        temId:this.$route.params.tem,
                        perKey:this.per.perKey,
                        perBu1Code:this.per.perBu1Code,
                    };

                    const contactResponse = await this.$api.get(this.$test ? `/api/?type=contract` : `/api/adm/contract/List`, { params: contractPayload});
                    console.log(contactResponse.data.data);
                    this.contractData = contactResponse.data.data;
                } catch (error) {
                    console.error(error);
                }

            },
            actionTo(action, conId) {
                if (action === 'sl') {
                    this.$router.push(`/contract/${this.$route.params.tem}/sl/${conId}`);
                } else if (action === 'up') {
                    this.$router.push(`/contract/${this.$route.params.tem}/up/${conId}`);
                } else if (action === 'dl') {
                    this.$api
                        .delete(this.$test ? '/api/?type=contract' : '/api/iform/contract'
                            , {params: {conId: conId}})
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
