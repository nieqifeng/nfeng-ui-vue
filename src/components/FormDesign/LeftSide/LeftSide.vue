<template>
  <!-- 左侧控件区域 start -->
  <aside class="form-design-left">
    <a-collapse default-active-key="1">
      <!-- 基础控件 start -->
      <a-collapse-panel v-if="basicsList.length > 0" header="基础控件" key="1">
        <draggable
          class="dragArea list-group"
          :list="basicsList"
          :group="{ name: 'form-draggable', pull: 'clone', put: false }"
          :clone="cloneDog"
        >
          <div
            class="list-group-item"
            v-for="(item, key) in basicsList"
            :key="key"
          >
            <svg v-if="item.icon" class="icon" aria-hidden="true">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
            {{ item.label }}
          </div>
        </draggable>
      </a-collapse-panel>
      <!-- 基础控件 end -->
      <!-- 布局控件 start -->
      <a-collapse-panel v-if="layoutList.length > 0" header="布局控件" key="4">
        <draggable
          class="dragArea list-group"
          :list="layoutList"
          :group="{ name: 'form-draggable', pull: 'clone', put: false }"
          :clone="cloneDog"
        >
          <div
            class="list-group-item"
            v-for="(item, key) in layoutList"
            :key="key"
          >
            <svg v-if="item.icon" class="icon" aria-hidden="true">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
            {{ item.label }}
          </div>
        </draggable>
      </a-collapse-panel>
      <!-- 布局控件 end -->
    </a-collapse>
  </aside>
  <!-- 左侧控件区域 end -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import { basicsList, layoutList } from "./config";

@Component({
  components: {
    draggable,
  },
})
export default class LeftSide extends Vue {
  basicsList = basicsList;
  layoutList = layoutList;

  cloneDog(element) {
    return { ...element, key: element.type + "_" + new Date().getTime(), list: []};
  }
}
</script>

<style lang="less">
aside.form-design-left {
  overflow: auto;
  box-shadow: 0px 0px 1px 1px #ccc;
  width: 270px;
  height: 100%;

  .ant-collapse-content-box {
    padding: 0;
  }

  .ant-collapse {
    border: 0;
    > .ant-collapse-item {
      border-color: #ccc;
      > .ant-collapse-header {
        padding: 7px 0 7px 40px;
      }

      > .ant-collapse-content {
        border-color: #ccc;
      }
    }
  }
}

.list-group {
  padding: 5px;
  list-style: none;
  display: flex;
  margin-bottom: 0;
  flex-wrap: wrap;
  // background: #efefef;

  .list-group-item {
    border-radius: 0;
    border: 0;
    box-shadow: 1px 0 0 0 #ccc, 0 1px 0 0 #ccc, 1px 1px 0 0 #ccc,
      1px 0 0 0 #ccc inset, 0 1px 0 0 #ccc inset;
    padding: 8px 12px;
    transition: all 0.3s;
    width: calc(50% - 6px);
    margin: 2.7px;
    height: 36px;
    line-height: 20px;
    cursor: move;
    border: 1px solid transparent;
    border-radius: 3px;
    transition: all 0.3s;

    &:hover {
      color: #409eff;
      border: 1px solid #409eff;
      position: relative;
      z-index: 1;
      box-shadow: 0 2px 6px #409eff;
    }
  }
}
</style>
