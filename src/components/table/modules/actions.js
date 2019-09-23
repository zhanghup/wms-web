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
