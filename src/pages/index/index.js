// at.alicdn.com/t/font_1504114_myp39erfpoc.css
import '@/actions/index.js'
import './directive'
import Vue from 'vue'
import store from './store/index.js'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/style.scss'
import '@/style/iconfount.less'
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
