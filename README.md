# nfeng-ui-vue

原nfeng-utils升级成为nfeng-ui-vue吧

加入了组件模块是基于ant-design-vue的二次封装

## todo

表单内嵌递归组件

## History

-- 1.0.24 --

上传组件预览要大

-- 1.0.23 --

费率组件beta

-- 1.0.22 --

去掉表单里面的render，template够用了，修复小bug

-- 1.0.21 --

解决一个动态表单item显示隐藏的bug

-- 1.0.20 --

动态表单样式调整、加入slot/template、更直观渲染dom

-- 1.0.19 --

上传组件还是有bug，删除冗余的东西，更轻量，更规范。

-- 1.0.18 --

加入图片上传组件beta版

-- 1.0.17 --

费率组件beta版

-- 1.0.15 --

alert加个可变参数

-- 1.0.14 --

增加列表以及列表页面组件

-- 1.0.13 --

更新包，加入checkbox

## Usage

### Install via NPM

- Get from npm:  ```npm install nfeng-utils --save ```


### Usage with build tools

HTML:
```
// import ES6 style
import utils from 'nfeng-utils';

// style="padding-top: 10px; margin-right: 10px;"
<div class="pt10 mr10"></div>
```

CSS:
```
// 内置了一些css handle
.center-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

JS:
```
// import ES6 style
import utils from 'nfeng-utils';

const a = [1,2,3]
const b = [2,4,5]

// 并集 [1,2,3,4,5]
utils.array.union(a, b)

// 交集 [2]
utils.array.intersection(a, b)

// 差集 [1,3]
utils.array.differenceNew(a, b)
```

### Properties

Properties that are currently available on the plugin:

 - ```utils.jquery.extend``` - jqeury的extend函数
 - ```utils.tool.deepCopy``` - 深拷贝
 - ```utils.tool.debounce``` - 防抖
 - ```utils.tool.throttle"``` - 限流
 - ```utils.tool.getBrowserInfo``` - 获取浏览器信息
 - ```utils.tree.translateDataToTree``` - 该方法用于将有父子关系的数组转换成树形结构的数组

### Questions, bugs

 - Create [an issue](https://github.com/N-feng/nfeng-ui-vue/issues) or ping me on twitter [@nfeng](https://twitter.com/imnfeng)

