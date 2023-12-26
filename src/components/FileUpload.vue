<template>
    <div class="col-6">
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
            <table class="newTable" v-if="selectedFiles.length > 0">
                <caption>檔案管理</caption>
                <thead style="position: sticky;top: 0;"
                       class="myNew">
                <tr>
                    <th class="text-center"
                        scope="col">類型
                    </th>
                    <th class="text-center"
                        scope="col">檔名
                    </th>
                    <th class="text-center"
                        scope="col">更換檔名
                    </th>
                    <th class="text-center"
                        scope="col">操作
                    </th>
                    <th style="width: 20px;">
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="file in selectedFiles" :key="file.name">
                    <td><select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                    </td>
                    <td>{{ file.name }}</td>
                    <td><input typeof="text" v-model="file.newName"/></td>
                    <td>
                        <vue-feather type="trash-2" size="20" stroke="red" class="m-clean"></vue-feather>
                    </td>
                </tr>
                </tbody>
            </table>
            <button type="button" @click="showFile"
                    class="m-r-5 btn btn-outline-warning btn-border-radius waves-effect myFont16">
                送出
            </button>

        </div>
        <!--<button @click="triggerFileInput">選擇文件</button>-->
    </div>
    <div class="col-6">
        <table class="newTable">
            <caption>檔案資料</caption>
            <thead style="position: sticky;top: 0;"
                   class="myNew">
            <tr>
                <th class="text-center"
                    style="min-width: 120px;"
                    scope="col">類型
                </th>
                <th class="text-center"
                    style="min-width: 120px;"
                    scope="col">檔名
                </th>
                <th class="text-center"
                    style="min-width: 120px;"
                    scope="col">操作
                </th>
                <th style="width: 20px;"></th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
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
                const acceptedFileTypes = [".pdf", ".docx", ".xlsx", ".jpg", ".png"];
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
                    console.warn("只允許.pdf, .docx, .xlsx, .jpg, .png這幾種檔案上傳");
                }
            },
            clearSelection() {
                this.selectedFiles = []; // 清空已选文件
                this.$emit("file-selected", this.selectedFiles); // 触发自定义事件
            },
            showFile(){
                console.log(this.selectedFiles);
            }
        },
    };
</script>

<style scoped>
    .file-upload {
        text-align: center;
        margin: 10px 20px;
        float: left;
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
        padding-right: 10px;
    }
</style>
