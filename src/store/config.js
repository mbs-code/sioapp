// NOTE: src/pages で呼び出す
export default {
  namespaced: true,

  state: {
    listMode: 'list', // list, grid
  },

  mutations: { 
    setListMode (state, value) {
      state.listMode = value
    }
  },

  actions: { },

  getters: { }
}
