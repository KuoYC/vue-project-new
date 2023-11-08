// mixins/getWidth.js

export const getWidth = {
    data() {
        return {
            refNamt: '',
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getWidth(this.refNamt); // 初始化时获取宽度
        });
        window.addEventListener('resize', () => this.getWidth(this.refNamt)); // 监听窗口大小变化并更新宽度
    },
    beforeUnmount() {
        // 在元件銷毀之前移除事件監聽器
        window.removeEventListener('resize', () => this.getWidth(this.refNamt)); // 移除监听器以避免内存泄漏
    },
    methods: {
        updateWidth(refName) {
            const element = this.$refs[refName];
            return element ? element.offsetWidth : 0;
        },
    },
};
