<template lang="pug">
  v-card
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
            td チャンネルID
            td {{ channel.key }}
</template>

<script>
export default {
  props: {
    channel: {
      type: Object,
      default: () => {}
    },
  },
}
</script>