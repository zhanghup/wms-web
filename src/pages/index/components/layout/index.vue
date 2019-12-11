<template>
  <div class="wrap" style="display:flex;flex-direction:column;" :style="{height}">
        <router-view  v-if="hidewrap" class="router-view" style="height:100%" />
    <div v-if="!hidewrap">
      <z-head @hide="hidewrap = true"/>
    </div>
    <div  v-if="!hidewrap" class="body" :style="{height:bodyHeight}">
      <z-menu/>
      <section class="section-content">
        <router-view class="router-view" style="height:100%"/>
      </section>
    </div>
    <el-backtop target=".section-content"></el-backtop>
  </div>
</template>

<script>
import zMenu from './modules/menus'
import zHead from './modules/zhead'
import { setInterval } from 'timers'

export default {
  name: 'layout',
  components: { zMenu, zHead },
  data () {
    return {
      hidewrap: false,

      headerHeight: 57,
      height: '1000px',
      bodyHeight: '1000px'
    }
  },
  methods: {
    esc () {
      console.log(1)
    }
  },
  created () {
    let self = this
    let height = document.documentElement.clientHeight
    self.height = height + 'px'
    self.bodyHeight = height - self.headerHeight + 'px'
    setInterval(function () {
      height = document.documentElement.clientHeight
      if (self.height !== height + 'px') {
        self.height = height + 'px'
        self.bodyHeight = height - self.headerHeight + 'px'
      }
    }, 20)

    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key === 27) {
        self.hidewrap = false
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.wrap{

    background-color: #f0f0f0;
}
.body{
  flex-grow:1;
  display:flex;
  align-items:stretch;
  .section-content{
    background-color: #f0f0f0;
    flex-grow:1;
    overflow-y:auto;
    height:100%;
  }
}

/deep/ .router-view > div{
  height:100%;
}

</style>
