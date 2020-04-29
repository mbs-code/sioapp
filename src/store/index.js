import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls"

import auth from './auth'
import config from './config'

Vue.use(Vuex)


const ls = new SecureLS({ encordingType: 'AES', isCompression: false })

export default new Vuex.Store({
  modules: { auth, config },

  // localstorage 永続化
  plugins: [createPersistedState({
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    }
  })]
})
