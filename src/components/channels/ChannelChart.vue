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
        { name: '登録者数', color: '#008FFB', parser: (item) => item['subscriber'] },
        { name: '再生数', color: '#00E396', parser: (item) => item['view']},
        { name: '動画数', color: '#546E7A', parser: (item) => item['video'] }
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
          id: 'channelStat',
          group: 'channelStat',
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
            format: 'MM/dd hh:mm'
          }
        },
        yaxis: {
          labels: {
            minWidth: 60,
            formatter: (val) => val >= 10000 ? humanFormat(val, { decimals: 1 }) : val
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