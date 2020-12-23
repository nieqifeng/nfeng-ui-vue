<template>
  <div
    class="drag-move-box"
    @click.stop="$emit('handleSelectItem', record)"
    :class="{ active: record.model === selectItem.model }"
  >
    <div class="form-item-box">
      <a-form-item
        :label="record.label"
        :label-col="UISchema.layout === 'horizontal' ? UISchema.labelCol : {}"
        :wrapper-col="
          UISchema.layout === 'horizontal' ? UISchema.wrapperCol : {}
        "
      >
        <NfFormItem
          v-model="value"
          :type="record.type"
          :options="record.options"
          :key="record.model"
          :model="record.model"
        />
      </a-form-item>
    </div>
    <div class="show-key-box" v-text="record.model" />
    <div
      class="copy"
      :class="record.model === selectItem.model ? 'active' : 'unactivated'"
      @click.stop="$emit('handleCopy')"
    >
      <a-icon type="copy" />
    </div>
    <div
      class="delete"
      :class="record.model === selectItem.model ? 'active' : 'unactivated'"
      @click.stop="$emit('handleDelete')"
    >
      <a-icon type="delete" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FormNode extends Vue {
  @Prop({ type: Object, default: () => {} })
  record;
  @Prop({ type: Object })
  UISchema;
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

  // 选择时 start
  &::before {
    content: "";
    height: 5px;
    width: 100%;
    background: #13c2c2;
    position: absolute;
    top: 0;
    right: -100%;
    transition: all 0.3s;
  }

  &.active {
    &::before {
      right: 0;
    }

    background: fade(#13c2c2, 20%);
    outline-offset: 0;
  }

  // 选择时 end
  .form-item-box {
    position: relative;
    box-sizing: border-box;
    word-wrap: break-word;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 888;
    }

    .ant-form-item {
      // 修改ant form-item的margin为padding
      margin: 0;
      padding-bottom: 6px;
    }
  }

  .show-key-box {
    // 显示key
    position: absolute;
    bottom: 2px;
    right: 5px;
    font-size: 14px;
    z-index: 999;
    color: #13c2c2;
  }

  > .copy,
  > .delete {
    position: absolute;
    top: 0;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    z-index: 989;
    transition: all 0.3s;

    &.unactivated {
      opacity: 0 !important;
      pointer-events: none;
    }

    &.active {
      opacity: 1 !important;
    }
  }

  > .copy {
    border-radius: 0 0 0 8px;
    right: 30px;
    background: #13c2c2;
  }

  > .delete {
    right: 0px;
    background: #13c2c2;
  }
}
</style>
