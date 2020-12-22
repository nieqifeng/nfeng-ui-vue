<template>
  <div class="drag-move">
    <!-- 卡片布局 start -->
    <template v-if="record.type === 'card'">
      <div class="grid-box">
        <a-card class="grid-row" :title="record.label">
          <div class="grid-col">
            <draggable
              class="draggable-box"
              group="form-draggable"
              :list="record.list"
            >
              <!-- <transition-group tag="div" name="list" class="list-main"> -->
              <layoutItem
                class="drag-move"
                v-for="(item, key) in record.list"
                :key="key"
                :record="item"
              />
              <!-- </transition-group> -->
            </draggable>
          </div>
        </a-card>

        <!-- <div
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
        </div> -->
      </div>
    </template>
    <!-- 卡片布局 end -->
    <!-- 栅格布局 start -->
    <template v-else-if="record.type === 'grid'">
      <div class="grid-box">
        <a-row class="grid-row" :gutter="record.options.gutter">
          <a-col
            class="grid-col"
            v-for="(colItem, k) in record.columns"
            :key="k"
            :span="colItem.span || 0"
          >
            <draggable
              class="draggable-box"
              group="form-draggable"
              :list="colItem.list"
            >
              <!-- <transition-group tag="div" name="list" class="list-main"> -->
              <layoutItem
                class="drag-move"
                v-for="(item, key) in colItem.list"
                :key="key"
                :record="item"
              />
              <!-- </transition-group> -->
            </draggable>
          </a-col>
        </a-row>

        <!-- <div
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
        </div> -->
      </div>
    </template>
    <!-- 栅格布局 end -->
    <!-- 表格布局 start -->
    <template v-else-if="record.type === 'table'">
      <div class="table-box">
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
                class="draggable-box"
                group="form-draggable"
                :list="tdItem.list"
              >
                <!-- <transition-group tag="div" name="list" class="list-main"> -->
                <layoutItem
                  class="drag-move"
                  v-for="(item, key) in tdItem.list"
                  :key="key"
                  :record="item"
                />
                <!-- </transition-group> -->
              </draggable>
            </td>
          </tr>
        </table>

        <!-- <div
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
        </div> -->
      </div>
    </template>
    <!-- 表格布局 end -->
    <template v-else>
      <FormNode :record="record" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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
  selectItem;
}
</script>

<style lang="less">
.grid-box {
  .draggable-box {
    min-height: 60px;
    min-width: 50px;
    border: 1px #ccc dashed;
    background: #fff;
  }
}
</style>
