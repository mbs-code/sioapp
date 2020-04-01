import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import store from '@/store'
 
// axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
axios.defaults.baseURL = process.env.NODE_ENV
  ? '/api/'
  : process.env.VUE_APP_API_ENDPOINT

axios.interceptors.request.use(request => {
  const isLogin = store.state.isLogin
  if (isLogin) {
    const token = store.state.token
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

Vue.use(VueAxios, axios)

export default axios
