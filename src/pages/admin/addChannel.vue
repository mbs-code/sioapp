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
      channels: [],
      resultMessage: ''
    }
  },

  methods: {
    onSubmit() {
      this.postDataToApi()
    },
    
    // API を叩いてデータを更新する
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
