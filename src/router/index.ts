import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
