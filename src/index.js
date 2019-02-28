import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/Home';

import ApiService from './common/api.service'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ApiService.init();

const app = document.getElementById('app')
ReactDOM.render(<Home />, app);
