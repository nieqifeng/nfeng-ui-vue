# nfeng-ui-vue
基于Vue的后台插件，包含了复用高的组件、过滤器、工具函数。

## structure
* src/components 组件
* src/styles 样式（组件等）
* src/filters 过滤器
* src/utils 工具函数

## build
* npm run build-bundle

## quickstart
```js
import NfengUI from 'nfeng-ui-vue'

Vue.use(NfengUI)
```


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
<nf-download :showModal.sync="showProgress" :progress="downloadProgress" :msg="downloadMsg" :downloadState="downloadState" @cancelHandle="cancelHandle"></nf-download>
```

#### API
| 参数 | 说明 | 类型| 默认值 | 可选值 |
| ---- | ---- | ---- | ---- | ---- |
| showModal | 弹层显示 |  Boolean | false | true,false |
| progress | 进度条百分比 |  Number | - | - |
| downloadMsg | 弹层信息 |  String | - | - |
| downloadState | 下载状态 |  String | - | 30,40 |

#### 事件
| 事件名称 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| cancelHandle | 点击遮罩层或右上角叉或取消按钮的回调 |  function(e) |
