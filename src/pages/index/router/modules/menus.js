export const menus = [
  {
    path: '/home',
    key: 'home',
    name: '主页',
    component: () => import('@/pages/index/views/home/index'),
    hidden: true
  },
  {
    path: '/system',
    redirect: '/system/auth',
    name: '系统设置',
    component: () => import('@/pages/index/views/index'),
    hidden: true,
    children: [
      {path: 'menu', key: 'sys-menu', name: '菜单管理', component: () => import('@/pages/index/views/system/menu')},
      {path: 'dict', key: 'sys-dict', name: '数据字典', component: () => import('@/pages/index/views/system/dict')},
      {path: 'auth', key: 'sys-auth', name: '权限管理', component: () => import('@/pages/index/views/system/auth')},
      {path: 'user', key: 'sys-path', name: '用户管理', component: () => import('@/pages/index/views/system/user')}
    ]
  }
]

let unmenus = []
function unwind (m) {
  debugger
  for (let i = 0; i < m.length; i++) {
    let obj = JSON.parse(JSON.stringify(m[i]))
    if (obj.key) {
      if (obj.children && obj.children.length > 0) {
        unwind(obj.children)
      }
      delete obj.children
      unmenus.push(obj)
    }
  }
}(menus)

export const ms = unmenus
