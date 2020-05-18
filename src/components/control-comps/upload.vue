<template>
  <div class="clearfix">
    <a-upload
      listType="picture-card"
      class="avatar-uploader"
      :action="mergeConfig.uploadUrl"
      :multiple="mergeConfig.multiple"
      :data="mergeConfig.data"
      :accept="mergeConfig.accept"
      :remove="handleUploadRemove"
      :customRequest="handleUpload"
      @change="handleUploadChange"
      @preview="handlePreview"
      :fileList="fileList"
    >
      <template v-if="Array.isArray(buttonText)">
        <template v-for="key in mergeConfig.limit">
          <span
            class="nf-form-upload-item"
            :key="key"
            v-if="key > fileList.length && buttonText.length >= key"
          >
            <div>
              <a-icon type="plus"/>
              <div class="ant-upload-text">{{buttonText[key] || buttonText[0]}}</div>
            </div>
          </span>
        </template>
      </template>
      <template v-else>
        <div v-if="fileList.length < mergeConfig.limit">
          <a-icon type="plus"/>
          <div class="ant-upload-text">{{buttonText}}</div>
        </div>
      </template>
    </a-upload>
    <nf-modal
      :imageList="fileList.map(val => val.url)"
      :showModal.sync="showModal"
      :activeIndex.sync="activeIndex"
    ></nf-modal>
  </div>
</template>

<script>
import ncformCommon from '@ncform/ncform-common'
import _get from 'lodash-es/get'

const controlMixin = ncformCommon.mixins.vue.controlMixin

import { post } from '../../utils/request.js'
import NfModal from '../layout-comps/vmodal.vue'
import defaultThumbUrl from '../../assets/pdf2.png'

let intervalPercent = null // 上传进度
const notImgFile = /[^"]*(\.pdf)/

import { v4 as uuidv4 } from 'uuid'
import { message } from 'ant-design-vue'

export default {
  mixins: [controlMixin],
  components: { NfModal },
  props: {
    // 按钮文案
    buttonText: {
      type: [Array, String],
      default: '上传图片',
    },
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      // 组件特有的配置属性
      defaultConfig: {
        uploadUrl: '', // 上传的地址
        multiple: false, // 是否支持多选
        data: {}, // 上传时附带的额外参数
        showFileList: true, // 是否显示已上传文件列表
        drag: false, // 是否启用拖拽上传
        accept: '', // 接受上传的文件类型
        listType: 'text', // 文件列表的类型。 可选值：text/picture/picture-card
        autoUpload: false, // 是否在选取文件后立即进行上传
        limit: 1, // 最大允许上传个数
        constraint: { // 约束 TODO: 未实现
          width: 0, // 图片宽度
          height: 0, // 图片高度
          sizeFixed: true, // 图片尺寸约束的大小是否按固定值，当为false时按比例
          maxSize: 0, // 最大图片大小，单位KB，0代表不限
          minSize: 0 // 最小图片大小，单位KB，0代表不限
        },
        resField: '', // 获取返回结果的字段,
        fileNameField: 'name',
        fileUrlField: 'url',
        fileField: 'file',
        headers: {}
      },
      uploadInfo: {
        numUploaded: 0,
        total: 0,
        count: 0,
        num: {
          success: 0, // 成功个数
          error: 0  // 失败个数
        }
      },
      // modelVal：请使用该值来绑定实际的组件的model--> [{name: 'xx', url: ''}]
      showModal: false,
      activeIndex: 0,
    }
  },

  computed: {
    // disabled / readonly / hidden / placeholder 你可以直接使用这些变量来控制组件的行为

    fileList() {
      const vm = this
      const modelVal = vm.modelVal
      let numUploaded = 0
      for (let i in modelVal) {
        if (modelVal[i].status === 'success' || !(modelVal[i].status)) {
          numUploaded++
          if (!(modelVal[i].status)) modelVal[i].status = 'success'
        }
      }
      vm.uploadInfo.numUploaded = numUploaded
      return modelVal
    },

  },
  methods: {
    handleUpload(file) {
      const formData = new FormData()
      Object.keys(this.mergeConfig.data).forEach((item) => {
        formData.append(item, this.mergeConfig.data[item])
      })
      formData.append('fileName', file.file.name)
      formData.append('file', file.file)

      const newFileList = this.fileList.slice()
      const uid = uuidv4()
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

      // 进度条
      intervalPercent = setInterval(() => {
        if (newFile.percent < 100) {
          newFile.percent += 1
        } else {
          clearInterval(intervalPercent)
        }
      }, 50)

      const vm = this
      post(this.mergeConfig.uploadUrl, formData).then((res) => {
        newFile.status = 'done'
        vm.handleUploadSucess(res, newFile, newFileList)
      })
    },
    handleUploadChange({ fileList }) {
      const vm = this
      vm.uploadInfo.total = fileList.length - vm.uploadInfo.numUploaded

      if (!vm.mergeConfig.autoUpload
        && !vm.mergeConfig.showFileList
        && fileList.length) {
        message({
          message: this.$nclang('successChTips', {fileCount: fileList.length}),
          type: 'success'
        })
      }
    },
    handleUploadSucess(res, file, fileList) { // 每个文件回调一次
      const vm = this
      let i
      for (i in fileList) {
        if (fileList[i].uid === file.uid) {
          const { resField, fileUrlField, fileNameField } = vm.mergeConfig
          const resObj = _get(res, resField || '', {})
          fileList[i].name = resObj && resObj[fileNameField] || fileList[i].name
          fileList[i].url = resObj && resObj[fileUrlField] || fileList[i].url
          break
        }
      }
      if (fileList[i].url) {
        vm.uploadCallback({ state: 'success', fileList })
      } else {
        // 去掉这个fileList
        fileList.splice(i,1)
        vm.uploadCallback({ state: 'error', fileList })
      }
    },
    uploadCallback({state, fileList}) {
      const vm = this
      const total = vm.uploadInfo.total
      vm.uploadInfo.count++
      vm.uploadInfo.num[state]++
      if ( vm.uploadInfo.count === total) { // 完成上传
        if (total === vm.uploadInfo.num[state]) {
          // console.log(state === 'success' ? vm.$nclang('uploadSuccess') : vm.$nclang('uploadFail'))
          // message[state](state === 'success' ? vm.$nclang('uploadSuccess') : vm.$nclang('uploadFail'))
          message[state](state === 'success' ? '上传成功~' : '上传失败~')
        } else {
          message.error(vm.$nclang('uploadSomeFail'))
        }

        vm.modelVal = fileList
        vm.uploadInfo.count = 0
        vm.uploadInfo.num.success = 0
        vm.uploadInfo.num.error = 0
      }
    },
    handleUploadRemove(file) {
      const vm = this
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      if (file.status === 'success') {
        vm.uploadInfo.numUploaded--
      }
      vm.uploadInfo.total = newFileList.length - vm.uploadInfo.numUploaded
      vm.modelVal = newFileList
    },
    handlePreview(file) {
      const { name, downloadCode } = file
      if (name.includes('pdf')) {
        window.open(`/api/sysmgr-web/file/file-scan?downloadCode=${downloadCode}`)
      } else {
        this.activeIndex = this.fileList.indexOf(file)
        this.showModal = true
      }
    },
  },
}
</script>
