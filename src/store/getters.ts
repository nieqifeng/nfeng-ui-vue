import { GetterTree } from 'vuex'

export default {
  loading: state => state.isLoading
} as GetterTree<IRootState, any>
