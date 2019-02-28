import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getPage,
    changeEditMode,
    flushPage,
    setPage,
    setPageName,
    setPageContent,
    setPagePath,
    deletePage,
    setPageLoaded
} from '../store/actions/pageActions'

import arrive from 'arrive'
import gijgo from "gijgo";
// css loaded in index.html because of issues with loader of svg files

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorContentInitLoad: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.setContentToPage = this.setContentToPage.bind(this);
    }

    handleChange(event) {
        event.persist();
        const value = event.target.value;
        this.props.setPageName(this.props.page, value);
    }

    setContentDiv() {
        return { __html: this.props.page.content };
    }

    setContentToPage(content) {
        this.props.setPageContent(this.props.page, content);
    }

    async componentDidMount() {
        const componentRef = this;
        $("#pageDiv").arrive("#editor", { existing: true }, function () {
            $("#editor").html(componentRef.props.page.content);
            $("#editor").editor({
                uiLibrary: "bootstrap4",
                changed: function (e) {
                    const contentData = $(e.target)
                        .editor()
                        .content();
                    componentRef.setContentToPage(contentData);
                }
            });
        });

        await this.init();
    }

    componentDidUpdate(prevProps) {
        // watch page.path
        if (prevProps.page.path != this.props.page.path) {
            this.init();
        }
    }

    async componentWillReceiveProps(newProps) {
        if (newProps.match.params.pagePath != newProps.page.path) {
            await this.props.setPagePath(this.props.page, newProps.match.params.pagePath);
        }
    }

    async init() {
        const pagePath = this.props.match.params.pagePath;
        if (pagePath != undefined) {
            await this.props.setPagePath(this.props.page, pagePath);
            await this.props.setPageLoaded(true);
        } else {
            await this.props.setPageLoaded(false);
        }

        // diplay existing mode
        if (this.props.pageLoaded) {
            await this.props.getPage(this.props.page.path);

            if (this.props.editMode) {
                this.props.changeEditMode(true);

                const componentRef = this;
                $("#pageDiv").arrive(
                    "#editor",
                    { onceOnly: true, existing: true },
                    function () {
                        $("#editor")
                            .editor()
                            .content(componentRef.props.page.content);
                    }
                );
            }
        }
        else {
            this.props.flushPage();

            if (!this.props.editMode) {
                this.props.changeEditMode(false);
            } else {
                const componentRef = this;
                $("#pageDiv").arrive(
                    "#editor",
                    { onceOnly: true, existing: true },
                    function () {
                        $("#editor")
                            .editor()
                            .content(componentRef.props.page.content);
                    }
                );
            }
        }
    }

    render() {
        return (
            <div id="pageDiv" className="container-fluid">
                {
                    this.props.pageLoaded && !this.props.editMode ?
                        <div>
                            <h1>{this.props.page.name}</h1>
                            <div id="content" dangerouslySetInnerHTML={this.setContentDiv()}></div>
                        </div>
                        : null
                }
                {
                    !this.props.pageLoaded || this.props.editMode ?
                        <div id="edit">
                            <input className="form-control" type="text" placeholder="Page Name" onChange={this.handleChange} value={this.props.page.name} />
                            <div id="editorWrapper">
                                <textarea id="editor"></textarea>
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

Page.propTypes = {
    editMode: PropTypes.bool.isRequired,
    page: PropTypes.object.isRequired,
    pageLoaded: PropTypes.bool.isRequired,

    setPageName: PropTypes.func.isRequired,
    setPagePath: PropTypes.func.isRequired,
    setPageContent: PropTypes.func.isRequired,
    setPageLoaded: PropTypes.func.isRequired,
    flushPage: PropTypes.func.isRequired,
    changeEditMode: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    editMode: state.pages.editMode,
    page: state.pages.page,
    pageLoaded: state.pages.pageLoaded
})

export default connect(mapStateToProps,
    {
        getPage,
        changeEditMode,
        flushPage,
        setPage,
        setPageName,
        setPageContent,
        setPagePath,
        deletePage,
        setPageLoaded
    }
)(Page);