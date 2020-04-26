<route-meta>
  { "requiresAuth": true }
</route-meta>

<template lang="pug">
  v-container
    v-row.ma-n2
      v-col.col-12
        v-card
          v-card-title
            v-icon.mr-2 mdi-server
            | Server Status
            v-spacer
            v-tooltip(bottom)
              template(v-slot:activator='{ on }')
                v-btn(icon @click='onSave' v-on='on')
                  v-icon mdi-floppy
              span Save Image (実験的)

          v-card-text
            v-simple-table
              tbody
                  tr
                    td.fix-width
                      v-icon.mr-2 mdi-tag-outline
                      | name
                    td.font-weight-bold {{ dbName }}

                  tr
                    td.fix-width
                      v-icon.mr-2 mdi-table
                      | size
                    td
                      span.red--text {{ dbLength | SIFormat }}
                      |  ({{ dbLength | formatNumber }} byte)

                  tr
                    td.fix-width
                      v-icon.mr-2 mdi-database
                      | count
                    td {{ tables.length | formatNumber }}

                  tr
                    td.fix-width
                      v-icon.mr-2 mdi-update
                      | request time
                    td {{ requestTime / 1000 | formatNumber(2) }} sec

                  tr
                    td.fix-width
                      v-icon.mr-2 mdi-clock-outline
                      | fetch time
                    td {{ fetchDate | formatDatetime }}

            div ※ 1日程度の誤差があります.

      v-col.col-12
        v-divider

      template(v-for='(table, key) in sortTables' :keys='key')
        v-col.col-12.col-lg-4
          v-card
            v-card-title
              v-icon.mr-2 mdi-database
              | {{ table.name }}
            v-card-text
              v-simple-table(dense)
                tbody
                  tr
                    td
                      v-icon.mr-2 mdi-table
                      | size
                    td 
                      span.red--text {{ table.length | SIFormat }}
                      |  ({{ table.length | formatNumber }} byte)

                  tr
                    td
                      v-icon.ml-4.mr-2 mdi-circle-medium
                      | index
                    td {{ table.indexLength | SIFormat }} ({{ table.indexLength | formatNumber }} byte)
                    
                  tr
                    td
                      v-icon.ml-4.mr-2 mdi-circle-medium
                      | data
                    td {{ table.dataLength | SIFormat }} ({{ table.dataLength | formatNumber }} byte)

                  tr
                    td
                      v-icon.ml-4.mr-2 mdi-circle-medium
                      | row_ave
                    td {{ table.dataLength / table.rows | SIFormat }} ({{ table.dataLength / table.rows | formatNumber }} byte)
                  tr
                    td
                      v-icon.mr-2 mdi-table-row
                      | rows
                    td {{ table.rows | formatNumber }}

                  tr
                    td
                      v-icon.mr-2 mdi-counter
                      | increment
                    td {{ table.autoIncrement | formatNumber }}


    Loading(:show='showLoading')

</template>

<script>
import humanFormat from 'human-format'
import html2canvas from 'html2canvas'
import delay from 'delay'
import stringFilters from '@/mixins/stringFilters'
import apiHandler from '@/mixins/apiHandler'

import ChannelList from '@/components/channels/ChannelList'
import Loading from '@/components/parts/Loading'

export default {
  components: { ChannelList, Loading },

  mixins: [stringFilters, apiHandler],

  data: function () {
    return {
      dbName: '',
      dbLength: 0,
      tables: []
    }
  },
  
  computed: {
    sortTables () {
      const keys = ['channels', 'channel_stats', 'channel_records',
        'videos', 'video_stats', 'video_records', 'apps']
      const tables = this.tables
      return keys.map(key => {
        return tables.find(e => e.name == key) || {}
      })
    }
  },

  filters: {
    SIFormat (val) {
      const num = Number(val || 0)
      return humanFormat(num, { decimals: 1, unit: 'B' })
    }
  },

  created: async function() {
    await this.getDataFromApi()
  },

  methods: {
    async onSave () {
      await delay(1000) // ボタンが落ち着くまで待つ

      const dom = document.querySelector('main') // .container にしたいけど表示がバグる
      const canvas = await html2canvas(dom)
      const url = canvas.toDataURL('image/png')
      
      const date = this.formatDatetime(this.fetchDate, 'yyyyMMddHHmmss')
      const title = `status_${this.dbName}_${date}.png`

      const a = document.createElement('a')
      a.href = url
      a.setAttribute('download', title)
      a.click()
    },

    async getDataFromApi () {
      this.apiHandler(async () => {
        const { data: { name, length, tables }} = await this.$http.get(`admin/status`)
        
        this.dbName = name
        this.dbLength = length
        this.tables = tables
      })
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 1264px) { // lg
  td.fix-width {
    width: 200px;
  }
}
</style>
