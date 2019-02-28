<template>
  <div class="d-flex" id="wrapper">
    <Sidebar :refreshInc="refreshInc" v-on:selectPage="selectPage" />

    <div id="page-content-wrapper">
      <Navbar
        :editMode="editMode"
        v-on:changeEditMode="changeEditMode()"
        v-on:triggerSavePage="triggerSavePage()"
        v-on:triggerDeletePage="triggerDeletePage()"
      />

      <Page
        :savePageInc="savePageInc"
        :editMode="editMode"
        :loadPagePath="loadPagePath"
        :deletePageInc="deletePageInc"
        :reloadPageInc="reloadPageInc"
        v-on:pageSaved="pageSaved"
        v-on:pageDeleted="pageDeleted"
        v-on:changeEditMode="changeEditMode()"
      />

    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Page from "../components/Page";

export default {
  name: "Home",
  components: {
    Sidebar,
    Navbar,
    Page
  },
  data() {
    return {
      editMode: true,
      refreshInc: 0,
      savePageInc: 0,
      deletePageInc: 0,
      reloadPageInc: 0,
      loadPagePath: null
    };
  },
  methods: {
    changeEditMode: function() {
      this.refreshInc++;
      this.editMode = !this.editMode;
    },
    triggerSavePage: function() {
      this.savePageInc++;
    },
    triggerDeletePage: function() {
      this.deletePageInc++;
    },
    selectPage: function(path) {
      this.refreshInc++;
      this.loadPagePath = path;
    },
    pageSaved: function(path) {
      this.refreshInc++;
      if (this.loadPagePath == path) {
        this.reloadPageInc++;
      }
      this.loadPagePath = path;
    },
    pageDeleted: function() {
      this.refreshInc++;
      this.loadPagePath = null;
    }
  },

  // bootstrap theme functionality
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
