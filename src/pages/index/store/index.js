import Vue from 'vue'
import Vuex from 'vuex'
import common from './common.js'

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
