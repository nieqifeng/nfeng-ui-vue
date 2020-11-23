<template>
  <nf-upload :uploadFunction="uploadFunction"></nf-upload>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  uploadFunction(file) {
    const formData = new FormData()
    formData.append('fileName', file.name)
    formData.append('file', file)
    formData.append('targetType', 'recharge_voucher_img')
    formData.append('fileSize', file.size)
    return new Promise((resolve) => {
      resolve({
        downloadCode: '111',
        url: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg'
      })
    })
  }
}
</script>
