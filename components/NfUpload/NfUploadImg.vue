<template>
  <div>
    <div 
      v-for="(item, key) in fileList" 
      :key="key"
      style="display: inline-block;margin-right: 20px;">
      <div
        class="avatar"
        :showUploadList="false"
        :style="{'background-image': `url(${fileList[key].imageUrl})`}"
        @click="$refs['v-modal'].open(key + 1)"></div>
      <div class="btn-list">
        <a-upload
          :showUploadList="false"
          :customRequest="customRequest"
        >
          <a @click="imgIndex = key">重新上传</a>
        </a-upload>
        <a @click="deleteHandle(key)">删除</a>
      </div>
    </div>

    <div style="display: inline-block;margin-right: 20px;">
      <a-upload
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :multiple="true"
        :customRequest="customRequest"
      >
        <div @click="imgIndex = undefined">
          <a-icon type="plus" />
          <div class="ant-upload-text">可以同时上传多张</div>
        </div>
      </a-upload>
      <div class="btn-list">
        <a @click="$refs['v-modal'].open()">凭证示例</a>
      </div>
    </div>
    
    <nf-v-modal ref="v-modal" :imgList="imgList"></nf-v-modal>
  </div>
</template>

<script>
import Ajax from '../../request'

export default {
  name: 'NfUploadImg',
  props: {
    // fileList: {
    //   type: Array,
    //   default() {
    //     return []
    //   } 
    // },
    targetType: {
      type: String
    },
    action: {
      type: String
    },
    decorator: {
      type: Object
    }
  },
  computed: {
    imgList() {
      return this.fileList.map((item) => {
        const { imageUrl } = item
        return imageUrl
      })
    }
  },
  data() {
    return {
      fileList: [],
      imgIndex: undefined
    }
  },
  methods: {
    customRequest(e) {
      const { file } = e
      const { targetType, action, imgIndex } = this
      if (!this.beforeUpload() && imgIndex === undefined) {
        this.$message.error('最多只能上传10张图片！');
        return
      }
      const formData = new FormData()
      formData.append('targetType', targetType)
      formData.append('fileName', file.name)
      formData.append('file', file)
      Ajax.request({
        url: action,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then(({data}) => {
        if (data && data.downloadCode) {
          const imgData = {
            imageUrl: URL.createObjectURL(file),
            imgIndex,
            ...data
          }
          if (imgIndex !== undefined) {
            this.fileList.splice(imgIndex, 1, imgData)
          } else {
            this.fileList.push(imgData)
          }
          this.$emit('uploadSuccess', imgData)
        }
      })
    },
    beforeUpload(file) {
      const maxLength = this.fileList.length < 10 - 1
      return maxLength;
    },
    deleteHandle(key) {
      this.fileList.splice(key, 1)
      this.$emit('deleteHandle', key)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  width: 140px;
  height: 140px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
.btn-list {
  a {
    margin-right: 10px;
  }
}
</style>

<style lang="scss">
.avatar-uploader {
  display: inline-block;
  .ant-upload.ant-upload-select-picture-card {
    width: 128px;
    height: 128px;
    margin: 0;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #BABABA;
    font-size: 12px;
  }
}
</style>
