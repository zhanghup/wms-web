import {http} from './action'
import fmt from './format'

const ap = {
  ...http,
  SetStore (store) {
    this.store = store
    this.fmt = new fmt(store)
  },
  GetValue (key, value) {
    return this.fmt.GetValue(key, value)
  },
  FormatValue (key, format, value) {
    return this.fmt.FormatValue(key, format, value)
  },
  Query (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const urlObj = window.location
    var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split('?')[1].match(reg) : urlObj.search.substr(1).match(reg)
    if (r != null) return unescape(r[2]); return null
  },
  Test (pattern, str) {
    switch (pattern) {
      case '$account': pattern = /^[a-zA-Z0-9_-]{4,16}$/; break
      case '$password': pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; break
      case '$number': pattern = /^-?\d*\.?\d+$/; break
      case '$mobile': pattern = /^1[34578]\d{9}$/; break
      case '$email': pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; break
      case '$idcard': pattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; break
      case '$ipv4': pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; break
      case '$url': pattern = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/; break
      case '$car': pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/; break
    }
    return pattern.test(str)
  }
}
ap.SetStore()
window.ap = ap
