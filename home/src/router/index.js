import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/view/MainPage'
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
      component: resolve => require(['@/view/Blog'], resolve)
      // ,
      // children: [
      //   {
      //     path: '/readBlog',
      //     component: resolve => require(['@/view/Blog/BlogRead'], resolve)
      //   }
      // ]
    },
    {
      path: '/readBlog',
      component: resolve => require(['@/view/Blog/BlogRead'], resolve)
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
