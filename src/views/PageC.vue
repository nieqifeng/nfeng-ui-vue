<template>
  <div class="page-c" v-loading="loading">
    <Counter3 />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Counter3 from '@/components/Counter3.vue'
import { Getter } from 'vuex-class'

@Component({ name: 'PageC', components: { Counter3 } })
export default class PageC extends Vue {
  @Getter readonly loading!: boolean
}
</script>

<style lang="scss">
.page-c {
  width: 100%;
  height: 100%;
  border: 1px solid orangered;
}
</style>
