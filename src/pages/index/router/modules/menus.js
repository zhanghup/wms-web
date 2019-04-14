export default [
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
      {path: 'auth', name: '权限管理', component: () => import('@/pages/index/views/system/auth')},
      {path: 'user', name: '用户管理', component: () => import('@/pages/index/views/system/user')}
    ]
  }
]
