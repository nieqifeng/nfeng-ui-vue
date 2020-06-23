import './assets/styles/index.scss'
import { pcComps, mComps } from './components'
import filters from './filters'
import utils from './utils'

function install(Vue) {
  if (install.installed) return

  Object.keys(pcComps).forEach((key) => {
    Vue.component(key, pcComps[key])
  })
  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
  Vue.prototype.$utils = utils
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export { pcComps, mComps, install, utils }
export default { install }
