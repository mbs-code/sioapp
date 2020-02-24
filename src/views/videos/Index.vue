<template lang='pug'>
  div
    VideoList(:videos='videos' :showGrid='listMode === 0' :imageWidth='320')
    //- template(v-for='(channel, key) in channels' :keys='key')
    //-   ChannelPanel(ref='card' :channel='channel' :imageWidth='imageWidth')
</template>

<script>
import VideoList from '../../components/VideoList'

export default {
  components: {
    VideoList
  },

  data: function() {
    return {
      listMode: 1, // 0: grid, 1:list
      videos: []
    };
  },
  created: async function() {
    const res = await this.$http.get('videos', {
      params: {
        page: 1,
        sort: 'startTime',
        order: 'desc',
        type: 'archive'
      }
    })
    this.videos = res.data
  }
}
</script>