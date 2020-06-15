<template>
  <div class="blog-details">
    <h1 class="header">博客详情</h1>
    <div class="main">
      <h2 class="title">{{ blog.title }}</h2>
      <div class="info">
        <span class="date">{{ blog.createTime }}</span>
        <span class="author">{{ blog.author }}</span>
      </div>
      <div class="content">{{ blog.content}}</div>
    </div>
    <div class="footer">
      <el-button type="primary" size="medium" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/index.js';

export default {
  name: "ViewBlog",
  components: {},
  data() {
    return {
      blog: {}
    }
  },
  methods: {
    getBlogData() {
      this.$axios.viewBlog({ id: parseInt(this.$route.query.id)}).then(res => {
        let blog = res.data;
        blog.createTime = formatDate(blog.createTime);
        this.blog = blog;
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '博客信息获取失败'
        })
      });
    },
    handleBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getBlogData();
  }
}
</script>

<style lang='scss' scoped>
@import 'styles/variations.scss';

.blog-details {
  .header {
    padding-bottom: 20px;
    border-bottom: 1px solid $borderColor;
  }

  .main {
    margin-top: 20px;
    .info {
      margin: 5px 0 10px;
      .date {
        margin-right: 10px;
      }
    }
    .content {
      white-space: pre-wrap;
    }
  }

  .footer {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
