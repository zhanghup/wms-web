import Vue from 'vue'
import Router from 'vue-router'
import menus from './modules/menus'
Vue.use(Router)

export default new Router({
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
