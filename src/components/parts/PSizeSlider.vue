<template lang="pug">
  //- @required v-model
  v-slider(
    v-bind='$attrs'
    v-on='$listeners'
    :min='min'
    :max='max'
    hideDetails
    v-resize='onResize'
  )

</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    min: {
      type: Number,
      default: 220
    },
  },

  data: function () {
    return {
      max: 10000 // mounted 時に修正をかける
    }
  },

  async mounted () {
    await this.onResize()
  },

  methods: {
    onResize () {
      // DOM 描画待ち
      this.$nextTick(() => {
        const inner = window.innerWidth
        this.max = Math.max(this.min, inner) // min 以下は禁止
      })
    }
  }
}
</script>
