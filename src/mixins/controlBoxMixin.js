// mixins/controlBoxMixin.js

export const controlBoxMixin = {
    methods: {
        //右方管理面板
        handleGlobalClick(event) {
            const sidebar = this.$refs.sidebar;
            if (this.isSidebarVisible && !sidebar.contains(event.target)) {
                // 如果側邊欄可見且點擊事件不在側邊欄內部，則隱藏側邊欄
                this.isSidebarVisible = false;
            }
        },
        sidebarClick() {
            if (!this.isSidebarVisible) {
                this.isSidebarVisible = true;
            }
            else {
                this.isSidebarVisible = false;
            }
        },
        scrollToElement(el) {
            console.log(el);
            // 取得要捲動到的目標元素
            const targetElement = document.getElementById(el);

            if (targetElement) {
                // 計算滾動目標位置（目標元素的頂部位置減去 70 像素）
                const targetScrollPosition = targetElement.offsetTop - 70;

                // 使用 scrollIntoView() 方法捲動到目標位置
                window.scrollTo({
                    top: targetScrollPosition,
                    behavior: "smooth", // 可以使用 "smooth" 实现平滑滚动
                });
            }
        },
    },
};
