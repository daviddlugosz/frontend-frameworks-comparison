import React, { Component } from 'react';
import './Home.css';

import { Route, Switch } from 'react-router'

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Page from "../components/Page";


class Home extends Component {
    componentDidMount() {
        // bootstrap theme functionality
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    }

    render() {
        return (
            <div className="d-flex" id="wrapper">
                <Sidebar />

                <div id="page-content-wrapper">

                    <Navbar />
                    <Switch>
                        <Route path="/page/:pagePath?" component={Page} />
                        <Route path="/" component={Page} />
                    </Switch>

                </div>
            </div>
        );
    }
}


export default Home;