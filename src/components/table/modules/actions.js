import http from '@/actions/ajax.js'

/*
    column:[{
      title: '列标题',
      key: '关联字段',
      ttype: '展示类型',
      tfilter: [{name:'',value:''}],
      tfilterFn: (value, row, column)=> {}
    }]
    |- ttype说明：
    |- status        显示状态,通过值匹配titems:[{name:'',value:''}]，返回对应的内容
    |- tags          显示状态，以标签形式展示

 */
export const columns = columns => {
  let datas = []
  for (let obj of columns) {
    if (!obj.titems) {
      obj.titems = obj.ditems
    }
    datas.push(obj)
  }
  return datas
}
/*
  drule说明：
  |- 类型     说明
  |- bool     只判断该字段的内容是否存在
  |- string   以正则表达式去校验改字段
  |- Object   普通的一条验证对象,例如{ required: true,message:"该字段必填" }
  |- Array    包含上面所说的所有验证方式，可以混用，例如[true,/^-?\d*\.?\d+$/,{ required: true,message:"该字段必填" }]
  |- {
    required: "是否必填，类型（bool）",
    message: "提示语，类型（string）",
    pattern: "正则校验"
  }

  dtype(string)内置验证：
  |- account: 用户名正则，4到16位（字母，数字，下划线，减号）
  |- password: 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  |- number: 数字正则，正数、负数、小数
  |- mobile: 手机号验证
  |- idcard: 身份证号验证
  |- email: 邮箱验证
  |- ipv4: IP地址验证
  |- url: 浏览器地址
  |- car: 车牌号验证

  dtype说明：
  |- 类型(dtype)     组件            解析列表(ditems||titems)          内置类型(dkind)
  |- string       el-input          -
  |- number       el-input          -
  |- radio        el-radio-group    [{name:'',value:''}]
  |- checkbox     el-checkbox-group [{name:'',value:''}]
  |- select       el-select         [{name:'',value:''}]
  |- switch       el-switch         -
  |- slider       el-slider         -
  |- date         el-date-picker    [{text:'',onClick(picker){}}]    year/month/date(默认)/dates/week/datetime/datetimerange/daterange/monthrange

*/
export const dialog = columns => {
  let datas = []
  for (let obj of columns) {
    if (!obj.ditems) {
      obj.ditems = obj.titems
    }
    datas.push(obj)
  }
  return datas
}
function dialogDRulesFormat (col, rule) {
  if (typeof rule === 'boolean') {
    let r = { required: true }
    if (['select'].indexOf(col.dtype) !== -1) {
      r.message = `请选择${col.title}`
      r.trigger = 'change'
    } else {
      r.message = `请输入${col.title}`
      r.trigger = 'blur'
    }
    return r
  } else if (typeof rule === 'string') {
    let pattern = ''
    let msg = ''
    switch (rule) {
      case 'account': pattern = /^[a-zA-Z0-9_-]{4,16}$/; msg = '，4到16位（字母、数字、下划线、减号）'; break
      case 'password': pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; msg = '，最少6位，包含有大写字母、小写字母、数字、特殊字符'; break
      case 'number': pattern = /^-?\d*\.?\d+$/; break
      case 'mobile': pattern = /^1[34578]\d{9}$/; break
      case 'email': pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; break
      case 'idcard': pattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; break
      case 'ipv4': pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; break
      case 'url': pattern = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/; break
      case 'car': pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/; break
      default: pattern = rule
    }
    return { pattern, message: `${col.title}验证错误${msg}` }
  } else {
    return rule
  }
}
export const dialogRules = cols => {
  let columns = dialog(cols)
  let rules = {}
  for (let i = 0; i < columns.length; i++) {
    let col = columns[i]
    if (!col.drule) {
      continue
    }
    let ru = []
    if (col.drule instanceof Array) {
      for (let j = 0; j < col.drule.length; j++) {
        ru.push(dialogDRulesFormat(col, col.drule[j]))
      }
    } else {
      ru.push(dialogDRulesFormat(col, col.drule))
    }
    rules[col.key] = ru
  }
  return rules
}
export const dialogTypeFormat = (col, obj, ext) => {
  let columns = dialog(col)
  let r = {}
  for (let i = 0; i < columns.length; i++) {
    r[columns[i].key] = columns[i].dtype
  }

  let form = JSON.parse(JSON.stringify(obj))
  for (let k in form) {
    if (form[k] === undefined || form[k] === null) {
      continue
    }
    switch (r[k]) {
      case 'string':
        form[k] = form[k] + ''
        break
      case 'number':
        form[k] = parseFloat(form[k])
    }
  }
  return {...form, ...ext}
}

export const list = funcName => {
  return param => {
    return http[funcName + 'List'](param)
  }
}
export const add = funcName => {
  return param => {
    return http[funcName + 'Create'](param)
  }
}
export const edit = funcName => {
  return param => {
    return http[funcName + 'Update'](param)
  }
}
export const del = funcName => {
  return param => {
    return http[funcName + 'Delete'](param)
  }
}
