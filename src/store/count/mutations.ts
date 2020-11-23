import { MutationTree } from 'vuex'
import { INCREMENT } from './types'

const mutations: MutationTree<ICountState> = {
  [INCREMENT](state, payload: number = 0) {
    state.count = payload
  }
}

export default mutations
