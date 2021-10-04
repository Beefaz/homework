<template>
  <div id="app">
    <router-view name="navigation"></router-view>
    <router-view name="content" :key="$route.name" :statusView="$route.meta.statusView"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
</style>
