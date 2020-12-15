
import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'

const routes: Array<RouteConfig> = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/upload',
      component: () => import('../example/Upload/Upload.vue')
    },
    {
      path: '/select',
      component: () => import('../example/Select/Select.vue')
    },
    {
      path: '/form',
      component: () => import('../example/Form/Form.vue')
    },
    {
      path: '/formSearch',
      component: () => import('../example/FormSearch/FormSearch.vue')
    },
    {
      path: '/formCreate',
      component: () => import('../example/FormCreate/FormCreate.vue')
    },
    {
      path: '/formTable',
      component: () => import('../example/FormTable/FormTable.vue')
    },
    {
      path: '/preview',
      component: () => import('../example/Preview/Preview.vue')
    },
    {
      path: '/description',
      component: () => import('../example/Description/Description.vue')
    },
    {
      path: '/table',
      component: () => import('../example/Table/Table.vue')
    },
    {
      path: '/page',
      name: 'page',
      component: Layout,
      redirect: { name: 'page-a' },
      children: [
        {
          path: 'a',
          name: 'page-a',
          component: () =>
            import(/* webpackChunkName: "page" */ '../views/PageA.vue')
        },
        {
          path: 'b',
          name: 'page-b',
          component: () =>
            import(/* webpackChunkName: "page" */ '../views/PageB.vue')
        },
        {
          path: 'c',
          name: 'page-c',
          component: () =>
            import(/* webpackChunkName: "page" */ '../views/PageC.vue')
        },
        {
          path: 'x*',
          name: 'page-x',
          props: true,
          component: () =>
            import(/* webpackChunkName: "page" */ '../views/PageX.vue')
        }
      ]
    },
    {
      path: '/design',
      component: () => import('../example/Design/Design.vue')
    }
  ]

  export default routes