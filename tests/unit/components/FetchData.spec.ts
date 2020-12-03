import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
// import Vue from 'vue'
import FetchData from '@/components/FetchData.vue'
jest.mock('@/utils', () => ({
  getRandomNum: () => 6
}))
jest.mock('@/api', () => ({
  getUsers: () => Promise.resolve([{ username: '~!@#$%^&*()_+' }])
}))

describe('FetchData.vue', () => {
  it('在created生命周期中调用方法', async () => {
    const getUser = jest.fn()
    // console.log('jest.fn(): ', jest.fn());
    // console.log('getUser: ', getUser);
    // const options = {
    //   methods: { getUser }
    // }
    // mount(FetchData, options)
    // expect(getUser).toBeCalled()
    const wrapper = mount(FetchData, {
      mocks: {
        $post: getUser // 应用该mock函数
      }
    })
    await flushPromises()
    // console.log(wrapper.vm.$data.msg)
    expect(wrapper.vm.$data.msg).toMatch('~!@#$%^&*()_+')
  })
  // it('保存异步接口的返回值', () => {
  //   const wrapper = mount(FetchData)
  //   return Vue.nextTick().then(() => {
  //     expect(wrapper.vm.$data.msg).toMatch('~!@#$%^&*()_+')
  //   })
  // })
})
