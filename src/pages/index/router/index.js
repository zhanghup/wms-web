import Vue from 'vue'
import Router from 'vue-router'
import {menus} from './modules/menus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/pages/index/views/index'),
      hidden: true
    },
    ...menus,
    { path: '*', redirect: '/', hidden: true }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
