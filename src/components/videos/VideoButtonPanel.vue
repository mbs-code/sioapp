<template lang="pug">    
  div
    v-btn.mx-2(icon @click='doOpenPicture')
      v-icon mdi-image
    //- v-btn.mx-2(icon @click='doOpenMetaTable')
    //-   v-icon mdi-table

</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: () => {}
    }
  },

  data: function () {
    return {
      stats: []
    }
  },

  methods: {
    doOpenPicture () {
      const url = this.video.thumbnailHires
      window.open(url, '_blank')
    },

    async doOpenMetaTable () {
      try {
        const id = this.video.id
        const { data } = await this.$http.get(`videos/${id}/metas`, {
          params: {
            all: true
          }
        })

        this.stats = data.map(e => {
          delete e.description
          return e
        })
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>