<template lang="pug">
  //- @required v-model
  v-sheet.pa-1(elevation='2')
    v-switch.extend(
      elevation='2'
      hideDetails
      v-bind='$attrs'
      v-on='$listeners'
      :inputValue='value'
      @change="$emit('input', $event)"
    )

</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    value: { // v-model 監視用
      type: Boolean,
      default: null
    },
    seconds: {
      type: [String, Number],
      default: 1,
      required: true
    }
  },

  data: function () {
    return {
      timerOn: false,
      timerObj: null
    }
  },

  watch: {
    value () {
      this.checkTimer()
    }
  },

  mounted () {
    // タイマーの初期化
    this.checkTimer()
  },

  beforeDestroy () {
    // タイマーを削除
    clearInterval(this.timerObj)
  },

  methods: {
    checkTimer () {
      const val = this.value
      if (val) {
        // true なら 新規タイマーを作成（念のため削除しておく）
        const seconds = Number(this.seconds) * 1000
        console.log(`auto update: ${seconds} sec.`)

        clearInterval(this.timerObj)
        this.timerObj = setInterval(() => { this.onFinish() }, seconds)
        this.timerOn = true
      } else {
        // false なら タイマーを削除
        clearInterval(this.timerObj)
        console.log('auto update: clear')

        this.timerObj = null
        this.timerOn = false
      }
    },

    // タイマー終了時の処理
    onFinish () {
      console.log('> on Finish!')
      this.$emit('timer')
    }
  }
}
</script>

<style lang="scss">
// スタイルを他のボタンなどと統一
.v-input.extend {
  margin: 0;
  padding-top: 2px;
  padding-bottom: 2px;
}  
</style>
