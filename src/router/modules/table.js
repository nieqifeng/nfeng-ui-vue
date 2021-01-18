export default {
  path: '/table',
  name: 'table',
  icon: 'SisternodeOutlined',
  component: () => import('/@/components/Layout.vue'),
  children: [
    {
      path: 'basic',
      name: '承运商管理',
      component: () => import('/@/examples/table/basic.vue')
    }
  ]
}
