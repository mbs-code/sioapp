<route-meta>
  { "requiresAuth": true }
</route-meta>

<template lang='pug'>
  v-container
    v-row.ma-n2
      template(v-for='(item, key) in items' :keys='key')
        v-col(cols='12')
          LinkedCard(:to='item.to' elevation='2')
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
        { title: 'チャンネル追加', icon: 'mdi-account-plus', text: '監視するチャンネルを追加します.', to: { name: 'admin-addChannel' } },
        { title: '鯖ステータス', icon: 'mdi-server', text: 'サーバーの状態を表示します', to: { name: 'admin-status' } },
        { title: 'アプリメモ', icon: 'mdi-note-text', text: 'トップページに表示されるメモを変更します.', to: { name: 'admin-editMemo' } }
      ]
    }
  }
}
</script>
