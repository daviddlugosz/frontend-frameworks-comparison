import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeEditMode, savePage, deletePage, setPageLoaded } from '../store/actions/pageActions'
import { withRouter } from 'react-router-dom'

class Navbar extends Component {
    async triggerSavePage() {
        const newPath = await this.props.savePage(this.props.page, this.props.pageLoaded);
        if (newPath) {
            this.props.history.push('/page/' + newPath);
        }
        else {
            this.props.history.go(0);
        }
        
    }
    
    async triggerDeletePage () {
        await this.props.deletePage(this.props.pageLoaded, this.props.page.path);
        this.props.setPageLoaded(false);
        this.props.changeEditMode(false);
        this.props.history.push('/');
    }

    triggerChangeEditMode() {
        if (this.props.pageLoaded) {
            this.props.changeEditMode(this.props.editMode);
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <button className="btn btn-primary" id="menu-toggle">
                    Toggle Menu
                </button>
                {
                    !this.props.editMode 
                    ?   <button className="btn btn-secondary" onClick={() => this.triggerChangeEditMode()}>
                            Edit Page
                        </button> 
                    :   null 
                }
                {
                    this.props.editMode 
                    ?   <button className="btn btn-info" onClick={() => this.triggerChangeEditMode()}>
                            Cancel Edit
                        </button>
                    :   null
                }
                {
                    this.props.editMode
                    ?   <button className="btn btn-success" onClick={() => this.triggerSavePage()}>
                            Save Page
                        </button>
                    :   null
                }

                <button className="btn btn-danger" onClick={() => this.triggerDeletePage()}>
                    Delete Page
                </button>
            </nav>
        );
    }
}

Navbar.propTypes = {
    editMode: PropTypes.bool.isRequired,
    page: PropTypes.object.isRequired,
    pageLoaded: PropTypes.bool.isRequired,

    changeEditMode: PropTypes.func.isRequired,
    savePage: PropTypes.func.isRequired,
    deletePage: PropTypes.func.isRequired,
    setPageLoaded: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    editMode: state.pages.editMode,
    page: state.pages.page,
    pageLoaded: state.pages.pageLoaded
})

export default connect(mapStateToProps, { changeEditMode, savePage, deletePage, setPageLoaded })(withRouter(Navbar));