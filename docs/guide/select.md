基础用法

::: details 点击查看代码

```html
<nf-select
  style="width: 200px;"
  :allowClear="true"
  :options="options"
  v-model="value"
  @change="change"
/>
```

```js
const list = []
for (let i = 1; i <= 25; i++) {
  list.push({
    value: i,
    label: `${(i + 9).toString(36) + i}`,
  });
}

export default {
 data() {
   return {
      value: '',
      options: list
   }
 }
 methods: {
  change(e) {
    console.log('select', e)
  }
 }
}
```

:::

Select Attributes

参数|说明｜类型|默认值|可选值
--|--|--|--|--
value|选项的值|string,number,array|-|-
options|数据列表|array|[]|-
mode|选择模式|string|default|multiple
size|输入框尺寸|string|small|medium,small,mini
placeholder|选择框默认文案|string|'请输入搜索关键字'|-
showSearch|是否开启搜索|boolean|true| true,false
allowClear|是否可清空|boolean|false|true,false
disabled|是否禁用|boolean|true| true,false
