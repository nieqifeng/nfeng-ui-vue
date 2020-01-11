<template>
  <div class="clearfix">
    <a-upload
      listType="picture-card"
      name="file"
      :fileList="fileList"
      :beforeUpload="beforeUpload"
      :remove="handleRemove"
      :customRequest="handleUpload"
      @preview="handlePreview"
      @change="handleChange"
      :multiple="true"
      :class="{ 'nf-form-upload': Array.isArray(buttonText) }"
    >
      <template v-if="Array.isArray(buttonText)">
        <template v-for="key in limit">
          <span
            class="nf-form-upload-item"
            :key="key"
            v-if="key > fileList.length && buttonText.length >= key"
          >
            <div>
              <a-icon type="plus" />
              <div class="ant-upload-text">{{buttonText[key] || buttonText[0]}}</div>
            </div>
          </span>
        </template>
      </template>
      <template v-else>
        <div v-if="fileList.length < limit">
          <a-icon type="plus" />
          <div class="ant-upload-text">{{buttonText}}</div>
        </div>
      </template>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false" width="70%" centered>
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import Ajax from '../../request'

let intervalPercent = null // 上传进度

export default {
  name: 'NfUpload',
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
      // default: () => []
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
      previewVisible: false,
      previewImage: '',
      fileList: [] // 数据里包含response字段
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
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.$emit('change', newFileList.map(val => val.response))
    },
    handleChange(file) {
      this.fileList = file.fileList
      if (file.file.status === 'done') {
        this.$emit('change', this.fileList.map(val => val.response))
      }
    },
    handleUpload(file) {
      const formData = new FormData()
      formData.append('targetType', this.type)
      formData.append('fileName', file.file.name)
      formData.append('file', file.file)
      // 进度条
      const progress = { percent: 1 }
      intervalPercent = setInterval(() => {
        if (progress.percent < 100) {
          progress.percent += 1
          file.onProgress(progress)
        } else {
          clearInterval(intervalPercent)
        }
      }, 50)
      Ajax.request({
        url: this.uploadAction,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then(({ data }) => {
        if (intervalPercent) {
          clearInterval(intervalPercent)
        }
        file.onSuccess(data)
      }, (err) => {
        if (intervalPercent) {
          clearInterval(intervalPercent)
        }
        file.onError()
        this.$message.error(err.message)
      })
    },
    beforeUpload(file) {
      const typeFile = /[^"]*(\.jpg|\.png|\.bmp|\.jpeg)/
      const fileName = file.name.toLocaleLowerCase()
      if (!typeFile.test(fileName)) {
        this.$message.error(`${file.name} 文件格式不正确`)
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('文件不能大于2MB!')
      }
      return typeFile.test(fileName) && isLt2M
    },
    filterList(list) {
      return list.map((item, index) => {
        const obj = {
          ...item,
          uid: index,
          status: 'done',
          url: `/api/sysmgr-web/file/download?downloadCode=${item.downloadCode}`
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
