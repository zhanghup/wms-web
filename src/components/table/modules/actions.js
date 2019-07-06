import http from '@/actions/ajax.js'

/*
    drule:
      Boolean: 表示是否为必填项
      String: 正则验证
      Array: 正常的Element验证规则

    column:[{
        {title:'列标题',key:'关联字段',dtype:'input',drule:true},
    }]
 */
export const columns = columns => {
  return columns
}
export const dialog = columns => {
  return columns
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
    if (typeof col.drule === 'boolean') {
      let r = { required: true }
      if (['select'].indexOf(col.dtype) !== -1) {
        r.message = `请选择${col.title}`
        r.trigger = 'change'
      } else {
        r.message = `请输入${col.title}`
        r.trigger = 'blur'
      }
      ru.push(r)
    } else if (typeof col.drule === 'string') {
      ru.push({ pattern: col.drule, message: `${col.title}验证错误` })
    } else if (col.drule instanceof Array) {
      for (let j = 0; j < col.drule.length; j++) {
        ru.push(col.drule[j])
      }
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
