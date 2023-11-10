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
                    <div class="page-content note-has-grid">
                        <ul class="nav nav-pills p-3 mb-3 rounded-pill align-items-center">
                            <li class="nav-item">
                                <router-link :to="'/template/ad'"
                                   class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2">
                                    <vue-feather type="plus" stroke="red"></vue-feather>
                                    <span class="d-md-block" style="color: red;">新增樣板</span>
                                </router-link>
                            </li>
                        </ul>
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
                                                <vue-feather type="eye"></vue-feather>
                                            </router-link>
                                            <router-link :to="'/template/up/'+item.temId"
                                               class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip"
                                               data-placement="top" title=""
                                               data-bs-original-title="Update"
                                               aria-label="Update">
                                                <vue-feather type="edit-2"></vue-feather>
                                            </router-link>
                                            <a href="javascript:void(0);" @click="actionTo('dl', item.temId)"
                                               class="action-btn btn-delete bs-tooltip" data-toggle="tooltip"
                                               data-placement="top" title=""
                                               data-bs-original-title="Delete"
                                               aria-label="Delete">
                                                <vue-feather type="trash-2"></vue-feather>
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
                        .delete(this.$test ? '/api/?type=template' : '/api/iform/template'
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
