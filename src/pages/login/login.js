import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/style.scss'
import '@/components/index.js'
import {http} from '@/actions/action'

Vue.prototype.$query = http.$query
Vue.prototype.$mutate = http.$mutate
Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
