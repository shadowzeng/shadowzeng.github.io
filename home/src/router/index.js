import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/about/About'
import { resolve } from 'path';

Vue.use(Router)

export const mainNavRoutes = [
  {
    path: '',
    name: '首页',
    component: Home
  },
  {
    path: '/blog',
    name: '文章',
    redirect:'/blog/list', // 重定向到/blog/list
    component: resolve => require(['@/views/MainPage'], resolve),
    children: [
      {
        path: 'list',  // 注意不要写成 '/list'
        component: resolve => require(['@/views/blog/list/index'], resolve)
      },
      {
        path: 'read',
        component: resolve => require(['@/views/blog/read/index'], resolve)
      }
    ]
  },
  {
    path: '/project',
    name: '项目',
    component: () => import('@/views/MainPage')
  },
  {
    path: '/about',
    name: '关于',
    component: About
  }
]

export const routes = [
  ...mainNavRoutes,
  {
    path: '/test',
    component: resolve => require(['@/views/TestPage'], resolve),
  },
  {
    path: '/manage',
    name: 'Manage',
    component: resolve => require(['@/views/manage/Manage'], resolve),
    children: [
      {
        path: 'newblog',
        component: resolve => require(['@/views/manage/oper/NewBlog'], resolve)
      },
      {
        path: 'modblog',
        component: resolve => require(['@/views/manage/oper/ModBlog'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: resolve => require(['@/views/manage/Login'], resolve)
  }
]

export default new Router({
  routes
})
