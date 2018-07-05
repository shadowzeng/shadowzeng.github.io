import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Blog from '@/components/Blog'
import About from '@/components/About'
import Test from '@/components/article/Test'
import Test2 from '@/components/article/Test2'

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
        {
          path: '/blog/test1',
          component: Test
        },
        {
          path: '/blog/test2',
          component: Test2
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
