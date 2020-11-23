创建表单

::: details 点击查看代码

```html
<template>
  <div>
    <nf-form-create ref="formCreate" :option="option" />
    <div style="margin-left: 25%;">
      <a-button type="primary" @click="onSubmit"> 确定 </a-button>
      <a-button style="margin-left: 10px;"> 取消 </a-button>
    </div>
  </div>
</template>
```

```js
<script>
  export default {
    data() {
      return {
        option: {
          title: "增加表单内容",
          column: [
            {
              label: "label",
              type: "input",
              prop: "label",
            },
            {
              label: "prop",
              type: "input",
              prop: "prop",
            },
            {
              label: "type",
              type: "select",
              prop: "type",
              options: [
                {
                  label: "选择框",
                  value: "select",
                },
                {
                  label: "输入框",
                  value: "input",
                },
                {
                  label: "月份选择器",
                  value: "month-picker",
                },
                {
                  label: "月份区间选择器",
                  value: "month-range-picker",
                },
                {
                  label: "日期选择器",
                  value: "range-picker",
                },
              ],
            },
          ],
          rules: {
            label: [{ required: true }],
            prop: [{ required: true }],
            type: [{ required: true }],
          },
        }
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

Form Methods

事件名称|说明|回调参数
--|--|--
onSubmit|提交表单进行查询|function(valid, form)
resetForm|重置表单，清空内容|function

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
