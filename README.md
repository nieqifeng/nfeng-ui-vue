# nfeng-ui-vue
基于Vue的后台插件，包含了复用高的组件、过滤器、工具函数。

## structure
* src/components 组件
* src/styles 样式（组件等）
* src/filters 过滤器
* src/utils 工具函数

## build
* npm run build

## quickstart
```js
import NfengUI from 'nfeng-ui-vue'

Vue.use(NfengUI)
```


## 组件-formList列表

```html
<nf-form-list
  :exportBtn="true"
  :fieldOptions="fieldOptions"
  :tabPanes="tabPanes"
  :queryFields="searchForm"
  :queryFunction="getQueryList"
  :tableColumns="tableColumns"
  @searchSubmit="searchSubmit"
  @tabChange="tabChange"
  @export="exportXls"
>
  <a-button
    slot="tabBarExtraContent"
    type="primary"
    @click="$router.push('rechargeApplication')"
  >新增订单</a-button>
</nf-form-list>
```

```js
export default {
  data() {
    return {
      // 搜索表单
      searchForm: {
        appId: '',
        rechargeCode: '',
        // state:'',
        stateForQuery: [],
        page: 1,
        pageSize: 10
      },
      optionTypes: [],
      channelList: [],
      tabPanes: [
        { title: '全部', key: '' },
        { title: '处理中', key: '20' },
        { title: '已完成', key: '30' }
      ],
    }
  },
  computed: {
    fieldOptions() {
      return [
        {
          label: '订单号',
          decorator: ['orderNo', { initialValue: '' }]
        },
        {
          label: '起止日期',
          type: 'range-picker',
          decorator: ['range-picker']
        },
        {
          label: '处理状态',
          selectOptions: this.optionTypes,
          decorator: ['state']
        },
        {
          label: '充值渠道',
          selectOptions: this.channelList,
          decorator: ['channelCode', { initialValue: '' }]
        },
        {
          label: '商户名称',
          type: 'select',
          selectOptions: this.open_appCompany,
          decorator: ['appId', { initialValue: '' }],
        },
        {
          label: '服务商名称',
          type: 'select',
          selectOptions: this.open_serveCompany,
          decorator: ['serviceCompanyId', { initialValue: '' }],
        },
      ]
    },
  },
}

```

#### API
| 参数 | 说明 | 类型| 默认值 | 可选值 |
| ---- | ---- | ---- | ---- | ---- |
| fieldOptions | 搜索配置 |  Array | [] | - |
| tabPanes | 标签数组 |  Array | [] | - |
| queryFields | 搜索字段 |  Object | - | - |
| queryFunction | 搜索方法 |  Function | - | - |
| tableColumns | 列表配置 |  Array | - | - |
| exportBtn | 导出按钮 |  Boolean | false | - |

## 组件-upload上传
支持多个图片上传/多选
多张图片上传只需传入按钮文本为数组

```html
<nf-upload :buttonText="['Upload']"></nf-upload>
```

#### API
| 参数 | 说明 | 类型| 默认值 | 可选值 |
| ---- | ---- | ---- | ---- | ---- |
| buttonText | 按钮文案 |  Array,String | - | - |
| imageList | 图片数组 |  Array | [] | - |
| multiple | 支持多选 |  Boolean | false | - |



## 组件-download下载

```html
<!-- 导出进度条 -->
<nf-download
  :showModal.sync="showProgress"
  :progress="downloadProgress"
  :downloadFields="exportForm"
  :downloadFunction="checkExport"
  @setProgress="setProgress"
></nf-download>
```

#### API
| 参数 | 说明 | 类型| 默认值 | 可选值 |
| ---- | ---- | ---- | ---- | ---- |
| showModal | 弹层显示 |  Boolean | false | true,false |
| progress | 进度条百分比 |  Number | - | - |
| progressDesc | 下载描述 |  String | - | - |
| downloadFields | 下载查询字段 |  Object | - | - |
| downloadFunction | 下载查询方法 |  downloadFunction | - | - |

#### 事件
| 事件名称 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| setProgress | 下载轮询查询返回数据的回调 |  function(e) |
