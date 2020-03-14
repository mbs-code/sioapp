<template lang="pug">
  v-row
    v-col
      VideoPanel(:video='video' imageWidth='285')
    
    v-col
      v-card
        v-card-text
          VideoInfoTable(:video='video')

    v-col
      v-card
        v-card-title 一週間の動向
        v-card-text
          VideoChart(:stats='stats' :showCV='video.type !== "video"')

    v-col
      v-card
        v-card-title 概要
        v-card-text(style="white-space:pre-wrap;" v-text='video.description')

</template>

<script>
import VideoPanel from '@/components/videos/VideoPanel'
import VideoInfoTable from '@/components/videos/VideoInfoTable'
import VideoChart from '@/components/videos/VideoChart'

export default {
  components: { VideoPanel, VideoInfoTable, VideoChart },
  
  data: function () {
    return {
      video: {},
      stats: []
    }
  },

  created: async function() {
    await this.getDataFromApi()
  },

  methods: {
    async getDataFromApi () {
      const ts = new Date()
      this.showLoading = true

      try {
        const id = this.$route.params.id
        const { data } = await this.$http.get(`videos/${id}`)
        const { data: stats } = await this.$http.get(`videos/${id}/stats`)

        this.video = data
        this.stats = stats
        this.requestTime = new Date() - ts
      } catch (err) {
        this.$toast.error(err)
      } finally {
        this.showLoading = false
      }
    }
  }

}
</script>