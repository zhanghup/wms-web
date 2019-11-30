import {api} from '../../../apollo'

var common = {
  namespaced: true,
  state: {
    dicts: [],
    dictmap: {}
  },
  actions: {
    load ({commit}) {
      api.$query(`
        query S{
           dicts(query:{
              index:1
              size:999
              count:false
           }){
            total
            data{
              id
              code
              name
              remark
              created
              updated
              weight
              status
              values{
                id
                code
                name
                value
                extension
                created
                updated
                weight
                status
              }
            }
          }
        }
      `).then(r => {
        let dicts = r.dicts.data
        commit('SET_DICT', dicts)
      })
    },
    loadDict ({commit}) {
      api.$query(`
        query S{
           dicts(query:{
              index:1
              size:999
              count:false
           }){
            total
            data{
              id
              code
              name
              remark
              created
              updated
              weight
              status
              values{
                id
                code
                name
                value
                extension
                created
                updated
                weight
                status
              }
            }
          }
        }
      `).then(r => {
        let dicts = r.dicts.data
        commit('SET_DICT', dicts)
      })
    }
  },
  mutations: {
    SET_DICT (state, data) {
      state.dicts = data
      let m = {}
      for (let o of data) {
        m[o.code] = o
      }
      state.dictmap = m
    }
  }
}

export default common
