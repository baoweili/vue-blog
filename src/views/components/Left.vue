<template>
  <div class="left">
    <BlogCard
      v-for="blog in blogList"
      :blog="blog"
      :key="blog.id"
      :permission="permission"
      @del="deleteBlog"
      :detailsUrl="detailsUrl"
      :currentPage="currentPage"
    ></BlogCard>
    <el-pagination 
      class="pagination"
      background
      layout="prev, pager, next"
      :pageSize="pageSize"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BlogCard from "./BlogCard";
import Footer from "./Footer";
import { formatDate } from "@/utils/index.js";

export default {
  name: "HomeLeft",
  components: {
    BlogCard,
    Footer
  },
  props: {
    permission: Array,
    detailsUrl: String
  },
  data() {
    return {
      blogList: [],
      total: 100,
      pageSize: 5,
      currentPage: 1,
      pageMap: {
        '/': 'homeCurrentPage',
        '/admin': 'adminCurrentPage'
      }
    };
  },
  computed: {
    type: {
      get() {
        return this.$store.state.type;
      },
      set(val) {
        return val;
      }
    }
  },
  watch: {
    type(val) {
      this.type = val;
      this.getBlogList().then(res => {
        this.$message({
          type: 'success',
          message: res
        })
      });
    }
  },
  methods: {
    handleResData(data) {
      let tempList = data;
      // 转换createTime
      tempList.forEach(el => {
        // 将毫秒数转换成yyyy年mm月dd日
        el.date = formatDate(el.createTime);
      });
      return tempList;
    },
    getBlogList() {
      return this.$axios.listBlog({ 
        author: 'willee', 
        page: this.currentPage, 
        pageSize: this.pageSize,
        type: this.type
      }).then(res => {
        this.total = res.total;
        this.blogList = this.handleResData(res.data);
        return Promise.resolve('列表加载成功');
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '获取博客列表失败'
        })
      })
    },
    deleteBlog() {
      this.getBlogList();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getBlogList();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    initPage() {
      let pageName = this.pageMap[this.$route.path];
      let storagePage = sessionStorage.getItem(pageName);
      if(storagePage) {
        this.currentPage = parseInt(storagePage); 
      }
      sessionStorage.removeItem(pageName);
    },
    // 刷新保存currentPage
    saveCurrentPage() {
      sessionStorage.setItem(this.pageMap[this.$route.path], this.currentPage);
    }
  },
  created() {
    window.addEventListener('beforeunload', this.saveCurrentPage);
    this.initPage();
    this.getBlogList();
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.saveCurrentPage);
  }
};
</script>

<style lang="scss" scoped>
.left {
  .pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
