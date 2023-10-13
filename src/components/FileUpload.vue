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
            <p>{{ this.titleString }}</p>
        </div>
        <!--<button v-if="selectedFiles.length > 0" @click="clearSelection">清空</button>-->
        <input
                type="file"
                ref="fileInput"
                style="display: none;"
                :multiple="multiple"
                @change="handleFileSelect"
        />
        <!--<button @click="triggerFileInput">選擇文件</button>-->
        <div v-if="selectedFiles.length > 0">
            <ul>
                <li v-for="file in selectedFiles" :key="file.name">{{ file.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FileUpload",
        props: {
            titleString: String,
            fileType: String, // 文件类型属性，用于区分不同的文件上传区域
            multiple: Boolean, // 是否支持多文件上传
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
                const acceptedFileTypes = [".pdf", ".docx", ".xlsx", ".jpg", ".png", ".git"];
                const droppedFiles = Array.from(event.dataTransfer.files);

                // 验证每个拖放的文件
                const validFiles = droppedFiles.filter((file) => {
                    const fileExtension = `.${file.name.split(".").pop()}`;
                    return acceptedFileTypes.includes(fileExtension);
                });

                if (validFiles.length > 0) {
                    this.selectedFiles = validFiles;
                    this.$emit("file-selected", this.selectedFiles);
                } else {
                    // 不是允许的文件类型，你可以进行适当的提示或处理
                    console.warn("只允許.pdf .docx .xlsx這三種檔案上傳");
                }
            },
            clearSelection() {
                this.selectedFiles = []; // 清空已选文件
                this.$emit("file-selected", this.selectedFiles); // 触发自定义事件
            },
        },
    };
</script>

<style scoped>
    .file-upload {
        text-align: center;
        margin: 10px 0px;
    }

    .drop-area {
        border: 2px dashed #ccc;
        padding: 10px 0px;
        cursor: pointer;
    }

    button {
        margin-top: 10px;
    }

    li {
        list-style: none;
        /*display: inline-block;*/
        padding-right:  10px;
    }
</style>
