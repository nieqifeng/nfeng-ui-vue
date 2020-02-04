<template>
  <a-form class="nf-form-create" :form="form" @submit="handleSubmit">
    <div class="nf-form-box" v-if="!('showBox' in formOptions) || formOptions.showBox">
      <nf-title v-if="formOptions.title" :title="formOptions.title"></nf-title>
      <nf-form-item :fieldOptions="fieldOptions">
        <template v-for="item in fieldOptions" :slot="item.decorator[0]">
          <slot :name="item.decorator[0]"></slot>
        </template>
      </nf-form-item>
    </div>
    <slot></slot>
    <div class="nf-form-btn" v-if="!('showBtn' in formOptions) || formOptions.showBtn">
      <slot name="button"></slot>
      <a-button
        type="primary"
        html-type="submit"
        :loading="formOptions.submitLoading"
      >{{formOptions.submitText || '提交'}}</a-button>
    </div>
  </a-form>
</template>

<script>
import NfTitle from '../NfTitle/NfTitle.vue'
import NfFormItem from './NfFormItem.vue'

export default {
  name: 'NfFormCreate',
  components: {
    NfTitle,
    NfFormItem
  },
  props: {
    fieldOptions: {
      type: Array,
      default: () => []
    },
    formOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    fields(val) {
      const obj = {}
      Object.keys(this.form.getFieldsValue()).forEach((item) => {
        obj[item] = val[item]
      })
      this.form.setFieldsValue(obj)
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
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
