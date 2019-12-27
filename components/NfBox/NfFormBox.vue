<template>
  <div>
    <div class="nf-form-box">
      <nf-title :title="title" v-if="title"></nf-title>
      <div class="nf-content" :style="{width}">
        <slot></slot>
      </div>
      <div 
        class="nf-form-tips" 
        :class="tipsClass"
        v-if="tipsTitle || tipsContent">
        <div class="nf-tips-title">{{tipsTitle}}</div>
        <div class="nf-tips-content">{{tipsContent}}</div>
      </div>
    </div>

    <div class="form-btn" v-if="showBtn">
      <!-- <a-button type="text">返回</a-button> -->
      <a-button type="primary" @click="$emit('handleSubmit')">提交</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NfFormBox',
  props: {
    width: {
      type: String,
      default: '600px'
    },
    title: {
      type: String
    },
    tipsTitle: {
      type: String
    },
    tipsContent: {
      type: String
    },
    tipsClass: {
      type: Object
    },
    showBtn: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.nf-form-box {
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 6px 0px rgba(204,204,204,0.4);
  padding: 20px;
  margin-bottom: 20px;
  .nf-content {
    // max-width: 600px;
    margin: 0 auto;
  }
}
.nf-form-tips {
  background: #fff;
  padding: 10px;
  &::before {
    content: '';
    display: block;
    height:1px;
    background:rgba(234,234,234,1);
    margin-bottom: 25px;
  }
  &.no-border::before {
    height: 0;
    margin-bottom: 0;
  }
  .nf-tips-title {
    font-size: 16px;
    color: #666666;
    margin-bottom: 15px;
  }
  .nf-tips-content {
    color: #999999;
  }
}
.form-btn {
  text-align: center;
  padding: 10px;
  button {
    width: 90px;
    height: 36px;
    margin: 0 10px;
  }
}
</style>
