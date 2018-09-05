import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/MainPage'
import About from '@/views/about/About'
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
      path: '/test',
      component: r => require.ensure([], () => r(require('@/views/blog/BlogItem')), 'TestPage')
    },
    {
      path: '/blog',
      name: 'Blog',
      component: resolve => require(['@/views/blog/Blog'], resolve)
      // ,
      // children: [
      //   {
      //     path: '/readBlog',
      //     component: resolve => require(['@/views/Blog/BlogRead'], resolve)
      //   }
      // ]
    },
    {
      path: '/readBlog',
      component: resolve => require(['@/views/blog/BlogRead'], resolve)
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/manage',
      name: 'Manage',
      component: resolve => require(['@/views/manage/Manage'], resolve)
    }
  ]
})
