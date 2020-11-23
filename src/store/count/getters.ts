import { GetterTree } from 'vuex'

const getters: GetterTree<ICountState, IRootState> = {
  iCount: state => state.count
}

export default getters
