<template lang='pug'>
  v-container(fluid)
    //- search panel
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col.mx-2(cols='auto')
        v-text-field(label='search' v-model='queries.text' @change='onSearch')

      v-col.mx-2(cols='auto')
        v-checkbox(v-model='queries.fulltext' label='全文検索' @change='onSearch')

      v-col.mx-2(cols='auto')
        v-btn-toggle(v-model='queries.type' color='primary' dense multiple @change='onSearch')
          v-btn(value='upcoming' elevation='2') 予約
          v-btn(value='live' elevation='2') 配信中
          v-btn(value='archive' elevation='2') アーカイブ
          v-btn(value='video' elevation='2') 動画
          v-btn(value='premiere' elevation='2') プレミア動画
      
      v-col.mx-2(cols='auto')
        v-btn-toggle(v-model='queries.status' color='primary' dense multiple @change='onSearch')
          v-btn(value='public' elevation='2') 公開
          v-btn(value='unlisted' elevation='2') 限定公開
          v-btn(value='private' elevation='2') 非公開

      v-col.mx-2(cols='auto')
        v-btn(@click='onSearch') q

    //- header
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        span.body-2.grey--text.text--darken-1 {{ totalLength | formatNumber }}件 {{ requestTime / 1000 | formatNumber(2) }}秒

      v-spacer

      v-col(cols='auto')
        v-pagination(v-model='queries.page' :length='totalPages' total-visible='7' @input='onSearch')

      v-col(cols='auto')
        p-toggle-listmode-btn(v-model='showGrid')

    //- main
    VideoList(:videos='videos' :showGrid="showGrid === 'grid'" :imageWidth='imageWidth')

    //- footer
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        v-pagination(v-model='queries.page' :length='totalPages' total-visible='7' @input='onSearch')

    Loading(:show='showLoading')
</template>

<script>
import stringFilters from '@/mixins/stringFilters'
import apiHandler from '@/mixins/apiHandler'
import htmlHistory from '@/mixins/htmlHistory'

import VideoList from '@/components/videos/VideoList'
import Loading from '@/components/parts/Loading'

import PToggleListmodeBtn from '@/components/parts/PToggleListmodeBtn'

export default {
  components: { Loading, VideoList, PToggleListmodeBtn },

  mixins: [stringFilters, apiHandler, htmlHistory],

  data: function() {
    return {
      queries: {
        page: 1,
        type: [],
        status: [],
        text: '',
        fulltext: false
      },
      videos: [],
      totalPages: 0, // 全ページ数
      totalLength: 0 // 全件数
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

  methods: {
    async init () {
      this.loadUrlQuery()
      await this.getDataFromApi()
      // アクセス時に url の正規化を行いたい場合, コメントアウト
      // this.writeUrlQuery(true)
    },

    // 検索実行
    async onSearch() {
      await this.getDataFromApi()
      this.writeUrlQuery()
    },

    // API を叩いてデータを取ってくる
    async getDataFromApi() {
      this.apiHandler(async () => {
        const q = this.queries
        const { data: { items, page, totalPages, totalLength } } = await this.$http.get('videos', {
          params: {
            text: q.text,
            type: q.type,
            status: q.status,
            page: q.page,
            fulltext: q.fulltext,
            sort: 'startTime',
            order: 'desc'
          }
        })

        this.videos = items
        this.totalPages = totalPages
        this.totalLength = totalLength

        this.$set(this.queries, 'page', Number(page))
      })
    }
  }
}
</script>
