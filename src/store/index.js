import Vue from 'vue'
import Vuex from 'vuex'

import pages from './pages.module'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
      pages
    }
})
