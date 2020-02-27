<template lang="pug">
  v-card
    div(v-if='stats && stats.length > 0')
      v-apexchart(width='500' height='200' type='line' :options='subsOptions' :series='subsSeries')
      v-apexchart(width='500' height='200' type='line' :options='viewOptions' :series='viewSeries')
      v-apexchart(width='500' height='200' type='line' :options='videoOptions' :series='videoSeries')
</template>

<script>
import stringFilters from '../mixins/stringFilters'
export default {

  mixins: [stringFilters],

  props: {
    stats: {
      type: Array,
      default: () => []
    },
  },

  computed: {
    subscribers() {
      return this.stats.map(e => e.subscriber) || []
    },
    views() {
      return this.stats.map(e => e.view) || []
    },
    videos() {
      return this.stats.map(e => e.video) || []
    },

    subsOptions() {
      return {
        chart: {
          id: 'subscriber',
          group: 'channel-stat',
          type: 'line'
        },
        colors: ['#008FFB'],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'yyyy/MM/dd hh時'
          }
        }
      }
    },

    viewOptions() {
      return {
        chart: {
          id: 'view',
          group: 'channel-stat',
          type: 'line'
        },
        colors: ['#00E396'],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'yyyy/MM/dd hh時'
          }
        }
      }
    },

    videoOptions() {
      return {
        chart: {
          id: 'video',
          group: 'channel-stat',
          type: 'line'
        },
        colors: ['#546E7A'],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'yyyy/MM/dd hh時'
          }
        }
      }
    },

    subsSeries() {
      return [{
        name: '登録者',
        data: this.stats.map(e => {
          return [
            new Date(e.createdAt).getTime(),
            e.subscriber
          ]
        })
      }]
    },

    viewSeries() {
      return [{
        name: '再生数',
        data: this.stats.map(e => {
          return [
            new Date(e.createdAt).getTime(),
            e.view
          ]
        })
      }]
    },

    videoSeries() {
      return [{
        name: '動画数',
        data: this.stats.map(e => {
          return [
            new Date(e.createdAt).getTime(),
            e.video
          ]
        })
      }]
    }
  },

  // data: function () {
  //   return {
  //     // options: {
  //     //   chart: {
  //     //     id: 'vuechart-example'
  //     //   },
  //     //   xaxis: {
  //     //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  //     //   }
  //     // },
  //     series: [{
  //       name: 'series-1',
  //       data: [30, 40, 45, 50, 49, 60, 70, 91]
  //     },{
  //       name: 'series-1',
  //       data: [30, 40, 45, 50, 49, 60, 70, 91]
  //     }]
  //   }
  // }
}
</script>