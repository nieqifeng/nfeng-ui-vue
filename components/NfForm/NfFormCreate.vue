<template>
  <a-form class="nf-form-create" :form="form" @submit="handleSubmit">
    <div class="nf-form-box" v-if="showBox">
      <nf-title v-if="title" :title="title"></nf-title>
      <template v-for="item in fieldOptions">
        <a-form-item
          :key="item.label"
          :label="item.label"
          :label-col="item.labelCol || { span: 9 }"
          :wrapper-col="item.wrapperCol || { span: 15 }"
          v-if="!('show' in item) || item.show"
          :style="item.style"
        >
          <span v-if="item.type === 'text'" v-html="item.value"></span>
          <slot v-if="item.type === 'slot'" :name="item.decorator[0]"></slot>
          <a-input
            v-if="item.type === 'input' || item.type === 'number'"
            class="nf-form-input"
            :type="item.type"
            :addonAfter="item.addonAfter"
            :placeholder="item.placeholder || '请输入'"
            @change="item.change"
            v-decorator="item.decorator"
            :disabled="item.disabled"
          ></a-input>
          <a-select
            v-if="item.type === 'select'"
            class="nf-form-input"
            :labelInValue="item.labelInValue"
            showSearch
            :placeholder="item.placeholder || '请选择'"
            optionFilterProp="children"
            @change="item.change"
            :filterOption="filterOption"
            v-decorator="item.decorator"
          >
            <a-select-option v-for="option in item.selectOptions" :key="option.value">{{option.text}}</a-select-option>
          </a-select>
          <a-radio-group
            v-if="item.type === 'radio'"
            v-decorator="item.decorator"
            @change="item.change"
          >
            <a-radio
              v-for="option in item.selectOptions"
              :key="option.value"
              :value="option.value"
            >{{option.text}}</a-radio>
          </a-radio-group>
          <a-checkbox-group v-if="item.type === 'checkbox'" v-decorator="item.decorator">
            <a-checkbox
              v-for="option in item.selectOptions"
              :key="option.value"
              :value="option.value"
            >{{option.text}}</a-checkbox>
          </a-checkbox-group>
          <nf-upload
            v-if="item.type === 'upload'"
            v-decorator="item.decorator"
            :buttonText="item.buttonText"
            :limit="item.limit"
            :imageList="item.value"
          ></nf-upload>
          <nf-form-item v-if="item.childList" :fieldOptions="item.childList"></nf-form-item>
        </a-form-item>
      </template>
    </div>
    <slot></slot>
    <div class="nf-form-btn" v-if="showBtn">
      <slot name="button"></slot>
      <a-button type="primary" html-type="submit">{{submitText}}</a-button>
    </div>
  </a-form>
</template>

<script>
import NfTitle from '../NfTitle/NfTitle.vue'
import NfUpload from '../NfUpload/NfUpload.vue'

export default {
  name: 'NfFormCreate',
  components: {
    NfTitle,
    NfUpload
  },
  props: {
    fieldOptions: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    },
    showBox: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '提交'
    },
    fields: {
      type: Object
    }
  },
  watch: {
    fields(val) {
      const obj = {}
      console.log(this.form.getFieldsValue())
      Object.keys(this.form.getFieldsValue()).forEach((item) => {
        obj[item] = val[item]
      })
      this.form.setFieldsValue(obj)
    }
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
  },
  created() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        const obj = {}
        this.fieldOptions.forEach((item) => {
          if (!item.decorator[0]) return
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
  }
}
</script>

<style lang="scss">
.nf-form-create {
  margin-bottom: 20px;
}
.nf-form-box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(204, 204, 204, 0.4);
  padding: 20px;
}
.nf-form-btn {
  background-color: #f0f2f5;
  text-align: center;
  margin-top: 20px;
}
.nf-form-input {
  width: 360px !important;
}
</style>
