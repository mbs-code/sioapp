<route-meta>
  { "requiresAuth": true }
</route-meta>

<template lang='pug'>
  v-container
    v-row.ma-n2
      template(v-for='(item, key) in items' :keys='key')
        v-col(cols='12')
          template(v-if='item.to')
            v-card(evelation='2' :dark='Boolean(item.color)' :color='item.color' :to='item.to')
              v-list-item
                v-list-item-avatar
                  v-icon {{ item.icon }}
                v-list-item-content
                  v-list-item-title.headline {{ item.title }}
                  v-list-item-subtitle {{ item.text }}

          template(v-else-if='item.click')
            v-card(evelation='2' :dark='Boolean(item.color)' :color='item.color' @click='item.click')
              v-list-item
                v-list-item-avatar
                  v-icon {{ item.icon }}
                v-list-item-content
                  v-list-item-title.headline {{ item.title }}
                  v-list-item-subtitle {{ item.text }}

          
        
</template>

<script>
import stringFilters from '@/mixins/stringFilters'

import ChannelList from '@/components/channels/ChannelList'
import LinkedCard from '@/components/parts/LinkedCard'
import Loading from '@/components/parts/Loading'

export default {
  components: { LinkedCard, Loading, ChannelList },

  mixins: [stringFilters],

  data: function () {
    return {
      items: [
        { title: 'チャンネル追加', icon: 'mdi-account-plus', text: '監視するチャンネルを追加します', to: { name: 'admin-addChannel' } },
        { title: 'サーバーステータス', icon: 'mdi-server', text: 'サーバーの状態を表示します', to: { name: 'admin-status' } },
        { title: 'アプリメモ', icon: 'mdi-note-text', text: 'トップページに表示されるテキストを変更します', to: { name: 'admin-editMemo' } },
        { title: 'ログ', icon: 'mdi-notebook-outline', text: 'ログを確認する', to: { name: 'admin-log' } },
        { title: '個人設定の初期化', icon: 'mdi-close-octagon', text: '！！即実行されるため注意！！', color: 'red darken-4', click: this.clearLocalstorage }
      ]
    }
  },

  methods: {
    clearLocalstorage () {
      this.$store.commit('clear')
      this.$toast.success('clear configure!')
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
