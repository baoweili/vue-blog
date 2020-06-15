<template>
  <div class="login">
    <h2 class="header">登录页</h2>
    <el-input v-model="username" placeholder="请输入用户名" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button 
      size="small" 
      type="primary" 
      round
      @click="handleLogin"  
    >登录</el-button>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      this.$axios.login({
        username: this.username,
        password: this.password
      }).then(res => {
        if(res.code === 1) {
          this.loginSuccess();
          sessionStorage.setItem('token', res.data.token);
          this.$store.dispatch('login');
          this.$router.push('/admin');
        } else {
          this.loginFail();
        }
      }).catch(err => {
        console.log('err')
        this.loginFail();
      })
    },
    loginSuccess() {
      this.$message({
        message: '登录成功',
        type: 'success'
      })
    },
    loginFail() {
      this.$message({
        message: '登录失败，请检查用户名和密码',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 30px 0;
  border: 1px solid #eee;
  box-shadow: 5px 5px 2px #eee;
  .header, 
  .el-input {
    margin-bottom: 30px;
  }
  .el-input {
    width: 70%;
  }
  .el-button {
    padding: 10px 60px;
  }
}
</style>


