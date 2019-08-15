import Vue from 'vue'
import router from './router'

Vue.directive('url', {
  inserted (el, binding, i) {
    if (!el.onclick) {
      el.onclick = () => {
        router.push(binding.value)
      }
    }
  }
})
