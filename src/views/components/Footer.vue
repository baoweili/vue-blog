<template>
  <div class="footer">
    Copyright © 2019 Jswei
    <img class="nofancy-img" src="@/assets/styles/images/police.png" />
    <span>粤ICP备19097290号-1</span>
  </div>
</template>

<script>
export default {
  name: "HomeFooter"
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  font-size: 12px;
  .nofancy-img {
    width: 16px;
    margin: 0 4px;
  }
}
</style>
