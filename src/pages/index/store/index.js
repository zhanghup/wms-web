import Vue from 'vue'
import Vuex from 'vuex'
import common from './common.js'
console.log(common)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  modules: {
    common: common
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
