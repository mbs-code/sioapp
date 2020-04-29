<template lang="pug">
  v-overlay(:value='show' :absolute='absolute')
    div.text-center
      v-progress-circular(
        indeterminate
        size=100
        width=10
        color='white'
      )

</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: true
    }
  }
}
</script>
