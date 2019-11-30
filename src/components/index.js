import Vue from 'vue'
import components from '../../packages'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /index.vue/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  // 全局注册组件
  Vue.component(
    componentConfig.default.name,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

components.forEach(component => {
  Vue.component(component.name, component)
})
