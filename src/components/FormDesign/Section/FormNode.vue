<template>
  <div class="drag-move-box">
    <NfFormItem
      v-model="value"
      :type="record.type"
      :options="record.options"
      :key="record.model"
      :model="record.model"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FormNode extends Vue {
  @Prop({ type: Object, default: () => {} })
  record;
  @Prop({ type: Object, default: () => {} })
  selectItem;

  value = "";
}
</script>

<style lang="less" scoped>
.drag-move-box {
  position: relative;
  box-sizing: border-box;
  padding: 8px;
  overflow: hidden;
  transition: all 0.3s;
  min-height: 36px;

  &:hover {
    background: fade(#13c2c2, 20%);
  }
}
</style>
