import { mount } from '@vue/test-utils'
import Vue from 'vue'
import FetchData from '@/components/FetchData.vue'
jest.mock('@/utils', () => ({
  getRandomNum: () => 6
}))
jest.mock('@/api', () => ({
  getUsers: () => Promise.resolve([{ username: '~!@#$%^&*()_+' }])
}))

describe('FetchData.vue', () => {
  // it('在created生命周期中调用方法', () => {
  //   const getUser = jest.fn()
  //   const options = {
  //     methods: { getUser }
  //   }
  //   mount(FetchData, options)
  //   expect(getUser).toBeCalled()
  // })
  it('保存异步接口的返回值', () => {
    const wrapper = mount(FetchData)
    return Vue.nextTick().then(() => {
      expect(wrapper.vm.$data.msg).toMatch('~!@#$%^&*()_+')
    })
  })
})
