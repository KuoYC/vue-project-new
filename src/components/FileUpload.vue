<template>
    <div class="file-upload">
        <div
                class="drop-area"
                @dragover.prevent
                @dragenter.prevent
                @dragleave.prevent
                @drop="handleDrop"
                @click="triggerFileInput"
        >
            <p>拖放文件到此處或點擊選擇文件</p>
            <div v-if="selectedFiles.length > 0">
                <p>已選擇文件:</p>
                <ul>
                    <li v-for="file in selectedFiles" :key="file.name">{{ file.name }}</li>
                </ul>
            </div>
        </div>
        <input
                type="file"
                ref="fileInput"
                style="display: none;"
                multiple
                @change="handleFileSelect"
        />
        <!--<button @click="triggerFileInput">選擇文件</button>-->
    </div>
</template>

<script>
    export default {
        name: "FileUpload",
        props: {
            fileType: String, // 文件类型属性，用于区分不同的文件上传区域
        },
        data() {
            return {
                selectedFiles: [],
            };
        },
        methods: {
            triggerFileInput() {
                this.$refs.fileInput.click();
            },
            handleFileSelect(event) {
                this.selectedFiles = Array.from(event.target.files);
                this.$emit("file-selected", this.selectedFiles); // 触发自定义事件
            },
            handleDrop(event) {
                event.preventDefault();
                this.selectedFiles = Array.from(event.dataTransfer.files);
                this.$emit("file-selected", this.selectedFiles); // 触发自定义事件
            },
        },
    };
</script>

<style scoped>
    .file-upload {
        text-align: center;
        margin: 20px;
    }

    .drop-area {
        border: 2px dashed #ccc;
        padding: 20px;
        cursor: pointer;
    }

    button {
        margin-top: 10px;
    }
</style>
