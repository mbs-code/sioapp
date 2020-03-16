<template lang="pug">
  v-simple-table(v-if='video')
    template(v-slot:default)
      thead
        tr
          th.text-left key
          th.text-left value

      tbody
        tr
          td 動画ID
          td {{ video.key }}
        tr
          td 開始時刻
          td {{ video.startTime | formatDatetimeHumanize }}
        tr
          td 終了時刻
          td {{ video.endTime | formatDatetimeHumanize }}
        tr
          td タグ
          td(style='max-width: 0') {{ video.tags | arrayDump }}
        tr
          td 予定された開始時刻
          td {{ video.scheduledStartTime | formatDatetimeHumanize }}
        tr
          td 予定された終了時刻
          td {{ video.scheduledEndTime | formatDatetimeHumanize }}
        tr
          td 実際の開始時刻
          td {{ video.actualStartTime | formatDatetimeHumanize }}
        tr
          td 実際の終了時刻
          td {{ video.actualEndTime | formatDatetimeHumanize }}
        tr
          td 公開日時
          td {{ video.publishedAt | formatDatetimeHumanize }}
        tr
          td DB登録日
          td {{ video.createdAt | formatDatetimeHumanize }}
        tr
          td DB最終更新日
          td {{ video.updatedAt | formatDatetimeHumanize }}
</template>

<script>
import stringFilters from '@/mixins/stringFilters'

export default {
  mixins: [stringFilters],
 
  props: {
    video: {
      type: Object,
      default: () => {}
    }
  },

  filters: {
    arrayDump (vals) {
      if (vals && Array.isArray(vals) && vals.length > 0) {
        return vals.join(', ')
      }
      return '-'
    }
  }
}
</script>