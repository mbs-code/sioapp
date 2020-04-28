export default {
  computed: {
    isLogin () {
      return this.$store.getters['auth/isLogin'] || false
    },
  
    loginUser () {
      return this.$store.getters['auth/getUser'] || {}
    }
  },

  methods: {
    pushLoginPage () {
      const route = this.$route
      this.$router.push({
        name: 'login',
        query: { redirect: route.fullPath }
      })
    },

    async doLogin (name, pass) {
      await this.$store.dispatch('auth/login', {
        username: name,
        password: pass
      })
      
      if (!this.isLogin) {
        throw new Error('Unexpected Error')
      }
      
      this.$toast.success('ログインしました.')
    },
  
    doLogout () {
      if (this.isLogin) {
        this.$store.dispatch('auth/logout')
        this.$toast.info('ログアウトしました.')
        
        const route = this.$route
        if (route.meta.requiresAuth) {
          console.log('auto redirect')
          this.$router.push({ name: 'index' })
        }
      }
    }
  }
}
