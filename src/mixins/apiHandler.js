import authorize from '@/mixins/authorize'

export default {
  mixins: [authorize],

  data: function () {
    return {
      showLoading: false, // load 中か
      requestTime: 0, // 取得時間 ms
      fetchDate: {} // 取得日時
    }
  },

  methods: {
    async apiHandler (callback, own = this) {
      const start = new Date()
      this.showLoading = true

      try {
        const res = await callback(own)
        return res
      } catch (err) {
        // axios handler
        if (err && err.response) {
          const code = err.response.status
          if (code === 401) { // unauthorize
            this.doLogin()
          }
        }
        this.$toast.error(err)
        console.error(err)
      } finally {
        this.showLoading = false
        this.requestTime = new Date() - start
        this.fetchDate = start
      }
    }
  }
}
