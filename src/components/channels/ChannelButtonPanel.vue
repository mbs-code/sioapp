<template lang="pug">    
  div
    template(v-for='(item, key) of items' :keys='key')
      v-tooltip(bottom)
        template(v-slot:activator='{ on }')
          v-btn.mx-2(icon @click='item.onClick'  v-on='on')
            v-icon {{ item.icon }}
        span {{ item.title }}

    ChannelRecord(:show='showDialog' :channel='channel', @onClose='showDialog = !showDialog')
</template>

<script>
import ChannelRecord from '@/components/channels/ChannelRecord'

export default {
  components: { ChannelRecord },

  props: {
    channel: {
      type: Object,
      default: () => {}
    }
  },

  data: function () {
    return {
      showDialog: false,
      items: [
        { icon: 'mdi-image', title: 'サムネイルを表示', onClick: this.doOpenThumbnail },
        { icon: 'mdi-image', title: 'バナーを表示', onClick: this.doOpenBanner },
        { icon: 'mdi-history', title: '更新履歴', onClick: this.doOpenRecords }
      ]
    }
  },

  methods: {
    doOpenThumbnail () {
      const url = this.channel.thumbnailHires
      window.open(url, '_blank')
    },

    doOpenBanner () {
      const url = this.channel.bannerHires
      window.open(url, '_blank')
    },

    async doOpenRecords () {
      this.showDialog = !this.showDialog
    }
  }
}
</script>