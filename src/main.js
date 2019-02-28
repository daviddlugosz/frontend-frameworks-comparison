import Vue from 'vue'
import App from './App'

import ApiService from './common/api.service'

import 'bootstrap'

ApiService.init();

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
