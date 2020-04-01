export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin || false
    },
  
    loginUser () {
      return this.$store.state.user || {}
    }
  },

  methods: {
    doLogin () {
      const route = this.$route
      this.$router.push({
        name: 'login',
        query: { redirect: route.fullPath }
      })
    },
  
    doLogout () {
      if (this.isLogin) {
        this.$store.dispatch('logout')
        this.$toast.info('ログアウトしました.')
        this.$router.push({ name: 'index' })
      }
    }
  }
}
