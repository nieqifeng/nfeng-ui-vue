<template>
  <section>
    <draggable
      class="draggable-box"
      group="form-draggable"
      :list="list"
    >
      <!-- <transition-group tag="div" name="list" class="list-main"> -->
      <LayoutItem
        v-for="(record, key) in list"
        :key="key"
        :record="record"
        @dragStart="dragStart"
        @handleSelectItem="handleSelectItem"
        @handleCopy="handleCopy"
        @handleDelete="handleDelete"
        @handleColAdd="handleColAdd"
        @handleShowRightMenu="handleShowRightMenu"
      />
      <!-- </transition-group> -->
    </draggable>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import LayoutItem from "./LayoutItem.vue";

@Component({
  components: {
    draggable,
    LayoutItem,
  },
})
export default class Section extends Vue {
  list = [];

  deepClone(evt) {
    console.log("evt: ", evt);
    const newIndex = evt.newIndex;
    // json深拷贝一次
    const listString = JSON.stringify(this.myArray);
    console.log("listString: ", listString);
    // this.myArray = JSON.parse(listString);
    // 删除icon及compoent属性
    // delete this.myArray[newIndex].icon;
    // delete this.myArray[newIndex].component;
    this.$emit("handleSetSelectItem", this.myArray[newIndex]);
  }
  dragStart(evt, list) {
    // 拖拽结束,自动选择拖拽的控件项
    this.$emit("handleSetSelectItem", list[evt.oldIndex]);
  }
  handleSelectItem(record) {
    // 修改选择Item
    this.$emit("handleSetSelectItem", record);
  }
  handleCopy(isCopy = true, data) {
    const traverse = (array) => {
      array.forEach((element, index) => {
        if (element.key === this.selectItem.key) {
          if (isCopy) {
            // 复制添加到选择节点后面
            array.splice(index + 1, 0, element);
          } else {
            // 双击添加到选择节点后面
            array.splice(index + 1, 0, data);
          }
          // 复制完成，重置key值
          const evt = {
            newIndex: index + 1,
          };
          this.handleColAdd(evt, array, true);
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
        } else if (element.type === "batch") {
          // 动态表格内复制
          if (!isCopy && !this.insertAllowedType.includes(data.type)) {
            // 插入不允许的字段时，直接return false
            return false;
          }
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
    traverse(this.data.list);
  }
  handleDelete() {
    // 删除已选择
    console.log(234);
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

    this.data.list = traverse(this.data.list);
  }
  handleColAdd(evt, columns, isCopy = false) {
    // 重置或者生成key值
    const newIndex = evt.newIndex;
    const key = columns[newIndex].type + "_" + new Date().getTime();
    if (columns[newIndex].key === "" || isCopy) {
      this.$set(columns, newIndex, {
        ...columns[newIndex],
        key,
        model: key,
      });
      if (this.noModel.includes(columns[newIndex].type)) {
        // 删除不需要的model属性
        delete columns[newIndex].model;
      }
      if (typeof columns[newIndex].options !== "undefined") {
        // 深拷贝options
        const optionsStr = JSON.stringify(columns[newIndex].options);
        columns[newIndex].options = JSON.parse(optionsStr);
      }
      if (typeof columns[newIndex].rules !== "undefined") {
        // 深拷贝rules
        const rulesStr = JSON.stringify(columns[newIndex].rules);
        columns[newIndex].rules = JSON.parse(rulesStr);
      }
      if (typeof columns[newIndex].list !== "undefined") {
        // 深拷贝list
        columns[newIndex].list = [];
      }
      if (typeof columns[newIndex].columns !== "undefined") {
        // 深拷贝columns
        const columnsStr = JSON.stringify(columns[newIndex].columns);
        columns[newIndex].columns = JSON.parse(columnsStr);
        // 复制时，清空数据
        columns[newIndex].columns.forEach((item) => {
          item.list = [];
        });
      }
      if (columns[newIndex].type === "table") {
        // 深拷贝trs
        const trsStr = JSON.stringify(columns[newIndex].trs);
        columns[newIndex].trs = JSON.parse(trsStr);
        // 复制时，清空数据
        columns[newIndex].trs.forEach((item) => {
          item.tds.forEach((val) => {
            val.list = [];
          });
        });
      }
    }
    // 深拷贝数据
    const listString = JSON.stringify(columns[newIndex]);
    columns[newIndex] = JSON.parse(listString);
    this.$emit("handleSetSelectItem", columns[newIndex]);
  }
  handleShowRightMenu(e, val, trIndex, tdIndex) {
    // 显示右键菜单
    e.stopPropagation();
    // this.fileItem = item
    // 显示
    this.showRightMenu = true;

    // 定位
    this.menuTop = e.clientY;
    this.menuLeft = e.clientX;
    // this.rightMenuType = type
    // this.rightId = id
    this.activeArr = [val];
    this.rightMenuSelectValue = val;
    this.trIndex = trIndex;
    this.tdIndex = tdIndex;
    return false;
  }
  onMove({ relatedContext, draggedContext }) {
    console.log("draggedContext: ", draggedContext);
    console.log("relatedContext: ", relatedContext);
    const relatedElement = relatedContext.element;
    const draggedElement = draggedContext.element;
    return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
  }
}
</script>

<style lang="less">
section {
  flex: 1;
  margin: 0 8px;

  .draggable-box {
    height: 100%;
    overflow: auto;

    .list-main {
      min-height: 100%;
      padding: 5px;
      position: relative;
      background: #fafafa;
    }
  }
}
</style>
