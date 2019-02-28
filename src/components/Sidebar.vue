<template>
  <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">VUE</div>
    <div class="list-group list-group-flush">
      <a
        v-for="page in pages"
        v-bind:key="page.path"
        v-on:click="selectPage(page.path)"
        class="list-group-item list-group-item-action bg-light"
      >{{ page.name }}</a>
      <a
        v-on:click="selectPage(null)"
        class="list-group-item list-group-item-action bg-light"
      >Create New</a>
    </div>
  </div>
</template>

<script>
import { PagesService } from '../common/api.service'

export default {
  name: "Sidebar",
  props: {
    refreshInc: 0
  },
  data() {
    return {
      pages: []
    }
  },
  methods: {
    selectPage: function(path) {
      this.$emit('selectPage', path);
    },
    refresh: function() {
      PagesService.getPages()
      .then(({ data }) => {
        this.pages = data;
      })
    }
  },
  watch: {
    refreshInc: function () {
      this.refresh();
    }
  },
  created: function() {
    this.refresh();
  }
};
</script>
