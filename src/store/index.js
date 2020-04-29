import Vue from 'vue'
import Vuex from 'vuex'

import SecureLS from "secure-ls"
import createPersistedState from 'vuex-persistedstate'
import VuexReset from '@ianwalter/vuex-reset'

import auth from './auth'
import config from './config'

Vue.use(Vuex)


const ls = new SecureLS({ encordingType: 'AES', isCompression: false })

export default new Vuex.Store({
  modules: { auth, config },

  mutations: {
    clear: () => { 
      console.log('vuex >', 'clear')
      localStorage.clear()

      // trigger by VuexReset
    }
  },

  plugins: [
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
