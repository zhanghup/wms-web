<template>
  <div id="app">
    <layout v-if="$store.state.common.dicts.length > 0"/>
  </div>
</template>

<script>
import layout from './components/layout/index'
export default {
  name: 'App',
  components: {layout},
  created () {
    this.$store.dispatch('common/load')
  }
}
</script>
<style lang="scss" scoped>

</style>
