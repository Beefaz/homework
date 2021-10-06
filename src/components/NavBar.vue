<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="custom-nav-class">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="w-100 justify-content-evenly">
        <b-nav-item
            to="/"
            :active="$route.path==='/'"
            :class="`bg-${sectionColors.new} d-flex justify-content-center`"
            link-classes="font-weight-bold"
        >
          New issue
        </b-nav-item>
        <b-nav-item
            to="/issues/open"
            :active="$route.path==='/issues/open'"
            :class="`bg-${sectionColors.open} d-flex justify-content-center`"
            link-classes="font-weight-bold"
        >
          Open issues
        </b-nav-item>
        <b-nav-item
            to="/issues/done"
            :active="$route.path==='/issues/done'"
            :class="`bg-${sectionColors.done} d-flex justify-content-center`"
            link-classes="font-weight-bold"
        >
          Done issues
        </b-nav-item>
        <b-nav-item
            to="/issues/trashed"
            :active="$route.path==='/issues/trashed'"
            :class="`bg-${sectionColors.trashed} d-flex justify-content-center`"
            link-classes="font-weight-bold"
        >
          Trashed issues
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'nav-bar',
  data(){
    return {
      sectionColors: this.$sectionColors,
    }
  }
}
</script>
<style lang="scss" scoped>
.justify-content-evenly {
  justify-content: space-evenly;
}
.custom-nav-class {
  box-shadow: 0px 0px 3px 0px black;
  li {
    border: inset;
    border-color: rgba(255,255,255,0.5);
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 0px white;
    border-radius: 25px;
    padding: 3px;
    margin: 2px;
  }
}
</style>
