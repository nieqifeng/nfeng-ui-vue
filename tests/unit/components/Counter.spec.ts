import { mount, createLocalVue } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'
import { Button } from 'ant-design-vue'

const localVue = createLocalVue()
localVue.component(Button.name, Button)
const wrapper = mount(Counter, { localVue })

describe('Counter.vue', () => {
  it('默认状态值为0', () => {
    expect(wrapper.vm.$data.count).toBe(0)
  })

  it('修改count值为20', async () => {
    await wrapper.setData({ count: 20 })
    expect(wrapper.find('span').text()).toMatch('20')
  })

  it('由子组件触发click事件，更新count为22', () => {
    wrapper.setData({ count: 21 })
    wrapper.findComponent(Button).vm.$emit('click')
    expect(wrapper.vm.$data.count).toBe(22)
  })

  it('由子组件内的button触发点击事件，更新count为11', () => {
    wrapper.setData({ count: 10 })
    const elBtn = wrapper.findComponent(Button)
    elBtn.find('button').trigger('click')
    expect(wrapper.vm.$data.count).toBe(11)
  })
})
