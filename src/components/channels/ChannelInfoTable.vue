<template lang="pug">
  v-simple-table(v-if='channel')
    template(v-slot:default)
      thead
        tr
          th.text-left key
          th.text-left value

      tbody
        tr
          td チャンネルID
          td {{ channel.key }}
        tr
          td DB登録日
          td {{ channel.createdAt | formatDatetimeHumanize }}
        tr
          td DB最終更新日
          td {{ channel.updatedAt | formatDatetimeHumanize }}
</template>

<script>
import stringFilters from '@/mixins/stringFilters'

export default {
  mixins: [stringFilters],
 
  props: {
    channel: {
      type: Object,
      default: () => {}
    }
  }
}
</script>