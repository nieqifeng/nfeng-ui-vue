import { mount, createLocalVue } from '@vue/test-utils'
import Counter2 from '@/components/Counter2.vue'
import { Button } from 'ant-design-vue'

const localVue = createLocalVue()
localVue.component(Button.name, Button)

describe('Counter2.vue', () => {
  it('默认prop值为10', () => {
    const wrapper = mount(Counter2, { localVue })
    expect(wrapper.props().count).toBe(10)
    expect(wrapper.props('count')).toBe(10)
    expect(wrapper.find('span').text()).toMatch('10')
  })

  it('设置propData.count值为11', () => {
    const wrapper = mount(Counter2, { localVue, propsData: { count: 11 } })
    expect(wrapper.props().count).toBe(11)
    expect(wrapper.props('count')).toBe(11)
    expect(wrapper.find('span').text()).toMatch('11')
  })

  it('修改props.count值为12', async () => {
    const wrapper = mount(Counter2, { localVue })
    await wrapper.setProps({ count: 12 })
    expect(wrapper.props().count).toBe(12)
    expect(wrapper.props('count')).toBe(12)
    expect(wrapper.find('span').text()).toMatch('12')
  })

  // it('子组件click事件，触发update方法调用', () => {
  //   const wrapper = mount(Counter2, { localVue })
  //   const update = jest.fn()
  //   wrapper.setMethods({ update })
  //   wrapper.find(Button).vm.$emit('click')
  //   expect(update).toBeCalled()
  //   expect(update).toBeCalledTimes(1)
  // })

  it('连续点击，update方法被调用2次', () => {
    const wrapper = mount(Counter2, { localVue })
    const update = jest.fn()
    wrapper.vm.$on('update', update)
    // 第一次点击
    wrapper.findComponent(Button).vm.$emit('click')
    expect(update).toBeCalled()
    expect(update).toBeCalledTimes(1)
    expect(update).toBeCalledWith(11)
    // 第二次点击
    wrapper.setProps({ count: 11 })
    wrapper.findComponent(Button).vm.$emit('click')
    expect(update).toBeCalled()
    expect(update).toBeCalledTimes(2)
    expect(update).toBeCalledWith(12)
  })
})
