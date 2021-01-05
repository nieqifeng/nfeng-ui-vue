<template>
  <!-- 卡片布局 start -->
  <a-card v-if="type === 'card'" :title="label">
    <div class="grid-col">
      <slot></slot>
    </div>
  </a-card>
  <!-- 卡片布局 end -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FormLayout extends Vue {
  @Prop({ type: String })
  type;
  @Prop({ type: String })
  label;
}
</script>
