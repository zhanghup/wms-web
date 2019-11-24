export const menus = [
  {
    id: '0',
    path: '/home',
    name: '主页',
    component: () => import('@/pages/index/views/home/index'),
    hidden: true
  },
  {
    id: '1',
    path: '/system',
    redirect: '/system/auth',
    name: '系统设置',
    component: () => import('@/pages/index/views/index'),
    hidden: true,
    children: [
      {id: '1-0', path: 'dict', name: '数据字典', component: () => import('@/pages/index/views/system/dict')},
      {id: '1-1', path: 'user', name: '用户管理', component: () => import('@/pages/index/views/system/user')},
      {id: '1-2', path: 'role', name: '角色管理', component: () => import('@/pages/index/views/system/role')}
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
