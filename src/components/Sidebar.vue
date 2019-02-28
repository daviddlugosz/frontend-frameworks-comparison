<template>
  <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">VUE + Router + VUEX</div>
    <div class="list-group list-group-flush">
      <router-link
        v-for="page in pages"
        v-bind:key="page.path"
        v-bind:to="'/page/' + page.path"
        class="list-group-item list-group-item-action bg-light"
      >{{ page.name }}</router-link>
      <router-link
        v-bind:to="'/'"
        class="list-group-item list-group-item-action bg-light"
      >Create New</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapGetters(["pages"])
  }
};
</script>
