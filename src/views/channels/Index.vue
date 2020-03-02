<template lang='pug'>
  div
    //- search panel
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col.mx-2(cols='auto')
        v-text-field(label='search' v-model='search.text' @change='onSearch')

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
          v-btn(color='white' elevation='2')
            v-icon(small) mdi-view-grid
          v-btn(color='white' elevation='2')
            v-icon(small) mdi-view-list

    //- main
    ChannelList(:channels='channels' :showGrid='search.grid === 1' :imageWidth='200')

    //- footer
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        v-pagination(v-model='search.page' :length='totalPages' total-visible='7' @input='onSearch')

    Loading(:show='showLoading')
</template>

<script>
import stringFilters from '@/mixins/stringFilters'
import htmlHistory from '@/mixins/htmlHistory'

import ChannelList from '@/components/channels/ChannelList'
import Loading from '@/components/parts/Loading'

export default {
  components: { Loading, ChannelList },

  mixins: [stringFilters, htmlHistory],

  data: function () {
    return {
      search: {
        page: 1,
        text: '',
        grid: 0 // 0:list, 1:grid
      },
      channels: [],
      requestTime: 0, // 実処理時間
      totalPages: 0, // 全ページ数
      totalLength: 0, // 全件数
      showLoading: true // loading flag
    };
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
      const ts = new Date()
      this.showLoading = true

      try {
        const { data } = await this.$http.get('channels', {
          params: {
            text: this.search.text,
            page: this.search.page,
            sort: 'publishedAt',
            order: 'asc'
          }
        })

        this.channels = data.items
        this.page = Number(data.page)
        this.totalPages = data.totalPages
        this.totalLength = data.totalLength
        this.requestTime = new Date() - ts
      } catch (err) {
        this.$toast.error(err)
      } finally {
        this.showLoading = false
      }
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