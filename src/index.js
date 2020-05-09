import './styles/index.scss'
import components from './components'
import filters from './filters'
import utils from './utils'

function install(Vue) {
  if (install.installed) return

  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
  Vue.prototype.$utils = utils
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export { components, utils }
export default { install }
