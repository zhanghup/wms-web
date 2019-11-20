export const menus = [
  {
    path: '/home',
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
      {path: 'dict', name: '数据字典', component: () => import('@/pages/index/views/system/dict')},
      {path: 'user', name: '用户管理', component: () => import('@/pages/index/views/system/user')},
      {path: 'role', name: '角色管理', component: () => import('@/pages/index/views/system/role')},
    ]
  }
]

let unmenus = []
function unwind (m) {
  for (let i = 0; i < m.length; i++) {
    let obj = JSON.parse(JSON.stringify(m[i]))
    if (obj.children && obj.children.length > 0) {
      unwind(obj.children)
    }
    delete obj.children
    unmenus.push(obj)
  }
  return unmenus
}

export const ms = unwind(menus)
