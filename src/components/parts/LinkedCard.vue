<template lang="pug">
  v-hover(v-slot:default='{ hover }')
    v-card(
      @click.stop.self
      :elevation='hasLink && hover ? 12 : elevation'
      :to='to'
      :href='href'
      :target='target'
    )
      slot

</template>

<script>
import linkable from '@/mixins/linkable'

export default {
  mixins: [linkable],

  props: {
    bind: {
      type: Object,
      default: () => {}
    },
    elevation: {
      type: [Number, String],
      default: () => 0
    }
  }
}
</script>
