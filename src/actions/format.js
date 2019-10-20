export default class Util {
    slice_eq = /\[\](.*)\.(.*?)\s*={2,3}\s*(.*?);\s*(.*?)\s*$/

    constructor (store) {
      this.$store = store
    }

    GetValue (key, obj) {
      if (this.slice_eq.test(key)) {
        return this.tkey_slice_eq(key, obj)
      } else if (/^\$[0-9a-zA-Z]+$/.test(key)) {
        return this.tkey_components(key, obj)
      } else {
        return this.tkey_common_value(key, obj)
      }
    }

    FormatValue (key, format, obj) {
      let value = this.GetValue(key, obj)
      if (!format) return value
      let [ty, kind] = format.split(':')
      switch (ty) {
        case 'dict': return this.formatDict(kind, value)
      }
    }

    formatDict (kind, value) {
      if (!kind) return value
      let dictmap = this.$store.state.common.dictmap
      let values = (dictmap[kind] || {}).values
      if (!values) return value
      let o = values.find(r => r.value === value)
      if (!o) return
      return o.name
    }

    tkey_components (key, obj) {
      return null
    }

    trow_value (key, obj) {
      if (!obj) {
        return null
      }
      let o = JSON.parse(JSON.stringify(obj))
      let keys = key.split('.')
      for (let k of keys) {
        if (o[k] != undefined) {
          o = o[k]
        } else {
          o = null
        }
      }
      return o
    }

    tkey_slice_eq (key, obj) {
      let r = key.match(this.slice_eq)
      if (r.length < 5) return
      let keys = r[1]
      let field = r[2]
      let optValue = r[3]
      let ofield = r[4]

      let slice = this.trow_value(keys, obj)
      if (!(slice instanceof Array)) {
        console.error('只接受数组类型，但是获取到的是：', slice)
        return h('div', 'invalid type slice')
      }

      if (/\"(.*?)\"|\'(.*?)\'/.test(optValue)) {
        let fieldSh = optValue.match(/\"(.*?)\"|\'(.*?)\'/)
        if (fieldSh && fieldSh.length > 2) {
          optValue = fieldSh[1] || fieldSh[2]
        }
      } else if (/^\d+$/.test(optValue)) {
        optValue = parseInt(optValue)
      } else if (/^\d+\.\d+$/.test(optValue)) {
        optValue = parseInt(optValue)
      }
      let oo = slice.find(r => {
        return r[field] === optValue
      })

      return this.trow_value(ofield, oo)
    }

    tkey_common_value (key, obj) {
      return this.trow_value(key, obj)
    }
}
