<template>
  <div>
    <a-form
      layout="inline"
      :form="form">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        bordered>
        <template
          :slot="columns[0].dataIndex"
          slot-scope="text, record, index">
          <span v-if="!index">无</span>
          <a-form-item v-else>
            <a-input
              addonAfter="万"
              style="width:120px;"
              @change="changeInputStart"
              v-decorator="[`${propName}[${index}].start`, {
                rules: [
                  { required: true, message: '请输入月收入下限' },
                  { validator: validatorStart },
                  { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '请输入正数(小数小于2位)'}
                ], initialValue: text}]"></a-input>
          </a-form-item>
        </template>
        <template
          :slot="columns[1].dataIndex"
          slot-scope="text, record, index">
          <span v-if="index + 1 === data.length">无</span>
          <a-form-item v-else>
            <a-input
              addonAfter="万"
              style="width:120px;"
              @change="changeInputEnd"
              v-decorator="[`${propName}[${index}].end`, {
                rules: [
                  { required: true, message: '请输入月收入上限' },
                  { validator: validatorEnd },
                  { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '请输入正数(小数小于2位)' }
                ], initialValue: text}]"></a-input>
          </a-form-item>
        </template>
        <template
          :slot="columns[2].dataIndex"
          slot-scope="text, record, index">
          <!-- <span class="nf-form-label">实发金额：</span> -->
          <a-form-item label="实发金额">
            <a-input
              addonAfter="%每人"
              style="width:120px;"
              @change="percentChange"
              v-decorator="[`${propName}[${index}].percent`, {
                rules: [
                  { required: true, message: '请输入阶梯收费' },
                  { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '请输入正数(小数小于2位)' }
                ], initialValue: text}]"></a-input>
          </a-form-item>
        </template>
        <!-- <template
          v-for="col in ['name', 'age', 'address']"
          :slot="col"
          slot-scope="text, record">
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"/>
            <template v-else>{{text}}</template>
          </div>
        </template> -->
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">Save</a>
              <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="() => edit(record.key)">Edit</a>
            </span>
          </div>
        </template>
      </a-table>
    </a-form>

    <!-- <div class="ant-table ant-table-bordered">
      <div class="ant-table-body">
        <table class="mb25">
          <thead class="ant-table-thead">
            <tr>
              <th v-for="(item, key) in columns[type]"
                  :key="key"
                  class="tc">{{item.title}}</th>
            </tr>
          </thead>
          <tbody class="ant-table-tbody">
            <tr v-for="(item, key) in dataSource"
                :key="key">
              <td>
                <div v-if="!key"
                    class="tc">无</div>
                <div v-else
                    style="display: flex;justify-content: space-between;">
                  <a-form-item style="flex: 2;">
                    <a-input addonAfter="万"
                            style="width:120px;"
                            @change="changeInputStart"
                            v-decorator="[`${propName}[${key}].start`, {
                                rules: [
                                { required: true, message: '请输入月收入下限' },
                                { validator: validatorStart },
                                {
                                  pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
                                  message: '请输入正数(小数小于2位)'
                                }],
                                initialValue: item.start,
                              }]"></a-input>
                  </a-form-item>
                </div>
              </td>
              <td>
                <div v-if="key + 1 === dataSource.length"
                    style="text-align: center;">无</div>
                <div v-else
                    style="display: flex;justify-content: space-between;">
                  <a-form-item style="flex: 1;">
                    <a-input addonAfter="万"
                            style="width:120px;"
                            @change="changeInputEnd"
                            v-decorator="[`${propName}[${key}].end`, {
                              rules: [
                              { required: true, message: '请输入月收入上限' },
                              { validator: validatorEnd },
                              {
                                pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
                                message: '请输入正数(小数小于2位)'
                              }],
                              initialValue: item.end,
                            }]"></a-input>
                  </a-form-item>
                </div>
              </td>
              <td>
                <a-form-item label="实发金额"
                            v-bind="formItemLayout">
                  <a-input addonAfter="%每人"
                          @change="percentChange"
                          v-decorator="[`${propName}[${key}].percent`, {
                            rules: [{required: true, message: '请输入阶梯收费'},
                            {
                              pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
                              message: '请输入正数(小数小于2位)'
                            }],
                            initialValue: item.percent,
                          }]"></a-input>
                </a-form-item>
              </td>
              <td width="100">
                <div style="justify-content: space-between;display: flex;">
                  <a href="javascript:;"
                    v-if="key + 2 === dataSource.length"
                    @click="onAdd(key)">新增</a>
                  <a href="javascript:;"
                    v-if="key !== 0 && key + 2 === dataSource.length"
                    @click="onDelete(key)">删除</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>

