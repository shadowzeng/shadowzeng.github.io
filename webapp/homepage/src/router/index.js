import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Blog from '@/components/Blog'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
