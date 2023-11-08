<template>
    <div class="row">
        <!-- 公告 -->
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-bullhorn" style="margin-right: 10px;font-size: 17px;color: black;">
                        公告
                    </i>
                </div>
                <div class="card-body">
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
        </div>
        <!-- 公告 -->
    </div>
</template>

<script>
    export default {
        name: "Announcement",
        data() {
            return {
                newsData: [],
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
                    this.$api.get(this.$test ? '/api/?type=news' : '/api/iform/news/List'),
                ];
                Promise.all(apiRequests)
                    .then(([newsResponse]) => {
                        //newsResponse
                        this.newsData = newsResponse.data.data;
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
