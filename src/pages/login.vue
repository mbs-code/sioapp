<template lang='pug'>
  v-container
    v-row.ma-n2
      v-col
        v-form(ref='form' v-model='valid' @submit.prevent)
          v-text-field(v-model='username'
            label='username'
            :rules="[rules.required]"
          )
          v-text-field(v-model='password' type='password'
            label='password'
            :rules="[rules.required]"
          )

          v-btn.primary(@click='onSubmit' :disabled='showLoading') ログイン

    Loading(:show='showLoading')
</template>

<script>
import apiHandler from '@/mixins/apiHandler'
import formValid from '@/mixins/formValid'
import authorize from '@/mixins/authorize'

import Loading from '@/components/parts/Loading'

export default {
  components: { Loading },

  mixins: [apiHandler, formValid, authorize],

  data: function () {
    return {
      valid: false,
      username: null,
      password: null,
      showLoading: false,
      rules: {
        required: v => !!v || 'この項目は必須です。',
      },
    }
  },
  
  methods: {
    onSubmit() {
      this.postDataToApi()
    },
    
    // API を叩いてデータを取ってくる
    async postDataToApi() {
      this.apiHandler(async () => {
        // validate
        this.$refs.form.validate()
        if (!this.valid) {
          throw new Error('Validation error.')
        }

        // login
        await this.doLogin(this.username, this.password)

        // redirect
        const route = this.$route.query.redirect || { name: 'index' }
        await this.$router.replace(route).catch(() => {})
      })
    }
  }
}
</script>
