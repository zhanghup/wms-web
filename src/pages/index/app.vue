<template>
  <div id="app">
    <div class="left-menu">
      <div class="left-menu-content">
        <menu-tree :style="{height:menuHeight,overflow:'auto'}"></menu-tree>
      </div>
    </div>
    <div class="right-block">
      <header class="right-block-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </header>
      <section class="right-block-body" :style="{height:height}">
        <router-view style="height:100%"/>
      </section>
    </div>
  </div>
</template>

<script>
import menuTree from "./components/menu/index";
import { setInterval } from 'timers';
export default {
  name: "App",
  components: { menuTree },
  data() {
    return {
      height: "1000px",
      menuHeight: "1000px"
    };
  },
  created() {
    let self = this;
    self.height = document.documentElement.clientHeight - 90 + "px";
    self.menuHeight = document.documentElement.clientHeight + "px";
    setInterval(function(){
      let height = document.documentElement.clientHeight - 90 + "px";
      let menuHeight = document.documentElement.clientHeight + "px";
      if (self.height != height){
        self.height = height
      }
      if (self.menuHeight != menuHeight){
        self.menuHeight = menuHeight
      }
    },20)
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.left-menu {
  width: 230px;
  float: left;
  .left-menu-content {
    width: 230px;
  }
}
.right-block {
  width: calc(100% - 210px);
  position: absolute;
  top: 0px;
  left: 210px;
  background-color: #fff;

  .right-block-header {
    padding: 10px;
    height: 50px;
  }
  .right-block-body {
    height: calc(100% - 90px);
    overflow: auto;
    padding: 10px;
    background-color: #f0f0f0;
  }
}
</style>

