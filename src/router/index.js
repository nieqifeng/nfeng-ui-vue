//creatteRouter 创建路由对象   creatwebhashhistory 设置路由模式为hash路由
import { createRouter, createWebHashHistory } from 'vue-router'
// import { pickUserRoutes } from './pickUserRoutes'
// import { store } from '/@/store'
import NProgress from 'nprogress' //进度条
import * as permitModel from './modules'

NProgress.configure({ showSpinner: false })

const routes = {
  public: [
    // {
    //   path: '/',
    //   redirect: () => {
    //     const { menus } = store.state.user
    //     if (menus) {
    //       return menus[0].path
    //     } else {
    //       return '/login'
    //     }
    //   }
    // },
    // {
    //   path: '/login',
    //   component: () => import('/@/views/login.vue')
    // },
    // {
    //   path: '/403',
    //   component: () => import('/@/views/403.vue')
    // },
    // {
    //   path: '/404',
    //   component: () => import('/@/views/404.vue')
    // }
  ],
  permits: Object.values(permitModel)
}

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [...routes.public, ...routes.permits]
})

//每次刷新时
// const { menusPath } = store.state.user

// let menus = pickUserRoutes(menusPath)

// if (menus) menus.forEach(route => router.addRoute(route))
//每次刷新时 end

// router.isReady().then(() => {
//   router.beforeEach((to, from, next) => {
//     const { token } = store.state.user
//     NProgress.start()
//     if (to.matched.length !== 0) {
//       if (!token && to.path !== '/login') {
//         next('/login')
//       } else {
//         next()
//       }
//       return
//     }
//     next('/404')
//   })
//   router.afterEach(() => NProgress.done())
// })

//清空路由
// const resetRoutes = () => {
//   const { menus } = store.state.user
//   menus.forEach(route => router.removeRoute(route))
// }

//前端全部权限模块 (java)
// let arr = routes.permits.map(item => {
//   let children
//   if (item.children.length) {
//     children = item.children.filter(child => {
//       if (!child.isHide) {
//         return {
//           path: child.path,
//           name: child.name
//         }
//       }
//     })
//   }
//   return {
//     path: item.path,
//     name: item.name,
//     children
//   }
// })
//
export { 
  router, 
  // routes, 
  // resetRoutes 
}
