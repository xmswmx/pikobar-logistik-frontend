import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  listFaskes: [],
  detailFaskes: [],
  totalList: 0
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
