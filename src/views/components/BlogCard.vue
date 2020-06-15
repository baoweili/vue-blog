<template>
  <div class="blog-card">
    <div class="header">
      <h2 class="blog-title">{{ blog.title }}</h2>
      <span class="edit-icon-wrapper" title="编辑博客" @click="editBlog" v-show="edit" >
        <svg t="1574061914014" class="edit-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5059" width="16" height="16"><path d="M694.037333 213.333333v64H234.666667v469.333334h512V512h64v234.666667a64 64 0 0 1-64 64H234.666667a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64h459.370666z m136.746667 24.234667l45.098667 45.397333-343.722667 341.290667 0.128 0.128-46.592 1.578667 1.322667-47.274667 0.085333 0.106667 343.68-341.226667z" p-id="5060" fill="#444444"></path></svg>
      </span>
    </div>
    <div class="blog-info">
      <div class="blog-date">
        <span class="iconfont icon-calendar">&#xe6ee;</span>
        <span class="date-text">{{ blog.date }}</span>
      </div>
      <div class="blog-type">
        <span class="iconfont icon-type">&#xe6fc;</span>
        <span class="type-text">{{ blog.type }}</span>
      </div>
    </div>
    <!-- <div class="blog-content">{{ blog.content }}</div> -->
    <div class="blog-content" v-html="blog.content"></div>

    <p class="blog-footer">
      <el-button class="del-btn" 
        @click="delDialogVisible = true" 
        v-show="del" 
        size="mini" 
        icon="el-icon-delete"
      ></el-button>
      <router-link :to="{ path: detailsUrl, query: { id: blog.id } }">
        <el-button class="show-btn" v-show="read" size="mini">阅读全文>></el-button>
      </router-link>
    </p>
    <el-dialog
      title="提示"
      :visible.sync="delDialogVisible"
      width="30%">
      <span>该操作不可逆，你确认删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteBlog(blog.id)" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    blog: Object,
    permission: Array,
    detailsUrl: String,
    currentPage: Number
  },
  data() {
    return {
      delDialogVisible: false
    }
  },
  computed: {
    del() {
      return this.permission.includes('del');
    },
    edit() {
      return this.permission.includes('edit');
    },
    read() {
      return this.permission.includes('read');
    }
  },
  methods: {
    deleteBlog(id) {
      this.$axios.deleteBlog({ id, author: 'willee' }).then(res => {
        this.delDialogVisible = false;
        this.$message({
          type: 'success',
          message: '博客删除成功'
        });
        this.$emit('del');
      });
    },
    editBlog() {
      this.$router.push({path: '/admin/edit', query: { id: this.blog.id }});
      sessionStorage.setItem('adminCurrentPage', this.currentPage);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'styles/variations.scss';

.blog-card {
  padding: 20px 0 10px;
  border-bottom: 1px solid $borderColor;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .edit-icon-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      .edit-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .blog-title {
    color: #666;
  }

  .blog-info {
    display: flex;
    align-items: center;
    margin: 5px 0 10px;
    .blog-date {
      display: flex;
      align-items: center;
      .icon-calendar {
        padding-right: 2px;
      }
    }
    .blog-type {
      display: flex;
      align-items: center;
      margin-left: 10px;
      .icon-type {
        padding-right: 2px;
      }
    }
  }
  .blog-date {
    .icon-calendar {
      padding-right: 2px;
    }
  }

  .blog-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    max-height: 200px;
    &::after {
      position: absolute;
      bottom: 0;
      display: block;
      width: 100%;
      height: 30px;
      content: "";
      z-index: 1;
    }
    /deep/ p {
      margin: 5px 0;
    }
  }

  .blog-footer {
    text-align: right;
    .show-btn {
      margin: 0 10px;
    }
  }
}
</style>
