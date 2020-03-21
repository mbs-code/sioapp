<template lang="pug">
  v-container(fluid)
    //- header
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        span.body-2.grey--text.text--darken-1 {{ fetchDate | formatDatetime }}取得 - {{ requestTime / 1000 | formatNumber(2) }}秒

      v-spacer

      //- v-col(cols='auto')
      //-   v-pagination(v-model='search.page' :length='totalPages' total-visible='7' @input='onSearch')

      v-col(cols='auto')
        //- 色合いが微妙なので css で弄る (v-item--active)
        v-btn-toggle.extend(v-model='search.grid' dense color='primary' @change='writeUrlQuery(search)')
          v-btn(icon elevation='2')
            v-icon(small) mdi-view-list
          v-btn(icon elevation='2')
            v-icon(small) mdi-view-grid

    div
      p 配信中
      VideoList(:videos='livevideos' :showGrid='search.grid === 1' :imageWidth='200')

    div
      p 直近
      VideoList(:videos='upcomingVideos' :showGrid='search.grid === 1' :imageWidth='200')
  
    Loading(:show='showLoading')
</template>

<script>
import * as dateFns from 'date-fns'
import stringFilters from '@/mixins/stringFilters'
import htmlHistory from '@/mixins/htmlHistory'

import VideoList from '@/components/videos/VideoList'
import Loading from '@/components/parts/Loading'

export default {
  components: { Loading, VideoList },
  
  mixins: [stringFilters, htmlHistory],
  
  data: function () {
    return {
      search: {
        grid: 0 // 0:list, 1:grid
      },
      livevideos: [],
      upcomingVideos: [],
      requestTime: 0, // 実処理時間
      fetchDate: {}, // 取得した日時
      showLoading: true // loading flag
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

        // const { data: { items: recentVideos }} = await this.$http.get(`videos`, {
        //   params: {
        //     type: ['video', 'archive'],
        //     sort: 'maxViewers',
        //     order: 'esc',
        //     start: this.formatLocalDatetime(dateFns.subHours(new Date(), 6), 'yyyy-MM-dd HH:mm:ss'),
        //     end: this.formatLocalDatetime(new Date())
        //   }
        // })
        

        this.livevideos = liveVideos
        this.upcomingVideos = upcomingVideos

        this.requestTime = new Date() - ts
        this.fetchDate = ts
      } catch (err) {
        this.$toast.error(err)
        console.error(err)
      } finally {
        this.showLoading = false
      }
    }
  }
}
</script>
