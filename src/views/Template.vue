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
                        <div class="table-responsive">
                            <table class="newTable">
                            <thead style="position: sticky;top: 0;" class="myNew">
                                <tr>
                                    <th scope="col" style="width: auto;">樣板名稱</th>
                                    <th scope="col" style="width: 210px;">操作</th>
                                </tr>

                                </thead>
                                <tbody class="exTable">
                                <tr v-for="item in templateData" :key="item.temId">
                                    <td @click="$router.push(`/template/sl/${item.temId}`)">
                                        {{ item.temTitle }}
                                    </td>
                                    <td>
                                        <router-link :to="'/template/sl/'+item.temId">
                                            <button type="button"
                                                    class="m-r-5 btn btn-outline-success btn-border-radius waves-effect myFont16">
                                                查看
                                            </button>
                                        </router-link>
                                        <router-link :to="'/template/up/'+item.temId">
                                            <button type="button"
                                                    class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                                                修正
                                            </button>
                                        </router-link>
                                        <button type="button" @click="templateActionTo('dl', item.temId)"
                                                class="m-r-5 btn btn-outline-danger btn-border-radius waves-effect myFont16">
                                            刪除
                                        </button>
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
            templateActionTo(action, temId) {
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
