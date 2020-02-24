<template lang='pug'>
  div
    //- search panel
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col.mx-2(cols='auto')
        v-text-field(label='search' v-model='search.text' @change='onSearch')

      v-col.mx-2(cols='auto')
        v-btn-toggle(v-model='search.type' color='primary' dense multiple @change='onSearch')
          v-btn(value='video' elevation='2') 動画
          v-btn(value='upcoming' elevation='2') 予約
          v-btn(value='live' elevation='2') 配信中
          v-btn(value='archive' elevation='2') アーカイブ
      
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
        v-pagination(v-model='page' :length='totalPages' total-visible='7' @input='onSearch')

      v-col(cols='auto')
        //- 色合いが微妙なので css で弄る (v-item--active)
        v-btn-toggle.extend(v-model='listMode' dense color='primary')
          v-btn(color='white' elevation='2')
            v-icon(small) mdi-view-grid
          v-btn(color='white' elevation='2')
            v-icon(small) mdi-view-list

    //- main
    VideoList(:videos='videos' :showGrid='listMode === 0' :imageWidth='320')

    //- footer
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        v-pagination(v-model='page' :length='totalPages' total-visible='7' @input='onSearch')

    Loading(:show='showLoading')
</template>

<script>
import stringFilters from '../../mixins/stringFilters'

import VideoList from '../../components/VideoList'
import Loading from '../../components/parts/Loading'

export default {
  components: { Loading, VideoList },

  mixins: [stringFilters],

  data: function() {
    return {
      search: {
        text: '',
        type: [],
        status: []
      },
      showLoading: true, // loading flag
      listMode: 1, // 0: grid, 1:list
      videos: [],
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
        const { data } = await this.$http.get('videos', {
          params: {
            text: this.search.text,
            type: this.search.type,
            status: this.search.status,
            page: this.page,
            sort: 'startTime',
            order: 'desc'
          }
        })

        this.videos = data.items
        // this.page = Number(data.page)
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