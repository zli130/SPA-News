import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Source from '@/components/Source'
import About from '@/components/About'

// for IE Vue
require('es6-promise').polyfill()

Vue.use(Router)
Vue.use(require('vue-moment'))
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/news',
      name: 'Source',
      component: Source
    }
  ]
})
