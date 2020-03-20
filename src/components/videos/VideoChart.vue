<template lang="pug">
  v-row(no-gutters v-if='stats && stats.length > 0')
    template(v-for='(chart, key) in charts' :keys='key')
      v-col(cols='12' lg='6')
        v-apexchart(
          width='100%'
          height='200'
          type='line'
          :options='baseOptions(chart.name, chart.color)'
          :series='baseSeries(chart.name, chart.parser)'
        )

</template>

<script>
import { addHours } from 'date-fns'
import humanFormat from 'human-format'
import stringFilters from '@/mixins/stringFilters'
export default {

  mixins: [stringFilters],

  props: {
    stats: {
      type: Array,
      default: () => []
    },
    showCV: {
      type: Boolean,
      default: () => false
    }
  },

  computed: {
    charts: function () {
      const charts = [
        { name: '再生数', color: '#00E396', parser: (item) => item['view'] },
        { name: '高評価数', color: '#F44336', parser: (item) => item['like'] },
        { name: '低評価数', color: '#4336f4', parser: (item) => item['dislike'] },
        { name: '高評価率', color: '#9C27B0', parser: (item) => {
          let goodRate = (item.like / (item.like + item.dislike)) * 100
          if (item.like === 0) goodRate = 0
          if (item.dislike === 0) goodRate = 100
          return goodRate
        }}
      ]

      if (this.showCV) {
        charts.unshift({ name: '同時接続数', color: '#008FFB', parser: (item) => item['concurrentViewers'] })
      }
      return charts
    }
  },

  methods: {
    baseSeries(title, parser) {
      return [{
        name: title,
        data: this.stats.map(e => {
          const jst = addHours(new Date(e.createdAt), 9)
          return [
            jst.getTime(),
            parser(e)
          ]
        })
      }]
    },
  
    baseOptions(title, color) {
      return {
        title: {
          text: title,
          offsetX: 20
        },
        chart: {
          id: 'videoStat',
          group: 'videoStat',
          toolbar: {
            tools: {
              pan: false,
              zoomin: false,
              zoomout: false,
              download: false
            }
          }
        },
        colors: [color],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'M/d H:mm'
          }
        },
        yaxis: {
          labels: {
            minWidth: 60,
            formatter: (val) => humanFormat(val, { decimals: 1 })
          }
        },
        tooltip: {
          x: {
            show: false,
            format: 'M/d H:mm'
          },
          y: {
            formatter: (val) => val.toLocaleString()
          }
        }
      }
    }
  }
}
</script>