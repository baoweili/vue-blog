<template>
  <div class="edit-blog">
    <CreateBlog title="编辑博客" btnContent="编辑" @handleBlog="editBlog" :blog="blog"></CreateBlog>
  </div>
</template>

<script>
import CreateBlog from './component/CreateBlog.vue';

export default {
  name: "EditBlog",
  components: {
    CreateBlog
  },
  data() {
    return {
      blog: {}
    }
  },
  methods: {
    getBlogData() {
      this.$axios.viewBlog({ id: parseInt(this.$route.query.id)}).then(res => {
        let blog = res.data;
        this.blog = blog;
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '博客信息获取失败'
        })
      });
    },
    editBlog(params) {
      this.$axios.editBlog(params).then(res => {
        this.$message({
          type: 'success',
          message: '博客编辑成功'
        });
        this.$router.push('/admin');
      }).catch(err => {
        
      })
    }
  },
  created() {
    this.getBlogData();
  }
}
</script>

<style lang='scss' scoped>
.edit-blog {
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
