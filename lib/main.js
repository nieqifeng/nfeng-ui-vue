import components, { Table } from '../src/packages'
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
export { utils, Table }
export default { install }