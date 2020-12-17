<template>
  <!-- 月份选择 -->
  <a-month-picker
    v-if="format === 'YYYY-MM' && range === false"
    :style="`width:${width}`"
    :disabled="disabled"
    :allowClear="allowClear"
    :placeholder="placeholder"
    :format="format"
    :value="date"
    @change="handleSelectChange"
  />
  <!-- 日期选择 -->
  <a-date-picker
    v-else-if="range === false"
    :style="`width:${width}`"
    :disabled="disabled"
    :allowClear="allowClear"
    :placeholder="placeholder"
    :show-time="showTime"
    :format="format"
    :value="date"
    @change="handleSelectChange"
  />

  <!-- 范围日期选择 -->
  <a-range-picker
    v-else-if="range === true"
    :style="`width:${width}`"
    :disabled="disabled"
    :allowClear="allowClear"
    :placeholder="placeholder"
    :show-time="showTime"
    :format="format"
    :value="date"
    @change="handleSelectChange"
  />
</template>

<script lang="ts">
import moment from "moment";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class DatePicker extends Vue {
  @Prop({ type: String, default: "200px" })
  width;
  @Prop({ type: Boolean })
  disabled;
  @Prop({ type: Boolean })
  allowClear;
  @Prop({ type: String })
  placeholder;
  @Prop({ type: Boolean })
  showTime;
  @Prop({ type: String })
  format;
  @Prop({ type: Boolean })
  range;
  @Prop()
  value;

  get date() {
    if (!this.value || (this.range && this.value.length === 0)) {
      return undefined;
    } else if (this.range) {
      return this.value.map((item) => moment(item, this.format));
    } else {
      return moment(this.value, this.format);
    }
  }

  @Emit("change")
  @Emit("input")
  handleSelectChange(val) {
    let date;
    if (!val || (this.range && val.length === 0)) {
      date = "";
    } else if (this.range) {
      date = val.map((item) => item.format(this.format));
    } else {
      date = val.format(this.format);
    }
    return date;
  }
}
</script>
