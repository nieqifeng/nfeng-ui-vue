import { ActionTree } from 'vuex'
import { INCREMENT } from './types'
import { SHOW_LOADING, HIDE_LOADING } from '../types'

const actions: ActionTree<ICountState, IRootState> = {
  [INCREMENT]({ commit }, payload?: number) {
    return new Promise<void>(resolve => {
      commit(SHOW_LOADING, null, { root: true })
      setTimeout(() => {
        commit(INCREMENT, payload)
        commit(HIDE_LOADING, null, { root: true })
        resolve()
      }, 500)
    })
  }
}

export default actions
