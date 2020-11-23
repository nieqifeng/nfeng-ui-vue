基础用法

::: details 点击查看代码

```html
<template>
  <div>
    <a-button type="primary" @click="showModal = true">打开图片弹层</a-button>
    <nf-modal
      :imageList="fileList"
      :showModal.sync="showModal"
      :activeIndex.sync="activeIndex"
    />
  </div>
</template>
```

```js
export default {
  data() {
    return {
      fileList: [
        "http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg",
        "http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg",
      ],
      showModal: false,
      activeIndex: 0
    }
  }
}
```

:::

Options

参数|说明|类型|可选值|默认值
--|--|--|--|--
imageList|图片数组|array|-|[]
showModal|显示隐藏|boolean|true,false|false
activeIndex|当前显示|number|-|0
