import '@/actions/index.js'
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style.scss'
import '@/components/index.js'

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
