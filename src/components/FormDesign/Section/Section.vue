<template>
  <section>
    <div class="form-panel">
      <p class="hint-text" v-show="list.length === 0">
        从左侧选择控件添加
      </p>
      <draggable
        tag="div"
        class="draggable-box"
        v-bind="{
          group: 'form-draggable',
          ghostClass: 'moving',
          animation: 180,
          handle: '.drag-move',
        }"
        v-model="list"
      >
        <transition-group tag="div" name="list" class="list-main">
          <LayoutItem
            v-for="record in list"
            :key="record.model"
            :record="record"
          />
        </transition-group>
      </draggable>
    </div>
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
}
</script>

<style lang="less">
// 中间内容区域
section {
  flex: 1;
  margin: 0 8px;
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
  }

  .draggable-box {
    height: 100%;
    overflow: auto;

    .list-main {
      min-height: 100%;
      padding: 5px;
      position: relative;
      background: #fafafa;

      // 拖放移动中
      .moving {
        min-height: 35px;
        box-sizing: border-box;
        overflow: hidden;
        padding: 0 !important;
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
</style>
