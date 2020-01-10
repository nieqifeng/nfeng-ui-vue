<template>
  <div>
    <div v-for="(item, key) in dataSource" :key="key" style="display: block;margin-bottom: 12px;">
      <a-form-item label="实发金额区间：" style="min-width: 320px;">
        <span class="mr20">
          <b>{{item.leftVal === '' ? '-' : item.leftVal }}</b> 万
        </span>
        <span class="mr20">至</span>
        <a-input
          v-if="dataSource.length > key + 1 || dataSource.length === 1"
          addonAfter="万"
          style="width: 120px;"
          @blur="e => rightBlurHandle(e, key)"
          v-decorator="[`${propName}.${key}.rightVal`, {
            rules: [{ validator: (rule, value, callback) => validatorRight(rule, value, callback, key) }],
            initialValue: item.rightVal
          }]"
        ></a-input>
        <span v-else class="mr20">以上</span>
      </a-form-item>
      <a-form-item v-if="!showStep" label="实发金额：" style="min-width: 210px;">
        <a-input
          addonAfter="%"
          style="width:120px;"
          @blur="(e) => { dataSource[key].rate = e.target.value }"
          v-decorator="[`${propName}.${key}.rate`, {
            rules: [
              { required: true, message: '请输入实发金额' },
              { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '请输入正数(小数小于2位)' },
            ],
            initialValue: item.rate
          }]"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          v-if="key + 2 === dataSource.length || dataSource.length === 1"
          type="primary"
          @click="addHandle(key)"
        >追加实发区间</a-button>
        <a-button
          v-if="key + 2 === dataSource.length && dataSource.length > 2"
          @click="delHandle(key)"
        >删除</a-button>
      </a-form-item>
      <nf-table-form
        v-if="showStep"
        :propName="`${propName}.${key}.${stepPropName}`"
        :dataSource="item[stepPropName]"
      ></nf-table-form>
    </div>
  </div>
</template>

<script>
import NfTableForm from './NfTableForm.vue'

export default {
  name: 'NfDynamicForm',
  components: { NfTableForm },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    propName: {
      type: String,
      default: 'personStepValDTOList'
    },
    stepPropName: {
      type: String,
      default: 'totalStepValWithRateDTOList'
    },
    showStep: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    rightBlurHandle(e, index) {
      const { value } = e.target
      this.dataSource[index].rightVal = value
      if (this.dataSource.length === (index + 1)) return
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
      if (this.dataSource.length === 1) {
        index = 0
      } else if (this.dataSource.length === 2) {
        index = 1
      } else {
        index += 1
      }
      const { rightVal } = this.dataSource[index]
      const rOjb = {
        id: `${index + 1}`,
        leftVal: rightVal !== 'undefined' ? rightVal : '',
        rightVal: '',
        rate: ''
      }
      rOjb[this.stepPropName] = [{
        id: 1,
        leftVal: '',
        rightVal: '',
        rate: ''
      }]
      this.dataSource.push(rOjb)
    },
    delHandle(index) {
      index += 1
      this.dataSource.splice(index, 1)
    },
    validateFields(cb) {
      this.form.validateFields((err, values) => {
        cb(err, values)
      })
    }
  }
}
</script>
