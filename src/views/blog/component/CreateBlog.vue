<template>
  <div class="create-blog">
    <h1 class="title">{{ title }}</h1>
    <div class="main">
      <TitleInput class="title-input" title="博客标题" :value.sync="curBlog.title"></TitleInput>
      <TitleSelect class="title-select" title="博客分类" :options="options" :value.sync="curBlog.type"></TitleSelect>
      <!-- <TitleInput class="title-input" type="textarea" :rows="8" title="博客内容" :value.sync="curBlog.content"></TitleInput> -->
      <TitleEditor class="title-input" title="博客内容" :value.sync="curBlog.content"></TitleEditor>
    </div>
    <div class="footer">
      <router-link to="/admin">
        <el-button class="cancel-btn" size="medium">取消</el-button>
      </router-link>
      <el-button type="primary" @click="handleBlog" size="medium">{{ btnContent }}</el-button>
    </div>
  </div>
</template>

<script>
import TitleInput from '@/components/TitleInput.vue';
import TitleSelect from '@/components/TitleSelect.vue';
import TitleEditor from '@/components/TitleEditor.vue';
import { countWord } from '@/utils';

export default {
  name: "CreateBlog",
  props: {
    title: String,
    blog: Object,
    btnContent: String
  },
  components: {
    TitleInput,
    TitleSelect,
    TitleEditor
  },
  data() {
    return {
      options: [
        {
          label: "emotion",
          value: "emotion"
        }, {
          label: "technology",
          value: "technology"
        }, {
          label: "todo task",
          value: "todo task"
        }
      ],
      curBlog: this.blog
    }
  },
  methods: {
    handleBlog() {
      if(!this.checkBlogData(this.curBlog)) {
        return;
      }
      this.$emit('handleBlog', { ...this.curBlog, author: 'willee' });
    },
    checkBlogData(blog) {
      const { title, content } = blog;
      if(countWord(title) > 40) {
        this.$message({
          type: 'warning',
          message: '博客标题过长，超过了20个字，请删减'
        });
        return false;
      }
      if(!content) {
        this.$message({
          type: 'warning',
          message: '博客内容不能为空'
        });
        return false;
      }
      return true;
    }
  },
  watch: {
    blog(val) {
      this.curBlog = {...val};
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'styles/variations.scss';

.create-blog {
  .title {
    padding-bottom: 20px;
    border-bottom: 1px solid $borderColor;
  }
  .main {
    margin-top: 20px;
    padding: 10px 5%;
  }
  .title-input, 
  .title-select {
    margin-bottom: 30px;
  }
  .footer {
    text-align: right;
    margin-right: 5%;
    .cancel-btn {
      margin-right: 20px;
    }
  }
}
</style>
