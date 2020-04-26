import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/axios'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    doLogin: false,
    token: null,
    issuedAt: null, // 発行日時
    expiresIn: null, // 有効期限
    user : null
  },

  mutations: {
    attach (state, { user, token, issuedAt, expiresIn }) {
      if (!token) {
        throw new Error('Missing token!')
      }
      
      if (!user) {
        throw new Error('No user information!')
      }

      state.doLogin = true
      state.user = user
      state.token = token
      state.issuedAt = new Date(issuedAt * 1000)
      state.expiresIn = new Date(expiresIn * 1000)
    },
    detach (state) {
      state.doLogin = false
      state.user = null
      state.token = null
      state.issuedAt = null
      state.expiresIn = null
    }
  },

  actions: {
    async login ({ commit }, { username, password }) {
      console.log('vuex >', 'login')
      const { data: { user, token, issuedAt, expiresIn } } = await axios.post('login', {
        username: username,
        password: password
      })

      commit('attach', { user, token, issuedAt, expiresIn })
      console.log('- token expires in:', new Date(expiresIn * 1000).toLocaleString())
    },
    logout ({ commit }) {
      console.log('vuex >', 'logout')
      commit('detach')
    }
  },

  getters: {
    isLogin (state) {
      const doLogin = state.doLogin
      const expiresIn = state.expiresIn
      if (doLogin && expiresIn) {
        // token の有効期限を確認する
        const now = new Date()
        const exp = new Date(expiresIn)
        return exp.getTime() > now.getTime() // exp のほうが大きいなら true
      }
      return false
    }
  },

  plugins: [createPersistedState()] // localstorage 永続化
})
