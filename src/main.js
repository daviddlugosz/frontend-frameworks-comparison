import Vue from 'vue'

// With vuex and router
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

import App from './App'

// Sync Vue router and the Vuex store
sync(store, router)

import ApiService from './common/api.service'

import 'bootstrap'

ApiService.init();

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})
