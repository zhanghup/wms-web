# form表单说明


## 整体示例

```json
[
  {
    "title":"标题",
    "key":"取值",
    "field":"title",
    "type":"input:text",
    "span":24,
    "default":1,
    "items":[
      { title:"状态1",value:1,disable:true }
    ]
  }
]
```

## title 展示的文字说明

## key
1. key: "sensor.unit
2. key: "[]sensors.unit = 'F1'"
3. key: "[]sensors.value = 1"

## field 
最终返回到表单form中的字段，例如：fiele:"title",则结果为

```
{title:""}
```

* 若field字段为空，则取值key

## type 表单类型

| 类型| 数据类型| 说明 |
| - | - |
| input:text | String |字符串|
| input:textarea | String | 文本域|
| radio | - | 单选框，需配合items使用 |
| switch | 0,1 | 开关 |

## span 占用一行的多少长度，最大24

## default 默认值

## items 用户渲染列表

