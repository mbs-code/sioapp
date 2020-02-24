<template lang="pug">
  v-overlay(:value='show')
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
    }
  }
}
</script>
