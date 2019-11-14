// at.alicdn.com/t/font_1504114_myp39erfpoc.css
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
import {http} from '@/actions/action'
import Fmt from '@/actions/format'
import bus from './eventBus.vue'

let format = new Fmt(store)

Vue.prototype.$bus = bus
Vue.prototype.$query = http.$query
Vue.prototype.$mutate = http.$mutate
Vue.prototype.$val = format.GetValue
Vue.prototype.$valf = format.FormatValue

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
