import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './views/Home'

// Create an enhanced history that syncs navigation events with the store

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={Home} >
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root