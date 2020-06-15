<template>
  <div class="new-blog">
    <CreateBlog title="新建博客" btnContent="新建" @handleBlog="handleNewBlog" :blog="blog"></CreateBlog>
  </div>
</template>

<script>
import CreateBlog from './component/CreateBlog.vue';

export default {
  name: "NewBlog",
  components: {
    CreateBlog
  },
  data() {
    return {
      blog: { type: 'emotion' }
    }
  },
  methods: {
    handleNewBlog(params) {
      this.$axios.newBlog(params).then(res => {
        this.$message({
          type: "success",
          message: "博客创建成功"
        });
        this.$router.push('/admin');
      }).catch(err => {
        this.$message({
          type: "warning",
          message: "博客创建失败"
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.new-blog {
  .main {
    margin-top: 40px;
    padding: 10px 10%;
  }
  .title-input {
    margin-bottom: 30px;
  }
  .footer {
    text-align: right;
    margin-right: 10%;
  }
}
</style>
