import Vue from 'vue';
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

Vue.use(VuetifyToast, {
  x: 'right',
  y: 'bottom',
  timeout: 0, // 0: fixed
  color: 'grey darken-4',
  closeIcon: 'mdi-close',

  queueable: false, // 一つずつ処理する
  // multiLine: false,
  // vertical: false,
  shorts: {
    info: {
      // 5秒で消える
      icon: 'mdi-information',
      textColor: 'white',
      iconColor: 'blue',
      timeout: 5000,
      dismissable: true, // タッチで終了
      showClose: false
    },
    success: {
      // 5秒で消える
      icon: 'mdi-check-circle',
      textColor: 'white',
      iconColor: 'green',
      timeout: 5000,
      dismissable: true, // タッチで終了
      showClose: false
    },
    error: {
      // クリックして消える
      icon: 'mdi-alert',
      iconColor: 'red',
      timeout: 10000,
      dismissable: false,
      showClose: true
    }
  }
})

export default new Vuetify({
});
