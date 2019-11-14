import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/style.scss'
import '@/components/index.js'
import {http} from '@/actions/action'
import Fmt from '@/actions/format'

let format = new Fmt()

Vue.prototype.$query = http.$query
Vue.prototype.$mutate = http.$mutate
Vue.prototype.$val = (key, value) => {
  return format.GetValue(key, value)
}
Vue.prototype.$valf = (key, format, value) => {
  return format.FormatValue(key, format, value)
}

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
