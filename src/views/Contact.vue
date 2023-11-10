<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">窗口列表</h4>
            </li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <ul class="nav nav-pills p-3 mb-3 rounded-pill align-items-center">
                            <li class="nav-item">
                                <router-link :to="'/info/contact/ad'"
                                             class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2">
                                    <vue-feather type="plus" stroke="red"></vue-feather>
                                    <span class="d-md-block" style="color: red;">新增窗口</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${comCode === '' ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   @click="getCompanyList('')">
                                    <span class="d-md-block">ALL</span>
                                </a>
                            </li>
                            <li v-for="com in companyData" class="nav-item">
                                <a href="javascript:void(0)"
                                   :class="`${comCode === com.comCode ? 'active' : ''} nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2`"
                                   @click="getCompanyList(com.comCode)">
                                    <span class="d-md-block">{{ com.comTitle }}</span>
                                </a>
                            </li>
                        </ul>
                        <table class="table table-bordered table-md">
                            <thead>
                            <tr>
                                <th style="min-width: 70px;">公司</th>
                                <th style="min-width: 70px;">公司代碼</th>
                                <th style="min-width: 70px;">窗口</th>
                                <th style="min-width: 120px;">操作</th>
                            </tr>

                            </thead>
                            <tbody>
                            <template v-for="cot in contactData" :key="cot.cotId">
                            <tr v-if="cot.comCode === comCode || '' === comCode">
                                <td>{{ cot.comTitle }}</td>
                                <td>{{ cot.comCode }}</td>
                                <td>{{ cot.comTitle}} {{ cot.perBu2 }} {{ cot.perBu3 }} {{
                                    cot.perName }} {{ cot.perPositionName }}
                                </td>
                                <td>
                                    <!-- <a href="#" class="btn btn-primary">詳細內容</a>  -->
                                    <div class="action-btns">
                                        <router-link :to="'/info/contact/sl/'+cot.cotId"
                                                     class="action-btn btn-view bs-tooltip me-2" data-toggle="tooltip"
                                                     data-placement="top" title=""
                                                     data-bs-original-title="View"
                                                     aria-label="View">
                                            <vue-feather type="eye"></vue-feather>
                                        </router-link>
                                        <router-link :to="'/info/contact/up/'+cot.cotId"
                                                     class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip"
                                                     data-placement="top" title=""
                                                     data-bs-original-title="Update"
                                                     aria-label="Update">
                                            <vue-feather type="edit-2"></vue-feather>
                                        </router-link>
                                        <a href="javascript:void(0);" @click="deleteContact(cot.cotId)"
                                           class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                           data-placement="top" title=""
                                           data-bs-original-title="Delete"
                                           aria-label="Delete">
                                            <vue-feather type="trash-2"></vue-feather>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {contactMixin} from '@/mixins/contactMixin.js';

    export default {
        name: 'Contact',
        mixins: [contactMixin],
        data() {
            return {
                comCode:'',
                companyData: [],
                contactData: [],
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
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                const apiRequests = [
                    this.$api.get(this.$test ? '/api/?type=company' : '/api/iform/company'),
                    this.$api.get(this.$test ? '/api/?type=contact' : '/api/iform/contact/List'),
                ];
                Promise.all(apiRequests)
                    .then(([companyResponse, contactResponse]) => {
                        //companyResponse
                        this.companyData = companyResponse.data.data;
                        //contactResponse
                        this.contactData = contactResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            getCompanyList(comCode) {
                this.comCode = comCode;
            },
        },
    };
</script>

<style scoped>
</style>
