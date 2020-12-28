<template>
  <draggable class="dragArea" tag="ul" :list="list" :group="{ name: 'form-draggable' }">{{list}}
    <li v-for="el in list" :key="el.key">
      <p>{{ el.key }}</p>
      <nested-draggable :list="el.list" />
    </li>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    list: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable"
};
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>