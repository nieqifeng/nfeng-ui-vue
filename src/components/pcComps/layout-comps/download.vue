<template>
  <a-modal
    v-model="visible"
    :okText="false"
    :closable="false"
    :maskClosable="false"
    :footer="null"
    @cancel="visible = false"
  >
    <p class="nf-download-title">{{ progressDesc || '正在处理' }}...</p>
    <p>
      <a-progress :percent="progress" :status="state || 'active'" size="small"></a-progress>
    </p>
    <p>
      若等待时间过长，可关闭窗口，稍后请到“
      <router-link to="/downloadManager/index">下载管理</router-link>”中查看进度。
    </p>
    <p style="margin-top: 25px;text-align: right;">
      <a-button @click="cancelHandle">关闭</a-button>
    </p>
  </a-modal>
</template>
<script>
export default {
  props: {
    showModal: {
      type: Boolean
    },
    progress: {
      type: Number
    },
    progressDesc: {
      type: String
    },
    downloadFields: {
      type: Object
    },
    downloadFunction: {
      type: Function
    },
  },
  data() {
    return {
      state: 0,
    }
  },
  computed: {
    visible: {
      get() {
        return this.showModal
      },
      set(val) {
        this.$emit('update:showModal', val)
      }
    },
  },
  watch: {
    showModal(val) {
      if (val) {
        this.getProgress()
      }
    }
  },
  methods: {
    // 关闭弹框，停止轮询
    cancelHandle() {
      this.downloadMsg = ''
      this.percent = 0
      this.downloadState = 0
      this.visible = false
      cancelAnimationFrame(this.frame)
    },
    // 进度
    getProgress() {
      this.frame = requestAnimationFrame(this.getProgress)
      const currTime = new Date().getTime()
      if (!this.delayTime || currTime - this.delayTime > 1000) {
        this.delayTime = currTime
        this.downloadFunction(this.downloadFields).then((data) => {
          this.$emit('setProgress', data)
          if (this.progress === 100) {
            this.state = 'success'
            this.$message.success('下载成功')
            cancelAnimationFrame(this.frame)
          }
        }).catch(() => {
          this.state = 'exception'
          cancelAnimationFrame(this.frame)
        })
      }
    }
  },
}
</script>

<style lang="scss">
.nf-download-title {
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
}
</style>