<script>
const columns = [
  {
    title: '月收入下限',
    align: 'center',
    dataIndex: 'start',
    scopedSlots: { customRender: 'start' }
  },
  {
    title: '月收入上限',
    align: 'center',
    dataIndex: 'end',
    scopedSlots: { customRender: 'end' }
  },
  {
    title: '阶梯收费',
    align: 'center',
    dataIndex: 'percent',
    scopedSlots: { customRender: 'percent' }
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
const data = [{
  key: '0',
  start: null,
  end: 100,
  percent: 30
}, {
  key: '1',
  start: 100,
  end: 200,
  percent: 40
}, {
  key: '2',
  start: 200,
  end: null,
  percent: 50
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
  name: 'NfTableForm',
  props: {
    feeContentMap: {
      type: Array,
      default() {
        return []
      }
    },
    propName: {
      type: String,
      default: 'stepwiseList'
    },
    // form: {
    //   type: Object
    // },
    item: {
      type: Object
    },
    type: {
      type: Number,
      default: 0 // 取columns字段用，0：无流水阶梯报价使用月收入，1：有流水使用月总额
    }
  },
  computed: {
    dataSource() {
      return this.feeContentMap.map((item, key) => ({ ...item, key }))
    },
    // 根据propName判断传进来的是serviceFeeContent还是serviceFeeContent2
    vPropName() {
      return this.propName.indexOf('serviceFeeContent2') === -1 ? 'serviceFeeContent' : 'serviceFeeContent2'
    }
  },
  data() {
    return {
      data,
      columns,
      // form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 10 }
      }
    }
  },
  methods: {
    validatorStart(rule, value, callback) {
      const field = rule.field.replace('start', 'end')
      const nextValue = this.form.getFieldValue(field)
      if (nextValue === null) {
        callback()
      } else if (parseInt(value, 10) >= parseInt(nextValue, 10)) {
        callback('月收入下限不得大于或等于上限')
      } else {
        callback()
      }
    },
    validatorEnd(rule, value, callback) {
      const field = rule.field.replace('end', 'start')
      const prevValue = this.form.getFieldValue(field)
      const key = field.replace(this.propName, '').substring(1, 2)
      if (key === '0') {
        callback()
      } else if (parseInt(value, 10) <= parseInt(prevValue, 10)) {
        callback('月收入上限不得小于或等于下限')
      } else {
        callback()
      }
    },
    onAdd(key) {
      this.feeContentMap.splice(key, 0, {
        end: null, // 结束金额
        equalsEnd: true, // 是否包含上限金额
        equalsStart: false, // 是否包含下限金额
        percent: null, // 收费比例
        // sequence: 1, // 序号
        start: null // 开始金额
      })
    },
    onDelete(key) {
      this.feeContentMap.splice(key, 1)
    },
    changeInputStart(e) {
      const { id, value } = e.target
      const key = id.replace(this.propName, '').substring(1, 2)
      const i = parseInt(key, 10)
      const field = id.replace(`[${i}]`, `[${i - 1}]`).replace('start', 'end')
      const obj = {}
      obj[field] = value
      this.form.setFieldsValue(obj)
      this.item[this.vPropName].stepwiseList[key].start = value
      this.item[this.vPropName].stepwiseList[key - 1].end = value
    },
    changeInputEnd(e) {
      const { id, value } = e.target
      const key = id.replace(this.propName, '').substring(1, 2)
      const i = parseInt(key, 10)
      const field = id.replace(`[${i}]`, `[${i + 1}]`).replace('end', 'start')
      const obj = {}
      obj[field] = value
      this.form.setFieldsValue(obj)
      this.item[this.vPropName].stepwiseList[key].end = value
      this.item[this.vPropName].stepwiseList[parseInt(key, 10) + 1].start = value
    },
    changeCheckStart(e) {
      const { id, checked } = e.target
      const key = id.replace(this.propName, '').substring(1, 2)
      const i = parseInt(key, 10)
      const field = id.replace(`[${i}]`, `[${i - 1}]`).replace('Start', 'End')
      const obj = {}
      obj[field] = !checked
      this.form.setFieldsValue(obj)
      this.item[this.vPropName].stepwiseList[key].equalsStart = checked
      this.item[this.vPropName].stepwiseList[key - 1].equalsEnd = !checked
    },
    changeCheckEnd(e) {
      const { id, checked } = e.target
      const key = id.replace(this.propName, '').substring(1, 2)
      const i = parseInt(key, 10)
      const field = id.replace(`[${i}]`, `[${i + 1}]`).replace('End', 'Start')
      const obj = {}
      obj[field] = !checked
      this.form.setFieldsValue(obj)
      this.item[this.vPropName].stepwiseList[key].equalsEnd = checked
      this.item[this.vPropName].stepwiseList[parseInt(key, 10) + 1].equalsStart = !checked
    },
    percentChange(e) {
      const { id, value } = e.target
      const key = id.replace(this.propName, '').substring(1, 2)
      this.item[this.vPropName].stepwiseList[key].percent = value
    }
  },
  created() {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style lang="scss" scoped>
.nf-form-label {
  line-height: 40px;
}
</style>
