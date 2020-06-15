<template>
  <div class="admin-aside">
    <div class="header" @click="handleEditUserInfo" title="编辑个人资料">
      <el-avatar :src="avatarUrl" :size="120" alt="头像"></el-avatar>
      <div class="name">willee</div>
      <div class="signature">
        签名：<span class="signature-text">{{ signature }}</span>
      </div>
    </div>
    <div class="info">
      <div class="follower">我的粉丝：101万</div>
      <div class="following">我的关注：11</div>
      <div class="laud">获得赞数：100023</div>
      <div class="blog">我的博客：10</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  data() {
    return {
      avatarUrl: '',
      signature: ''
    }
  }, 
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {
    userInfo: {
      handler() {
        this.getUserInfo() 
      },
      deep: true
    }
  },
  methods: {
    getUserInfo() {
      const { avatar, signature } = this.$store.state.userInfo;
      this.avatarUrl = avatar || require("@/assets/styles/images/avatar.jpg");
      this.signature = signature;
    },
    handleEditUserInfo() {
      this.$router.push('/admin/user');
    }
  },
  created() {
    this.getUserInfo();
  }
}
</script>

<style lang='scss' scoped>
@import 'styles/variations.scss';

.admin-aside {
  border-left: 1px solid $borderColor;
  box-sizing: border-box;
  padding: 20px 20px 400px;
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    .name {
      padding: 10px 0 5px;
      font-size: 16px;
    }
    .signature {
      width: 100%;
      font-size: 12px;
      color: #777;
      word-break: break-all; 
      line-height: 18px;
    }
  }

  .info {
    padding-top: 10px;
    border-top: 1px solid $borderColor;
    margin-top: 20px;
    & > div {
      margin-bottom: 10px;
    }
  }
}
</style>
