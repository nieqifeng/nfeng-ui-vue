<template>
  <a-form :form="form">
    <template v-for="item in fieldOptions">
      <a-form-item
        :key="item.label"
        :label="item.label"
        :label-col="{ span: 4 }"
        :wrapper-col="item.wrapperCol || { span: item.label ? 14 : '' }"
        :help="item.help"
        :validate-status="item.validateStatus"
        v-if="!item.hide"
        :style="{marginBottom: item.type === 'text' || item.type === 'alert' ? '12px' : ''}">
        <a-alert 
          v-if="item.type === 'alert' && item.value"
          type="info" 
          showIcon>
          <p slot="message">
            <span v-html="item.value"></span>
          </p>
        </a-alert>
        <span 
          v-if="item.type === 'text'" 
          class="nf-form-text" 
          :style="{color:item.placeholder ? '#999': ''}" 
          v-html="item.value || item.placeholder">
        </span>
        <span 
          v-if="item.tips"
          class="nf-form-tips"
          v-html="item.tips"
          :style="{marginLeft: item.type === 'text' && item.value ? '20px' : ''}"></span>
        <a-input
          v-if="item.type === 'input'"
          :placeholder="item.placeholder || '请输入'"
          v-decorator="item.decorator"
          :disabled="item.disabled"></a-input>
        <a-select
          v-if="item.type === 'select'"
          :labelInValue="item.labelInValue"
          showSearch
          :placeholder="item.placeholder || '请选择'"
          optionFilterProp="children"
          @change="item.change"
          :filterOption="filterOption"
          v-decorator="item.decorator">
          <a-select-option
            v-for="option in item.selectOptions"
            :key="option.value">{{option.text}}</a-select-option>
        </a-select>
        <a-checkbox 
          v-if="item.type === 'checkbox'" 
          v-decorator="item.decorator">{{item.text}}</a-checkbox>
        <nf-upload-img
          v-if="item.type === 'upload'"
          targetType="recharge_voucher_img" 
          action="/api/sysmgr-web/file/upload"
          @uploadSuccess="item.uploadSuccess"
          @deleteHandle="item.deleteHandle"></nf-upload-img>
      </a-form-item>
    </template>
  </a-form>
</template>

<script>
export default {
  name: 'NfCreateForm',
  props: {
    fieldOptions: {
      type: Array
    }
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0]
        .text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleSubmit(e) {
      // e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('submit', values)
        }
      })
    }
  },
  created() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        const obj = {}
        this.fieldOptions.forEach((item) => {
          obj[item.decorator[0]] = this.$form.createFormField({
            value: item.value,
          })
        })
        return obj
      },
      onValuesChange: (_, values) => {
        this.$emit('change', values)
      },
    })
  }
}
</script>

<style lang="scss" scoped>
.nf-form-tips {
  color: #999;
}
</style>
