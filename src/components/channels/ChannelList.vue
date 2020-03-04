<template lang="pug">
  v-row.fill-height(no-gutters)
    template(v-for='(channel, key) in channels' :keys='key')
      v-col.pa-2(:cols='showGrid ? 0 : 12')
        ChannelPanel.fill-height(
          :channel='channel'
          :imageWidth='imageWidth'
          :to="{ name: 'channel-id', params: { id: channel.id }}"
          ref='card'
        )

</template>

<script>
import ChannelPanel from '@/components/channels/ChannelPanel'

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
