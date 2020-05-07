<template lang="pug">
  v-tooltip(v-bind='$attrs' v-on='$listeners')
    template(v-slot:activator='{ on }')
      //- ダミー div
      div.dummy(v-on='on')
        slot
    span(v-if='label') {{ label }}

</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
div.dummy {
  all: inherit;
}
</style>
