<template>
  <div id="pageDiv" class="container-fluid">
    <div v-if="pageLoaded && !editMode">
      <h1>{{ name }}</h1>
      <div id="content" v-html="content"></div>
    </div>
    <div id="edit" v-else-if="!pageLoaded || editMode">
      <input class="form-control" type="text" placeholder="Page Name" v-model="name">
      <div id="editorWrapper">
        <textarea id="editor"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  GET_PAGE,
  CHANGE_EDIT_MODE,
  FLUSH_PAGE,
  SET_PAGE,
  SET_PAGE_NAME,
  SET_PAGE_CONTENT,
  SET_PAGE_PATH,
  DELETE_PAGE,
  SET_PAGE_LOADED
} from "../store/actions.type";

import gijgo from "gijgo";
import arrive from "arrive";

export default {
  name: "Page",
  props: {
    pagePath: null
  },
  computed: {
    ...mapGetters(["editMode", "pageLoaded"]),
    name: {
      set(name) {
        this.$store.dispatch(SET_PAGE_NAME, name);
      },
      get() {
        return this.$store.getters.page.name;
      }
    },
    content: {
      set(content) {
        this.$store.dispatch(SET_PAGE_CONTENT, content);
      },
      get() {
        return this.$store.getters.page.content;
      }
    },
    path: {
      set(path) {
        this.$store.dispatch(SET_PAGE_PATH, path);
      },
      get() {
        return this.$store.getters.page.path;
      }
    }
  },
  mounted: function() {
    const componentRef = this;
    $("#pageDiv").arrive("#editor", { existing: true }, function() {
      $("#editor").html(componentRef.content);
      $("#editor").editor({
        uiLibrary: "bootstrap4",
        changed: function(e) {
          const contentData = $(e.target)
            .editor()
            .content();
          componentRef.$store.dispatch(SET_PAGE_CONTENT, contentData);
        }
      });
    });

    this.init();
  },
  watch: {
    pagePath: function() {
      this.init();
    }
  },
  methods: {
    init: function() {
      if (this.pagePath != undefined) {
        this.path = this.pagePath;
        this.$store.dispatch(SET_PAGE_LOADED, true);
      } else {
        this.$store.dispatch(SET_PAGE_LOADED, false);
      }

      // diplay existing mode
      if (this.pageLoaded) {
        this.$store.dispatch(GET_PAGE);
        if (this.editMode) {
          const componentRef = this;
          $("#pageDiv").arrive(
            "#editor",
            { onceOnly: true, existing: true },
            function() {
              $("#editor")
                .editor()
                .content(componentRef.content);
            }
          );
        }
        // create new mode
      } else {
        this.$store.dispatch(FLUSH_PAGE);

        if (!this.editMode) {
          // enforce edit mode
          this.$store.dispatch(CHANGE_EDIT_MODE);
        } else {
          const componentRef = this;
          $("#pageDiv").arrive(
            "#editor",
            { onceOnly: true, existing: true },
            function() {
              $("#editor")
                .editor()
                .content(componentRef.content);
            }
          );
        }
      }
    }
  }
};
</script>

<style>
@import "//cdnjs.cloudflare.com/ajax/libs/gijgo/1.9.11/combined/css/gijgo.min.css";
</style>
