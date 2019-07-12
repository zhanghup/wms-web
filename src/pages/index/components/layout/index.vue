<template>
  <div style="display:flex;flex-direction:column;" :style="{height}">
    <div>
      <zhead/>
    </div>
    <div class="body">
      <zmenu/>
      <section class="section-content">
        <router-view class="router-view" style="height:100%"/>
      </section>
    </div>
    <el-backtop target=".section-content"></el-backtop>
  </div>
</template>

<script>
import zmenu from "./modules/menus";
import zhead from "./modules/zhead";
import { setInterval } from 'timers';

export default {
  name: 'layout',
  components: { zmenu,zhead },
  data() {
    return {
      height: "1000px",
    };
  },
  created() {
    let self = this;
    self.height = document.documentElement.clientHeight+ "px";
    setInterval(function(){
      let height = document.documentElement.clientHeight+ "px";
      if (self.height != height){
        self.height = height
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
