<template lang="pug">
  v-container(fluid)
    //- header
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        span.body-2.grey--text.text--darken-1
          | {{ fetchDate | formatDatetime }}取得 - {{ requestTime / 1000 | formatNumber(2) }}秒

      v-spacer

      v-col(cols='6')
        v-tooltip(bottom label='サイズ変更')
          p-size-slider(v-model='imageWidth' prependIcon='mdi-arrow-expand-all')
      v-col(cols='auto')
        v-tooltip(bottom label='自動更新：3分')
          p-event-switch(v-model='autoFetch' seconds='180' prependIcon='mdi-autorenew' color='primary' @timer='getDataFromApi')

      v-col(cols='auto')
        v-tooltip(bottom label='更新')
          v-btn(@click='getDataFromApi')
            v-icon mdi-autorenew

      v-col(cols='auto')
        p-toggle-listmode-btn(v-model='showGrid')

    //- main
    div.ma-2
      div.headline
        | 配信中
        span.body-1.ml-2 (5分おきに更新)
      v-row.fill-height.flex-nowrap(no-gutters)
        v-col.flex-grow-0.my-1.mr-3
          v-sheet.fill-height(width=8 color='red') 
        v-col.flex-grow-1
          VideoList(:videos='livevideos' :showGrid="showGrid === 'grid'" :imageWidth='imageWidth')

    v-divider.my-4

    div.ma-2
      div.headline
        | 直近の配信予定
        span.body-1.ml-2 (5, 20, 35, 50分に更新)
      v-row.fill-height.flex-nowrap(no-gutters)
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
import PEventSwitch from '@/components/parts/PEventSwitch'
import PSizeSlider from '@/components/parts/PSizeSlider'
import PToggleListmodeBtn from '@/components/parts/PToggleListmodeBtn'
import VTooltip from '@/components/parts/VTooltip'

export default {
  components: { Loading, VideoList, PEventSwitch, PSizeSlider, PToggleListmodeBtn, VTooltip },
  
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
    autoFetch: {
      get () { return this.$store.getters['config/getAutoFetch'] },
      set (value) { this.$store.commit('config/setAutoFetch', value) }
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
