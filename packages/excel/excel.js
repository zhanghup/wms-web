import XLSX from 'xlsx'
require('script-loader!file-saver')

function Workbook () {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}

function s2ab (s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

function formatType (str) {
  switch (str) {
    case 'stub':
      return 'z'
    case 'string':
      return 's'
    case 'date':
      return 'd'
    case 'number':
      return 'n'
    case 'error':
      return 'e'
    case 'boolean':
      return 'b'
    default:
      return 's'
  }
}

let cc = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'

]

function getCC (i) {
  if (i < 0) {
    console.error('输入i必须大于等于0')
    return
  } else if (i == 0) {
  } else if (!i) {
    console.error('输入格式必须为数字，当前：', i)
    return
  }
  if (i < 26) {
    return cc[i]
  }
  let n = i / 26
  return cc[n] + getCC(i % 26)
}

function formatData (data) {
  let result = {}
  let merges = []
  let mgcell = []

  function rowFormat (row, r) {
    function cellIndexFormat (r, c) {
      for (let mg of mgcell) {
        if (r >= mg[0] && r <= mg[1] && c >= mg[2] && c <= mg[3]) {
          if (r >= mg[0] && r <= mg[1] && c >= mg[2] && c <= mg[3]) {
            c = mg[3] + 1
            return cellIndexFormat(r, c)
          }
        }
      }
      return c
    }

    let c = 0

    for (let cell of row) {
      c = cellIndexFormat(r, c)

      let mg = rowspan_and_colspan(r, c, cell)

      if (mg.status) {
        delete mg.status
        merges.push(mg)
        mgcell.push([r, mg.e.r, c, mg.e.c])
      }

      result[getCC(c) + (r + 1)] = {
        v: cell.title,
        t: formatType(cell.type),
        s: formatStyle(cell.style)

      }

      c = mg.e.c + 1
    }
    return c
  }

  let r = 0
  let max = 0
  for (let row of data) {
    let c = rowFormat(row, r)
    if (c > max) {
      max = c
    }
    r += 1
  }

  return {
    // ...result,
    // '!ref': XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r, c: max } }),
    // '!merges': merges

  }
}

function formatStyle (data) {
  let result = {
    fill: {},
    font: {},
    numFmt: {},
    alignment: {},
    border: {}

  }
  for (let k in data) {
    switch (k) {
      case 'color':
        result.font.color = { rgb: data[k] }
    }
  }
  return result
}
function rowspan_and_colspan (r, c, data) {
  let rr = data.rowspan ? parseInt(data.rowspan) : 1
  let cc = data.colspan ? parseInt(data.colspan) : 1
  let status = rr > 1 || cc > 1
  let result = {
    status,
    s: {
      c: c,
      r: r // rows 开始行

    },
    e: {
      c: c + cc - 1,
      r: r + rr - 1
    }
  }
  return result
}
export function Export ({
  data,
  sheetName,
  filename,
  autoWidth = true,
  bookType = 'xlsx'

} = {}) {
  /* original data */
  filename = filename || 'excel-list'

  var ws_name = sheetName || 'SheetJS'
  data = [...data]

  var wb = new Workbook(),
    ws = formatData(data)

  if (autoWidth) {
    /* 设置worksheet每列的最大宽度 */
    const colWidth = data.map(row =>
      row.map(val => {
        /* 先判断是否为null/undefined */
        if (val == null) {
          return {
            wch: 10

          }
        } else if (val.toString().charCodeAt(0) > 255) {
          /* 再判断是否为中文 */
          return {
            wch: val.toString().length * 2

          }
        } else {
          return {
            wch: val.toString().length

          }
        }
      })
    )
    /* 以第一行为初始值 */
    let result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      if (result.length < colWidth[i].length) {
        result = colWidth[i]
      }
    }
    ws['!cols'] = result
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'

  })
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'

    }),
    `${filename}.${bookType}`

  )
}

export default function ExportJson ({
  columns,
  header,
  data,
  sheetName,
  filename,
  autoWidth = true,
  bookType = 'xlsx'

}) {
  if (!header) {
    header = []
  }
  let result = []
  for (let o of header) {
    let row = []
    for (let oo of o) {
      if (typeof oo === 'object') {
        row.push(oo)
      } else {
        row.push({
          title: oo,
          type: 'string',
          rowspan: 1,
          colspan: 1

        })
      }
    }
    result.push(row)
  }
  for (let i = 0; i < data.length; i++) {
    let o = data[i]
    let row = []
    for (let c of columns) {
      let value = null
      if (typeof c === 'string') {
        if (c == '$index') {
          value = i + 1
        } else {
          value = getValue(c, o)
        }
      } else if (c instanceof Function) {
        value = c(o)
      }
      row.push({
        title: value,
        type: 'string',
        rowspan: 1,
        colspan: 1

      })
    }
    result.push(row)
  }
  Export({ data: result, sheetName, filename, autoWidth, bookType })
}

function getValue (key, obj) {
  if (!key) {
    return ''
  }

  let result = JSON.parse(JSON.stringify(obj))

  let ks = key.split('.')
  for (let k of ks) {
    if (result[k]) {
      result = result[k]
    } else {
      return ''
    }
  }
  return result
}
