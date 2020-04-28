<template lang="pug">
  v-app
    //- ■ app header
    v-app-bar(
      app
      :color='(isLocal ? "green" : "pink") + " lighten-4"'
      dense
      clipped-left
      elevation='2'
    )
      v-app-bar-nav-icon(@click.stop='drawer = !drawer')
      v-toolbar-title
        v-icon.mr-2 mdi-calendar
        | schev
        v-icon.ml-1(v-show='isLocal' color='pink' large) mdi-dev-to

      v-spacer

      //- login status
      template(v-if='$route.name !== "login"')
        template(v-if='isLogin')
          v-sheet.ml-2.pa-2(color='#fef6f9')
            v-icon(left) mdi-account-circle
            | {{ loginUser.name }}
          v-tooltip(bottom)
            template(v-slot:activator='{ on }')
              v-btn(icon @click='doLogout' v-on='on')
                v-icon mdi-logout
            span Logout

        template(v-else)
          v-tooltip(bottom)
            template(v-slot:activator='{ on }')
              v-btn(icon @click='pushLoginPage' v-on='on')
                v-icon mdi-login
            span Login

    //- ■ left drawer
    v-navigation-drawer(
      app
      :color='(isLocal ? "green" : "pink") + " lighten-5"'
      v-model='drawer'
      mobile-break-point='600'
      clipped
      :mini-variant='mini'
      :temporary='!mini'
    )
      v-list
        template(v-for='(item, key) in items' :keys='key')
          v-tooltip(right :disabled='!mini')
            template(v-slot:activator='{ on }')
              v-list-item(link :to='item.to' :exact='item.exact' v-on='on')
                v-list-item-icon
                  v-icon {{ item.icon }}
                v-list-item-content
                  v-list-item-title {{ item.title }}
            span {{ item.title }}
      template(v-slot:append)
        v-tooltip(right :disabled='!mini')
          template(v-slot:activator='{ on }')
            v-list-item(v-on='on')
              v-list-item-icon
                v-switch.ml-n2(v-model='mini' color='grey darken-2')
              v-list-item-content.ml-n4.text-truncate 折りたたむ
          span 展開する

    //- ■ main
    v-content
      router-view

</template>

<script>
import authorize from '@/mixins/authorize'
export default {
  name: 'App',

  mixins: [authorize],

  data: function () {
    // debug 判定
    const api = process.env.VUE_APP_API_ENDPOINT
    const isLocal = api.includes('/localhost')

    return {
      drawer: false,
      mini: false, // 常にボタンだけモード
      isLocal: isLocal, // localhost 接続なら true
      items: [
        { title: 'ホーム', icon: 'mdi-home', to: { name: 'index' }, exact: true },
        { title: 'アクティビティ', icon: 'mdi-calendar-check', to: { name: 'activity' }, exact: true },
        { title: 'チャンネル', icon: 'mdi-youtube', to: { name: 'channels' } },
        { title: '動画', icon: 'mdi-video', to: { name: 'videos' } },
        { title: '管理', icon: 'mdi-cog', to: { name: 'admin' } },
      ]
    }
  },

  mounted() {
    // param の設定
    if (localStorage.drawer) {
      this.drawer = Boolean(localStorage.drawer)
    }
    if (localStorage.mini) {
      this.mini = Boolean(localStorage.mini)
    }
  },

  watch: {
    drawer(val) {
      localStorage.drawer = val
    },
    mini(val) {
      localStorage.mini = val
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/sass/index.scss";
</style>
