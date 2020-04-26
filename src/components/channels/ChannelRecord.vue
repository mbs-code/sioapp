<template lang="pug">
  v-dialog(v-model='show' scrollable @click:outside='onClose')
    v-card(v-if='records')
      v-card-title 変更履歴
      v-card-text
        template(v-for='(record, key) in formatRecords' :keys='key')
          div.mb-12
            div {{ record.createdAt | formatDatetime }}
            v-simple-table(dense)
              tbody
                template(v-for='(item, key) in record.json' :keys='key')
                  tr
                    th(width='120') {{ key }}
                    td {{ item.type }}
                    template(v-if='item.type === "date"')
                      td {{ item.old | formatDatetime }}
                      td {{ item.new | formatDatetime }}
                    template(v-else-if='item.type === "duration"')
                      td {{ item.old | formatDuration }}
                      td {{ item.new | formatDuration }}
                    template(v-else)
                      td {{ item.old }}
                      td {{ item.new }}
          
</template>

<script>
import validator from 'validator'
import apiHandler from '@/mixins/apiHandler'
import stringFilters from '@/mixins/stringFilters'

export default {
  mixins: [apiHandler, stringFilters],

  props: {
    channel: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      records: []
    }
  },

  computed: {
    formatRecords () {
      return this.records.map(record => {
        // record の json を 配列から json にしておく
        Object.keys(record.json).forEach(function (key) {
          const ary = record.json[key]
          const old = String(ary[0])
          const now = String(ary[1])

          let type = 'default'
          if (Array.isArray(old) || Array.isArray(now)) {
            type = 'array'
          } else if (validator.isISO8601(old) || validator.isISO8601(now)) {
              if (validator.isDecimal(old) || validator.isDecimal(now)) {
                type = 'duration'
              } else {
                type = 'date'
              }
          }

          record.json[key] = { type: type, old: ary[0], new: ary[1] }
        })
        return record
      })
    }
  },

  watch: {
    show (val) {
      if (val && this.records.length === 0) {
        this.getDataFromApi()
      }
    }
  },

  methods: {
    onClose () {
      this.$emit('onClose')
    },

    async getDataFromApi () {
      this.apiHandler(async () => {
        const id = this.channel.id
        const { data } = await this.$http.get(`channels/${id}/records`)

        this.records = data || []
      })
    }
  }
}
</script>
