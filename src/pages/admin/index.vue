<template lang='pug'>
  v-container
    v-row.ma-n2
      template(v-for='(item, key) in items' :keys='key')
        v-col
          LinkedCard(:to='item.to' elevation='2')
            v-list-item
             v-list-item-avatar(color='')
              v-icon {{ item.icon }}
             v-list-item-content
               v-list-item-title.headline {{ item.title }}
               v-list-item-subtitle {{ item.text }}
        
</template>

<script>
import stringFilters from '@/mixins/stringFilters'
import htmlHistory from '@/mixins/htmlHistory'

import ChannelList from '@/components/channels/ChannelList'
import LinkedCard from '@/components/parts/LinkedCard'
import Loading from '@/components/parts/Loading'

export default {
  components: { LinkedCard, Loading, ChannelList },

  mixins: [stringFilters, htmlHistory],

  data: function () {
    return {
      items: [
        { title: 'チャンネル追加', icon: 'mdi-account-plus', text: '監視するチャンネルを追加します.', to: { name: 'admin-addChannel' } },
        // { title: 'チャンネル追加', icon: 'mdi-account-plus', text: 'てきすとめっせーじ', to: { name: 'admin-addChannel' } },
      ]
    }
  }
}
</script>
