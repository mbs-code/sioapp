<template lang="pug">
  v-row.fill-height(no-gutters)
    template(v-for='(video, key) in videos' :keys='key')
      v-col.pa-2(:cols='showGrid ? 0 : 12')
        VideoPanel.fill-height(
          :video='video'
          :imageWidth='imageWidth'
          :to="{ name: 'video-id', params: { id: video.id }}"
          ref='card'
        )

</template>

<script>
import VideoPanel from '@/components/videos/VideoPanel'

export default {
  components: { VideoPanel },

  props: {
    videos: {
      type: Array,
      default: () => []
    },
    showGrid: {
      type: Boolean,
      default: () => false
    },
    imageWidth: {
      type: Number,
      default: () => 320
    }
  },

  watch: {
    showGrid() {
      this.callResize()
    }
  },

  methods: {
    callResize() {
      // TODO: できれば component 内部で resize 検知をしたい
      const cards = this.$refs.card
      if (Array.isArray(cards)) {
        for (const card of cards) {
          card.resetOnResize()
        }
      }
    }
  }
}
</script>
