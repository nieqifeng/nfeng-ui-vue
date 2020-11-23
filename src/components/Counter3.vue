<template>
  <div class="counter">
    <span>{{ iCount }}</span>
    <!-- <a-button-group> -->
      <a-button @click="handleClick(iCount + 1)" icon="el-icon-plus" type="success">加1</a-button>
      <a-button @click="handleClick(iCount - 1)" icon="el-icon-minus" type="danger">减1</a-button>
      <a-button @click="handleClick()" icon="el-icon-refresh" type="primary">Reset</a-button>
    <!-- </a-button-group> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { INCREMENT } from '@/store/count/types'

const countModule = namespace('count')

@Component({ name: 'Counter3' })
export default class Counter3 extends Vue {
  @countModule.Getter readonly iCount!: number
  @countModule.Action(INCREMENT) handleClick!: (
    newCount?: number
  ) => Promise<void>
}
</script>
