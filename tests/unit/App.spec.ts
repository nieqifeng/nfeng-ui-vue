import {
  mount,
  shallowMount,
  createLocalVue,
  config,
  RouterLinkStub
} from '@vue/test-utils'
import VueRouter, { Route } from 'vue-router'
import routes from '@/router/routes'
import App from '@/App.vue'
// import ElementUI from 'element-ui'
import PageA from '@/views/PageA.vue'
import { beforeEachGuard } from '@/router/guards'
// ;(config.stubs as Record<string, any>)['router-link'] = RouterLinkStub

const localVue = createLocalVue()
localVue.use(VueRouter)
// localVue.use(ElementUI)

describe('App.vue', () => {
  it('非函数式组件', () => {
    const wrapper = shallowMount(App, { localVue })
    // console.log('1', wrapper.html())
    expect(wrapper.vm).toBeTruthy()
  })

  // it('有3个路由', () => {
  //   const wrapper = shallowMount(App, {
  //     localVue,
  //     stubs: { 'router-link': RouterLinkStub, 'router-view': '<span />' }
  //   })
  //   // console.log('2', wrapper.html())
  //   expect(wrapper.findAll(RouterLinkStub).length).toBe(3)
  // })

  // it('第3个路由是`/page`', () => {
  //   const wrapper = mount(App, {
  //     localVue,
  //     stubs: { RouterLink: RouterLinkStub, RouterView: true } // ['router-view']
  //   })
  //   // console.log('3', wrapper.html())
  //   expect(
  //     wrapper
  //       .findAll(RouterLinkStub)
  //       .at(2)
  //       .props().to
  //   ).toMatch('/page')
  // })

  it('路由到About页面', done => {
    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
    const wrapper = mount(App, {
      localVue,
      router
    })
    router.push('/about').then(() => {
      // console.log('4', wrapper.html())
      expect(router.currentRoute.path).toMatch('/about')
      done()
    })
  })

  // it('路由到PageA页面', () => {
  //   const router = new VueRouter({
  //     mode: 'history',
  //     base: process.env.BASE_URL,
  //     routes
  //   })
  //   const wrapper = mount(App, {
  //     localVue,
  //     router
  //   })
  //   return router.push('/page').then(() => {
  //     // console.log('5', wrapper.html())
  //     const pa = wrapper.find(PageA)
  //     expect(pa.exists()).toBe(true)
  //   })
  // })

//   it('路由到PageA页面', async () => {
//     const router = new VueRouter({
//       mode: 'history',
//       base: process.env.BASE_URL,
//       routes
//     })
//     const wrapper = mount(App, {
//       localVue,
//       router
//     })
//     await router.push('/page')
//     // console.log('6', wrapper.html())
//     const pa = wrapper.find({ name: 'PageA' })
//     expect(pa.is(PageA)).toBe(true)
//   })
})

describe('App.vue', () => {
  it('页面跳转触发全局前置守卫', async () => {
    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
    const to: any = { name: 'about' } as Route
    const from = { name: 'home' } as Route
    const next = jest.fn()
    beforeEachGuard(to, from, next)
    router.beforeEach(beforeEachGuard)
    const wrapper = shallowMount(App, {
      localVue,
      router
    })
    expect(router.currentRoute.path).toMatch('/')
    await router.push(to)
    expect(router.currentRoute.path).toMatch('/about')
    expect(next).toBeCalled()
  })
})
