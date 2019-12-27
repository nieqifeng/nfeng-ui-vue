<template>
  <a-form class="form" :form="form" @submit="handleSubmit">
    <div :class="hide ? 'hide-wrap' : ''">
      <div class="form-item-wrap" ref="form-item-wrap">
        <!-- <slot name="item"></slot> -->
        <a-form-item
          v-for="item in fieldOptions"
          :key="item.label"
          :label="item.label"
        >
          <a-range-picker
            v-if="item.type === 'range-picker'"
            format="YYYY-MM-DD"
            v-decorator="item.decorator"
          />
          <!-- TODO：有bug日期选择器月份选择器选择了月份不会自动关闭, 👉https://github.com/sendya/ant-design-pro-vue/issues/282 -->
          <a-range-picker
            v-else-if="item.type === 'month-range-picker'"
            :mode="['month', 'month']"
            format="YYYY-MM"
            :placeholder="item.placeholder || ['启始月份', '结束月份']"
            v-decorator="[
              item.decorator[0],
              {
                ...item.decorator[1],
                trigger: 'panelChange'
              }
            ]"
          />
          <a-range-picker
            v-else-if="item.type === 'range-picker-month'"
            format="YYYY-MM"
            v-decorator="item.decorator"
            :mode="['month', 'month']"
            :placeholder="['开始月份', '结束月份']"
            @panelChange="item.panelChange"
          />
          <a-date-picker
            v-else-if="item.type === 'date-picker'"
            v-decorator="item.decorator"
            :disabledDate="item.disabledDate"
          />
          <a-month-picker
            v-else-if="item.type === 'month-picker'"
            format="YYYY-MM"
            v-decorator="item.decorator"
            :disabledDate="item.disabledDate"
          />
          <a-input
            v-else-if="!item.selectOptions"
            :placeholder="item.placeholder || '请输入'"
            v-decorator="item.decorator"
          />
          <a-select
            v-else
            :labelInValue="item.labelInValue"
            showSearch
            :placeholder="item.placeholder || '请选择'"
            optionFilterProp="children"
            style="width: 174px"
            @change="item.change"
            :filterOption="filterOption"
            v-decorator="item.decorator"
          >
            <a-select-option
              v-for="option in item.selectOptions"
              :key="option.value"
              >{{ option.text }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </div>
    </div>
    <a-form-item class="btn-item">
      <a-button class="submit" type="primary" html-type="submit">
        查询
      </a-button>
      <a-button @click="handleReset">
        清空
      </a-button>
      <slot name="button"></slot>
      <a-button v-if="hideShow" size="small" type="link" @click="hide = !hide">
        {{ hide ? '展开' : '收起' }}
        <a-icon v-if="hide" type="down" />
        <a-icon v-else type="up" />
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'NfSearchForm',
  props: ['fieldOptions'],
  data() {
    return {
      hide: true,
      hideShow: false,
      startValue: null,
      endValue: null,
      endOpen: false
    }
  },
  created() {
    this.form = this.$form.createForm(this, {
      // onFieldsChange: (_, changedFields) => {
      // console.log(changedFields)
      // this.$emit('change', changedFields)
      // },
      mapPropsToFields: () => {
        const obj = {}
        this.fieldOptions.forEach(item => {
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
  mounted() {
    this.hideShow = this.$refs['form-item-wrap'].offsetHeight > 103
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
    },
    handleReset() {
      this.form.resetFields()
      this.$emit('reset')
    },
    // 下面都是为了适配时间区间加的方法
    openChange(open) {
      console.log(open)
    },
    disabledStartDate(startValue) {
      const { endValue } = this
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const { startValue } = this
      console.log(startValue.valueOf())
      console.log(endValue.valueOf())
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  border-radius: 4px;
}
.hide-wrap {
  height: 103px;
  overflow: hidden;
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

.submit {
  margin-right: 20px;
}
</style>

<style>
.ant-form-item-label label {
  color: #666 !important;
}
</style>
