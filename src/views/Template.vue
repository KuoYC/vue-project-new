<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">樣板列表</h4>
            </li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <router-link :to="'/template/ad'" class="btn btn-warning add_link">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                             fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </router-link>
                </div>
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <div class="card-body" style="padding: 0px;">
                            <table class="table table-bordered table-md">
                                <thead>
                                <tr>
                                    <th>樣板名稱</th>
                                    <th>操作</th>
                                </tr>

                                </thead>
                                <tbody>
                                <tr v-for="item in templateData" :key="item.temId">
                                    <td>{{ item.temTitle }}</td>
                                    <td>
                                        <!-- <a href="#" class="btn btn-primary">詳細內容</a>  -->
                                        <div class="action-btns">
                                            <router-link :to="'/template/sl/'+item.temId"
                                               class="action-btn btn-view bs-tooltip me-2" data-toggle="tooltip"
                                               data-placement="top" title=""
                                               data-bs-original-title="View"
                                               aria-label="View">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                     class="feather feather-eye">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            </router-link>
                                            <router-link :to="'/template/up/'+item.temId"
                                               class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip"
                                               data-placement="top" title=""
                                               data-bs-original-title="Update"
                                               aria-label="Update">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                     class="feather feather-edit-2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                </svg>
                                            </router-link>
                                            <a href="javascript:void(0);" @click="actionTo('dl', item.temId)"
                                               class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                               data-placement="top" title=""
                                               data-bs-original-title="Delete"
                                               aria-label="Delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                     class="feather feather-trash-2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                </svg>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Template',
        data() {
            return {
                templateData: [
                    {temId: 0, temTitle: '', temStyle: ''},
                ],
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
        mounted(){
            this.$emit('changeRoutePath', 'template');
        },
        methods: {
            defaultData() {
            },
            fetchFirst() {
                this.$api
                    .get(this.$test ? '/api/?type=template' : '/api/iform/template')
                    .then(response => {
                        // console.log(response.data.data);
                        this.templateData = response.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            actionTo(action, temId) {
                if (action === 'sl') {
                    this.$router.push(`/template/sl/${temId}`);
                } else if (action === 'up') {
                    this.$router.push(`/template/up/${temId}`);
                } else if (action === 'dl') {
                    this.$api
                        .delete(this.$test ? '/api/api/?type=template' : '/api/iform/template'
                            , {params: {temId: temId}})
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
        },
    };
</script>

<style scoped>
</style>
