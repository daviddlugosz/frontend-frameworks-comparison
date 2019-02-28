import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-primary" id="menu-toggle">
          Toggle Menu
                </button>
        {
          !this.props.editMode
            ? <button className="btn btn-secondary" onClick={this.props.changeEditMode}>
              Edit Page
                        </button>
            : null
        }
        {
          this.props.editMode
            ? <button className="btn btn-info" onClick={this.props.changeEditMode}>
              Cancel Edit
                        </button>
            : null
        }
        {
          this.props.editMode
            ? <button className="btn btn-success" onClick={this.props.triggerSavePage}>
              Save Page
                        </button>
            : null
        }

        <button className="btn btn-danger" onClick={this.props.triggerDeletePage}>
          Delete Page
                </button>
      </nav>
    );
  }
}

export default Navbar;
