<template lang="pug">
  v-row.fill-height(no-gutters)
    template(v-for='(channel, key) in channels' :keys='key')
      v-col.pa-2(:cols='showGrid ? 0 : 12')
        ChannelPanel.fill-height(
          :channel='channel'
          :imageWidth='imageWidth'
          :to="{ name: 'video-id', params: { id: channel._id }}"
          ref='card'
        )
    v-spacer.pa-2

</template>

<script>
import ChannelPanel from './ChannelPanel'

export default {
  components: { ChannelPanel },

  props: {
    channels: {
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
