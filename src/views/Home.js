import React, { Component } from 'react';
import './Home.css';

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Page from "../components/Page";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      editMode: true,
      loadPagePath: null
    }

    // ES6 React.Component doesn't auto bind methods to itself.
    this.changeEditMode = this.changeEditMode.bind(this);
    this.triggerSavePage = this.triggerSavePage.bind(this);
    this.triggerDeletePage = this.triggerDeletePage.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.pageSaved = this.pageSaved.bind(this);
    this.pageDeleted = this.pageDeleted.bind(this);
  }

  componentDidMount() {
    // bootstrap theme functionality
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");[]
    });
  }

  async changeEditMode() {
    if (this.state.loadPagePath != null) {
      await this.setState(state => ({ editMode: !state.editMode }));
      await this.refs.pageComponent.init();
    }
    else {
      await this.setState(state => ({ editMode: true }));
    }
  }
  async triggerSavePage() {
    await this.refs.pageComponent.savePage();
  }
  async triggerDeletePage() {
    await this.refs.pageComponent.deletePage();
  }
  async selectPage(path) {
    await this.refs.pageComponent.flu
    await this.setState((state) => ({ loadPagePath: path }));
    if (path != null) {
      await this.setState(state => ({ editMode: false }));
    }
    await this.refs.pageComponent.init();
  }
  async pageSaved(path) {
    await this.refs.sidebarComponent.refresh();
    await this.setState((state) => ({ loadPagePath: path }));
    await this.setState(state => ({ editMode: false }));
    await this.refs.pageComponent.init();
  }
  async pageDeleted() {
    await this.refs.sidebarComponent.refresh();
    await this.setState((state) => ({ loadPagePath: null }));
    await this.setState(state => ({ editMode: true }));
    await this.refs.pageComponent.init();
  }

  render() {
    return (
      <div className="d-flex" id="wrapper">
        <Sidebar
          ref="sidebarComponent"
          selectPage={this.selectPage}
        />

        <div id="page-content-wrapper">
          <Navbar
            editMode={this.state.editMode}
            changeEditMode={this.changeEditMode}
            triggerSavePage={this.triggerSavePage}
            triggerDeletePage={this.triggerDeletePage}
          />

          <Page
            ref="pageComponent"
            editMode={this.state.editMode}
            loadPagePath={this.state.loadPagePath}
            changeEditMode={this.changeEditMode}
            pageSaved={this.pageSaved}
            pageDeleted={this.pageDeleted}
          />
        </div>
      </div>
    );
  }
}

export default Home;
