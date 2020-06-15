<template>
  <div class="main">
    <Left class="left" :dateList="dateList"></Left>
    <Right class="right"></Right>
  </div>
</template>

<script>
import Left from "./Left";
import Right from "../../components/Right";

export default {
  name: "ArchivesMain",
  components: {
    Left,
    Right
  },
  props: {
    dateList: Array
  }
};
</script>

<style lang="scss" scoped>
@import 'styles/variations.scss';

.main {
  margin-top: 20px;
  @extend .left-right-container;
}
</style>
