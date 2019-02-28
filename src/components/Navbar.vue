<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button>
    <button v-if="!editMode" class="btn btn-secondary" v-on:click="changeEditMode()">Edit Page</button>
    <button v-if="editMode" class="btn btn-info" v-on:click="changeEditMode()">Cancel Edit</button>
    <button v-if="editMode" class="btn btn-success" v-on:click="triggerSavePage()">Save Page</button>
    <button class="btn btn-danger" v-on:click="triggerDeletePage()">Delete Page</button>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { CHANGE_EDIT_MODE, SAVE_PAGE, DELETE_PAGE } from "../store/actions.type";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["editMode"])
  },
  methods: {
    changeEditMode: function () {
      this.$store.dispatch(CHANGE_EDIT_MODE);
    },
    triggerSavePage: function () {
      this.$store.dispatch(SAVE_PAGE);
    },
    triggerDeletePage: function () {
      this.$store.dispatch(DELETE_PAGE);
    }
  }
};
</script>
