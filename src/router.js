import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import error from '@/views/error'
import checkbox from '@/views/checkbox'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            name: 'error',
            component: error
        },
        {
            path: '/',
            name: 'index',
            component: index,
            redirect: '/public/index'
        },
        {
            path: '/public/index',
            component: index
        },
        {
            path: '/validate',
            component: () => import('./views/validate.vue')
        },
        {
            path: '/picker',
            component: () => import('./views/picker.vue')
        },
        {
            path: '/overlay',
            component: () => import('./views/overlay.vue')
        },
        {
            path: '/popup',
            component: () => import('./views/popup.vue')
        },
        {
            path: '/tabs',
            component: () => import('./views/tabs.vue')
        },
        {
            path: '/pickerdate',
            component: () => import('./views/pickerdate.vue')
        },
        {
            path: '/checkbox',
            component: checkbox
        }
    ]
})
