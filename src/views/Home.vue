<template>
  <div class="d-flex" id="wrapper">
    <Sidebar/>
    <div id="page-content-wrapper">
      <Navbar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_PAGES
} from "../store/actions.type";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default {
  name: "Home",
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    ...mapGetters(["page"])
  },
  created: function () {
    this.$store.dispatch(GET_PAGES);
  },
  mounted: function() {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
};
</script>

<style>
@import "../assets/styles/simple-sidebar.css";
</style>
