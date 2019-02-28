<template>
  <router-view></router-view>
</template>

<script>
import Home from './views/Home.vue'

export default {
  name: "App",
  components: {
    Home
  }
};
</script>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css";
</style>
