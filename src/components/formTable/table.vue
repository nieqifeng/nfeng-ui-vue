<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.id"
    :dataSource="dataSource"
    :pagination="false"
    bordered
    style="margin: 12px 0;"
  >
    <template :slot="columns[0].dataIndex" slot-scope="text">
      <span>{{text === '' ? '-' : text}}万</span>
    </template>
    <template :slot="columns[1].dataIndex" slot-scope="text, record, index">
      <a-form-item>
        <a-input
          v-if="dataSource.length > index + 1"
          addonAfter="万"
          style="width: 120px;"
          @blur="e => rightBlurHandle(e, index)"
          v-decorator="[`${propName}.${index}.rightVal`, {
            rules: [{ validator: (rule, value, callback) => validatorRight(rule, value, callback, index) }],
            initialValue: text}]"
        />
        <span v-else>以上</span>
      </a-form-item>
    </template>
    <template :slot="columns[2].dataIndex" slot-scope="text, record, index">
      <a-form-item>
        <a-input
          addonAfter="%"
          style="width: 120px;"
          @change="e => rateBlurHandle(e, index)"
          v-decorator="[`${propName}.${index}.rate`, {
            rules: [{ validator: (rule, value, callback) => validatorRate(rule, value, callback, index) }],
            initialValue: text}]"
        />
      </a-form-item>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <a-button
          v-if="index + 2 === dataSource.length || dataSource.length === 1"
          type="primary"
          @click="addHandle(index)"
        >新增</a-button>
        <a-button
          v-if="index + 2 === dataSource.length && dataSource.length > 1"
          @click="delHandle(index)"
        >删除</a-button>
      </div>
    </template>
  </a-table>
</template>

<script>
import { isPosNum } from '../../utils/pattern'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    propName: {
      type: String,
      default: 'totalStepValWithRateDTOList'
    }
  },
  data() {
    return {
      columns: [{
        title: '月收入下限',
        align: 'center',
        dataIndex: 'leftVal',
        scopedSlots: { customRender: 'leftVal' }
      }, {
        title: '月收入上限',
        align: 'center',
        dataIndex: 'rightVal',
        scopedSlots: { customRender: 'rightVal' }
      }, {
        title: '结算比例',
        align: 'center',
        dataIndex: 'rate',
        scopedSlots: { customRender: 'rate' }
      }, {
        title: '操作',
        align: 'center',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        width: 180
      }]
    }
  },
  methods: {
    rightBlurHandle(e, index) {
      const { value } = e.target
      this.dataSource[index].rightVal = value
      if (this.dataSource.length === (index + 1)) return
      this.dataSource[index + 1].leftVal = value
    },
    rateBlurHandle(e, index) {
      const { value } = e.target
      this.dataSource[index].rate = value
    },
    validatorRight(rule, value, callback, index) {
      const { leftVal } = this.dataSource[index]
      if (value === '') {
        callback('请输入月收入上限')
      } else if (!isPosNum(value)) {
        callback('请输入正数(小数小于4位)')
      } else if (leftVal === null) {
        callback()
      } else if (parseFloat(leftVal, 10) >= parseFloat(value, 10)) {
        callback('月流水上限必须大于月流水下限')
      } else {
        callback()
      }
    },
    validatorRate(rule, value, callback) {
      if (value === '') {
        callback('请输入结算比例')
      } else if (!isPosNum(value)) {
        callback('请输入正数(小数小于4位)')
      } else if (parseFloat(value, 10) > 100) {
        callback('结算比例不能大于100')
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
      this.dataSource.push({
        id: `${index + 1}`,
        leftVal: rightVal !== 'undefined' ? rightVal : '',
        rightVal: '',
        rate: ''
      })
    },
    delHandle(index) {
      index += 1
      this.dataSource.splice(index, 1)
    }
  }
}
</script>
