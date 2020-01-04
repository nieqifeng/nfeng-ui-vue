<template>
  <div>
    <a-form
      layout="inline"
      :form="form">
      <a-form-item
        v-for="(item, key) in data"
        :key="key">
        <div style="margin: 15px 0;min-width: 700px;">
          <span class="nf-form-text">月收入</span>
          <a-form-item
            v-if="key !== 0"
            class="nf-form-item">
            <a-input
              addonAfter="万"
              class="nf-form-input"
              @blur="startHandle"
              v-decorator="[`${propName}.${key}.start`, {
                rules: [
                  { required: true, message: '请输入月收入下限' },
                  { validator: validateStart },
                  { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '请输入正数(小数小于2位)' }
                ], initialValue: item.start}]" />
            <span
              class="nf-form-text"
              v-if="data.length === key + 1">以上</span>
          </a-form-item>
          <span
            class="nf-form-text"
            v-if="key !== 0 && key + 1 !== data.length"> - </span>
          <a-form-item
            v-if="key + 1 !== data.length"
            class="nf-form-item">
            <a-input
              addonAfter="万"
              class="nf-form-input"
              @blur="endHandle"
              v-decorator="[`${propName}.${key}.end`, {
                rules: [
                  { required: true, message: '请输入月收入上限' },
                  { validator: validateEnd },
                  { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '请输入正数(小数小于2位)' }
                ], initialValue: item.end}]" />
            <span
              class="nf-form-text"
              v-if="data.length !== key + 1">{{ key === 0 ? '以下' : '(含)' }}</span>
          </a-form-item>
          <span
            class="nf-form-text"
            v-if="parseInt(key, 10) + 2 === data.length">
            <a-button @click="addHandle">
              <a-icon type="plus" />新增月收入区间</a-button>
            <a-button @click="delHandle"
                      v-if="key > 0">
              <a-icon type="delete" />删除阶梯</a-button>
          </span>
        </div>
        <nf-table-form ref="tableForm"></nf-table-form>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import NfTableForm from './NfTableForm.vue'

const data = [{
  key: '0',
  start: null,
  end: 2.8,
  percent: null
}, {
  key: '1',
  start: 2.8,
  end: 9.3,
  percent: null
}, {
  key: '2',
  start: 9.3,
  end: null,
  percent: null
}]
// for (let i = 0; i < 3; i++) {
//   data.push({
//     key: i.toString(),
//     start: i,
//     end: 32,
//     percent: i + 1
//   })
// }
export default {
  name: 'NfDynamicForm',
  components: { NfTableForm },
  data() {
    return {
      data
    }
  },
  props: {
    propName: {
      type: String,
      default: 'serviceFeeContent'
    }
  },
  methods: {
    startHandle(e) {
      const { id, value } = e.target
      const key = parseInt(id.split('.')[4], 10) - 1
      const { propName } = this
      const field = `${propName}.${key}.end`
      const obj = {}
      obj[field] = value
      this.form.setFieldsValue(obj)
    },
    endHandle(e) {
      const { id, value } = e.target
      const key = parseInt(id.split('.')[4], 10) + 1
      const { propName } = this
      const field = `${propName}.${key}.start`
      const obj = {}
      obj[field] = value
      this.form.setFieldsValue(obj)
    },
    addHandle() {
      const { secondType } = this.item.serviceFeeInterval
      this.item.push({
        start: null, // 区间开始
        equalsStart: false, // 是否包含开始区间
        end: null, // 区间结束
        equalsEnd: true, // 是否包含结束区间
        feeRate: '', // 收费比例（无流水阶梯或固定比例时，使用此字段处理费率比例）
        stepwiseList: secondType === '4' ? [{
          start: null, // 子阶梯开始区间
          equalsStart: false, // 是否包含开始区间
          end: '', // 子阶梯结束区间
          equalsEnd: true, // 是否包含结束区间
          // "sequence": 0, // 序号
          percent: null // 收费比例
        }, {
          start: '', // 子阶梯开始区间
          equalsStart: false, // 是否包含开始区间
          end: '', // 子阶梯结束区间
          equalsEnd: true, // 是否包含结束区间
          // "sequence": 0, // 序号
          percent: null // 收费比例
        }, {
          start: '', // 子阶梯开始区间
          equalsStart: false, // 是否包含开始区间
          end: null, // 子阶梯结束区间
          equalsEnd: true, // 是否包含结束区间
          // "sequence": 0, // 序号
          percent: null // 收费比例
        }] : null // 无流水报价不处理此阶梯
      })
      this.$forceUpdate()
    },
    delHandle() {
      const { length } = this.item
      console.log(length)
      this.item.splice(parseInt(length, 10) - 1, 1)
      this.item[parseInt(length, 10) - 2].end = null
      this.$forceUpdate()
    },
    validateStart(rule, value, callback) {
      const field = rule.field.replace('start', 'end')
      const nextValue = this.form.getFieldValue(field)
      if (nextValue === null) {
        callback()
      } else if (parseFloat(value, 10) >= parseFloat(nextValue, 10)) {
        callback('月收入下限不得大于或等于上限')
      } else {
        callback()
      }
    },
    validateEnd(rule, value, callback) {
      const field = rule.field.replace('end', 'start')
      const prevValue = this.form.getFieldValue(field)
      const key = field.replace(this.propName, '').substring(1, 2)
      if (key === '0') {
        callback()
      } else if (parseFloat(value, 10) <= parseFloat(prevValue, 10)) {
        callback('月收入上限不得小于或等于下限')
      } else {
        callback()
      }
    },
    validateFields(cb) {
      let err1 = ''
      let map1 = ''
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          map1 = values
        } else {
          err1 = err
        }
      })
      if (this.$refs.tableForm) {
        map1 = this.$refs.tableForm.map((item, key) => {
          const fieldsValue = this.form.getFieldsValue()[this.propName][key]
          item.form.validateFields((err, values) => {
            if (!err) {
              // console.log('Received values of form: ', values)
              Object.assign(fieldsValue, values)
            }
          })
          return fieldsValue
        })
      }
      cb(err1, map1)
    }
  },
  created() {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style lang="scss" scoped>
.nf-form-item {
  margin-right: 0!important;
}
.nf-form-input {
  width: 120px!important;
}
.nf-form-text {
  text-align: center;
  display: inline-block;
  margin: 0 10px;
}
</style>
