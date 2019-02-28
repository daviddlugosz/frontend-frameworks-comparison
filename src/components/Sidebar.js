import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPages, getPage } from '../store/actions/pageActions'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

class Sidebar extends Component {
    componentDidMount() {
        this.props.getPages();
    }

    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">React + Redux + Router</div>
                <div className="list-group list-group-flush">
                    {
                        this.props.pages.map(page =>
                            <NavLink key={page.path}
                                to={'/page/' + page.path}
                                className="colorOverride list-group-item list-group-item-action bg-light"
                            >
                                {page.name}
                            </NavLink>)
                    }

                    <NavLink
                        to="/"
                        className="colorOverride list-group-item list-group-item-action bg-light"
                    >
                        Create New
                    </NavLink>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    pages: PropTypes.array.isRequired,
    editMode: PropTypes.bool.isRequired,

    getPages: PropTypes.func.isRequired,
    getPage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    pages: state.pages.pages,
    editMode: state.pages.editMode
})

export default connect(mapStateToProps, { getPages, getPage })(Sidebar);