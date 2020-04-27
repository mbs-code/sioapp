// TODO: @deprecated
export default {
  props: {
    breakPoint: {
      type: Number,
      default: () => 640
    }
  },

  data: function () {
    return {
      _breakPoint: 0, // high priority
      _width: 0
    }
  },

  computed: {
    isCollapse() {
      // true で縦長表示
      return this.$data._width < (this.$data._breakPoint || this.breakPoint)
    }
  },

  async mounted() {
    await this.onResize()
  },

  methods: {
    // 強制リサイズ
    resetOnResize() {
      // 外部から実行する際はリセットを噛ます
      this.$data._width = 0

      this.$nextTick(() => {
        this.onResize()
      })
    },

    // 動的リサイズ (v-resize='onResponsiveResize')
    onResize() {
      // 自身のサイズを指定
      const dom = this.$el
      this.$data._width = parseInt(dom.clientWidth)
    }
  }
}
