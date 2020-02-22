<template lang='pug'>
  div
    code {{ users }}
</template>

<script>
export default {
  data: function() {
    return {
      users: []
    };
  },
  created: async function() {
    const res = await this.$http.get('channels')
    this.users = res.data
  }
}
</script>