<template>
  <div class="title-list">
    <div class="title">
      <i class="iconfont">{{ icon }}</i>
      <span class="title-name">{{ title }}</span>
    </div>
    <ul class="list">
      <li class="list-item" :title="item.content" @click="handleClickContent(item.content, item.id)" v-for="item in titleList" :key="item.id">
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TitleList",
  props: {
    title: String,
    list: Array,
    icon: String
  },
  data() {
    return {
      titleList: [...this.list]
    }
  },
  methods: {
    handleClickContent(content, id) {
      if(this.title === '分类') {
        if(content === 'all') {
          content = '';
        }
        this.$store.dispatch('changeType', content);
      } else if(this.title === '最近文章') {
        this.$router.push({ path: '/details', query: { id }});
      }
    },
    getRecentBlog() {
      this.$axios.getDateList({ author: 'willee', page: 1, pageSize: 5}).then(res => {
        this.titleList = this.handleResData(res.data);
      }).catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'styles/variations.scss';

.title-list {
  margin-bottom: 30px;
  .title {
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid $borderColor;
    &-name {
      padding-left: 2px;
    }
  }
  .list {
    &-item {
      cursor: pointer;
      padding: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: $hoverFontColor;
        background: $hoverBackColor;
        border-radius: 2px;
      }
    }
  }
}
</style>
