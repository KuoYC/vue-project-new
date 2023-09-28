// store/breadcrumb.js

export default {
    state: {
        breadcrumbText: ''
    },
    mutations: {
        setBreadcrumbText(state, text) {
            state.breadcrumbText = text;
        }
    },
    actions: {
        updateBreadcrumbText({ commit }, text) {
            commit('setBreadcrumbText', text);
        }
    },
    getters: {
        getBreadcrumbText(state) {
            return state.breadcrumbText;
        }
    }
};
