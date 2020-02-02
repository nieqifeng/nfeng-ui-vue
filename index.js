import './scss/index.scss'
// import tool from './tool'
// import tree from './tree'
// import array from './array'
// import conver from './validater/conver'
// import patterns from './validater/patterns'
import filter from './filter'
// import request from './request'
import components from './components'
import utils from './utils'

function install(Vue) {
  if (install.installed) return

  // Vue.prototype.$tool = tool
  // Vue.prototype.$tree = tree
  // Vue.prototype.$array = array
  // Vue.prototype.$jquery = jquery
  // Vue.prototype.$conver = conver
  Vue.prototype.$utils = utils

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
  install
}

export {
  utils
  // tool,
  // tree,
  // array,
  // jquery,
  // conver,
  // patterns,
  // filter,
  // request,
}
