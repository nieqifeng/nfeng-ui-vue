<template>
  <a-time-picker
    :style="`width:${width}`"
    :disabled="disabled"
    :allowClear="allowClear"
    :placeholder="placeholder"
    :format="format"
    @change="handleSelectChange"
    :value="time"
  />
</template>

<script lang="ts">
import moment from "moment";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class TimePicker extends Vue {
  @Prop({ type: String, default: "200px" })
  width;
  @Prop({ type: Boolean })
  disabled;
  @Prop({ type: Boolean })
  allowClear;
  @Prop({ type: String })
  placeholder;
  @Prop({ type: String })
  format;
  @Prop()
  value;

  get time() {
    if (!this.value) {
      return undefined;
    } else {
      return moment(this.value, this.format);
    }
  }

  @Emit("change")
  @Emit("input")
  handleSelectChange(val) {
    let time;
    if (!val) {
      time = "";
    } else {
      time = val.format(this.format);
    }
    return time;
  }
}
</script>
