import { Module } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const countModule: Module<ICountState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default countModule
