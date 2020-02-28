<template lang="pug">
  v-row
    v-col
      VideoPanel(:video='video' imageWidth='285')
    
    //- v-col
    //-   ChannelInfoTable(:channel='channel')

    //- v-col
    //-   ChannelGraph(:stats='stats')

    //- v-card
    //-   template(v-for='(stat, key) in stats' :keys='key')
    //-     div {{ stat }}
</template>

<script>
import VideoPanel from '../../components/VideoPanel'
// import ChannelInfoTable from '../../components/ChannelInfoTable'
// import ChannelGraph from '../../components/ChannelGraph'

export default {
  components: { VideoPanel },
  
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