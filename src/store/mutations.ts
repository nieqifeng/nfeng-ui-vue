import { MutationTree } from 'vuex'
import { SHOW_LOADING, HIDE_LOADING } from './types'

export default {
  [SHOW_LOADING](state) {
    state.isLoading = true
  },
  [HIDE_LOADING](state) {
    state.isLoading = false
  }
} as MutationTree<IRootState>
