import React, { Component } from 'react';

import { PagesService } from "../common/api.service";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: []
    }
  }

  componentDidMount() {
    this.refresh();
  }

  async refresh() {
    await PagesService.getPages()
      .then(({ data }) => {
        this.setState(state => ({ pages: data }));
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }


  render() {
    return (
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">React</div>
        <div className="list-group list-group-flush">
          {this.state.pages.map(page =>
            <a key={page.path}
              onClick={async () => await this.props.selectPage(page.path)}
              className="list-group-item list-group-item-action bg-light"
            >{page.name}</a>)}

          <a
            onClick={() => this.props.selectPage(null)}
            className="list-group-item list-group-item-action bg-light"
          >Create New</a>
        </div>
      </div>
    );
  }
}

export default Sidebar;
