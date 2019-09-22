<template>
  <div class="login-container">
    <div class="login-form">
      <div style>
        <h1 style="display:inline-block;color:#eee;margin-bottom:40px;">系统登录</h1>
      </div>
      <zform ref="form" labelWidth="0px" v-model="form" :fields="[
          { title :'用户名',key:'account',type:'input',icon:'icon-user',labelHide:true},
          { title :'密码',key:'password',type:'password',icon:'icon-key',labelHide:true},
        ]"
      />
    
      <el-button type="primary" style="width:100%;" @click="submitForm()">登录</el-button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        account: "5d6aa87c1fa8d53ae054e32d",
        password: "Aa123456"
      }
    };
  },
  
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          ap.$mutate(`
            mutation Login{
              login(account:"${this.form.account}",password:"${this.form.password}")
            }
          `,null,"auth").then(r=>{
            let redirect = ap.Query("redirect")
            if (redirect && redirect.length > 0){
              location.href = redirect
            }else{
              location.href = "index.html";
            }
          }).catch(r=>{
              this.$message.error('登录失败');
          })
        } else {
          return false;
        }
      });
    }
  },
  created() {
    let self = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        self.submitForm();
        return false;
      }
    };
  },
  mounted() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    text-align: center;
    position: relative;
    width: 460px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    /deep/ .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #eee;

      /deep/ span {
        font-size: 22px;
        position: relative;
        top: 1px;
      }
      /deep/ .el-input {
        background: transparent;
        width: calc(100% - 40px);
        /deep/ .el-input__inner {
          border: none;
          color: #eee;
          font-size: 14px;
          background: transparent;
        }
      }
    }
  }
}
</style>
