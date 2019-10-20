// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/actions/index.js'
import './directive'
import Vue from 'vue'
import store from './store/index.js'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/style.scss'
import '@/components/index.js'

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })
ap.SetStore(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
