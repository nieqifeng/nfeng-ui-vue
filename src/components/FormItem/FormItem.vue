<template>
  <a-form-model-item :label="item.label" :prop="item.prop">
    <a-input
      v-if="item.type === 'input'"
      :style="{ width: `${item.width || 200}px` }"
      :placeholder="item.placeholder || '请输入'"
      :allowClear="item.allowClear !== false"
      :disabled="item.disabled"
      :value="formValue"
      @change="(e) => change(e.target.value)"
    />
    <nf-select
      v-else-if="item.type === 'select'"
      :style="{ width: `${item.width || 200}px` }"
      :placeholder="item.placeholder || '请选择'"
      :allowClear="item.allowClear !== false"
      :options="item.options"
      :mode="item.mode"
      :value="formValue"
      @change="change"
    />
    <a-checkbox-group
      v-else-if="item.type === 'checkbox'"
      :value="formValue"
      @change="change"
    >
      <a-checkbox
        v-for="(item, key) in item.options"
        :key="key"
        :value="item.value"
      >
        {{ item.label }}
      </a-checkbox>
    </a-checkbox-group>
    <a-radio-group
      v-else-if="item.type === 'radio'"
      :value="formValue"
      @change="change"
    >
      <a-radio
        v-for="(item, key) in item.options"
        :key="key"
        :value="item.value"
      >
        {{ item.label }}
      </a-radio>
    </a-radio-group>
    <a-month-picker
      v-else-if="item.type === 'month-picker'"
      :style="{ width: `${item.width || 200}px` }"
      :placeholder="item.placeholder || '请选择'"
      :value-format="item.valueFormat || 'YYYY-MM'"
      format="YYYY-MM"
      :value="formValue || null"
      :allow-clear="item.allowClear !== false"
      :disabled-date="item.disabledDate"
      @change="change"
    />
    <a-date-picker
      v-else-if="item.type === 'date-picker'"
      :placeholder="item.placeholder || '请选择日期'"
      :value-format="item.valueFormat || 'YYYY-MM-DD'"
      format="YYYY-MM-DD"
      :value="formValue || null"
      :allowClear="item.allowClear !== false"
      @change="change"
    />
    <a-range-picker
      v-else-if="item.type === 'month-range-picker'"
      :placeholder="item.placeholder || ['起始月份', '结束月份']"
      format="YYYY-MM"
      :value-format="item.valueFormat || 'YYYY-MM'"
      :value="formValue || []"
      :mode="['month', 'month']"
      :allow-clear="item.allowClear !== false"
      @panelChange="change"
      @change="change"
    />
    <a-range-picker
      v-else-if="item.type === 'range-picker'"
      :placeholder="item.placeholder || ['起始日期', '截止日期']"
      format="YYYY-MM-DD"
      :value-format="item.valueFormat || 'YYYY-MM-DD'"
      :value="formValue || []"
      :allow-clear="item.allowClear !== false"
      @change="change"
    />
  </a-form-model-item>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit, Watch } from "vue-property-decorator";
import NfSelect from "../Select";

@Component({
  components: {
    "nf-select": NfSelect,
  },
})
export default class FormItem extends Vue {
  @Prop({ type: [String, Number, Array] })
  value;
  @Prop({ type: Object })
  item;

  formValue: string | number | [] = "";

  @Watch("value")
  onValueChanged(val: string | number | []): void {
    this.formValue = val || "";
  }

  @Emit("change")
  @Emit("input")
  change(value) {
    if (this.item.type === "month-range-picker" && value.length) {
      value = [value[0].format("YYYY-MM"), value[1].format("YYYY-MM")];
    }
    return value;
  }
}
</script>
