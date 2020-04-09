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
              label='チャンネルIDを入力して下さい(半角スペース区切り)'
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
              ChannelList(:channels='channels' :showGrid='false' :imageWidth='200')

    Loading(:show='showLoading')
</template>

<script>
import stringFilters from '@/mixins/stringFilters'
import apiHandler from '@/mixins/apiHandler'

import ChannelList from '@/components/channels/ChannelList'
import Loading from '@/components/parts/Loading'

export default {
  components: { ChannelList, Loading },

  mixins: [stringFilters, apiHandler],

  data: function () {
    return {
      valid: false,
      text: '',
      channels: [],
      resultMessage: '',
      rules: {
        email: v => (v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
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
        // init
        this.channels = []
        this.resultMessage = ''

        // validate
        this.$refs.form.validate()
        if (!this.valid) {
          throw new Error('Validation error.')
        }

        // post
        const { data: { message, inputIds, outputIds, items }} = await this.$http.post('admin/addChannel', {
          text: this.text
        })

        // set
        this.channels = items
        this.resultMessage = `${message}`
          + `\ninput ids: [${inputIds.length}]`
          + `- ${JSON.stringify(inputIds)}`
          + `\noutput ids: [${outputIds.length}]`
          + `- ${JSON.stringify(outputIds)}`

        this.$toast.info(message)
      })
    }
  }
}
</script>
