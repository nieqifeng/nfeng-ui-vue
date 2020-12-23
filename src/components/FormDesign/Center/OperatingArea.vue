<template>
  <div class="operating-area">
    <!-- 头部操作按钮区域 start -->
    <!-- 操作左侧区域 start -->
    <div class="left-btn-box">
      <a-tooltip title="保存">
        <a v-if="toolbars.includes('save')" @click="$emit('handleSave')">
          <a-icon type="save" />
          <span v-if="showToolbarsText">保存</span>
        </a>
      </a-tooltip>

      <a-tooltip title="预览">
        <a v-if="toolbars.includes('preview')" @click="$emit('handlePreview')">
          <a-icon type="chrome" />
          <span v-if="showToolbarsText">预览</span>
        </a>
      </a-tooltip>

      <a-tooltip title="导入">
        <a
          v-if="toolbars.includes('importJson')"
          @click="$emit('handleOpenImportJsonModal')"
        >
          <a-icon type="upload" />
          <span v-if="showToolbarsText">导入</span>
        </a>
      </a-tooltip>

      <a-tooltip title="生成JSON">
        <a
          v-if="toolbars.includes('exportJson')"
          @click="$emit('handleOpenJsonModal')"
        >
          <a-icon type="credit-card" />
          <span v-if="showToolbarsText">生成JSON</span>
        </a>
      </a-tooltip>

      <a-tooltip title="生成代码">
        <a
          v-if="toolbars.includes('exportCode')"
          @click="$emit('handleOpenCodeModal')"
        >
          <a-icon type="code" />
          <span v-if="showToolbarsText">生成代码</span>
        </a>
      </a-tooltip>

      <a-tooltip title="清空">
        <a v-if="toolbars.includes('reset')" @click="$emit('handleReset')">
          <a-icon type="delete" />
          <span v-if="showToolbarsText">清空</span>
        </a>
      </a-tooltip>
      <!-- 按钮左侧插槽 start -->
      <slot name="left-action"></slot>
      <!-- 按钮左侧插槽 end -->
    </div>
    <!-- 操作左侧区域 end -->

    <!-- 操作右侧区域 start -->
    <div class="right-btn-box">
      <!-- 按钮右侧插槽 start -->
      <slot name="right-action"></slot>
      <!-- 按钮右侧插槽 end -->

      <a-tooltip title="关闭">
        <a v-if="toolbars.includes('close')" @click="$emit('handleClose')">
          <a-icon type="close" />
        </a>
      </a-tooltip>
    </div>
    <!-- 操作右侧区域 end -->

    <!-- 头部操作按钮区域 end -->
  </div>
  <!-- 操作区域 start -->
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class OperatingArea extends Vue {
  toolbars = [
    "save",
    "preview",
    "importJson",
    "exportJson",
    "exportCode",
    "reset",
    "close",
  ];

  showToolbarsText = false;
}
</script>

<style lang="less" scoped>
// 头部操作按钮区域
.operating-area {
  border-bottom: 2px solid #ccc;
  font-size: 16px;
  text-align: left;
  height: 45px;
  line-height: 45px;
  padding: 0px 12px;
  display: flex;
  justify-content: space-between;
  align-content: center;

  a {
    color: #666;
    margin-left: 10px;

    &:hover {
      color: #13c2c2;
    }

    > span {
      font-size: 14px;
      padding-left: 2px;
    }
  }
}
</style>
