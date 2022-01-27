<template>
  <div id="app" class="vh-100 d-flex flex-column">
    <NavBar/>
    <router-view name="content"></router-view>
  </div>
</template>

<script>

import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {NavBar},
  mounted() {
    console.dir(this.$route);
    document.body.style.minHeight = '100vh';
    document.body.style.background = 'linear-gradient(30deg, #000000 -100%, #28a745 77%, #FFFFFF 100%)';
  }
}
</script>

<style lang="scss" scoped>
</style>
