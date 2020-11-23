import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import state from '@/store/state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import count from '@/store/count'
import Counter3 from '@/components/Counter3.vue'
import { Button, 
  // ButtonGroup 
} from 'ant-design-vue'

describe('Counter3.vue', () => {
  const localVue = createLocalVue()
  localVue.component(Button.name, Button)
  // localVue.component(ButtonGroup.name, ButtonGroup)
  localVue.use(Vuex)

  const store = new Vuex.Store<IRootState>({
    state,
    getters,
    mutations,
    modules: { count }
  })
  const wrapper = mount(Counter3, { store, localVue })
  const vm = <any>wrapper.vm

  describe('组件状态（默认）', () => {
    it('默认状态值为0', () => {
      expect((store.state as any).count.count).toBe(0)
      expect(vm.iCount).toBe(0)
    })

    // it('修改store状态值为20', () => {
    //   (store.state as any).count.count = 20
    //   expect(vm.iCount).toBe(20)
    //   expect(wrapper.find('span').text()).toMatch('20')
    // })

    // it('有一个Group组件', () => {
    //   expect(wrapper.contains(ButtonGroup)).toBe(true)
    // })

    // it('有三个Button按钮', () => {
    //   const btns = wrapper.findAll(Button)
    //   expect(btns.length).toBe(3)
    // })
  })

  // describe('组件状态变化（通过事件触发）', () => {
  //   beforeEach(() => {
  //     jest.useFakeTimers()
  //     ;(store.state as any).count.count = 0
  //   })

  //   afterAll(() => {
  //     jest.useRealTimers()
  //     ;(store.state as any).count.count = 0
  //   })

  //   it('点击加1按钮，状态值为1', () => {
  //     const btn = wrapper.findAll(Button).at(0)
  //     expect(btn.props('type')).toMatch(/success/)
  //     btn.vm.$emit('click')

  //     expect(vm.iCount).toBe(0)
  //     expect(setTimeout).toBeCalled()

  //     jest.runOnlyPendingTimers()

  //     return localVue.nextTick().then(() => {
  //       expect(vm.iCount).toBe(1)
  //     })
  //   })

  //   it('点击减1按钮，状态值为-1', () => {
  //     const btn = wrapper.findAll(Button).at(1)
  //     expect(btn.props('type')).toMatch(/danger/)
  //     btn.vm.$emit('click')

  //     expect(vm.iCount).toBe(0)
  //     jest.runOnlyPendingTimers()

  //     return localVue.nextTick().then(() => {
  //       expect(vm.iCount).toBe(-1)
  //     })
  //   })

  //   it('点击Reset按钮，状态值为0', () => {
  //     (store.state as any).count.count = 20
  //     const btn = wrapper.findAll(Button).at(2)
  //     expect(btn.props('type')).toMatch(/primary/)
  //     btn.vm.$emit('click')

  //     expect(vm.iCount).toBe(20)
  //     jest.runOnlyPendingTimers()

  //     return localVue.nextTick().then(() => {
  //       expect(vm.iCount).toBe(0)
  //     })
  //   })

  //   it('点击加1按钮，事件方法被调用', () => {
  //     (store.state as any).count.count = 11
  //     const handleClick = jest.fn(() => {})
  //     wrapper.setMethods({ handleClick })

  //     const btn = wrapper.findAll(Button).at(0)
  //     expect(btn.props('type')).toMatch(/success/)
  //     btn.vm.$emit('click')

  //     expect(handleClick).toBeCalled()
  //     expect(handleClick).toBeCalledWith(12)
  //   })
  // })
})
