<template>
  <div class="page-b">
    <Counter2 :count="countNum" @update="countNum = $event" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Counter2 from '@/components/Counter2.vue'

@Component({ name: 'PageB', components: { Counter2 } })
export default class PageB extends Vue {
  countNum: number = 100

  mounted(): void {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handler, true)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('beforeunload', handler, true)
    })
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    window.confirm('确认离开？') ? next() : next(false)
  }
}
</script>

<style lang="scss">
.page-b {
  width: 100%;
  height: 100%;
  border: 1px solid green;
}
</style>
