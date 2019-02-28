import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store'
import './index.css';

import ApiService from './common/api.service'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Root from './Root'

ApiService.init();

const app = document.getElementById('app')
ReactDOM.render(<Root store={store} />, app);