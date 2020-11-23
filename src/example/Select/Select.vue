<template>
  <nf-select
    style="width: 200px;"
    :allowClear="true"
    :options="options"
    v-model="value"
    @change="change"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const list: Array<object> = [];
for (let i = 1; i <= 25; i++) {
  list.push({
    value: i,
    label: `${(i + 9).toString(36) + i}`,
  });
}

@Component({})
export default class App extends Vue {
  value = "";
  options = list;

  change(e) {
    console.log("select", e);
  }
}
</script>

<style></style>
