<template lang='pug'>
  v-container(fluid)
    //- search panel
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col.mx-2(cols='auto')
        v-text-field(label='search' v-model='search.text' @change='onSearch')

      v-col.mx-2(cols='auto')
        v-checkbox(v-model='search.fulltext' label='全文検索' @change='writeUrlQuery(search)')

      v-col.mx-2(cols='auto')
        v-btn-toggle(v-model='search.type' color='primary' dense multiple @change='onSearch')
          v-btn(value='upcoming' elevation='2') 予約
          v-btn(value='live' elevation='2') 配信中
          v-btn(value='archive' elevation='2') アーカイブ
          v-btn(value='video' elevation='2') 動画
          v-btn(value='premiere' elevation='2') プレミア動画
      
      v-col.mx-2(cols='auto')
        v-btn-toggle(v-model='search.status' color='primary' dense multiple @change='onSearch')
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
        v-pagination(v-model='search.page' :length='totalPages' total-visible='7' @input='onSearch')

      v-col(cols='auto')
        //- 色合いが微妙なので css で弄る (v-item--active)
        v-btn-toggle.extend(v-model='search.grid' dense color='primary' @change='writeUrlQuery(search)')
          v-btn(icon elevation='2')
            v-icon(small) mdi-view-list
          v-btn(icon elevation='2')
            v-icon(small) mdi-view-grid

    //- main
    VideoList(:videos='videos' :showGrid='search.grid === 1' :imageWidth='320')

    //- footer
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        v-pagination(v-model='search.page' :length='totalPages' total-visible='7' @input='onSearch')

    Loading(:show='showLoading')
</template>

<script>
import stringFilters from '@/mixins/stringFilters'
import apiHandler from '@/mixins/apiHandler'
import htmlHistory from '@/mixins/htmlHistory'

import VideoList from '@/components/videos/VideoList'
import Loading from '@/components/parts/Loading'

export default {
  components: { Loading, VideoList },

  mixins: [stringFilters, apiHandler, htmlHistory],

  data: function() {
    return {
      search: {
        page: 1,
        type: [],
        status: [],
        text: '',
        fulltext: false,
        grid: 0 // 0:list, 1:grid
      },
      videos: [],
      totalPages: 0, // 全ページ数
      totalLength: 0 // 全件数
    }
  },

  async beforeRouteUpdate (to, from, next) {
    await this.initPage()
    next()
  },

  created: async function() {
    await this.initPage()
  },

  methods: {
    // ページの初期化
    async initPage () {
      this.loadUrlQuery((params) => {
        this.search.page = Number(params.page) || 1
        this.search.text = params.text || undefined
        this.search.type = this.normalizeArray(params.type)
        this.search.status = this.normalizeArray(params.status)
        this.search.fulltext = Boolean(params.fulltext)
        this.search.grid = Number(params.grid) || 0
      })
      await this.getDataFromApi()
      this.writeUrlQuery(this.search)
    },

    // 検索実行
    onSearch() {
      this.getDataFromApi()
      this.writeUrlQuery(this.search)
    },

    // API を叩いてデータを取ってくる
    async getDataFromApi() {
      this.apiHandler(async () => {
        const { data: { items, page, totalPages, totalLength } } = await this.$http.get('videos', {
          params: {
            text: this.search.text,
            type: this.search.type,
            status: this.search.status,
            page: this.search.page,
            fulltext: this.search.fulltext,
            sort: 'startTime',
            order: 'desc'
          }
        })

        this.videos = items
        this.search.page = Number(page)
        this.totalPages = totalPages
        this.totalLength = totalLength
      })
    }
  }
}
</script>

<style scope lang='scss'>
// btn group の色を btn と同等にする修正
// color で濃いめを指定すること
.v-btn-toggle.extend .v-btn.v-item--active:before {
  opacity: 1 !important;
}
.v-btn-toggle.extend .v-btn.v-item--active i {
  color: white !important;
}
</style>