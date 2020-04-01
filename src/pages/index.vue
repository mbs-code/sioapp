<template lang="pug">
  v-container
    v-row
      v-col
        v-card
          v-card-text
            span.text--primary(style="white-space:pre-wrap;" v-text='message')
</template>

<script>
import authorize from '@/mixins/authorize'
export default {
  mixins: [authorize],

  computed: {
    message () {
      let str = ''
      if (this.isLogin) {
        str += `こんにちは ${this.loginUser.name} さん\n`
      }
      str += '左のメニューを選択して下さい.'
      return str
    }
  }
}
</script>
