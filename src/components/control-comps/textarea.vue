<template>
  <a-col>
    <a-input
      class="nf-form-input"
      type="textarea"
      :addonAfter="mergeConfig.addonAfter"
      :placeholder="placeholder"
      v-show="!hidden"
      :disabled="disabled"
      :maxlength="mergeConfig.maxlength"
      v-model="inputVal"
      @blur="onBlur"
    ></a-input>
  </a-col>
</template>


<script>
import ncformCommon from '@ncform/ncform-common'

const controlMixin = ncformCommon.mixins.vue.controlMixin

export default {
  mixins: [controlMixin],

  data() {
    return {
      inputVal: ''
    }
  },

  watch: {
    inputVal(newVal, oldVal) {
      if ((!newVal && !oldVal) || this.mergeConfig.updateOn === 'blur') return
      this.$data.modelVal = newVal
    }
  },

  methods: {
    onBlur() {
      if (this.mergeConfig.updateOn === 'blur') {
        this.$data.modelVal = this.$data.inputVal
      }
    },
  },

  created() {
    if (this.$data.modelVal !== undefined) {
      this.$data.inputVal =
        ['string', 'number'].indexOf(typeof this.$data.modelVal) >= 0
          ? this.$data.modelVal
          : this.$data.modelVal[this.mergeConfig.modelField]
    }
  }
}
</script>
