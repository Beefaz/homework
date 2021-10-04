<template>
  <b-navbar toggleable="lg" type="dark" variant="info">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="w-100 justify-content-evenly">
        <b-nav-item to="/" class="router-link-exact-active">New issue</b-nav-item>
        <b-nav-item to="/issues/open" class="router-link-exact-active">Open issues</b-nav-item>
        <b-nav-item to="/issues/done" class="router-link-exact-active">Done issues</b-nav-item>
        <b-nav-item to="/issues/trashed" class="router-link-exact-active">Trashed issues</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'nav-bar',
}
</script>
<style lang="css" scoped>
.justify-content-evenly {
  justify-content: space-evenly;
}
</style>
