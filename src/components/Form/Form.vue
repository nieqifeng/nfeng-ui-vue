<template>
  <a-form-model
    ref="formRule"
    class="ant-advanced-search-form"
    :model="formData"
    :rules="rules"
  >
    <a-row :gutter="24">
      <template v-for="(formItem, key) in fieldOptions">
        <a-col :key="key" v-if="key < count && !formItem.hidden" :span="8">
          <nf-form-item
            :item="formItem"
            v-model="formData[formItem.prop]"
            @change="changeValues"
          ></nf-form-item>
        </a-col>
      </template>
    </a-row>

    <a-row>
      <a-col :span="24" :style="{ textAlign: 'right' }">
        <a-button
          v-if="fold || (!fold && fieldOptions.length > count)"
          @click="fold = !fold"
        >
          {{ fold ? "收起" : "展开" }}
          <a-icon :type="fold ? 'up' : 'down'"></a-icon>
        </a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
          重置
        </a-button>
        <a-button
          :style="{ marginLeft: '8px' }"
          type="primary"
          @click="onSubmit"
        >
          查询
        </a-button>
        <slot name="extra"></slot>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import NfFormItem from "./Item.vue";

@Component({
  components: {
    "nf-form-item": NfFormItem,
  },
})
export default class Form extends Vue {
  $refs!: {
    formRule: HTMLFormElement;
  }
  @Prop({ type: Object })
  value;
  // 表单选项数组
  @Prop({ default: [], type: Array })
  fieldOptions;
  // 验证规则
  @Prop()
  rules;
  // 表单数据
  formData = {};
  fold = false;
  get count() {
    return this.fold ? 100 : 3;
  }
  @Emit("input")
  changeValues() {
    return this.formData;
  }
  onSubmit() {
    const values = JSON.parse(JSON.stringify(this.formData));
    this.$refs.formRule.validate((valid) => {
      if (valid) {
        this.submitForm(values);
      }
    });
  }
  @Emit("change")
  @Emit("submit")
  submitForm(values) {
    return values;
  }
  @Emit("reset")
  handleReset() {
    this.$refs.formRule.resetFields();
  }
}
</script>

<style lang="scss">
.ant-form-item-label label {
  color: #666 !important;
}

// .ant-advanced-search-form {
//   padding: 24px;
//   background: #fbfbfb;
//   border: 1px solid #d9d9d9;
//   border-radius: 6px;
// }

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
