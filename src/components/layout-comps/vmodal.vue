<template>
  <div class="nf-modal-mask" v-if="visible">
    <div class="nf-modal">
      <div class="nf-modal-body">
        <a href="javascript:;" class="ant-modal-close" @click="visible = false">
          <span class="ant-modal-close-x">
            <a-icon type="close" />
          </span>
        </a>
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
  }
}
</script>
