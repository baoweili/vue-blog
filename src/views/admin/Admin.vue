<template>
  <div class="admin">
    <router-view class="left"></router-view>
    <Aside class="right"></Aside>
  </div>
</template>

<script>
import Aside from '../components/Aside.vue';

export default {
  name: "Admin",
  components: {
    Aside
  },

}
</script>

<style lang='scss' scoped>
@import 'styles/variations.scss';

.admin {
  @extend .left-right-container;
}
</style>
