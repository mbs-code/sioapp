<template lang="pug">
  v-container(fluid)
    //- header
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        span.body-2.grey--text.text--darken-1 {{ fetchDate | formatDatetime }}取得 - {{ requestTime / 1000 | formatNumber(2) }}秒

      v-spacer

      v-col(cols='6')
        v-slider(v-model='imageWidth' min=220 :max='screenWidth()' prepend-icon='mdi-arrow-expand-all' hideDetails)

      v-col(cols='auto')
        v-tooltip(bottom)
          template(v-slot:activator='{ on }')
            v-btn.white(elevation='2' v-on='on' @click='getDataFromApi')
              v-icon(small) mdi-autorenew
          span 更新

      v-col(cols='auto')
        //- 色合いが微妙なので css で弄る (v-item--active)
        v-btn-toggle.extend(v-model='showGrid' dense mandatory color='primary')
          v-tooltip(bottom)
            template(v-slot:activator='{ on }')
              v-btn(value='list' icon elevation='2' v-on='on')
                v-icon(small) mdi-view-list
            span リスト表示
          v-tooltip(bottom)
            template(v-slot:activator='{ on }')
              v-btn(value='grid' icon elevation='2' v-on='on')
                v-icon(small) mdi-view-grid
            span グリッド表示

    //- main
    div.ma-2
      div.headline
        | 配信中
        span.body-1.ml-2 (5分おきに更新)
      v-row.fill-height(no-gutters)
        v-col.flex-grow-0.my-1.mr-3
          v-sheet.fill-height(width=8 color='red') 
        v-col.flex-grow-1
          VideoList(:videos='livevideos' :showGrid="showGrid === 'grid'" :imageWidth='imageWidth')

    v-divider.my-4

    div.ma-2
      div.headline
        | 直近の配信予定
        span.body-1.ml-2 (5, 20, 35, 50分に更新)
      v-row.fill-height(no-gutters)
        v-col.flex-grow-0.my-1.mr-3
          v-sheet.fill-height(width=8 color='orange') 
        v-col.flex-grow-1
          VideoList(:videos='upcomingVideos' :showGrid="showGrid === 'grid'" :imageWidth='imageWidth')

    Loading(:show='showLoading')
</template>

<script>
import * as dateFns from 'date-fns'
import stringFilters from '@/mixins/stringFilters'
import apiHandler from '@/mixins/apiHandler'

import VideoList from '@/components/videos/VideoList'
import Loading from '@/components/parts/Loading'

export default {
  components: { Loading, VideoList },
  
  mixins: [stringFilters, apiHandler],
  
  data: function () {
    return {
      livevideos: [],
      upcomingVideos: []
    }
  },

  computed: {
    showGrid: {
      get () { return this.$store.getters['config/getListMode'] },
      set (value) { this.$store.commit('config/setListMode', value) }
    },
  
    imageWidth: {
      get () { return this.$store.getters['config/getImageWidth'] },
      set (value) { this.$store.commit('config/setImageWidth', value) }
    }
  },

  created: async function() {
    await this.getDataFromApi()
  },

  methods: {
    screenWidth () {
      return window.parent.screen.width
    },

    async getDataFromApi () {
      this.apiHandler(async () => {
        const { data: { items: liveVideos }} = await this.$http.get(`videos`, {
          params: {
            type: 'live',
            sort: 'maxViewers',
            order: 'desc'
          }
        })

        const { data: { items: upcomingVideos }} = await this.$http.get(`videos`, {
          params: {
            type: 'upcoming',
            status: ['public', 'unlisted'],
            sort: 'startTime',
            order: 'asc',
            start: new Date(),
            end: this.formatDatetime(dateFns.addHours(new Date(), 2), 'yyyy-MM-dd HH:mm:ss') // 二時間後
          }
        })
        
        this.livevideos = liveVideos
        this.upcomingVideos = upcomingVideos
      })
    }
  }
}
</script>
