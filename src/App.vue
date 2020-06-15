<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {
    saveState() {
      this.$store.dispatch('initUserRole', '');
      sessionStorage.setItem('store_state', JSON.stringify(this.$store.state))
    }
  },
  mounted() {
    window.addEventListener('unload', this.saveState);
  }
};
</script>

<style>

body {
  font-family: system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
  color: #555;
  font-weight: 400;
  font-size: 14px;
}

body, ul, h1, h2, h3, h4, h5, h6 {
  padding: 0;
  margin: 0;
}

ul {
  list-style-type: none;
}

button {
  outline: 0 none;
  background: #f8f8f8;
}

hr {
  border: none;
  border-bottom: 1px solid #f8f8f8;
}

a {
  text-decoration: none;
  color: #555;
}

#app {
  width: 70%;
  margin: 50px auto 0;
}


</style>
