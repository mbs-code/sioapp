export default {
  props: {
    to: {
      type: [String, Object],
      default: undefined
    },
    href: {
      type: [String, Object],
      default: undefined
    },
    target: {
      type: String,
      default: undefined
    }
  },

  computed: {
    linkObject() {
      return {
        to: this.to,
        href: this.href,
        target: this.target
      }
    },
    hasLink() {
      return Boolean(this.to || this.href)
    }
  }
}
