<template>
  <div class="admin-home">
    <div class="header">
      <h1>博客首页</h1>
      <router-link to="/admin/new">
        <el-button class="create-btn" type="primary" round>新建博客</el-button>
      </router-link>
    </div>
    <Main 
      class="main"
      :permission="permission"
      :detailsUrl="detailsUrl"
    />
  </div>
</template>

<script>
import BlogCard from '../components/BlogCard';
import Main from '../components/Left';
import { formatDate } from '@/utils/index.js';

export default {
  name: "AdminHome",
  components: {
    BlogCard,
    Main
  },
  data() {
    return {
      permission: ['read', 'edit', 'del'],
      detailsUrl: '/admin/details'
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'styles/variations.scss';

.admin-home {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid $borderColor;
    .create-btn {
      margin-right: 30px;
    }
  }
  .main {
    padding-top: 20px;
  }
  .pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
