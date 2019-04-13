import Vue from 'vue'
import Router from 'vue-router'
// import menus from './modules/menus'
import '@/assets/style.scss'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/login',
    //   component: () => import('@/views/login/index'),
    //   hidden: true
    // },
    // ...menus,
    { path: '*', redirect: '/login', hidden: true }
  ]
})
