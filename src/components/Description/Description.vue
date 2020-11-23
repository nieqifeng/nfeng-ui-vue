<template>
  <a-descriptions :title="title" :layout="layout" :bordered="bordered">
    <a-descriptions-item
      v-for="(item, key) in options"
      :key="key"
      :label="item.label"
    >
      <template v-if="item.render">
        {{ item.render(formData[item.field], formData) }}
      </template>
      <template v-else>{{ formData[item.field] }}</template>
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: {},
    layout: {},
    bordered: {},
    formData: {},
    options: {
      type: Array,
      default: () => [],
    },
  },
});
</script>
