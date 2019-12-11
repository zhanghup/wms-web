export const menus = [
  {
    id: '0',
    path: '/home',
    name: '主页',
  },
  {
    id: '1',
    path:"/system",
    redirect: '/system/auth',
    component: () => import('@/pages/index/views/index'),
    name: '系统设置',
    children: [
      {id: '1-0', path: 'dict', name: '数据字典', component: () => import('@/pages/index/views/system/dict')},
      {id: '1-1', path: 'user', name: '用户管理', component: () => import('@/pages/index/views/system/user')},
      {id: '1-2', path: 'role', name: '角色管理', component: () => import('@/pages/index/views/system/role')}
    ]
  },
  {
    id: '2',
    path: '/monitor',
    name: '服务监控',
    component: () => import('@/pages/index/views/index'),
    children: [
      {id: '2-0', path: 'gin/stat', name: '接口健康', component: () => import('@/pages/index/views/monitor/gin-stat')},
    ]
  },
  {
    id: '3',
    path: '/mp',
    name: '微信公众号',
    component: () => import('@/pages/index/views/index'),
    children: [
      {id: '3-0', path: 'gin/stat', name: '接口健康', component: () => import('@/pages/index/views/monitor/gin-stat')},
    ]
  },
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
console.log(unwind(menus))

export const ms = unwind(menus)
