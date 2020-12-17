<template>
  <div class="clearfix">
    <a-upload
      :defaultFileList="fileList"
      :fileList="fileList"
      :class="{ 'nf-form-upload': Array.isArray(text) }"
      listType="picture-card"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      :customRequest="handleUpload"
      :remove="handleRemove"
      @preview="handlePreview"
    >
      <template v-if="Array.isArray(text)">
        <template v-for="key in limit">
          <span
            class="nf-form-upload-item"
            :key="key"
            v-if="key > fileList.length && text.length >= key"
          >
            <div>
              <a-icon type="plus" />
              <div class="ant-upload-text">
                {{ text[key] || text[0] }}
              </div>
            </div>
          </span>
        </template>
      </template>
      <template v-else>
        <div v-if="fileList.length < limit">
          <a-icon type="plus" />
          <div class="ant-upload-text">{{ text }}</div>
        </div>
      </template>
    </a-upload>
    <NfPreview
      :imageList="fileList.map((val) => val.url)"
      :show.sync="show"
      :index.sync="index"
    />
  </div>
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
  @Prop({ type: [Array, String], default: '上传图片' })
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

<style lang="scss">
.nf-form-upload {
  .ant-upload.ant-upload-select-picture-card {
    background-color: transparent !important;
    border: none !important;
    width: auto !important;
    height: auto !important;
  }
  .ant-upload.ant-upload-select-picture-card > .ant-upload {
    display: flex !important;
    padding: 0 !important;
  }
}
.ant-upload-list-picture-card {
  .ant-upload-list-item {
    width: 200px;
    height: 120px;
    .ant-upload-list-item-thumbnail {
      width: auto;
      height: auto;
      img {
        width: auto;
        height: auto;
        max-height: 102px;
        margin: 0 auto;
      }
    }
    .ant-upload-list-item-name {
      display: block;
    }
    .ant-upload-list-item-uploading-text {
      text-align: center;
    }
  }
}
.ant-upload-list-item-info > span {
  display: inline;
}
.ant-upload-select-picture-card {
  &.ant-upload-select-picture-card {
    width: 200px;
    height: 120px;
  }
  .ant-upload-text {
    margin-top: 8px;
    color: #999;
  }
}
.nf-form-upload-item {
  width: 200px;
  height: 120px;
  border-radius: 4px;
  border: 1px dashed #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  background-color: #fafafa;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: #1890ff;
  }
}
</style>
