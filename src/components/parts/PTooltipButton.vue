<template lang="pug">
  v-tooltip(bottom)
    template(v-slot:activator='{ on }')
      v-btn.white(elevation='2' v-on='{ ...on, ...$listeners }')
        v-icon(small) {{ icon }}
    span {{ label }}

</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
