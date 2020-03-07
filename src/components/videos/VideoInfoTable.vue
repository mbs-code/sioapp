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
  }
}
</script>