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
export default {
  name: "Navbar",
  props: {
    editMode: false
  },
  methods: {
    changeEditMode: function () {
      this.$emit('changeEditMode');
    },
    triggerSavePage: function () {
      this.$emit('triggerSavePage');
    },
    triggerDeletePage: function () {
      this.$emit('triggerDeletePage');
    }
  }
};
</script>
