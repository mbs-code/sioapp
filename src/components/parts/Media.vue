<template lang="pug">
  v-hover(v-slot:default='{ hover }')
    v-card(
      @click.stop.self
      :elevation='hasLink && hover ? 12 : 0'
      :to='to'
      :href='href'
      :target='target'
    )
      v-list-item
        v-list-item-avatar
          v-img(:src='image')
        v-list-item-content
          v-list-item-title {{ text }}

</template>

<script>
import linkable from '@/mixins/linkable'

export default {
  mixins: [linkable],

  props: {
    image: {
      type: String,
      default: () => ''
    },
    text: {
      type: String,
      default: () => ''
    }
  }
}
</script>
