<template>
  <div class="not-found">
    <h1 class="header-content">
      404 Page Not Found
    </h1>
    <div class="footer-content">
      Sorry, nothing could be found
    </div>
    <router-link to="/">
      <el-button type="primary" size="medium">返回首页</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  components: {}  
}
</script>

<style lang='scss' scoped>
  .not-found {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    display: flex;
    align-items: center;
    flex-direction: column;
    .footer-content {
      margin: 20px 0 30px;
      font-size: 18px;
      color: rgb(231, 147, 231);
    }
  }
</style>
