<template>
  <a-form-model
    ref="formCreate"
    :model="formData"
    :rules="rules"
    :label-col="formLayout.labelCol"
    :wrapper-col="formLayout.wrapperCol"
  >
    <template v-for="(formItem, key) in option.column">
      <nf-form-item :key="key" :item="formItem" v-model="formData[formItem.prop]" />
    </template>
  </a-form-model>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import NfFormItem from "../FormItem";

interface Option {
  rules: object;
  formLayout: object;
}

@Component({
  components: {
    "nf-form-item": NfFormItem,
  },
})
export default class FormCreate extends Vue {
  $refs!: {
    formCreate: HTMLFormElement;
  }
  @Prop()
  option!: Option;
  // 表单数据
  formData = {};
  // 验证规则
  get rules() {
    return this.option.rules || {};
  }
  // 布局
  get formLayout() {
    const { formLayout } = this.option;
    return (
      formLayout || {
        wrapperCol: {
          span: 16,
        },
        labelCol: {
          span: 6,
        },
      }
    );
  }
  onSubmit(callback) {
    const values = JSON.parse(JSON.stringify(this.formData));
    this.$refs.formCreate.validate((valid) => callback(valid, values));
  }
  resetForm() {
    this.$refs.formCreate.resetFields();
  }
}
</script>
