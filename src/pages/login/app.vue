<template>
  <div class="login-container">
    <el-form :model="form"  ref="form" class="login-form">
      <div style=""><h1 style="display:inline-block;color:#eee;margin-bottom:40px;">系统登录</h1></div>
        <el-form-item>
          <span class="iconfont">&#xeb01;</span>
          <el-input type="text" v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="iconfont">&#xe9a8;</span>
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" style="width:100%;" @click="submitForm()">登录</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
      return {
        form: {
          account: '',
          password: ''
        }
      };
    },
  watch: {
    $route: {
      
    }
  },
  created() {
  },
  mounted() {
    
  },
  destroyed() {
  },
  methods: {
     submitForm() {
       location.href = "index.html"
      },
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form{
    text-align:center;
    position: relative;
    width: 460px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .el-form-item{
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      
      color:#eee;
      span{
        font-size: 22px;
        position: relative;
        top:1px;
      }
      .el-input{
        background: transparent;
        width: calc(100% - 40px);
        /deep/ .el-input__inner{
          border: none;
          color:#eee;
          font-size: 18px;
          background: transparent;
        }
      }
    }
    
  }
  
}
</style>
