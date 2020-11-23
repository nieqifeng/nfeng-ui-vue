<template>
  <div class="fetch">{{ msg }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import utils from '@/utils'
import Api from '@/api'

@Component({ name: 'FetchData' })
export default class FetchData extends Vue {
  msg = '数据加载中...'
  created() {
    this.getUser()
  }
  getUser() {
    const param = { id: utils.getRandomNum(1, 10) }
    // console.log('param', param)
    Api.getUsers(param).then(res => {
      // console.log('res', res)
      if (Array.isArray(res)) {
        this.msg = res[0]!.username
      }
    })
  }
}
</script>

<style lang="scss">
.fetch {
  width: 100%;
}
</style>
