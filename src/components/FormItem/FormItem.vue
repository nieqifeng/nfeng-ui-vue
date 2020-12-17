<template>
  <!-- 单行文本 -->
  <a-input
    v-if="type === 'input'"
    :style="`width:${options.width}`"
    :disabled="options.disabled"
    :placeholder="options.placeholder || '请输入'"
    :allowClear="options.allowClear"
    :maxLength="options.maxLength"
    :value="value"
    @change="handleChange($event.target.value, model)"
    v-decorator="[
      model, // input 的 name
      {
        initialValue: options.defaultValue, // 默认值
        rules: rules, // 验证规则
      },
    ]"
  />
  <!-- 多行文本 -->
  <a-textarea
    v-else-if="type === 'textarea'"
    :style="`width:${options.width}`"
    :autoSize="{
      minRows: options.minRows,
      maxRows: options.maxRows,
    }"
    :disabled="options.disabled"
    :placeholder="options.placeholder || '请输入'"
    :allowClear="options.allowClear"
    :maxLength="options.maxLength"
    :rows="4"
    :value="value"
    @change="handleChange($event.target.value, model)"
    v-decorator="[
      model, // input 的 name
      {
        initialValue: options.defaultValue, // 默认值
        rules: rules, // 验证规则
      },
    ]"
  />

  <!-- 日期选择 -->
  <NfDatePicker
    v-else-if="type === 'date'"
    :width="options.width"
    :disabled="options.disabled"
    :allowClear="options.allowClear"
    :placeholder="options.placeholder"
    :showTime="options.showTime"
    :format="options.format"
    :range="options.range"
    :value="value"
    @change="handleChange($event, model)"
    v-decorator="[
      model, // input 的 name
      {
        initialValue: options.defaultValue, // 默认值
        rules: rules, // 验证规则
      },
    ]"
  />
  <!-- 时间选择 -->
  <NfTimePicker
    v-else-if="type === 'time'"
    :width="options.width"
    :disabled="options.disabled"
    :allowClear="options.allowClear"
    :placeholder="options.placeholder"
    :format="options.format"
    :value="value"
    @change="handleChange($event, model)"
    v-decorator="[
      model, // input 的 name
      {
        initialValue: options.defaultValue, // 默认值
        rules: rules, // 验证规则
      },
    ]"
  />
  <!-- 数字输入框 -->
  <a-input-number
    v-else-if="type === 'number'"
    :style="`width:${options.width}`"
    :min="options.min || options.min === 0 ? options.min : -Infinity"
    :max="options.max || options.max === 0 ? options.max : Infinity"
    :disabled="disabled || options.disabled"
    :step="options.step"
    :precision="
      options.precision > 50 || (!options.precision && options.precision !== 0)
        ? null
        : options.precision
    "
    :placeholder="options.placeholder"
    :value="value"
    @change="handleChange($event, model)"
    v-decorator="[
      model,
      {
        initialValue: options.defaultValue,
        rules: rules,
      },
    ]"
  />
  <!-- 单选框 -->
  <a-radio-group
    v-else-if="type === 'radio'"
    :options="
      !options.dynamic
        ? options.options
        : dynamicData[options.dynamicKey]
        ? dynamicData[options.dynamicKey]
        : []
    "
    :disabled="disabled || options.disabled"
    :placeholder="options.placeholder"
    :value="value"
    @change="handleChange($event.target.value, model)"
    v-decorator="[
      model,
      {
        initialValue: options.defaultValue,
        rules: rules,
      },
    ]"
  />
  <!-- 多选框 -->
  <a-checkbox-group
    v-else-if="type === 'checkbox'"
    :options="
      !options.dynamic
        ? options.options
        : dynamicData[options.dynamicKey]
        ? dynamicData[options.dynamicKey]
        : []
    "
    :disabled="disabled || options.disabled"
    :placeholder="options.placeholder"
    :value="value || []"
    @change="handleChange($event, model)"
    v-decorator="[
      model,
      {
        initialValue: options.defaultValue,
        rules: rules,
      },
    ]"
  />
  <!-- 评分 -->
  <a-rate
    v-else-if="type === 'rate'"
    :count="options.max"
    :disabled="disabled || options.disabled"
    :placeholder="options.placeholder"
    :allowHalf="options.allowHalf"
    :value="value || 0"
    @change="handleChange($event, model)"
    v-decorator="[
      model,
      {
        initialValue: options.defaultValue,
        rules: rules,
      },
    ]"
  />
  <!-- 下拉选框 -->
  <nf-select
    v-else-if="type === 'select'"
    :style="`width:${options.width}`"
    :placeholder="options.placeholder || '请选择'"
    :showSearch="options.showSearch"
    :options="
      !options.dynamic
        ? options.options
        : dynamicData[options.dynamicKey]
        ? dynamicData[options.dynamicKey]
        : []
    "
    :disabled="disabled || options.disabled"
    :allowClear="options.allowClear"
    :mode="options.multiple ? 'multiple' : ''"
    :value="value"
    @change="handleChange($event, model)"
    v-decorator="[
      model,
      {
        initialValue: options.defaultValue,
        rules: rules,
      },
    ]"
  />
  <!-- 开关 -->
  <a-switch
    v-else-if="type === 'switch'"
    :disabled="disabled || options.disabled"
    :value="value"
    @change="handleChange($event, model)"
    v-decorator="[
      model,
      {
        initialValue: options.defaultValue,
        valuePropName: 'checked',
        rules: rules,
      },
    ]"
  />
  <!-- 上传图片 -->
  <NfUploadImg
    v-else-if="type === 'uploadImg'"
    :style="`width:${options.width}`"
    :disabled="disabled || options.disabled"
    :limit="options.limit"
    :text="options.text"
    :value="value"
    @change="handleChange($event, model)"
    v-decorator="[
      model,
      {
        initialValue: options.defaultValue,
        rules: rules,
      },
    ]"
  />
  <!-- <a-month-picker
    v-else-if="options.type === 'month-picker'"
    :style="{ width: `${options.width || 200}px` }"
    :placeholder="options.placeholder || '请选择'"
    :value-format="options.valueFormat || 'YYYY-MM'"
    format="YYYY-MM"
    :value="formValue || null"
    :allow-clear="options.allowClear !== false"
    :disabled-date="options.disabledDate"
    @change="change"
  />
  <a-date-picker
    v-else-if="options.type === 'date-picker'"
    :placeholder="options.placeholder || '请选择日期'"
    :value-format="options.valueFormat || 'YYYY-MM-DD'"
    format="YYYY-MM-DD"
    :value="formValue || null"
    :allowClear="options.allowClear !== false"
    @change="change"
  />
  <a-range-picker
    v-else-if="options.type === 'month-range-picker'"
    :placeholder="options.placeholder || ['起始月份', '结束月份']"
    format="YYYY-MM"
    :value-format="options.valueFormat || 'YYYY-MM'"
    :value="formValue || []"
    :mode="['month', 'month']"
    :allow-clear="options.allowClear !== false"
    @panelChange="change"
    @change="change"
  />
  <a-range-picker
    v-else-if="options.type === 'range-picker'"
    :placeholder="options.placeholder || ['起始日期', '截止日期']"
    format="YYYY-MM-DD"
    :value-format="options.valueFormat || 'YYYY-MM-DD'"
    :value="formValue || []"
    :allow-clear="options.allowClear !== false"
    @change="change"
  /> -->
  <!-- 树选择器 -->
  <a-tree-select
    v-else-if="type === 'treeSelect'"
    :style="`width:${options.width || '100%'}`"
    :placeholder="options.placeholder || '请选择'"
    :multiple="options.multiple"
    :showSearch="options.showSearch"
    :treeCheckable="options.treeCheckable"
    :treeData="
      !options.dynamic
        ? options.options
        : dynamicData[options.dynamicKey]
        ? dynamicData[options.dynamicKey]
        : []
    "
    :disabled="disabled || options.disabled"
    :allowClear="options.allowClear"
    :value="value || undefined"
    @change="handleChange($event)"
  />
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit } from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  @Prop({ type: String })
  type;
  @Prop({ type: Boolean })
  disabled;
  @Prop({ type: [String, Number, Array, Boolean] })
  value;
  @Prop({ type: Object })
  options;
  @Prop({ type: Array, default: () => [] })
  dynamicData;
  @Prop({ type: String })
  model;
  @Prop()
  rules;

  @Emit("change")
  @Emit("input")
  handleChange(value) {
    return value;
  }
}
</script>
