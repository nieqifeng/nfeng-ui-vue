<template>
  <div 
    class="v-modal" 
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
      currentIndex: 1,
    }
  },
  methods: {
    open(key) {
      this.showVModal = true
      this.currentIndex = key || 1
    },
  }
}
</script>

<style scoped>
.v-modal {
  z-index: 2001;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url(../../image/example.png);
  background-repeat: no-repeat;
  background-size: 800px auto;
  background-position: center center;
  transition: all 0.3s;
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
