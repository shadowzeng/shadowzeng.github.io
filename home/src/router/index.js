import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/view/MainPage'
import About from '@/view/About'
import { resolve } from 'path';

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
      component: resolve => require(['@/view/blog/BlogRead'], resolve)
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/manage',
      name: 'Manage',
      component: resolve => require(['@/view/manage/Manage'], resolve)
    }
  ]
})
