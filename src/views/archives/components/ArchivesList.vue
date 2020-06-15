<template>
  <div class="archives-list">
    <h2 class="year">{{ year }}</h2>
    <ul class="list-wrapper">
      <li class="list-item" v-for="item in list" :key="item.id">
        <!-- <span class="circle"></span> -->
        <span class="date">{{ item.date }}</span>
        <span class="title">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArchivesList",
  props: {
    year: Number,
    list: Array
  }
}
</script>

<style lang="scss" scoped>
.archives-list {
  margin-bottom: 30px;
  .year {
    margin-bottom: 10px;
  }
  .list-wrapper {
    .list-item {
      margin-left: 30px;
      &:not(:first-child) {
        margin-top: 5px;
      }

      .date {
        padding-right: 10px;
        position: relative;
          &::before {
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #444;
          content: '';
        }
      }
    }
  }
}
</style>
