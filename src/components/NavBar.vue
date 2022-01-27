<template>
  <BNavbar
      toggleable="md"
      type="dark"
      class="custom-nav-class"
  >
    <BNavbarToggle target="nav-collapse"/>
    <BCollapse
        id="nav-collapse"
        is-nav
    >
      <BNavbarNav>
        <BNavItem
            v-for="(item, index) in $router.options.routes"
            :key="index"
            :to="item.path"
            :class="`d-flex justify-content-center bg-${$sectionClassColors[item.meta.statusView]} ${$route.path===item.path ? 'active': ''}`"
            link-classes="font-weight-bold"
        >
          {{ item.meta.label }}
        </BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script>

export default {
  name: 'nav-bar',
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}

.custom-nav-class {
  box-shadow: 0 0 3px 0 #000000;
  padding: 10px;

  .navbar-collapse.show {
    padding-top: 10px;
  }

  ul {
    gap: 10px;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }

  li {
    width: 150px;
    border: inset;
    border-color: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    box-shadow: 0 0 20px 0 #FFFFFF;
    border-radius: 25px;
    padding: 3px;
    margin: 2px;

    &.active a {
      box-shadow: -6px 10px 20px -5px inset #000000, 0px 0px 9px -3px inset #000000;
      border-radius: 25px;
    }

    &:hover {
      box-shadow: 0 0 20px 6px #FFFFFF;
      transition: 0.5s ease-out;
    }

    a {
      flex: 1 1 auto;
      text-align: center;
      box-shadow: -6px 10px 10px 0px #000000, 4px -5px 10px 0px inset #000000;
      border-radius: 25px;
    }
  }
}
</style>
