<route-meta>
  { "requiresAuth": true }
</route-meta>

<template lang="pug">
  v-container
    v-row.ma-n2
      v-col(cols='12')
        v-card(color='blue lighten-5')
          v-card-title TRACE LOG
          v-card-text
            p.text--primary(style="white-space:pre-wrap;" v-text='traceLog')
      v-col(cols='12')
        v-card(color='red lighten-5')
          v-card-title ERROR LOG
          v-card-text
            p.text--primary(style="white-space:pre-wrap;" v-text='errorLog')

</template>

<script>
import apiHandler from '@/mixins/apiHandler'

export default {
  mixins: [apiHandler],

  data: function () {
    return {
      traceLog: '',
      errorLog: ''
    }
  },

  created: async function() {
    await this.getDataFromApi()
  },

  methods: {
    // API を叩いてデータを取ってくる
    async getDataFromApi() {
      this.apiHandler(async () => {
        // get
        const { data: traceLog } = await this.$http.get('admin/logs', {
          params: { type: 'trace', line: 30 }
        })
        const { data: errorLog } = await this.$http.get('admin/logs', {
          params: { type: 'error', line: 30 }
        })

        this.traceLog = traceLog
        this.errorLog = errorLog
      })
    }
  }
}
</script>
