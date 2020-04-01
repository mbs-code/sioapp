<template lang="pug">
  v-app
    v-app-bar(app color='pink lighten-4' dense clipped-left elevation='2')
      v-app-bar-nav-icon(@click.stop='drawer = !drawer')
      v-toolbar-title
        v-icon.mr-2 mdi-shaker-outline
        | sioapp

      v-spacer

      template(v-if='$route.name !== "login"')
        template(v-if='isLogin')
          v-sheet.pa-2(color='#fef6f9')
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
              v-btn(icon @click='doLogin' v-on='on')
                v-icon mdi-login
            span Login

    v-navigation-drawer(
      app
      color='pink lighten-5'
      v-model='drawer'
      mobile-break-point='600'
      clipped
      :mini-variant='mini'
      :temporary='!mini'
      :expand-on-hover='mini'
    )
      v-list
        template(v-for='(item, key) in items' :keys='key')
          v-list-item(link :to='item.to' :exact='item.exact')
            v-list-item-icon
              v-icon {{ item.icon }}
            v-list-item-content
              v-list-item-title {{ item.title }}
      template(v-slot:append)
        v-list-item
          v-list-item-icon
            v-switch.ml-n2(v-model='mini')
          v-list-item-content.ml-n4.ellipsis 折りたたむ
        //- div.pa-2
        //-   v-switch(v-model='mini' :label='mini ? "" : "折りたたむ"')

    v-content
      router-view

</template>

<script>
import authorize from '@/mixins/authorize'
export default {
  name: 'App',

  mixins: [authorize],

  data: function () {
    return {
      drawer: false,
      mini: false, // 常にボタンだけモード
      items: [
        { title: 'Home', icon: 'mdi-home', to: { name: 'index' }, exact: true },
        { title: 'アクティビティ', icon: 'mdi-calendar-check', to: { name: 'activity' }, exact: true },
        { title: 'チャンネル', icon: 'mdi-youtube', to: { name: 'channels' } },
        { title: '動画', icon: 'mdi-video', to: { name: 'videos' } },
        { title: '管理', icon: 'mdi-cog', to: { name: 'admin' } },
      ]
    }
  },

  mounted() {
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
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>