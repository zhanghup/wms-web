<template>
  <div class="head">
    <div style="flex-grow:1">
      zander
    </div>
    <div class="avatar">
      <el-dropdown class="z-middle">
        <el-avatar shape="square"  fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-url="'/home'">首页</el-dropdown-item>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>系统设置</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="tools">
      <el-button size="mini" icon="el-icon-full-screen" circle @click="screenFull"></el-button>
      <el-button size="mini" icon="el-icon-search" circle></el-button>
      <el-button size="mini" icon="el-icon-search" circle></el-button>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: "zhead",
  methods:{
    screenFull(){
      if (!screenfull.enabled) {
        this.$message({
          message: '浏览器不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
};
</script>
<style lang="scss" scoped>
.head{
  padding:2px 10px;
  display:flex;
  align-items:center;
  background-color: #32567c;
  border-bottom: 1px solid #2a2a2b;
  color:#fff;
}

.avatar{
  padding-right: 12px;
  border-right: 1px solid #dddddd;
}

.tools{
  padding: 12px;
}

</style>


