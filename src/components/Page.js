import React, { Component } from 'react';

import { PagesService } from "../common/api.service";

import arrive from 'arrive';
import gijgo from "gijgo";
// css loaded in index.html because of issues with loader of svg files

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: {
        name: "",
        content: null,
        path: null
      },
      pageLoaded: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.persist();
    const value = event.target.value;
    this.setState((state) => ({
      page: {
        name: value != null ? value : "",
        content: this.state.page.content,
        path: this.props.loadPagePath
      }
    }))
  }

  setContentDiv() {
    return { __html: this.state.page.content };
  }

  componentDidMount() {
    const componentRef = this;
    $("#pageDiv").arrive("#editor", { existing: true }, function () {
      $("#editor").html(componentRef.state.page.content);
      $("#editor").editor({
        uiLibrary: "bootstrap4"
      });
    });

    this.init();
  }

  async init() {
    const pagePath = this.props.loadPagePath;
    await this.setState((state) => ({ pageLoaded: pagePath != undefined || pagePath != null }));
    if (this.state.pageLoaded) {
      await PagesService.getPage(this.props.loadPagePath)
        .then(async ({ data }) => {
          await this.setState((state) => ({ page: data }));
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
      if (this.props.editMode) {
        const componentRef = this;
        $("#pageDiv").arrive(
          "#editor",
          { onceOnly: true, existing: true },
          function () {
            $("#editor")
              .editor()
              .content(componentRef.state.page.content);
          }
        );
      }
    } else {
      await this.setState((state) => ({
        page: {
          name: "",
          content: null,
          path: null
        }
      }));

      if (!this.props.editMode) {
        await this.props.changeEditMode();
      } else {
        const componentRef = this;
        $("#pageDiv").arrive(
          "#editor",
          { onceOnly: true, existing: true },
          function () {
            $("#editor")
              .editor()
              .content(componentRef.state.page.content);
          }
        );
      }
    }
  }



  // this.setState(state => ({ pages: data }));
  async savePage() {
    await this.setState(state => ({
      page: {
        name: this.state.page.name,
        path: this.state.page.path,
        content: $("#editor").editor().content()
      }
    }));
    if (this.state.pageLoaded) {
      await PagesService.updatePage(this.props.loadPagePath, this.state.page)
        .catch((error) => {
          alert(error.response.data.error);
        });
      alert("Page succesfully updated!");
      await this.props.pageSaved(this.props.loadPagePath)
    } else {
      const createdPath = await PagesService.createPage(this.state.page)
        .then(response => {
          // allow location header via csor config on server
          return response.headers.location.replace("/page/", "");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
      alert('New page with path "' + createdPath + '" succesfully created!');
      await this.props.pageSaved(createdPath);
    }
  }

  async deletePage() {
    if (this.state.pageLoaded) {
      await PagesService.deletePage(this.props.loadPagePath)
        .catch((error) => {
          alert(error.response.data.error);
        });
      alert("Page successfully deleted!");
      await this.props.pageDeleted();
    } else {
      alert(
        "You are on page for creating other pages, so it cannot be deleted, sorry..."
      );
    }
  }

  render() {
    return (
      <div id="pageDiv" className="container-fluid">
        {
          this.state.pageLoaded && !this.props.editMode ?
            <div>
              <h1>{this.state.page.name}</h1>
              <div id="content" dangerouslySetInnerHTML={this.setContentDiv()}></div>
            </div>
            : null
        }
        {
          !this.state.pageLoaded || this.props.editMode ?
            <div id="edit">
              <input className="form-control" type="text" placeholder="Page Name" onChange={this.handleChange} value={this.state.page.name} />
              <div id="editorWrapper">
                <textarea id="editor"></textarea>
                {/* textarea element here is created and destroyed by jquery because of issues with destroying gijgo editor */}
              </div>
            </div>
            : null
        }
      </div>
    );
  }
}

export default Page;
