<template>
  <div class="page-a">
    <Counter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Counter from '@/components/Counter.vue'

@Component({ name: 'PageA', components: { Counter } })
export default class PageA extends Vue {}
</script>

<style lang="scss">
.page-a {
  width: 100%;
  height: 100%;
  border: 1px solid blue;
}
</style>
