<template>
  <div class="right">
    <div class="header">
      <el-input
        placeholder="请搜索博客标题"
        prefix-icon="el-icon-search"
        size="mini"
        v-model="inputValue"
        @blur="handleBlurSearchInput"
      ></el-input>
      <ul 
        class="ul-search" 
        v-show="searchSelect" 
        @mouseenter="handleMouseEnter" 
        @mouseleave="handleMouseLeave"
      >
        <li class="noblog-item" v-show="noBlogToShow" :key="0">无相关博客</li>
        <li class="search-item" 
          :title="item.title" 
          v-for="item in searchList" 
          :key="item.id"
          @click="handleClickSearchTitle(item.id)"
        > {{ item.title }} </li>
      </ul>
    </div>
    <div class="main">
      <TitleList 
        v-for="item in lists" 
        :title="item.title" 
        :list="item.list" 
        :icon="item.icon"
        :key="item.id"
      ></TitleList>
    </div>
  </div>
</template>

<script>
import TitleList from '@/components/TitleList';
import { throttle } from '@/utils';

export default {
  name: "HomeRight",
  components: {
    TitleList
  },
  data() {
    return {
      lists: [
        {
          id: 1,
          title: '分类',
          icon: '\ue6fc',
          list: [
            {
              id: 1,
              content: 'all',
            }, {
              id: 2,
              content: 'emotion'
            }, {
              id: 3,
              content: 'technology'
            }, {
              id: 4,
              content: 'todo task'
            }
          ]
        }, {
          id: 3,
          title: '友情链接',
          icon: '\ue6e7',
          list: [
            {
              id: 1,
              content: 'rainbow女神的博客',
            }, {
              id: 2,
              content: 'zzy的博客'
            }, {
              id: 3,
              content: '小蓝同学的博客',
            }, {
              id: 4,
              content: '嘉创哥的博客'
            }, {
              id: 5,
              content: '诗和远方的博客'
            }
          ]
        }
      ],
      inputValue: '',
      searchList: [],
      enterSearchList: false
    }
  },
  computed: {
    searchSelect() {
      return Boolean(this.inputValue);
    },
    noBlogToShow() {
      return !this.searchList.length;
    }
  },
  methods: {
    getListData() {
      this.$axios.getDateList({ author: 'willee', page: 1, pageSize: 5 }).then(res => {
        // 当只改变其中一个list不更新？？？
        this.lists.splice(1, 0, this.handleListDataRes(res.data));
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '获取最近文章列表失败'
        })
      });
    },
    handleListDataRes(data) {
      let dataList = data.map(el => ({
        id: el.id,
        content: el.title
      }));
      let tempList = {
        id: 2,
        title: '最近文章',
        icon: '\ue67d',
        list: dataList
      }
      return tempList;
    },
    getSearchList() {
      if(!this.inputValue) {
        return;
      }
      this.$axios.getTitleForKey({ author: 'willee', keyword: this.inputValue }).then(res => {
        this.searchList = res.data;
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '获取下拉列表失败'
        });
      })
    },
    handleClickSearchTitle(id) {
      this.$router.push({ path: '/details', query: { id }});
    },
    handleBlurSearchInput() {
      if(!this.enterSearchList) {
        this.inputValue = '';
      }
    },
    handleMouseEnter() {
      this.enterSearchList = true;
    },
    handleMouseLeave() {
      this.enterSearchList = false;
    }
  },
  created() {
    this.getListData();
    // 这种写法注意
    this.$watch('inputValue', throttle(this.getSearchList, 200, true, this));
  }
};
</script>

<style lang="scss" scoped>
@import 'styles/variations.scss';

.right {
  position: relative;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 20px 0 50px;
  border-left: 1px solid $borderColor;
  .header {
    margin-bottom: 30px;
   .el-input {
      width: 100%;
    }
    .ul-search {
      position: absolute;
      left: 20px;
      top: 35px;
      overflow-y: auto;
      box-sizing: border-box;
      width: calc(100% - 40px);
      max-height: 200px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: white;
      box-shadow: 5px 5px 5px #ddd; 
      font-size: 12px;
      &::-webkit-scrollbar{
        display: none;
      }
      & > li {
        padding: 5px 0 5px 15px;
      }
      .search-item {
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:not(:last-child) {
          border-bottom: 1px solid $borderColor;
        }
        &:hover {
          background: $hoverBackColor;
          color: $hoverFontColor;
        }
      }
      .noblog-item {
        color: #888;
      }
    }
  }

  .main {
    width: 100%;
  }
}
</style>
