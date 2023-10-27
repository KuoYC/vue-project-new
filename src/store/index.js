import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null, // 用户对象，初始为 null 表示用户未登录
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        logout(state) {
            state.user = null;
        },
    },
    actions: {
        login({ commit }, user) {
            // 执行登录操作，例如发送 API 请求进行认证
            // 成功后，调用 commit('setUser', user)
            // 通常在这里执行登录操作，如发送登录请求，验证用户身份
            // 成功后，调用 commit('setUser', user) 来设置用户信息
            commit('setUser', user);
        },
        logout({ commit }) {
            // 执行注销操作，例如清除用户数据
            commit('logout');
        },
    },
    getters: {
        getUser: (state) => {
            return state.user;
        },
    },
});

export default store;
