<template lang="pug">
  v-container(fluid)
    v-row.ma-n2
      v-col(cols='12')
        VideoPanel(:video='video' imageWidth='285')
      
      v-col(cols='12' md='6')
        v-row(no-gutters)
          v-col(cols='12')
            v-card
              v-card-text
                VideoButtonPanel(:video='video')
          
        v-row
          v-col(cols='12')
            v-card
              v-card-text
                VideoInfoTable(:video='video')

      v-col(cols='12' md='6')
        v-card
          v-card-title 一週間の動向
          v-card-text
            VideoChart(:stats='stats' :showCV='video.type !== "video"')
    
      v-col(cols='12')
        v-card
          v-card-title 概要
          v-card-text(style="white-space:pre-wrap;" v-text='video.description')

</template>

<script>
import apiHandler from '@/mixins/apiHandler'

import VideoPanel from '@/components/videos/VideoPanel'
import VideoButtonPanel from '@/components/videos/VideoButtonPanel'
import VideoInfoTable from '@/components/videos/VideoInfoTable'
import VideoChart from '@/components/videos/VideoChart'

export default {
  components: { VideoPanel, VideoButtonPanel, VideoInfoTable, VideoChart },
  
  mixins: [apiHandler],

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
      this.apiHandler(async () => {
        const id = this.$route.params.id
        const { data } = await this.$http.get(`videos/${id}`)
        const { data: stats } = await this.$http.get(`videos/${id}/stats`)

        this.video = data
        this.stats = stats
      })
    }
  }

}
</script>