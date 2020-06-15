<template>
  <div class="header">
    <div class="site-name">
      <div class="logo">
        <el-avatar class="avatar" :src="avatarUrl" :size="50" alt="logo"></el-avatar>
        <span class="name">willee</span>
      </div>
      <div class="description">签名：{{ signature }}</div>
    </div>
    <ul class="menu">
      <li :class="['menu-item', {current: curFlag[0]}]">
        <router-link to="/">
          <i class="iconfont ">&#xe749;</i>
          首页
        </router-link>
      </li>
      <li :class="['menu-item', {current: curFlag[1]}]">
        <router-link to="/archives">
          <i class="iconfont">&#xe6b1;</i>
          归档
        </router-link>
      </li>
      <li :class="['menu-item', {current: curFlag[2]}]">
        <router-link class="disabled" to="#">
          <i class="iconfont">&#xe61d;</i>
          留言
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  props: {
    current: String
  },
  data() {
    return {
      curFlag: [true, false, false],
      avatarUrl: require("@/assets/styles/images/avatar.jpg"),
      signature: ''
    }
  },
  methods: {
    getSignature() {
      let signature = this.$store.state.userInfo.signature;
      if(signature) {
        this.signature = signature;
      } else {
        this.$axios.getSignature({ author: 'willee' }).then(res => {
          signature = res.data.signature || '他很懒，并没有留下签名~';
          this.signature = signature;
          this.$store.dispatch('updateUserInfo', { signature });
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: '获取签名失败'
          })
        }) 
      }
    }
  },
  created() { 
    this.getSignature();
  },
  mounted() {
    if(this.current === 'archives') {
      this.curFlag = [false, true, false];
    } else if(this.current === 'comment') {
      this.curFlag = [false, false, true];
    } else {
      this.curFlag = [true, false, false];
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  border-bottom: 1px solid rgba(223, 223, 223, 0.5);
  .site-name {
    margin-bottom: 40px;
    .logo {
      display: flex;
      align-items: center;
      font-size: 32px;
      .avatar {
        margin-right: 10px;
      }
    }

    .description {
      padding-top: 10px;
      color: #999;
    }
  }

  .menu {
    position: absolute;
    bottom: -1px;
    right: 0;
    margin-top: 10px;
    text-align: right;
    .current {
      border: 1px solid rgba(223, 223, 223, 0.5);
      border-bottom-color: white;
    }
    .disabled {
      cursor: not-allowed;
    }
    &-item {
      display: inline-block;
      box-sizing: border-box;
      padding: 5px 8px;
      margin-left: 50px;
      i {
        font-size: 14px;
        margin-right: 1px;
      }
    }
  }
}
</style>
