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
        v-pagination(v-model='page' :length='totalPages' total-visible='7' @input='onSearch')

      v-col(cols='auto')
        //- 色合いが微妙なので css で弄る (v-item--active)
        v-btn-toggle.extend(v-model='listMode' dense color='primary')
          v-btn(color='white' elevation='2')
            v-icon(small) mdi-view-grid
          v-btn(color='white' elevation='2')
            v-icon(small) mdi-view-list

    //- main
    ChannelList(:channels='channels' :showGrid='listMode === 0' :imageWidth='200')

    //- footer
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        v-pagination(v-model='page' :length='totalPages' total-visible='7' @input='onSearch')

    Loading(:show='showLoading')
</template>

<script>
import stringFilters from '../../mixins/stringFilters'

import ChannelList from '../../components/ChannelList'
import Loading from '../../components/parts/Loading'

export default {
  components: { Loading, ChannelList },

  mixins: [stringFilters],

  data: function () {
    return {
      search: {
        text: ''
      },
      showLoading: true, // loading flag
      listMode: 1, // 0: grid, 1:list
      channels: [],
      page: 1, // 表示しているページ番号
      requestTime: 0, // 実処理時間
      totalPages: 0, // 全ページ数
      totalLength: 0 // 全件数
    };
  },

  created: async function() {
    await this.getDataFromApi()
  },

  methods: {
    onSearch() {
      this.getDataFromApi()
    },

    async getDataFromApi() {
      const ts = new Date()
      this.showLoading = true

      try {
        const { data } = await this.$http.get('channels', {
          params: {
            text: this.search.text,
            type: this.search.type,
            status: this.search.status,
            page: this.page,
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