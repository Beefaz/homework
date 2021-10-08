<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="custom-nav-class">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="w-100 justify-content-evenly">
        <b-nav-item
            v-for="(item, index) in $router.options.routes"
            :key="index"
            :to="item.path"
            :active="$route.path===item.path"
            :class="`d-flex justify-content-center bg-${$sectionColors[item.meta.statusView]} ${$route.path===item.path ? 'active': ''}`"
            link-classes="font-weight-bold"
        >
          {{ item.meta.label }}
        </b-nav-item>
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
<style lang="scss" scoped>
.justify-content-evenly {
  justify-content: space-evenly;
}

.custom-nav-class {
  box-shadow: 0px 0px 3px 0px black;

  li {
    border: inset;
    border-color: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 0px white;
    border-radius: 25px;
    padding: 3px;
    margin: 2px;

    &.active {
      box-shadow: 0px 0px 20px 3px white;
    }

    &:hover {
      box-shadow: 0px 0px 20px 6px white;
    }

    a {
      flex-grow: 1;
      text-align: center;
    }
  }
}
</style>
