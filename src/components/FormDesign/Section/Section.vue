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
