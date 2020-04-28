import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './auth'
import config from './config'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, config },

  plugins: [createPersistedState()] // localstorage 永続化
})
