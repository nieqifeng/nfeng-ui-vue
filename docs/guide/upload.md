基础用法

::: details 点击查看代码

```html
<template>
  <nf-upload :uploadFunction="uploadFunction"></nf-upload>
</template>
```

```js
export default {
  methods: {
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
}
```

:::

Methods

方法名|说明|回调参数
--|--|--
uploadFunction|上传函数(异步函数)|Function(file) => Promise
