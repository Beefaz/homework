<template>
  <div
      id="app"
      ref="app"
      class="vh-100 d-flex flex-column"
      :class="routeClass"
  >
    <RouterView name="navigation"/>
    <div class="custom-scroll w-100 h-100 overflow-auto my-1 px-1 px-sm-5">
      <transition :name="`slide-${transitionDirection}`">
        <RouterView
            :key="$route.fullPath"
            name="content"
        />
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      transitionDirection: 'left',
    }
  },
  computed: {
    routeClass() {
      return this.$route.meta.statusView ? `app-background--${this.$route.meta.statusView}` : '';
    },
  },
  watch: {
    '$route': {
      handler(to, from) {
        const routes = Object.values(this.$router.options.routes).map(item => item.name);
        if (routes.indexOf(from.name) < routes.indexOf(to.name)) {
          this.transitionDirection = 'left';
        } else {
          this.transitionDirection = 'right';
        }
      }
    },
    immediate: true,
  },
}
</script>
<style lang="scss" scoped>
@import "./assets/scss/index.scss";

.custom-scroll {
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 10%);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 50%);
    border-radius: 5px;
  }
}

.slide-left-enter {
  transform: translateX(100%);
}

.slide-left-enter-active {
  transition: transform 0.5s ease-out;
}

.slide-left-enter-to,
.slide-left-leave {
  transform: translateX(0);
}

.slide-left-leave-active {
  transition: transform 0.5s ease-out;
  position: absolute;
  width: 100%;
}

.slide-left-leave-to {
  transform: translateX(-100%);
}


.slide-right-enter {
  transform: translateX(-100%);
}

.slide-right-enter-active {
  transition: transform 0.5s ease-out;
}

.slide-right-enter-to,
.slide-right-leave {
  transform: translateX(0);
}

.slide-right-leave-active {
  transition: transform 0.5s ease-out;
  position: absolute;
  width: 100%;
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
