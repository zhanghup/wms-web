<template>
  <div style="display:flex;flex-direction:column;" :style="{height}">
    <div>
      <z-head/>
    </div>
    <div class="body" :style="{height:bodyHeight}">
      <z-menu/>
      <section class="section-content">
        <router-view class="router-view" style="height:100%"/>
      </section>
    </div>
    <el-backtop target=".section-content"></el-backtop>
  </div>
</template>

<script>
import zMenu from "./modules/menus";
import zHead from "./modules/zhead";
import { setInterval } from 'timers';

export default {
  name: 'layout',
  components: { zMenu,zHead },
  data() {
    return {
      headerHeight:57,
      height: "1000px",
      bodyHeight:"1000px"
    };
  },
  created() {
    let self = this;
    let height = document.documentElement.clientHeight
    self.height = height+ "px";
    self.bodyHeight =  height - self.headerHeight + "px"
    setInterval(function(){
      height = document.documentElement.clientHeight;
      if (self.height != height+ "px"){
        self.height = height + "px"
        self.bodyHeight =  height - self.headerHeight + "px"
      }
    },20)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.body{
  flex-grow:1;
  display:flex;
  align-items:stretch;
  .section-content{
    background-color: #f0f0f0;
    flex-grow:1;
    overflow-y:auto;
    height:calc(100% - 10px);
    padding:5px;
  }
}

/deep/ .router-view > div{
  height:100%;
}

</style>
