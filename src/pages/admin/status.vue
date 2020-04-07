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
            v-btn(icon @click='onSave')
              v-icon mdi-floppy

          v-card-text
            v-simple-table
              tbody
                  tr
                    td.fix-width
                      v-icon.mr-2 mdi-clock-outline
                      | fetch time
                    td {{ fetchDate | formatDatetime }}

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
import stringFilters from '@/mixins/stringFilters'

import ChannelList from '@/components/channels/ChannelList'
import Loading from '@/components/parts/Loading'

export default {
  components: { ChannelList, Loading },

  mixins: [stringFilters],

  data: function () {
    return {
      dbName: '',
      dbLength: 0,
      tables: [],

      fetchDate: {},
      requestTime: 0
    }
  },
  
  computed: {
    sortTables () {
      const keys = ['channels', 'channel_metas', 'channel_stats', 'videos', 'video_stats', 'video_metas']
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
    onSave () {
      
    },

    async getDataFromApi () {
      const ts = new Date()
      this.showLoading = true

      try {
        const { data: { name, length, tables }} = await this.$http.get(`admin/status`)

        this.dbName = name
        this.dbLength = length
        this.tables = tables

        this.requestTime = new Date() - ts
        this.fetchDate = ts
      } catch (err) {
        this.$toast.error(err)
      } finally {
        this.showLoading = false
      }
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
