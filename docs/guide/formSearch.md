搜索表单

::: details 点击查看代码

```html
<template>
  <nf-form-search :field-options="fieldOptions" @submit="query">
    <template slot="extra">
      <a-button type="primary" @click="showModal = true">增加</a-button>
    </template>
  </nf-form-search>
</template>
```

```js
<script>
  export default {
    data() {
      return {
        fieldOptions: [
          {
            type: "input",
            label: "输入框",
            prop: "input"
          },
          {
            type: "select",
            label: "选择框",
            prop: "select",
            options: [
              {
                label: "xxx",
                value: "xxx"
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    query() {}
  }
</script>
```

:::

Form Attributes

参数|说明|类型|默认值
--|--|--|--
value|表单
fieldsOptions|表单内容项|array|[]
width|表单选框宽度|number|200

Form Methods

事件名称|说明|回调参数
--|--|--
submit|提交表单进行查询|function(values)
reset|重置表单，清空内容|function
change|表单内容值改变|function(values)

Form-Item Attributes

参数|说明|类型|是否必填|默认值
--|--|--|--|--
label|表单标签|string|是|-
type|表单项类型|string|是|-
placeholder|表单项没有值时的占位符|string|否|-
value|表单项的值|any|否|-
allowClear|是否显示输入框的清空button|boolean|否|-
hidden|是否在收起状态时隐藏该表单项|boolean|否|-
change|监听该表单项的change事件，目前仅range-picker挂载了该change回调|Function|否|-
props|type为select/ayg-select时，option的键值枚举|object|否|{label: name, value: id}
mode|type为select时，选择框的模式|`'default' | 'multiple' | 'tags' | 'combobox'` |否|'default'

Form Slot

name|说明
--|--
extra|清空按钮右边，展开/收起标志左边
