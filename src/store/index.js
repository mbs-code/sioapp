import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: null,
    user : null
  },
  mutations: {
    attach (state, { token, user }) {
      if (!token) {
        throw new Error('Missing token!')
      }
      
      if (!user) {
        throw new Error('No user information!')
      }

      state.isLogin = true
      state.token = token
      state.user = user
    },
    detach (state) {
      state.isLogin = false
      state.token = null
      state.user = null
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      console.log('vuex >', 'login')
      const { data: { token, user } } = await axios.post('login', {
        username: username,
        password: password
      })

      commit('attach', { token, user })
    },
    logout ({ commit }) {
      console.log('vuex >', 'logout')
      commit('detach')
    }
  },
  getters: {

  }
})
