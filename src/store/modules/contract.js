// store/modules/contract.js

const state = {
    breadcrumbText: '',//預設自訂文字
};

const mutations = {
    setBreadcrumbText(state, newText) {
        state.breadcrumbText = newText;
    },
};

export default {
    state,
    mutations,
};
