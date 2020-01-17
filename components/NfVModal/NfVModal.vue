<template>
  <div
    class="nf-v-modal"
    v-show="showVModal"
    @click="showVModal = false"
    :style="{ backgroundImage: imgList.length ? `url(${imgList[currentIndex - 1]})` : ''}">
      <div class="left" @click.stop="currentIndex === 1 ? null : currentIndex -= 1"></div>
      <div class="right" @click.stop="currentIndex === imgList.length ? null : currentIndex += 1"></div>
      <div class="total">{{currentIndex}} / {{imgList.length || 1}}</div>
  </div>
</template>

<script>
export default {
  name: 'NfVModal',
  props: {
    imgList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showVModal: false,
      currentIndex: 1
    }
  },
  methods: {
    open(key) {
      this.showVModal = true
      this.currentIndex = key || 1
    }
  }
}
</script>

<style lang="scss" scoped>
.nf-v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
  z-index: 2001;
  background-image: url(../../image/example.png);
  background-repeat: no-repeat;
  background-position: center center;
  transition: all 0.3s;

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
}
</style>
