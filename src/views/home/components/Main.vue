<template>
  <div class="main">
    <Left class="left" :permission="permission" :detailsUrl="detailsUrl"></Left>
    <Right class="right"></Right>
  </div>
</template>

<script>
import Left from "../../components/Left";
import Right from "../../components/Right";

export default {
  name: "HomeMain",
  components: {
    Left,
    Right
  },
  data() {
    return {
      permission: ['read'],
      detailsUrl: '/details',
    }
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
