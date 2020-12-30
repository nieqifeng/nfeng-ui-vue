<template>
  <div class="form-panel">
    <p class="hint-text" v-show="list.length === 0">
      从左侧选择控件添加
    </p>
    <a-form class="a-form-box" :layout="UISchema.layout">
      <!-- <draggable
        tag="div"
        class="draggable-box"
        v-bind="{
          group: 'form-draggable',
          ghostClass: 'moving',
          animation: 180,
          handle: '.drag-move',
        }"
        :list="list"
      >
        <transition-group tag="div" name="list" class="list-main"> -->
          <LayoutItem
            :list="list"
            :UISchema="UISchema"
            :selectItem.sync="selectItem"
            @handleSelectItem="handleSelectItem"
            @handleCopy="handleCopy"
            @handleDelete="handleDelete"
            @handleColAdd="handleColAdd"
          />
        <!-- </transition-group>
      </draggable> -->
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import LayoutItem from "./LayoutItem.vue";

@Component({
  components: {
    draggable,
    LayoutItem
  },
})
export default class FormPanel extends Vue {
  @Prop({ type: Object })
  UISchema;
  @Prop({ type: Object, default: () => {} })
  selectItem;
  @Prop({ type: Array, default: () => [] })
  list

  onAdd(evt) {
    console.log(evt)
  }

  @Emit("handleSetSelectItem")
  deepClone(evt) {
    const { newIndex } = evt;
    // json深拷贝一次
    const listString = JSON.stringify(this.list);
    this.list = JSON.parse(listString);
    // 删除icon及compoent属性
    // delete this.list[newIndex].icon;
    // delete this.list[newIndex].component;
    return this.list[newIndex];
  }

  @Emit("handleSetSelectItem")
  handleColAdd(evt, columns) {
    const { newIndex } = evt;
    // 深拷贝数据
    const listString = JSON.stringify(columns[newIndex]);
    columns[newIndex] = JSON.parse(listString);
    return columns[newIndex];
  }

  @Emit("handleSetSelectItem")
  handleSelectItem(record) {
    // 修改选择Item
    return record;
  }

  handleCopy(isCopy = true, data) {
    const traverse = (array) => {
      array.forEach((element, index) => {
        if (element.key === this.selectItem.key) {
          const obj = {
            ...element,
            key: element.type + "_" + new Date().getTime(),
          };
          console.log(element)
          console.log(obj)
          if (isCopy) {
            // 复制添加到选择节点后面
            array.splice(index + 1, 0, obj);
          } else {
            // 双击添加到选择节点后面
            array.splice(index + 1, 0, data);
          }
          this.$emit("handleSetSelectItem", obj);
          return;
        }
        if (element.type === "grid" || element.type === "tabs") {
          // 栅格布局
          element.columns.forEach((item) => {
            traverse(item.list);
          });
        } else if (element.type === "card") {
          // 卡片布局
          traverse(element.list);
        }
        if (element.type === "table") {
          // 表格布局
          element.trs.forEach((item) => {
            item.tds.forEach((val) => {
              traverse(val.list);
            });
          });
        }
      });
    };
    traverse(this.list);
  }

  @Emit("update:list")
  handleDelete() {
    const traverse = (array) => {
      array = array.filter((element, index) => {
        if (element.type === "grid" || element.type === "tabs") {
          // 栅格布局
          element.columns.forEach((item) => {
            item.list = traverse(item.list);
          });
        }
        if (element.type === "card" || element.type === "batch") {
          // 卡片布局
          element.list = traverse(element.list);
        }
        if (element.type === "table") {
          // 表格布局
          element.trs.forEach((item) => {
            item.tds.forEach((val) => {
              val.list = traverse(val.list);
            });
          });
        }
        if (element.key !== this.selectItem.key) {
          return true;
        } else {
          if (array.length === 1) {
            this.handleSelectItem({ key: "" });
          } else if (array.length - 1 > index) {
            this.handleSelectItem(array[index + 1]);
          } else {
            this.handleSelectItem(array[index - 1]);
          }
          return false;
        }
      });
      return array;
    };

    return traverse(this.list);
  }
}
</script>

<style lang="less">
// 中间内容区域
section {
  flex: 1;
  margin: 0 8px;
  user-select: none;
  box-shadow: 0px 0px 1px 1px #ccc;

  // 内容操作区域
  .form-panel {
    height: 100%;
    background: #eee;
    position: relative;

    > .hint-text {
      position: absolute;
      left: 0;
      top: 45%;
      width: 100%;
      text-align: center;
      font-size: 20px;
      color: #aaa;
      z-index: 16;
    }

    .a-form-box {
      height: 100%;
    }

    .draggable-box {
      height: 100%;
      overflow: auto;

      .list-main {
        min-height: 100%;
        padding: 5px;
        position: relative;
        background: #fafafa;
        // border    : 1px #ccc dashed;

        .moving {
          // 拖放移动中
          // outline-width: 0;
          min-height: 35px;
          box-sizing: border-box;
          overflow: hidden;
          padding: 0 !important;
          // margin       : 3px 0;
          position: relative;

          &::before {
            content: "";
            height: 5px;
            width: 100%;
            background: #13c2c2;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}

// 列表动画
.list-enter-active {
  transition: all 0.5s;
}

.list-leave-active {
  transition: all 0.3s;
}

.list-enter,
.list-leave-to

/* .list-leave-active for below version 2.1.8 */
 {
  opacity: 0;
  transform: translateX(-100px);
}

.list-enter {
  height: 30px;
}
</style>
