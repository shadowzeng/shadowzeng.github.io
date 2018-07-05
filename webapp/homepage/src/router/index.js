import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/view/MainPage'
import Blog from '@/view/Blog'
import About from '@/view/About'

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
      component: Blog,
      children: [
        
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
