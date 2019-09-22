# 自动表单结构

 

## type 属性说明

| 类型 | 说明 |
|-| - |
| input | 输入框 |
| radio | 单选框 |
| checkbox | 复选框 |
| select | 列表选择 |
| switch | 开关 |
| slider | 滑块 |
| date | 日期选择 |
| rate | 星级 |

## item 当需要使用到列表的时候，传入

| 类型 | 说明 |
|-| - |
| radio | 单选框 |
| checkbox | 复选框 |
| select | 列表选择 |

```json 
{
    "item":[
        {"title":"选项1","value":"1"},
        {"title":"选项2","value":"2"},
    ]

}
```

## rule 表单验证

| 类型 | 说明 |
|-| - |
| $account | 用户名正则，4到16位（字母，数字，下划线，减号） |
| $password | 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符 |
| $number | 数字正则，正数、负数、小数 |
| $mobile | 手机号验证 |
| $idcard | 身份证号验证 |
| $email | 邮箱验证 |
| $ipv4 | IP地址验证 |
| $url | 浏览器地址 |
| $car | 车牌号验证 |


## icon 仅仅支持iconfont 和 element 图标

## labelHide 是否隐藏label
