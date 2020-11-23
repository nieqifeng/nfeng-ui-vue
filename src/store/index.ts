import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import count from './count'

Vue.use(Vuex)

export default new Vuex.Store<IRootState>({
  state,
  getters,
  mutations,
  modules: { count }
})
