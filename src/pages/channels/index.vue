<template lang='pug'>
  v-container(fluid)
    //- search panel
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col.mx-2(cols='auto')
        v-text-field(label='search' v-model='queries.text' @change='onSearch')

      v-col.mx-2(cols='auto')
        v-checkbox(v-model='queries.fulltext' label='全文検索' @change='writeUrlQuery(search)')

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
        //- 色合いが微妙なので css で弄る (v-item--active)
        v-btn-toggle.extend(v-model='queries.grid' dense color='primary' @change='writeUrlQuery(search)')
          v-btn(icon elevation='2')
            v-icon(small) mdi-view-list
          v-btn(icon elevation='2')
            v-icon(small) mdi-view-grid

    //- main
    ChannelList(:channels='channels' :showGrid='queries.grid === 1' :imageWidth='200')

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

import ChannelList from '@/components/channels/ChannelList'
import Loading from '@/components/parts/Loading'

export default {
  components: { Loading, ChannelList },

  mixins: [stringFilters, apiHandler, htmlHistory],

  data: function () {
    return {
      queries: {
        page: 1,
        text: '',
        fulltext: false,
        grid: 0 // 0:list, 1:grid
      },
      channels: [],
      totalPages: 0, // 全ページ数
      totalLength: 0 // 全件数
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
        const { data: { items, page, totalPages, totalLength } } = await this.$http.get('channels', {
          params: {
            text: q.text,
            page: q.page,
            fulltext: q.fulltext,
            sort: 'publishedAt',
            order: 'asc'
          }
        })

        this.channels = items
        this.totalPages = totalPages
        this.totalLength = totalLength

        this.$set(this.queries, 'page', Number(page))
      })
    }
  }
}
</script>
