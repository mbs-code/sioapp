export default {
  props: {
    breakPoint: {
      type: Number,
      default: () => 640
    }
  },

  computed: {
    isCollapse() {
      // true で縦長表示
      return this.width < this.breakPoint
    }
  },

  async mounted() {
    await this.onResize()
  },

  methods: {
    resetOnResize() {
      // 外部から実行する際はリセットを噛ます
      this.width = 0
      this.height = 0

      this.$nextTick(() => {
        this.onResize()
      })
    },

    onResize() {
      // 自身のサイズを指定
      const dom = this.$el
      this.width = parseInt(dom.clientWidth)
      // this.height = parseInt(dom.height)
    }
  }
}
