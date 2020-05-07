// TODO: 汎用パーツにしたいねぇ
<template lang="pug">
  //- @required v-model
  //- 色合いが微妙なので css で弄る (v-item--active)
  v-btn-toggle.extend(
    v-bind='$attrs'
    v-on='$listeners'
    dense
    mandatory
    color='primary'
    @change="$emit('input', $event)"
  )
    v-tooltip(bottom)
      template(v-slot:activator='{ on }')
        v-btn(value='list' icon elevation='2' v-on='on')
          v-icon(small) mdi-view-list
      span リスト表示
    v-tooltip(bottom)
      template(v-slot:activator='{ on }')
        v-btn(value='grid' icon elevation='2' v-on='on')
          v-icon(small) mdi-view-grid
      span グリッド表示

</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<style lang="scss">
// btn group の色を btn と同等にする修正
// color で濃いめを指定すること
.v-btn-toggle.extend .v-btn.v-item--active:before {
  opacity: 1 !important;
}
.v-btn-toggle.extend .v-btn.v-item--active i {
  color: white !important;
}
</style>
