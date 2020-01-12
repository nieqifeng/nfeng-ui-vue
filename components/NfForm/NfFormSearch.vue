<template>
  <a-form class="nf-search-form" :form="form" @submit="handleSubmit">
    <div :class="{ 'hide-wrap' : expand }">
      <div class="form-item-wrap" ref="form-item-wrap">
        <a-form-item
          v-for="item in fieldOptions"
          :key="item.label"
          :label="item.label">
          <a-range-picker
            v-if="item.type === 'range-picker'"
            format="YYYY-MM-DD"
            v-decorator="item.decorator"
            :mode="item.mode"/>
          <a-date-picker
            v-else-if="item.type === 'date-picker'"
            v-decorator="item.decorator"/>
          <a-month-picker
            v-else-if="item.type === 'month-picker'"
            format="YYYY-MM"
            v-decorator="item.decorator"/>
          <a-input
            v-else-if="!item.selectOptions"
            :placeholder="item.placeholder || '请输入'"
            v-decorator="item.decorator"/>
          <a-select
            v-else
            :labelInValue="item.labelInValue"
            showSearch
            :placeholder="item.placeholder || '请选择'"
            optionFilterProp="children"
            style="width: 174px"
            @change="item.change"
            :filterOption="filterOption"
            v-decorator="item.decorator">
            <a-select-option
              v-for="option in item.selectOptions"
              :key="option.value">{{ option.text }}</a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </div>
    <a-form-item>
      <a-button type="primary" html-type="submit">查询</a-button>
      <a-button :style="{ marginLeft: '20px' }" @click="form.resetFields(), $emit('reset')">清空</a-button>
      <slot name="button"></slot>
      <a v-if="count" :style="{ marginLeft: '20px', fontSize: '12px' }" @click="expand = !expand">
        {{ expand ? '展开' : '收起' }} <a-icon :type="expand ? 'down' : 'up'" />
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'NfFormSearch',
  props: {
    fieldOptions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      expand: true,
      count: false
    }
  },
  mounted() {
    this.count = this.$refs['form-item-wrap'].offsetHeight > 103
  },
  created() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        const obj = {}
        this.fieldOptions.forEach((item) => {
          obj[item.decorator[0]] = this.$form.createFormField({
            value: item.value
          })
        })
        return obj
      },
      onValuesChange: (_, values) => {
        this.$emit('change', values)
      }
    })
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('submit', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nf-search-form {
  padding: 20px 20px 0 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin-bottom: 20px;
}
.form-item-wrap {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
}
.ant-form-item {
  padding-bottom: 0px;
  margin-right: 20px;
}
.hide-wrap {
  height: 103px;
  overflow: hidden;
}
</style>

<style>
.ant-form-item-label label {
  color: #666 !important;
}
</style>
