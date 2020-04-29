// NOTE: src/pages で呼び出す
export default {
  namespaced: true,

  state: {
    listMode: 'list', // list, grid
    listImageWidth: 320,
    gridImageWidth: 320,
  },

  mutations: { 
    setListMode (state, value) {
      state.listMode = value
    },

    setImageWidth (state, value) {
      const mode = state.listMode
      switch (mode) {
        case 'list': state.listImageWidth = value; return
        case 'grid': state.gridImageWidth = value; return
      }
      throw new Error(`Unexpected Error. mode=${mode}`)
    }
  },

  actions: { },

  getters: {
    getListMode (state) {
      return state.listMode
    },

    getImageWidth (state) {
      const mode = state.listMode
      switch (mode) {
        case 'list': return state.listImageWidth
        case 'grid': return state.gridImageWidth
      }
      throw new Error(`Unexpected Error. mode=${mode}`)
    }
  }
}
