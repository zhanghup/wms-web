import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/style.scss'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    { path: '*', redirect: '/login', hidden: true }
  ]
})
