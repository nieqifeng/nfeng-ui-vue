<template>
  <div class="nf-modal-mask" v-if="visible">
    <div class="nf-modal">
      <div class="nf-modal-body">
        <button class="ant-modal-close" @click="visible = false">
          <span class="ant-modal-close-x">
            <a-icon type="close" />
          </span>
        </button>
        <img :src="imageList.length ? imageList[current] : ''" style="width: 100%;" />
      </div>
    </div>
    <div class="left" v-if="current !== 0" @click="current -= 1"></div>
    <div class="right" v-if="current !== imageList.length - 1" @click="current += 1"></div>
    <div class="total">{{current + 1}} / {{imageList.length}}</div>
  </div>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array,
      default: () => []
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    activeIndex(val) {
      this.current = val
    }
  },
  data() {
    return {
      current: 0
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
    // current: {
    //   get() {
    //     return this.activeIndex
    //   },
    //   set(val) {
    //     this.$emit('update:activeIndex', val)
    //   }
    // },
  }
}
</script>

<style lang="scss" scoped>
.nf-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  filter: alpha(opacity=50);
  .nf-modal {
    position: relative;
    top: 100px;
    width: 800px;
    margin: 0 auto;
    padding-bottom: 24px;
  }
  .nf-modal-body {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 24px;
  }
  .left {
    position: absolute;
    top: calc(50% - 40px);
    left: 40px;
    width: 80px;
    height: 80px;
    background-image: url('../../assets/left.png');
    background-size: cover;
    cursor: pointer;
  }
  .right {
    position: absolute;
    top: calc(50% - 40px);
    right: 40px;
    width: 80px;
    height: 80px;
    background-image: url('../../assets/right.png');
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
