<template lang='pug'>
  div
  
    //- header
    v-row.mx-2(no-gutters align='center' justify='center')
      v-col(cols='auto')
        span.body-2.grey--text.text--darken-1 {{ totalLength | formatNumber }}件 {{ requestTime / 1000 | formatNumber(2) }}秒

      v-spacer

      v-col(cols='auto')
        v-pagination(v-model='page' :length='totalPages' total-visible='7' @input='onSearch')

    //- main
    VideoList(:videos='videos' :showGrid='listMode === 0' :imageWidth='320')

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

      try {
        const { data } = await this.$http.get('videos', {
          params: {
            page: this.page,
            sort: 'startTime',
            order: 'desc',
            type: 'archive'
          }
        })

        this.videos = data.items
        // this.page = Number(data.page)
        this.totalPages = data.totalPages
        this.totalLength = data.totalLength
        this.requestTime = new Date() - ts
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>