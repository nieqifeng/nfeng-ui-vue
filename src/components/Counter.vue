<template>
  <div class="counter">
    <span>{{ count }}</span>
    <a-button @click="count++" icon="el-icon-plus" type="success">累计加1</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'Counter' })
export default class Counter extends Vue {
  count?: number = 0
}
</script>
