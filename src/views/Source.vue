<template>
    <section class="section">
        <ul class="breadcrumb breadcrumb-style ">
            <li class="breadcrumb-item">
                <h4 class="page-title m-b-0">選單內容列表</h4>
            </li>
        </ul>
        <div class="section-body">
            <div class="card note">
                <div class="card-body">
                    <div class="page-content note-has-grid">
                        <ul class="nav nav-pills p-3 mb-3 rounded-pill align-items-center">
                            <li class="nav-item">
                                <router-link :to="'/info/source/ad'"
                                             class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2">
                                    <vue-feather type="plus" stroke="red"></vue-feather>
                                    <span class="d-md-block" style="color: red;">新增選單內容</span>
                                </router-link>
                            </li>
                        </ul>
                        <table class="table table-bordered table-md">
                            <thead>
                            <tr>
                                <th style="min-width: 200px;">選單</th>
                                <th style="min-width: 70px;">選單內容</th>
                                <th style="min-width: 120px;">操作</th>
                            </tr>

                            </thead>
                            <tbody>
                            <tr v-for="sou in sourceData" :key="sou.souId">
                                <td>{{ sou.catTitle }}</td>
                                <td>
                                    {{ sou.souTitle}}
                                </td>
                                <td>
                                    <!-- <a href="#" class="btn btn-primary">詳細內容</a>  -->
                                    <div class="action-btns">
                                        <router-link :to="'/info/source/sl/'+sou.catId"
                                                     class="action-btn btn-view bs-tooltip me-2" data-toggle="tooltip"
                                                     data-placement="top" title=""
                                                     data-bs-original-title="View"
                                                     aria-label="View">
                                            <vue-feather type="eye"></vue-feather>
                                        </router-link>
                                        <router-link :to="'/info/source/up/'+sou.catId"
                                                     class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip"
                                                     data-placement="top" title=""
                                                     data-bs-original-title="Update"
                                                     aria-label="Update">
                                            <vue-feather type="edit-2"></vue-feather>
                                        </router-link>
                                        <a href="javascript:void(0);" @click="deleteSource(sou.catId)"
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
    import {sourceMixin} from '@/mixins/sourceMixin.js';

    export default {
        name: 'Source',
        mixins: [sourceMixin],
        data() {
            return {
                sourceData: [],
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
                    this.$api.get(this.$test ? '/api/?type=source' : '/api/iform/source'),
                ];
                Promise.all(apiRequests)
                    .then(([sourceResponse]) => {
                        //sourceResponse
                        this.sourceData = sourceResponse.data.data;
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
