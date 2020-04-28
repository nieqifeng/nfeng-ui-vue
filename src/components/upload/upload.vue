<template>
  <div class="clearfix">
    <a-upload
      :defaultFileList="fileList"
      :fileList="fileList"
      :class="{ 'nf-form-upload': Array.isArray(buttonText) }"
      listType="picture-card"
      :multiple="multiple"
      :accept="accept"
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
    <nf-modal :imageList="fileList.map(val => val.url)" :showModal.sync="showModal" :activeIndex.sync="activeIndex"></nf-modal>
  </div>
</template>

<script>
// import Ajax from '../../utils/request'
import NfModal from '../vmodal/vmodal.vue'
import defaultThumbUrl from '../../assets/pdf2.png'

// let intervalPercent = null // 上传进度
const notImgFile = /[^"]*(\.pdf)/

export default {
  components: { NfModal },
  props: {
    // 限制上传个数
    limit: {
      type: Number,
      default: 1,
    },
    // 上传类型
    type: {
      type: String,
      default: 'recharge_voucher_img',
    },
    // 按钮文案
    buttonText: {
      type: [Array, String],
    },
    // 图片数组
    imageList: {
      type: Array,
      default: () => [],
    },
    // 支持多选
    multiple: {
      type: Boolean,
      default: false,
    },
    uploadFunction: {
      type: Function
    },
    accept: {
      type: String,
      default: '.pdf,.jpg,.png'
    }
  },
  data() {
    return {
      uploadAction: '/api/sysmgr-web/file/upload',
      fileList: [], // 数据里包含response字段
      showModal: false,
      activeIndex: 0,
    }
  },
  watch: {
    imageList: {
      handler(val) {
        this.fileList = val.length ? this.filterList(val) : []
      },
      deep: true,
    },
  },
  created() {
    if (this.imageList.length) this.fileList = this.filterList(this.imageList)
  },
  methods: {
    handlePreview(file) {
      const { name, downloadCode } = file
      if (name.includes('pdf')) {
        window.open(`/api/sysmgr-web/file/file-scan?downloadCode=${downloadCode}`)
      } else {
        this.activeIndex = this.fileList.indexOf(file)
        this.showModal = true
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

      const newFileList = this.fileList.slice()
      const uid = newFileList.length ? newFileList[newFileList.length - 1].uid + 1 : 0
      const newFile = {
        uid,
        name: file.file.name,
        status: 'uploading',
        percent: 1,
      }
      if (notImgFile.test(file.file.name)) {
        newFile.thumbUrl = defaultThumbUrl
      }
      newFileList.push(newFile)
      this.fileList = newFileList

      // 进度条
      // intervalPercent = setInterval(() => {
      //   if (newFile.percent < 100) {
      //     newFile.percent += 1
      //   } else {
      //     clearInterval(intervalPercent)
      //   }
      // }, 50)

      this.uploadFunction(file, this.handleProgress).then((data) => {
        console.log(data)
        const downloadCode = data && data.downloadCode
        // const url = `/api/sysmgr-web/file/file-scan?downloadCode=${downloadCode}`
        const url = `/api/sysmgr-web/file/download?downloadCode=${downloadCode}`
        this.fileList = this.fileList.map((item) => {
          if (item.uid === uid) {
            item = {
              ...item,
              ...data,
              url,
              status: 'done',
            }
          }
          return item
        })
        this.$emit('change', this.fileList)
      }, (err) => {
        console.log(err)
        newFile.status = 'error'
        this.$message.error('upload failed.')
      })
      // Ajax.request({
      //   url: this.uploadAction,
      //   method: 'post',
      //   headers: { 'Content-Type': 'multipart/form-data' },
      //   data: formData,
      // }).then(({ data }) => {
      //   this.fileList = this.fileList.map((item) => {
      //     if (item.uid === uid) {
      //       item = {
      //         ...item,
      //         ...data,
      //         url: `/api/sysmgr-web/file/file-scan?downloadCode=${data.downloadCode}`,
      //         status: 'done',
      //       }
      //     }
      //     return item
      //   })
      //   this.$emit('change', this.fileList)
      // }, () => {
      //   this.$message.error('upload failed.')
      // })
    },
    handleProgress({ event, file }) {
      console.log(event, file)
      const vfile = this.vfileList.find(item => item.uid === file.uid)
      vfile.status = 'uploading'
      vfile.percent = Math.floor(event.loaded / event.total * 100)
    },
    filterList(list) {
      return list.map((item, index) => {
        const imgUrl = `/api/sysmgr-web/file/download?downloadCode=${item.downloadCode}`
        // 判断是否是图片
        const isImg = !notImgFile.test(item.fileName.toLocaleLowerCase())
        const obj = {
          ...item,
          uid: index,
          name: item.fileName,
          status: 'done',
          url: isImg ? imgUrl : defaultThumbUrl,
          // url: imgUrl,
        }
        return obj
      })
    },
  },
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
      // display: flex;
      // justify-content: center;
      // align-items: center;
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
