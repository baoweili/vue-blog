<template>
  <div class="details">
    <BlogDetails class="left"></BlogDetails>
    <Aside class="right"></Aside>
  </div>
</template>

<script>
import BlogDetails from '../components/BlogDetails';
import Aside from '../components/Aside';

export default {
  name: "ViewBlog",
  components: {
    BlogDetails,
    Aside
  },
  created() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
</script>

<style lang='scss' scoped>
@import 'styles/variations.scss';

.details {
  @extend .left-right-container;
}
</style>
