<template>
  <div id="app">
    <div class="left-menu">
      <div class="left-menu-content">
        <menu-tree :style="{height:menuHeight,overflow:'auto'}"></menu-tree>
      </div>
    </div>
    <div class="right-block">
      <header class="right-block-header">
        <input type="button" value="test" @click="test()">
      </header>
      <section class="right-block-body" :style="{height:height}">
        <router-view style="height:100%"/>
      </section>
    </div>
  </div>
</template>

<script>
import menuTree from "./components/menu/index";
export default {
  name: "App",
  components: { menuTree },
  data() {
    return {
      height: "100px",
      menuHeight: "100px"
    };
  },
  created() {
    this.height = document.documentElement.clientHeight - 90 + "px";
    this.menuHeight = document.documentElement.clientHeight + "px";
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
    height: 70px;
  }
  .right-block-body {
    height: calc(100% - 90px);
    overflow: auto;
    padding: 10px;
    background-color: #f0f0f0;
  }
}
</style>

