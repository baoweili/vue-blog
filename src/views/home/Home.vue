<template>
  <div class="home">
    <Header current="home"></Header>
    <Main></Main>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
import Main from "./components/Main";

export default {
  name: "home",
  components: {
    Header,
    Main
  }
};
</script>
