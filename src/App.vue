<template lang="pug">
  v-app
    v-app-bar(app color='pink lighten-5' dense clipped-left elevation='2')
      v-app-bar-nav-icon(@click.stop='drawer = !drawer')
      v-toolbar-title
        v-icon.mr-2 mdi-shaker-outline
        | sioapp

      v-spacer

      v-btn(icon)
        v-icon mdi-magnify

    v-navigation-drawer(app v-model='drawer' :mini-variant='mini' clipped)
      v-list
        template(v-for='(item, key) in items' :keys='key')
          v-list-item(link :to='item.to' :exact='item.exact')
            v-list-item-icon
              v-icon {{ item.icon }}
            v-list-item-content
              v-list-item-title {{ item.title }}
      template(v-slot:append)
        div.pa-2
          v-switch(v-model='mini' :label='mini ? "" : "折りたたむ"')

    v-content
      router-view

</template>

<script>
export default {
  name: 'App',

  data: function () {
    return {
      drawer: false,
      mini: false, // 常にボタンだけモード
      items: [
        { title: 'Home', icon: 'mdi-home', to: { name: 'home' }, exact: true },
        { title: 'チャンネル', icon: 'mdi-youtube', to: { name: 'channels' } },
        { title: '動画', icon: 'mdi-video', to: { name: 'videos' } },
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
