<template>
  <a-form-model
    id="formSearch"
    ref="formSearch"
    class="formSearch"
    :model="formData"
  >
    <template v-for="(formItem, key) in fieldOptions">
      <nf-form-item
        v-if="key < count && !formItem.hidden"
        :key="key"
        :item="formItem"
        v-model="formData[formItem.prop]"
        @change="changeValues"
      />
    </template>

    <a-form-model-item class="next-line">
      <a-button type="primary" @click="onSubmit">查询</a-button>
      <a-button @click="handleReset">清空</a-button>
      <slot name="extra"></slot>
      <a
        v-if="fold || (!fold && fieldOptions.length > count)"
        :style="{ marginLeft: '8px', fontSize: '12px' }"
        @click="fold = !fold"
      >
        {{ fold ? "收起" : "展开" }}
        <a-icon :type="fold ? 'up' : 'down'" />
      </a>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import NfFormItem from "../FormItem";

@Component({
  components: {
    "nf-form-item": NfFormItem,
  },
})
export default class FormSearch extends Vue {
  $refs!: {
    formSearch: HTMLFormElement;
  }
  @Prop({ type: Object })
  value;
  // 表单选项数组
  @Prop({ default: [], type: Array })
  fieldOptions;
  // 是否展开
  // @Prop({ default: false })
  // expend: boolean;
  // 表单数据
  formData = {};
  fold = false;
  get count() {
    return this.fold ? 100 : 5;
  }
  // get fold() {
  //   return this.expend;
  // }
  // set fold(val) {
  //   this.$emit("update:expend", val)
  // }
  @Emit("input")
  changeValues() {
    return this.formData;
  }
  onSubmit() {
    const values = JSON.parse(JSON.stringify(this.formData));
    this.$refs.formSearch.validate((valid) => {
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
    this.$refs.formSearch.resetFields();
  }
}
</script>

<style lang="scss" scoped>
.formSearch {
  background-color: white;
  margin-bottom: 20px;
  padding: 24px 24px 10px 24px;
  border: 1px solid #efefef;
  border-radius: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .ant-form-item {
    padding-bottom: 0px;
    margin-right: 20px;
    margin-bottom: 10px;
    &:last-child {
      padding-top: 25px;
    }
  }
  .ant-btn {
    margin-right: 15px;
  }
  .next-line {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

<style lang="scss">
.ant-form-item-label label {
  color: #666 !important;
}
</style>
