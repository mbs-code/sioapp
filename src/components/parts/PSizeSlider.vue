<template lang="pug">
  //- @required v-model
  v-tooltip(bottom)
    template(v-slot:activator='{ on }')
      div(v-on='on')
        v-slider(
          v-bind='$attrs'
          v-on='$listeners'
          :min='min'
          :max='max'
          prepend-icon='mdi-arrow-expand-all'
          hideDetails
          v-resize='onResize'
        )
    span サイズ変更

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
