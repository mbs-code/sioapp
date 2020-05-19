<template lang="pug">
  v-overlay.area-margin(:value='show')
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

<style lang="scss">
.area-margin {
  margin-left: 56px;
  margin-top: 48px;
}
</style>