<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">公司列表</h4>
            </li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <ul class="nav nav-pills p-3 mb-3 rounded-pill align-items-center">
                            <li class="nav-item">
                                <router-link :to="'/info/group/ad'"
                                             class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2">
                                    <vue-feather type="plus" stroke="red"></vue-feather>
                                    <span class="d-md-block" style="color: red;">新增選單</span>
                                </router-link>
                            </li>
                        </ul>
                        <div class="table-responsive">
                            <table class="newTable">
                            <thead style="position: sticky;top: 0;" class="myNew">
                            <tr>
                                <th style="min-width: 200px;">公司</th>
                                <th style="min-width: 70px;">公司代碼</th>
                                <th style="min-width: 120px;">操作</th>
                            </tr>

                            </thead>
                            <tbody>
                            <tr v-for="com in groupData" :key="com.comId">
                                <td>{{ com.comTitle }}</td>
                                <td>{{ com.comCode }}</td>
                                <td>
                                    <!-- <a href="#" class="btn btn-primary">詳細內容</a>  -->
                                    <div class="action-btns">
                                        <router-link :to="'/info/group/sl/'+com.comId">
                                            <button type="button"
                                                    class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                                查看
                                            </button>
                                        </router-link>
                                        <router-link :to="'/info/group/up/'+com.comId">
                                            <button type="button"
                                                    class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                                修改
                                            </button>
                                        </router-link>
                                        <button type="button" @click="deleteGroup(com.comId)"
                                                class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                                            刪除
                                        </button>
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
    import {groupMixin} from '@/mixins/groupMixin.js';

    export default {
        name: 'Group',
        mixins: [groupMixin],
        data() {
            return {
                groupData: [],
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
                    this.$api.get(this.$test ? '/api/?type=group' : '/api/iform/group'),
                ];
                Promise.all(apiRequests)
                    .then(([groupResponse]) => {
                        //groupResponse
                        this.groupData = groupResponse.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
        },
    };
</script>

<style scoped>
</style>
