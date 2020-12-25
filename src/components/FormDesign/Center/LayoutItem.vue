<template>
  <div class="drag-move">
    <!-- 卡片布局 start -->
    <template v-if="record.type === 'card'">
      <div
        class="grid-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <a-card class="grid-row" :title="record.label">
          <div class="grid-col">
            <draggable
              tag="div"
              class="draggable-box"
              v-bind="{
                group: 'form-draggable',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move',
              }"
              v-model="record.list"
              @add="$emit('handleColAdd', $event, record.list)"
            >
              <transition-group tag="div" name="list" class="list-main">
                <layoutItem
                  class="drag-move"
                  v-for="item in record.list"
                  :key="item.key"
                  :selectItem.sync="selectItem"
                  :record="item"
                  :UISchema="UISchema"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleDelete="$emit('handleDelete')"
                />
              </transition-group>
            </draggable>
          </div>
        </a-card>

        <div
          class="copy"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleCopy')"
        >
          <a-icon type="copy" />
        </div>
        <div
          class="delete"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleDelete')"
        >
          <a-icon type="delete" />
        </div>
      </div>
    </template>
    <!-- 卡片布局 end -->
    <!-- 栅格布局 start -->
    <template v-else-if="record.type === 'grid'">
      <div
        class="grid-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <a-row class="grid-row" :gutter="record.options.gutter">
          <a-col
            class="grid-col"
            v-for="(colItem, idnex) in record.columns"
            :key="idnex"
            :span="colItem.span || 0"
          >
            <draggable
              tag="div"
              class="draggable-box"
              v-bind="{
                group: 'form-draggable',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move',
              }"
              v-model="colItem.list"
              @add="$emit('handleColAdd', $event, colItem.list)"
            >
              <transition-group tag="div" name="list" class="list-main">
                <layoutItem
                  class="drag-move"
                  v-for="item in colItem.list"
                  :key="item.key"
                  :selectItem.sync="selectItem"
                  :record="item"
                  :UISchema="UISchema"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleDelete="$emit('handleDelete')"
                />
              </transition-group>
            </draggable>
          </a-col>
        </a-row>

        <div
          class="copy"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleCopy')"
        >
          <a-icon type="copy" />
        </div>
        <div
          class="delete"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleDelete')"
        >
          <a-icon type="delete" />
        </div>
      </div>
    </template>
    <!-- 栅格布局 end -->
    <!-- 表格布局 start -->
    <template v-else-if="record.type === 'table'">
      <div
        class="table-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <table
          class="table-layout kk-table-9136076486841527"
          :class="{
            bright: record.options.bright,
            small: record.options.small,
            bordered: record.options.bordered,
          }"
          :style="record.options.customStyle"
        >
          <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex">
            <td
              class="table-td"
              v-for="(tdItem, tdIndex) in trItem.tds"
              :key="tdIndex"
              :colspan="tdItem.colspan"
              :rowspan="tdItem.rowspan"
              @contextmenu.prevent="
                $emit('handleShowRightMenu', $event, record, trIndex, tdIndex)
              "
            >
              <draggable
                tag="div"
                class="draggable-box"
                v-bind="{
                  group: 'form-draggable',
                  ghostClass: 'moving',
                  animation: 180,
                  handle: '.drag-move',
                }"
                v-model="tdItem.list"
                @add="$emit('handleColAdd', $event, tdItem.list)"
              >
                <transition-group tag="div" name="list" class="list-main">
                  <layoutItem
                    class="drag-move"
                    v-for="item in tdItem.list"
                    :key="item.key"
                    :selectItem.sync="selectItem"
                    :record="item"
                    :UISchema="UISchema"
                    @handleSelectItem="handleSelectItem"
                    @handleColAdd="handleColAdd"
                    @handleCopy="$emit('handleCopy')"
                    @handleDelete="$emit('handleDelete')"
                  />
                </transition-group>
              </draggable>
            </td>
          </tr>
        </table>

        <div
          class="copy"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleCopy')"
        >
          <a-icon type="copy" />
        </div>
        <div
          class="delete"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleDelete')"
        >
          <a-icon type="delete" />
        </div>
      </div>
    </template>
    <!-- 表格布局 end -->
    <template v-else>
      <FormNode
        :selectItem.sync="selectItem"
        :record="record"
        :UISchema="UISchema"
        @handleSelectItem="handleSelectItem"
        @handleCopy="$emit('handleCopy')"
        @handleDelete="$emit('handleDelete')"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import FormNode from "./FormNode.vue";

@Component({
  components: {
    draggable,
    FormNode,
  },
})
export default class LayoutItem extends Vue {
  @Prop({ type: Object, default: () => {} })
  record;
  @Prop({ type: Object })
  UISchema;
  @Prop({ type: Object })
  selectItem;

  @Emit("handleSelectItem")
  handleSelectItem(record) {
    console.log("record: ", record);
    return record;
  }

  handleColAdd(e, list) {
    console.log("list: ", list);
    console.log("e: ", e);
    // this.$emit("handleColAdd", e, list);
  }
}
</script>

<style lang="less" scoped>
.batch-box,
.grid-box,
.table-box {
  position: relative;
  box-sizing: border-box;
  padding: 5px;
  background: fade(#9867f7, 12%);
  width: 100%;
  transition: all 0.3s;
  overflow: hidden;

  .grid-row,
  .table-layout {
    background: fade(#9867f7, 12%);

    .grid-col,
    .table-td {
      .draggable-box {
        min-height: 60px;
        min-width: 50px;
        border: 1px #ccc dashed;
        background: #fff;

        .list-main {
          min-height: 60px;
          position: relative;
          border: 1px #ccc dashed;
        }
      }
    }
  }

  // 选择时 start
  &::before {
    content: "";
    height: 5px;
    width: 100%;
    background: transparent;
    position: absolute;
    top: 0;
    right: -100%;
    transition: all 0.3s;
  }

  &.active {
    &::before {
      background: #9867f7;
      right: 0;
    }

    background: fade(#9867f7, 24%);
    outline-offset: 0;
  }

  > .copy,
  > .delete {
    position: absolute;
    top: 0px;
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
    background: #9867f7;
  }

  > .delete {
    right: 0px;
    background: #9867f7;
  }
}

// 表单设计器-表格样式
.kk-table-9136076486841527 {
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s;
  border-collapse: collapse;

  tr {
    transition: all 0.3s;
    border-collapse: collapse;
    td {
      box-sizing: border-box;
      transition: all 0.3s;
      padding: 12px 12px;
      border-collapse: collapse;
      vertical-align: top;
    }
  }
  &.bordered {
    // 添加边框
    tr {
      td {
        border: 1px solid #e8e8e8 !important;
      }
    }
  }
  &.bright {
    // 点亮行
    tr {
      &:hover > td {
        background: #e6f7ff;
      }
    }
  }
  &.small {
    // 紧凑型
    tr {
      td {
        padding: 8px 8px;
      }
    }
  }
  .ant-row.ant-form-item {
    margin: 0 !important;
  }
}
</style>
