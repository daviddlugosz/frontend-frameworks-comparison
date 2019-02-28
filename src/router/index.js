import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'
import Page from '../components/Page.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          component: Page,
          props: true
        },
        {
          path: '/page/:pagePath?',
          component: Page,
          props: true
        }
      ]
    }
  ]
})
