import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            breadcrumbText: ''
        };
    },
    mutations: {
        updateBreadcrumbText(state, newText) {
            state.breadcrumbText = newText;
        }
    }
});

export default store;
