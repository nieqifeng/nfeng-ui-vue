<template>
  <a-upload
    :defaultFileList="fileList"
    :fileList="fileList"
    :disabled="disabled"
    :multiple="multiple"
    :accept="accept"
    :customRequest="handleUpload"
    :remove="handleRemove"
    @preview="handlePreview"
  >
    <a-button v-if="fileList.length < limit" :disabled="disabled">
      {{ text }}
    </a-button>
  </a-upload>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

interface FileInterface {
  uid: number;
  name: string;
  status: string;
  percent: number;
  thumbUrl?: string;
}

@Component
export default class Upload extends Vue {
  @Prop({ type: Boolean })
  disabled;

  // 限制上传个数
  @Prop({ default: 1, type: Number })
  limit;

  // 按钮文案
  @Prop({ type: [Array, String], default: "上传文件" })
  text;

  // 图片数组
  @Prop({ default: () => [], type: Array })
  imageList;

  // 支持多选
  @Prop({ default: false, type: Boolean })
  multiple;

  // 上传函数
  @Prop()
  uploadFunction;

  // 文件类型
  @Prop({ default: ".pdf,.jpg,.png", type: String })
  accept;

  uploadAction = "/api/sysmgr-web/file/upload";
  fileList: Array<FileInterface> = []; // 数据里包含response字段
  show = false;
  index = 0;

  @Watch("imageList", { deep: true })
  onImageListChanged(val: Array<object>): void {
    this.fileList = val.length ? this.filterList(val) : [];
  }

  created() {
    if (this.imageList.length) {
      this.fileList = this.filterList(this.imageList);
    }
  }

  handlePreview(file) {
    const { name, downloadCode } = file;
    if (name.includes("pdf")) {
      window.open(
        `/api/sysmgr-web/file/file-scan?downloadCode=${downloadCode}`
      );
    } else {
      this.index = this.fileList.indexOf(file);
      this.show = true;
    }
  }

  @Emit("change")
  @Emit("remove")
  handleRemove(file) {
    const index = this.fileList.indexOf(file);
    const newFileList = this.fileList.slice();
    newFileList.splice(index, 1);
    this.fileList = newFileList;
    return newFileList;
  }

  handleUpload(file) {
    const newFileList: FileInterface[] = this.fileList.slice();
    const uid = newFileList.length
      ? newFileList[newFileList.length - 1].uid + 1
      : 0;
    const newFile: FileInterface = {
      uid,
      name: file.file.name,
      status: "uploading",
      percent: 1,
    };
    newFileList.push(newFile);
    this.uploadFunction &&
      this.uploadFunction(file.file).then(
        (data) => {
          if (!data || !data.downloadCode) {
            return;
          }
          this.fileList = newFileList;
          this.fileList = this.fileList.map((item) => {
            if (item.uid === uid) {
              item = {
                ...item,
                ...data,
                url: data.url,
                status: "done",
              };
            }
            return item;
          });
          this.changeValues();
        },
        () => {
          newFile.status = "error";
          this.$message.error("upload failed.");
        }
      );
  }

  @Emit("change")
  changeValues() {
    return this.fileList;
  }

  filterList(list) {
    return list.map((item, uid) => {
      const url = `/api/sysmgr-web/file/download?downloadCode=${item.downloadCode}`;
      const obj = {
        ...item,
        uid,
        name: item.fileName,
        status: "done",
        url,
      };
      return obj;
    });
  }
}
</script>
