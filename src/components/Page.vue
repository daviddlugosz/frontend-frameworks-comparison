<template>
  <div id="pageDiv" class="container-fluid">
    <div v-if="pageLoaded && !editMode">
      <h1>{{ page.name }}</h1>
      <div id="content" v-html="page.content"></div>
    </div>
    <div id="edit" v-else-if="!pageLoaded || editMode">
      <input class="form-control" type="text" placeholder="Page Name" v-model="page.name">
      <div id="editorWrapper">
        <textarea id="editor"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import gijgo from "gijgo";
import arrive from "arrive";
import { PagesService } from "../common/api.service";

export default {
  name: "Page",
  props: {
    loadPagePath: null,
    editMode: true,
    savePageInc: 0,
    deletePageInc: 0,
    reloadPageInc: 0
  },
  data() {
    return {
      pageLoaded: false,
      page: {
        name: null,
        content: null,
        path: null
      }
    };
  },
  mounted: function() {
    const componentRef = this;
    $("#pageDiv").arrive("#editor", { existing: true }, function() {
      $("#editor").html(componentRef.page.content);
      $("#editor").editor({
        uiLibrary: "bootstrap4"
      });
    });

    this.init();
  },
  methods: {
    init: async function() {
      const pagePath = this.loadPagePath;
      this.pageLoaded = pagePath != undefined || pagePath != null;
      if (this.pageLoaded) {
        await PagesService.getPage(this.loadPagePath)
          .then(({ data }) => {
            this.page = data;
          })
          .catch(error => {
            alert(error.response.data.error);
          });
        if (this.editMode) {
          const componentRef = this;
          $("#pageDiv").arrive(
            "#editor",
            { onceOnly: true, existing: true },
            function() {
              $("#editor")
                .editor()
                .content(componentRef.page.content);
            }
          );
        }
      } else {
        this.page = {
          name: null,
          content: null,
          path: null
        };

        if (!this.editMode) {
          this.$emit("changeEditMode");
        } else {
          const componentRef = this;
          $("#pageDiv").arrive(
            "#editor",
            { onceOnly: true, existing: true },
            function() {
              $("#editor")
                .editor()
                .content(componentRef.page.content);
            }
          );
        }
      }
    },
    savePage: async function() {
      this.page.content = $("#editor")
        .editor()
        .content();
      if (this.pageLoaded) {
        await PagesService.updatePage(this.loadPagePath, this.page).catch(
          error => {
            alert(error.response.data.error);
          }
        );
        alert("Page succesfully updated!");
        this.$emit("pageSaved", this.loadPagePath);
      } else {
        const createdPath = await PagesService.createPage(this.page)
          .then(response => {
            // allow location header via csor config on server
            return response.headers.location.replace("/page/", "");
          })
          .catch(error => {
            alert(error.response.data.error);
          });
        alert('New page with path "' + createdPath + '" succesfully created!');
        this.$emit("pageSaved", createdPath);
      }
    },
    deletePage: async function() {
      if (this.pageLoaded) {
        await PagesService.deletePage(this.loadPagePath).catch(error => {
          alert(error.response.data.error);
        });
        alert("Page successfully deleted!");
        this.$emit("pageDeleted");
      } else {
        alert(
          "You are on page for creating other pages, so it cannot be deleted, sorry..."
        );
      }
    }
  },
  watch: {
    loadPagePath: function() {
      const pagePath = this.loadPagePath;
      this.pageLoaded = pagePath != undefined || pagePath != null;
      if (this.pageLoaded && this.editMode) {
        this.$emit("changeEditMode");
      }
      this.init();
    },
    savePageInc: function() {
      this.savePage();
    },
    deletePageInc: function() {
      this.deletePage();
    },
    editMode: function() {
      this.init();
    },
    reloadPageInc: function() {
      this.pageLoaded = true;
      if (this.editMode) {
        this.$emit("changeEditMode");
      }
      this.init();
    }
  }
};
</script>

<style>
@import "//cdnjs.cloudflare.com/ajax/libs/gijgo/1.9.11/combined/css/gijgo.min.css";
</style>
