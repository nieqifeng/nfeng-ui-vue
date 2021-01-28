/*
 * @Date: 2021-01-25 15:22:09
 * @LastEditors: N-feng
 * @LastEditTime: 2021-01-27 15:56:21
 * @FilePath: /nfeng-ui-vue/lib/main.js
 */
import components, { Table, Operate } from '../src/packages'
import utils from '../src/utils'

function install(Vue) {
  if (install.installed) return

  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
  // Vue.prototype.$utils = utils
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export { utils, Table, Operate }
export default { install }