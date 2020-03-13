<template lang="pug">
  div(v-if='stats && stats.length > 0')
    template(v-for='(chart, key) in charts' :keys='key')
      v-apexchart(
        width='100%'
        height='200'
        type='line'
        :options='baseOptions(chart.name, chart.color)'
        :series='baseSeries(chart.name, chart.parser)'
      )

</template>

<script>
import humanFormat from 'human-format'
import stringFilters from '@/mixins/stringFilters'
export default {

  mixins: [stringFilters],

  props: {
    stats: {
      type: Array,
      default: () => []
    },
  },

  data: function () {
    return {
      charts: [
        { name: '同時接続数', color: '#008FFB', parser: (item) => item['concurrentViewers'] },
        { name: '再生数', color: '#00E396', parser: (item) => item['view'] },
        { name: '高評価数', color: '#F44336', parser: (item) => item['like'] },
        { name: '高評価率', color: '#9C27B0', parser: (item) => {
          let goodRate = (item.like / (item.like + item.dislike)) * 100
          if (item.like === 0) goodRate = 0
          if (item.dislike === 0) goodRate = 100
          return goodRate
        }},
      ]
    }
  },

  methods: {
    baseSeries(title, parser) {
      return [{
        name: title,
        data: this.stats.map(e => {
          return [
            new Date(e.createdAt).getTime(),
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
          labels: {
            formatter: (val) => this.formatDatetime(val, 'M/d HH:mm')
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
            format: 'MM/dd hh:mm'
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