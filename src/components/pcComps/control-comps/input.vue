<template>
  <a-col>
    <a-input
      class="nf-form-input"
      :type="mergeConfig.type"
      :addonAfter="mergeConfig.addonAfter"
      :placeholder="placeholder"
      v-show="!hidden"
      :disabled="disabled"
      :maxlength="mergeConfig.maxlength"
      v-model="inputVal"
    ></a-input>
  </a-col>
</template>


<script>
import ncformCommon from '@ncform/ncform-common'
import _get from 'lodash-es/get'

const controlMixin = ncformCommon.mixins.vue.controlMixin

export default {
  mixins: [controlMixin],

  data() {
    return {
      inputVal: ''
    }
  },

  methods: {
    // 你可以通过该方法在modelVal传出去之前进行加工处理，即在this.$emit('input')之前
    _processModelVal() {
      let val = this.$data.inputVal

      if (this.mergeConfig.trim) {
        val = val ? val.toString().trim() : val
      }

      if (this.mergeConfig.type === 'number') {
        val = parseFloat(val)
        val = isNaN(val) ? '' : val
      }

      if (this.mergeConfig.type === 'integer') {
        val = parseInt(val)
        val = isNaN(val) ? '' : val
      }

      if (typeof this.value === 'object') {
        const obj = {}
        obj[this.mergeConfig.modelField] = val
        if (_get(this.mergeConfig, 'compound.prependSelect')) {
          obj[
            this.mergeConfig.compound.prependSelect.modelField
          ] = this.$data.prependSelectVal
        }
        if (_get(this.mergeConfig, 'compound.appendSelect')) {
          obj[
            this.mergeConfig.compound.appendSelect.modelField
          ] = this.$data.appendSelectVal
        }
        return obj
      } else {
        this.$data.inputVal = val
        return val
      }
    }
  },

  created() {
    this.$watch('inputVal', (newVal, oldVal) => {
      if ((!newVal && !oldVal) || this.mergeConfig.updateOn === 'blur') return
      let val = this._processModelVal()
      this.$emit('input', val)
    })

    if (this.$data.modelVal !== undefined) {
      this.$data.inputVal =
        ['string', 'number'].indexOf(typeof this.$data.modelVal) >= 0
          ? this.$data.modelVal
          : this.$data.modelVal[this.mergeConfig.modelField]
    }
  }
}
</script>
