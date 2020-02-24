<template lang="pug">
  v-hover(v-slot:default='{ hover }')
    v-card(
      @click.stop.self
      :elevation='hasLink && hover ? 12 : 0'
      :to='to'
      :href='href'
      :target='target'
      tile
    )
      slot

</template>

<script>
import linkable from '../../mixins/linkable'

export default {
  mixins: [linkable],

  props: {
    bind: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
