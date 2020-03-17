<template lang="pug">
  v-hover(v-slot:default='{ hover }' v-resize='onResize')
    v-card(
      :elevation='hasLink && hover ? 12 : 2'
      v-bind='linkObject'
      v-resize='onResize'
      ref='card'
    )
      v-row.fill-height(no-gutters :class="{ 'flex-column': isCollapse }")
        //- left header
        v-col.flex-grow-0
          LinkedCard.fill-height.foreground(:href='url' target='_blank')
            v-row.fill-height.black(no-gutters align='center' justify='center'
             :class="{ 'flex-column': isCollapse, 'bottom-flat': isCollapse, 'right-flat': !isCollapse }"
            )
              v-img(:src='video.thumbnailHires' :aspect-ratio='imageAspectRecio' :width='imageWidth')

        //- right content
        v-col.flex-grow-1
          v-row.fill-height.flex-column(no-gutters)

            //- right main
            v-col.pa-2.flex-grow-1
              v-row.fill-height.flex-column(no-gutters)
                //- chips
                v-col.pb-1.flex-grow-0
                  template(v-for='(chip, key) in chips' :keys='key')
                    v-chip.mr-3(label small :color='chip.color' :text-color='chip.textColor') {{ chip.text }}

                //- title
                v-col.flex-grow-1
                  span.title.text--primary {{ video.title }}

                v-col.py-1.flex-grow-0(v-if='isCollapse')
                  v-divider

                //- labels
                v-col.flex-grow-0
                  v-row(no-gutters)
                    template(v-for='(label, key) in labels' :keys='key')
                      v-col.px-2.one-line(cols='auto')
                        div(style='min-width: 80px;')
                          v-icon {{ label.icon }}
                          span.ml-1.body-2.text-right {{ label.text }}

            v-col.flex-grow-0
              v-divider

            //- right fotter
            v-col.flex-grow-0
              Media.top-flat(
                :image='channel.thumbnail'
                :text='channel.title'
                :to="{ name: 'channel-id', params: { id: channel.id }}"
              )

</template>

<script>
import linkable from '@/mixins/linkable'
import responsible from '@/mixins/responsible'
import stringFilters from '@/mixins/stringFilters'

import Media from '@/components/parts/Media'
import LinkedCard from '@/components/parts/LinkedCard'

export default {
  components: {
    Media,
    LinkedCard
  },

  mixins: [linkable, responsible, stringFilters],

  props: {
    video: {
      type: Object,
      default: () => {}
    },
    imageWidth: {
      type: [String, Number],
      default: () => 320
    },
    imageAspectRecio: {
      type: Number,
      default: () => 16 / 9
    }
  },

  data() {
    return {
      width: 0
      // height: 0
    }
  },

  computed: {
    channel() {
      return this.video.channel || {}
    },

    chips() {
      const ary = []
      const video = this.video
      ary.push(this.parseChips(video.status))
      ary.push(this.parseChips(video.type))
      return ary
    },

    url() {
      return `https://www.youtube.com/watch?v=${this.video.key}`
    },

    labels() {
      const video = this.video
      const ary = []

      let goodRate = (video.like / (video.like + video.dislike)) * 100
      if (video.like === 0) goodRate = 0
      if (video.dislike === 0) goodRate = 100

      const cv = (video.type === 'live')
        ? this.formatNumber(video.concurrentViewers) + `(${this.formatNumber(video.concurrentViewers)})`
        : ((video.concurrentViewers) ? `(${this.formatNumber(video.concurrentViewers)})` : '-')

      ary.push({ icon: 'mdi-clock-outline', text: this.formatDatetimeHumanize(video.startTime) })
      ary.push({ icon: 'mdi-movie', text: this.formatDuration(video.duration) })
      ary.push({ icon: 'mdi-play', text: this.formatNumber(video.view) })
      ary.push({ icon: 'mdi-account-group', text: cv })
      ary.push({ icon: 'mdi-trending-up', text: this.formatNumber(goodRate) + '%' })
      if (!this.isCollapse) {
        ary.push({ icon: 'mdi-thumb-up', text: this.formatNumber(video.like) })
        ary.push({ icon: 'mdi-thumb-down', text: this.formatNumber(video.dislike) })
        ary.push({ icon: 'mdi-message-reply', text: this.formatNumber(video.comment) })
      }
      return ary
    }
  },

  async mounted() {
    await this.onResize()
  },

  methods: {
    parseChips(val) {
      switch (val) {
        // status
        case 'public':
          return { color: 'blue', textColor: 'white', text: '公開' }
        case 'unlisted':
          return { color: 'red', textColor: 'white', text: '限定公開' }
        case 'private':
          return { color: 'black', textColor: 'white', text: '非公開' }

        // type
        case 'upcoming':
          return { color: 'orange', textColor: 'white', text: '予定' }
        case 'live':
          return { color: 'red', textColor: 'white', text: '配信中' }
        case 'archive':
          return { color: 'green', textColor: 'white', text: 'アーカイブ' }
        case 'video':
          return { color: 'indigo', textColor: 'white', text: '動画' }
        case 'premiere':
          return { color: 'purple', textColor: 'white', text: 'プレミア動画' }

        default:
          return { color: 'grey lighten-3', textColor: 'black', text: val }
      }
    }
  }
}
</script>
