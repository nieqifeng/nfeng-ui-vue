<template>
  <div class="counter-2">
    <span>{{ count }}</span>
    <a-button @click="update" icon="el-icon-plus" type="success">累计加1</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'Counter2' })
export default class Counter2 extends Vue {
  @Prop({ default: 10 }) readonly count!: number
  @Emit() update(): number {
    return this.count + 1
  }
}
</script>
