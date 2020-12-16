<template>
  <div class="drag-move">
    <template>
      <FormNode :record="record" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FormNode from "./FormNode.vue";

@Component({
  components: {
    FormNode,
  },
})
export default class LayoutItem extends Vue {
  @Prop({ type: Object, default: () => {} })
  record;
}
</script>
