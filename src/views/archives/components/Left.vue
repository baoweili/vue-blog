<template>
  <div class="left">
    <div class="archievs-wrapper">
      <ArchivesList v-for="item in dateList" :year="item.year" :list="item.list" :key="item.id"></ArchivesList>
    </div>  
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../../components/Footer";
import ArchivesList from "./ArchivesList";
export default {
  name: "ArchivesLeft",
  components: {
    Footer,
    ArchivesList
  },
  props: {
    dateList: Array
  }
};
</script>

<style lang="scss" scoped>

</style>
