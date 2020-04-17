<route-meta>
  { "requiresAuth": true }
</route-meta>

<template lang="pug">
  v-container
    v-row.ma-n2
      v-col(cols='12')
        //- submit 抑制
        v-form(ref='form' v-model='valid' @submit.prevent)
            v-textarea(v-model='text' filled required
              label='メモ'
              :rules="[rules.required]"
            )

            v-btn.primary(@click='onSubmit' :disabled='showLoading') 実行

      template(v-if='resultMessage')
        v-col(cols='12')
          v-divider

        v-col(cols='12')
          v-card
            v-card-title OUTPUT
            v-card-text
              p.text--primary(style="white-space:pre-wrap;" v-text='resultMessage')

    Loading(:show='showLoading')
</template>

<script>
import stringFilters from '@/mixins/stringFilters'
import apiHandler from '@/mixins/apiHandler'
import formValid from '@/mixins/formValid'

import ChannelList from '@/components/channels/ChannelList'
import Loading from '@/components/parts/Loading'

export default {
  components: { ChannelList, Loading },

  mixins: [stringFilters, apiHandler, formValid],

  data: function () {
    return {
      valid: false,
      text: '',
      resultMessage: ''
    }
  },

  created: async function() {
    await this.getDataFromApi()
  },

  methods: {
    onSubmit() {
      this.postDataToApi()
    },

    // API を叩いてデータを取ってくる
    async getDataFromApi() {
      this.apiHandler(async () => {
        // post
        const { data: { memo }} = await this.$http.get('apps')
        this.text = memo || ''
      })
    },
    
    // API を叩いてデータを更新する
    async postDataToApi() {
      this.apiHandler(async () => {
        // init
        this.resultMessage = ''

        // validate
        this.$refs.form.validate()
        if (!this.valid) {
          throw new Error('Validation error.')
        }

        // post
        const { data: { items }} = await this.$http.post('apps', {
          keys: ['memo'],
          memo: this.text
        })

        // set
        this.resultMessage = items
        this.$toast.info('success!')
      })
    }
  }
}
</script>
