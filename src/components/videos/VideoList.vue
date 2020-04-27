<template lang="pug">
  v-row(no-gutters align='stretch' justify='space-around' v-resize='onResize' ref='container')
    template(v-for='(video, key) in videos' :keys='key')
      VideoSheet.ma-2(v-if='showGrid' :video='video' :imageWidth='imageWidth')
      VideoPanel.ma-2(v-else :video='video' :imageWidth='imageWidth')

    //- flex padding
    template(v-if='padCount > 0')
      div.transparent(v-for='n in padCount' :style="{ width: spacerWidth + 'px' }")

</template>

<script>
import domCalculator from '@/lib/domCalculator'

import VideoSheet from '@/components/videos/VideoSheet'
import VideoPanel from '@/components/videos/VideoPanel'
export default {
  components: { VideoSheet, VideoPanel },

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

  data: function () {
    return {
      spacerWidth: 0, // flexSpacer のサイズ
      rowCount: 0, // 一行あたりの flexBox 配置数
      padCount: 0 // flexSpacer の必要個数
    }
  },

  watch: {
    videos () {
      // layout を再計算
      this.onResize()
    },
    showGrid () {
      // layout を再計算
      this.onResize()
    }
  },

  async mounted () {
    await this.onResize()
  },

  methods: {
    onResize() {
      // flex padding の計算
      this.spacerWidth = 0
      this.rowCount = 0
      this.padCount = 0

      // DOM 描画待ち
      this.$nextTick(() => {
        const containerDom = this.$refs.container
        const itemDom = containerDom.children[0] // 直接 ref で取れなかった…

        if (itemDom) {
            // real width の算出
            const containerWidth = domCalculator.width(containerDom)
            const itemWidth = domCalculator.width(itemDom)

            this.spacerWidth = itemWidth
            this.rowCount = Math.floor(containerWidth / itemWidth)

            const mod = this.videos.length % this.rowCount
            const count = (mod === 0) ? mod : this.rowCount - mod
            this.padCount = count
         }
      })
    }
  }
}
</script>
