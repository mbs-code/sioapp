import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'

import SecureLS from "secure-ls"
import createPersistedState from 'vuex-persistedstate'
import VuexReset from '@ianwalter/vuex-reset'

import auth from './auth'
import config from './config'

Vue.use(Vuex)

// TODO: secret の取り扱い
// とりあえず UA 使うけど、アプデしたら変わるよね
const secret = navigator.userAgent || 'secret'
const ls = new SecureLS({ encodingType: 'aes', isCompression: true, encryptionSecret: secret })
// const ls = new SecureLS({ encodingType: '', isCompression: true }) // debug

export default new Vuex.Store({
  modules: { auth, config },

  mutations: {
    clear: () => { 
      // console.log('vuex >', 'clear')
      localStorage.clear()

      // trigger by VuexReset
    }
  },

  plugins: [
    // createLogger(),
    VuexReset({ trigger: 'clear'}),
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
})
