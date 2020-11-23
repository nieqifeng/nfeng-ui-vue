<template>
  <div class="page-x">
    X {{ pathMatch }}
    <FetchData :key="pathMatch" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import FetchData from '@/components/FetchData.vue'

@Component({ name: 'PageX', components: { FetchData } })
export default class PageX extends Vue {
  @Prop({ default: '1' }) readonly pathMatch!: string
}
</script>

<style lang="scss">
.page-x {
  width: 100%;
  height: 100%;
  border: 1px solid crimson;
}
</style>
