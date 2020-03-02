import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
// axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
axios.defaults.baseURL = process.env.NODE_ENV
  ? '/api/'
  : process.env.VUE_APP_API_ENDPOINT

Vue.use(VueAxios, axios)
