<template>
  <div style="display:flex;flex-direction:column;" :style="{height}">
    <header class="header">
      <zheader/>
    </header>
    <div class="body">
      <zmenu/>
      <section class="section-content" style="">
        <router-view/>
      </section>
    </div>
    <el-backtop target=".section-content"></el-backtop>
  </div>
</template>

<script>
import zmenu from "./modules/menus";
import zheader from "./modules/zhead";
import { setInterval } from 'timers';

export default {
  name: 'layout',
  components: { zmenu,zheader },
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
    height:100%;
  }
}

// .left-menu {
//   width: 230px;
//   float: left;
//   .left-menu-content {
//     width: 230px;
//   }
// }
// .right-block {
//   width: calc(100% - 210px);
//   position: absolute;
//   top: 0px;
//   left: 210px;
//   background-color: #f0f0f0;
  

  
//   .right-block-body {
//     height: calc(100% - 90px);
//     overflow: auto;
//     padding: 10px;
//   }
// }
</style>
