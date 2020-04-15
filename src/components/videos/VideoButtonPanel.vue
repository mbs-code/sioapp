<template lang="pug">    
  div
    template(v-for='(item, key) of items' :keys='key')
      v-tooltip(bottom)
        template(v-slot:activator='{ on }')
          v-btn.mx-2(icon @click='item.onClick'  v-on='on')
            v-icon {{ item.icon }}
        span {{ item.title }}

    VideoRecord(:show='showDialog' :video='video', @onClose='showDialog = !showDialog')
</template>

<script>
import VideoRecord from '@/components/videos/VideoRecord'

export default {
  components: { VideoRecord },

  props: {
    video: {
      type: Object,
      default: () => {}
    }
  },

  data: function () {
    return {
      showDialog: false,
      items: [
        { icon: 'mdi-image', title: 'サムネを表示', onClick: this.doOpenPicture },
        { icon: 'mdi-history', title: '更新履歴', onClick: this.doOpenRecords }
      ]
    }
  },

  methods: {
    doOpenPicture () {
      const url = this.video.thumbnailHires
      window.open(url, '_blank')
    },

    async doOpenRecords () {
      this.showDialog = !this.showDialog
    }
  }
}
</script>