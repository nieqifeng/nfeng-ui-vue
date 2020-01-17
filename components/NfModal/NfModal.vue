<template>
  <div class="nf-modal-mask" v-if="visible">
    <div class="nf-modal-body center-box" :style="{ width }">
      <button class="ant-modal-close" @click="$emit('cancel')">
        <span class="ant-modal-close-x">
          <a-icon type="close" />
        </span>
      </button>
      <img :src="imageList.length ? imageList[current - 1] : ''" style="width: 100%;" />
    </div>
    <div class="left" v-if="current !== 1" @click="current -= 1"></div>
    <div class="right" v-if="current !== imageList.length" @click="current += 1"></div>
    <div class="total">{{current}} / {{imageList.length || 1}}</div>
  </div>
</template>

<script>
export default {
  name: 'NfModal',
  props: {
    imageList: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '800px'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      current: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.nf-modal-body {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 24px;
}
.nf-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  filter: alpha(opacity=50);
}
.left {
  position: absolute;
  top: calc(50% - 40px);
  left: 40px;
  width: 80px;
  height: 80px;
  background-image: url(../../image/left.png);
  background-size: cover;
  cursor: pointer;
}
.right {
  position: absolute;
  top: calc(50% - 40px);
  right: 40px;
  width: 80px;
  height: 80px;
  background-image: url(../../image/right.png);
  background-size: cover;
  cursor: pointer;
}
.total {
  position: absolute;
  width: 100%;
  bottom: 40px;
  text-align: center;
  color: #fff;
}
</style>
