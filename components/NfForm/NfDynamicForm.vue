<template>
  <a-form
    layout="inline"
    :form="form">
    <a-form-item
      v-for="(item, key) in dataSource"
      :key="key">
      <div style="padding: 15px 0;">
        <span class="nf-form-text">实发金额区间：</span>
        <span class="nf-form-text"><b>{{item.leftVal}}</b> 万</span>
        <span class="nf-form-text"> 至 </span>
        <a-form-item
          class="nf-form-item">
          <a-input
            v-if="dataSource.length > key + 1"
            addonAfter="万"
            class="nf-form-input"
            @blur="e => rightBlurHandle(e, key)"
            v-decorator="[`${propName}.${key}.rightVal`, {
              rules: [{ validator: (rule, value, callback) => validatorRight(rule, value, callback, key) }],
              initialValue: item.rightVal}]" />
          <a-input
            v-else
            addonAfter="万"
            class="nf-form-input"
            value="不限"
            disabled />
        </a-form-item>
        <span
          class="nf-form-text"
          v-if="parseInt(key, 10) + 2 === dataSource.length">
          <a-button
            type="primary"
            @click="addHandle(key)">追加实发区间</a-button>
          <a-button
            v-if="key > 0"
            @click="delHandle(key)">删除</a-button>
        </span>
      </div>
      <nf-table-form
        :propName="`${propName}.${key}.${stepPropName}`"
        :dataSource="item[stepPropName]"></nf-table-form>
    </a-form-item>
  </a-form>
</template>

<script>
import NfTableForm from './NfTableForm.vue'

export default {
  name: 'NfDynamicForm',
  components: { NfTableForm },
  props: {
    dataSource: {
      type: Array,
      default() {
        return [{
          key: '0',
          leftVal: 0,
          rightVal: 100
        }, {
          key: '1',
          leftVal: 100,
          rightVal: 200
        }, {
          key: '2',
          leftVal: 200,
          rightVal: null
        }]
      }
    },
    propName: {
      type: String,
      default: 'personStepValDTOList'
    },
    stepPropName: {
      type: String,
      default: 'totalStepValWithRateDTOList'
    }
  },
  methods: {
    rightBlurHandle(e, index) {
      const { value } = e.target
      this.dataSource.rightVal = value
      if (this.dataSource.legnth === (index + 1)) return
      this.dataSource[index + 1].leftVal = value
    },
    validatorRight(rule, value, callback, index) {
      const { leftVal } = this.dataSource[index]
      const pattern = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      if (value === '') {
        callback('请输入实发金额区间')
      } else if (!pattern.test(value)) {
        callback('请输入正数(小数小于2位)')
      } else if (leftVal === null) {
        callback()
      } else if (parseFloat(leftVal, 10) >= parseFloat(value, 10)) {
        callback('实发金额区间上限必须大于下限')
      } else {
        callback()
      }
    },
    addHandle(index) {
      const { rightVal } = this.dataSource[index]
      const rOjb = {
        key: `${index + 1}`,
        leftVal: rightVal && rightVal !== 'undefined' ? rightVal : 0,
        rightVal: ''
      }
      rOjb[this.stepPropName] = [{
        key: `${index + 1}`,
        leftVal: 0,
        rightVal: '',
        rate: ''
      }]
      this.dataSource.push(rOjb)
    },
    delHandle(index) {
      this.dataSource.splice(index, 1)
    },
    validateFields(cb) {
      this.form.validateFields((err, values) => {
        cb(err, values)
      })
    }
  },
  created() {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style lang="scss" scoped>
.nf-form-text {
  text-align: center;
  display: inline-block;
  padding-right: 20px;
}
.nf-form-input {
  width: 120px!important;
}
</style>
