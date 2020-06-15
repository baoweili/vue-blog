<template>
  <div class="achives">
    <Header current="archives"></Header>
    <Main :dateList="dataList"></Main>
  </div>
</template>

<script>
import Header from '../components/Header';
import Main from './components/Main';
import { formatDate, getDate } from '@/utils';

export default {
  name: "Achives",
  components: {
    Header,
    Main
  },
  data() {
    return {
      dataList: []
    }
  },
  methods: {
    getDateList() {
      const author = 'willee';
      this.$axios.getDateList({ author }).then(res => {
        this.dataList = this.handleResData(res.data);
      }).catch(err => {
        this.$message({ type: 'warning', message: '获取时间列表失败' });
      })
    },
    handleResData(data) {
      // dataList数据格式 [{ id, year, list: [] }]
      let dateList = [], len = 0;
      data.forEach(el => {
        let createTime = el.createTime,
            date = formatDate(createTime, '/');
        let { year } = getDate(createTime, ['year']);
        let tempData = {
          date,
          id: el.id,
          title: el.title
        };
        if(len && dateList[len - 1].year === year) {
          dateList[len - 1].list.push(tempData);
        } else {
          dateList.push({
            id: year,
            year: year,
            list: [tempData]
          });
          len++;
        }
      });
      return dateList;
    }
  },
  created() {
    this.getDateList();
  }
}
</script>

<style lang="scss" scoped>

</style>