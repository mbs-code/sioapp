<template lang="pug">
  v-hover(v-slot:default='{ hover }')
    v-card(:elevation='hover ? 12 : 2')

      //- centering object
      v-row.flex-column.fill-height.black(no-gutters align='center' justify='center')
        //- background image
        v-img(:src='video.thumbnailHires' :aspect-ratio='imageAspectRecio' :width='imageWidth')

          //- overlay object
          v-hover(v-slot:default='{ hover: overlayHover }')
            v-overlay.v-overlay-filled(absolute :opacity="overlayHover ? 0.7 : 0")
              //- link object
              v-card.fill-height.transparent.v-disabled-opacity-1(tile flat
                :href='url'
                target='_blank'
                :disabled='!overlayHover'
              )
                v-row.flex-column.fill-height(no-gutters)
                  //- - header chip
                  v-col.flex-grow-0.pa-2
                    //- - - header chip for overlay
                    template(v-if='overlayHover')
                      v-row(no-gutters)
                        v-col.flex-grow-1
                          template(v-for='(chip, key) in chips' :keys='key')
                            v-chip.mr-3(label small :color='chip.color' :text-color='chip.textColor') {{ chip.text }}
                        v-col.flex-grow-0
                          template(v-if='video.type === "live"')
                            v-chip(label small color='red darken-3')
                              v-icon.mr-1(small style='padding-bottom: 2px;') mdi-account-group
                              | {{ video.concurrentViewers | formatNumber }}
                          template(v-if='video.type === "upcoming"')
                            v-chip(label small color='orange darken-3')
                              v-icon.mr-1(small style='padding-bottom: 2px;') mdi-alarm
                              | {{ video.scheduledStartTime | formatDatetime('dd日 HH:mm') }} ~

                    //- - - header chip for default
                    template(v-else)
                      v-row(no-gutters)
                        v-col.flex-grow-1
                          template(v-for='(chip, key) in chips' :keys='key')
                            v-avatar.mr-2(color='blue-grey darken-2' size='28')
                              v-avatar(:color='chip.color' size='24')
                                v-icon(small) {{ chip.icon }}
                        v-col.flex-grow-0
                          template(v-if='video.type === "live"')
                            v-chip.number-chip.px-2(label small color='red darken-3')
                              v-icon.mr-1(small style='padding-bottom: 2px;') mdi-account-group
                              | {{ video.concurrentViewers | formatNumber }}
                          template(v-if='video.type === "upcoming"')
                            v-chip.number-chip.px-2(label small color='orange darken-3')
                              v-icon.mr-1(small style='padding-bottom: 2px;') mdi-alarm
                              | {{ video.scheduledStartTime | formatDatetime('dd日 HH:mm') }} ~

                  //- - main title (default hide)
                  v-col.flex-grow-1.min-height-0
                    template(v-if='overlayHover')
                      v-row.ma-2.fill-height.overflow-y-auto.thin-scrollbar(no-gutters align='start' justify='center')
                        | {{ video.title }}

                  //- - footer buttons
                  v-col.flex-grow-0
                    v-row.flex-nowrap.ma-2(no-gutters)
                      //- - - channel button (always show)
                      v-col.flex-grow-0
                        v-tooltip(top color='orange darken-4')
                          template(v-slot:activator='{ on: btnOn }')
                            v-hover(v-slot:default='{ hover: btnHover }' openDelay='100')
                              v-btn(small fab
                                :color="btnHover ? 'orange darken-4' : 'blue-grey darken-2'"
                                @click.stop.prevent
                                :to="{ name: 'channels-id', params: { id: channel.id }}"
                                v-on='btnOn'
                              )
                                v-avatar(size=36)
                                  img(:src='video.channel.thumbnail')
                          span チャンネル情報

                      template(v-if='overlayHover')
                        //- - - channel (default hide)
                        v-col.flex-grow-1.min-width-0
                          v-row.fill-height.pa-2(no-gutters align='center' justify='start')
                            div.text-truncate {{ video.channel.title }}
                        //- - - detail button (default hide)
                        v-col.flex-grow-0
                          v-tooltip(top color='indigo darken-1')
                            template(v-slot:activator='{ on: btnOn }')
                              v-hover(v-slot:default='{ hover: btnHover }' openDelay='100')
                                v-btn(small fab
                                  color='indigo darken-1'
                                  :outlined='btnHover'
                                  :class="{ 'white--background': btnHover }"
                                  @click.stop.prevent
                                  :to="{ name: 'videos-id', params: { id: video.id }}"
                                  v-on='btnOn'
                                )
                                  v-icon mdi-text-box-outline
                            span 動画情報

</template>

<script>
import stringFilters from '@/mixins/stringFilters'
export default {
  mixins: [stringFilters],

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
        ? this.formatNumber(video.concurrentViewers) + `(${this.formatNumber(video.maxViewers)})`
        : ((video.concurrentViewers) ? `(${this.formatNumber(video.maxViewers)})` : '-')

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

  methods: {
    parseChips(val) {
      switch (val) {
        // status
        case 'public':
          return { color: 'blue', textColor: 'white', text: '公開', icon: 'mdi-earth' }
        case 'unlisted':
          return { color: 'red', textColor: 'white', text: '限定公開', icon: 'mdi-key' }
        case 'private':
          return { color: 'black', textColor: 'white', text: '非公開', icon: 'mdi-close' }

        // type
        case 'upcoming':
          return { color: 'orange', textColor: 'white', text: '予定', icon: 'mdi-alarm' }
        case 'live':
          return { color: 'red', textColor: 'white', text: '配信中', icon: 'mdi-wifi' }
        case 'archive':
          return { color: 'green', textColor: 'white', text: 'アーカイブ', icon: 'mdi-video' }
        case 'video':
          return { color: 'indigo', textColor: 'white', text: '動画', icon: 'mdi-movie' }
        case 'premiere':
          return { color: 'purple', textColor: 'white', text: 'プレミア動画', icon: 'mdi-movie-filter' }

        default:
          return { color: 'grey lighten-3', textColor: 'black', text: val }
      }
    }
  }
}
</script>

<style lang="scss">
.number-chip.v-chip.theme--dark {
  border-width: 2px;
  border: solid;
  border-color: #455a64 !important; // blue darken-2
}
</style>