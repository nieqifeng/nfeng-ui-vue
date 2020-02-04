<template>
  <div class="clearfix">
    <a-upload
      :defaultFileList="fileList"
      :fileList="fileList"
      :class="{ 'nf-form-upload': Array.isArray(buttonText) }"
      listType="picture-card"
      :multiple="true"
      :customRequest="handleUpload"
      :remove="handleRemove"
      @preview="handlePreview"
    >
      <template v-if="Array.isArray(buttonText)">
        <template v-for="key in limit">
          <span
            class="nf-form-upload-item"
            :key="key"
            v-if="key > fileList.length && buttonText.length >= key"
          >
            <a-spin :spinning="uploading" tip="Uploading">
              <div>
                <a-icon type="plus" />
                <div class="ant-upload-text">{{buttonText[key] || buttonText[0]}}</div>
              </div>
            </a-spin>
          </span>
        </template>
      </template>
      <template v-else>
        <div v-if="fileList.length < limit">
          <a-spin :spinning="uploading" tip="Uploading">
            <a-icon type="plus" />
            <div class="ant-upload-text">{{buttonText}}</div>
          </a-spin>
        </div>
      </template>
    </a-upload>
    <nf-modal ref="modal" :imageList="fileList.map(val => val.url)"></nf-modal>
  </div>
</template>

<script>
import Ajax from '../../request'
import NfModal from '../NfModal/NfModal.vue'

export default {
  name: 'NfUpload',
  components: { NfModal },
  props: {
    // 限制上传个数
    limit: {
      type: Number,
      default: 1
    },
    // 上传类型
    type: {
      type: String,
      default: 'recharge_voucher_img'
    },
    // 按钮文案
    buttonText: {
      type: [Array, String]
    },
    // 图片数组
    imageList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      uploadAction: '/api/sysmgr-web/file/upload',
      fileList: [], // 数据里包含response字段
      uploading: false
    }
  },
  watch: {
    imageList: {
      handler(val) {
        if (val.length) this.fileList = this.filterList(val)
      },
      deep: true
    }
  },
  created() {
    if (this.imageList.length) this.fileList = this.filterList(this.imageList)
  },
  methods: {
    handlePreview(file) {
      const { name, url } = file
      if (name.includes('pdf')) {
        window.open(url)
      } else {
        const index = this.fileList.indexOf(file)
        this.$refs.modal.open(index + 1)
      }
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      this.$emit('change', newFileList)
    },
    handleUpload(file) {
      const formData = new FormData()
      formData.append('targetType', this.type)
      formData.append('fileName', file.file.name)
      formData.append('file', file.file)
      this.uploading = true
      Ajax.request({
        url: this.uploadAction,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then(({ data }) => {
        const newFileList = this.fileList.slice()
        newFileList.push({
          ...data,
          uid: newFileList.length,
          name: data.fileName,
          status: 'done',
          url: `/api/sysmgr-web/file/file-scan?downloadCode=${data.downloadCode}`
        })
        this.fileList = newFileList
        this.$emit('change', newFileList)
        this.uploading = false
      }, () => {
        this.uploading = false
        this.$message.error('upload failed.')
      })
    },
    filterList(list) {
      return list.map((item, index) => {
        const obj = {
          ...item,
          uid: index,
          name: item.fileName,
          status: 'done',
          url: `/api/sysmgr-web/file/file-scan?downloadCode=${item.downloadCode}`
        }
        return obj
      })
    }
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
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
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
