<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="custom-nav-class">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="w-100 justify-content-evenly">
        <template
            v-for="(item, index) in $router.options.routes"
        >
          <b-nav-item
              v-if="item.path.includes('/issues')"
              :key="index"
              :to="item.path"
              :active="$route.path===item.path"
              :class="`d-flex justify-content-center bg-${$sectionColors[item.meta.statusView]} ${$route.path===item.path ? 'active': ''}`"
              link-classes="font-weight-bold"
          >
            {{ item.meta.label }}
          </b-nav-item>
        </template>
      </b-navbar-nav>
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
  box-shadow: 0 0 3px 0 black;

  li {
    border: inset;
    border-color: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    box-shadow: 0 0 20px 0 white;
    border-radius: 25px;
    padding: 3px;
    margin: 2px;

    &.active {
      box-shadow: 0 0 20px 3px white;
    }

    &:hover {
      box-shadow: 0 0 20px 6px white;
    }

    a {
      flex-grow: 1;
      text-align: center;
    }
  }
}
</style>
