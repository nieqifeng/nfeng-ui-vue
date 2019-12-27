import './scss/index.scss'
import tool from './tool'
import tree from './tree'
import array from './array'
import jquery from './jquery'
import conver from './validater/conver'
import patterns from './validater/patterns'
import auth from './auth'
import filter from './filter'
import request from './request'
import components from './components'

function install(Vue) {
  if (install.installed) return

  Vue.prototype.$tool = tool
  Vue.prototype.$tree = tree
  Vue.prototype.$array = array
  Vue.prototype.$jquery = jquery
  Vue.prototype.$conver = conver

  // 注册全局filter
  Object.keys(filter).forEach((key) => {
    Vue.filter(key, filter[key])
  })

  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  tool,
  tree,
  array,
  jquery,
  conver,
  patterns,
  auth,
  filter,
  request
}
