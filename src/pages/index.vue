<template lang="pug">
  v-container
    v-row
      v-col.col-12
        v-card
          v-card-text
            div.text--primary(style="white-space:pre-wrap;" v-text='appDesc')
            //- div.text--primary(style="white-space:pre-wrap;" v-text='message')
            
      v-col.col-12(v-if='appMemo')
        v-card
          v-card-title NOTE
          v-card-text
            div.text--primary(style="white-space:pre-wrap;" v-text='appMemo')
           
</template>

<script>
import authorize from '@/mixins/authorize'
import apiHandler from '@/mixins/apiHandler'
export default {
  mixins: [authorize, apiHandler],

  data: function () {
    return {
      appDesc: 'VTuber の動画をまとめたサイトです.\n'
        + '左のメニューを選択してください.',
      appMemo: ''
    }
  },

  // computed: {
  //   message () {
  //     let str = ''
  //     if (this.isLogin) {
  //       str += `こんにちは ${this.loginUser.name} さん\n`
  //     }
  //     str += '左のメニューを選択して下さい.'
  //     return str
  //   }
  // },

  created: async function() {
    await this.getDataFromApi()
  },

  methods: {
    // API を叩いてデータを取ってくる
    async getDataFromApi() {
      this.apiHandler(async () => {
        // post
        const { data: { memo }} = await this.$http.get('apps')
        this.appMemo = memo || ''
      })
    }
  }
}
</script>
