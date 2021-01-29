<template>
  <div class="operate-component">
    <a-form ref="operateForm" :model="operateForm" class="flex">
      <slot></slot>
      <div class="operate_right">
        <div v-for="(item, index) in operateShow" :key="index" class="btnBox">
          <a-button
            v-if="!item.hide"
            :type="item.type"
            :confirm-loading="
              item.confirmLoading ? btnLoadings[item.confirmLoading] : null
            "
            @click="changeOperate(item.operate, item.parameter)"
          >
            <component :is="item.icon"></component>
            {{ item.title }}
          </a-button>
        </div>
        <a-form-item name="operateBtn" v-if="operateHide.length != 0">
          <a-select
            v-model="operateForm.operateBtn"
            placeholder="更多操作"
            size="small"
            @change="changeOperate"
          >
            <a-select-option
              v-for="(item, i) in operateHide"
              :key="i"
              :label="item.title"
              :value="item"
            ></a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
/**
 * @param {Boolean} title 按钮文字
 * @param {String} type 按钮状态
 * @param {String} operate 点击按钮需要触发的事件,列设置固定传columnSettings
 * @param {String} parameter 事件参数parameter
 * @param {String} icon 按钮图标
 * @param {Array} options  列设置 选项数值[{label:'',value:''}]
 * @param {Array} defaultOptions  默认的选中项 [{label:'',value:''}]
 * @param {function} confirm 点击确定
 */
export default {
  name: 'Operate',
  props: {
    operate: Array
  },
  data() {
    return {
      operateShow: [], //展示的前三个按钮
      operateHide: [], //更多操作的内容
      btnLoadings: {}, //有设置加载状态的按钮
      operateForm: {
        operateBtn: ''
      }
    }
  },
  created() {
    let attr = this.operate
    this.operateShow = attr.slice(0, 3)
    this.operateShow.forEach(v => {
      v.confirmLoading && (this.btnLoadings[v.confirmLoading] = false)
    })
    if (attr.length > 3) {
      this.operateHide = attr.splice(3, attr.length)
    }
  },
  methods: {
    changeOperate(operate, parameter) {
      console.log('operate: ', operate);
      if (operate === 'columnSettings') {
        //列设置
        this.$refs.checkSeetingRef.openSeeting()
      } else if (operate.operate) {
        //更多操作
        if (this.$parent[operate.operate]) {
          this.$parent[operate.operate](operate.parameter)
        } else {
          this.$emit(operate.operate)
        }
        this.$refs.operateForm.resetFields()
      } else {
        if (this.$parent[operate]) {
          this.$parent[operate](parameter)
        } else {
          this.$emit(operate)
        }
        this.$refs.operateForm.resetFields()
      }
    },
    seetingConfirm(val) {
      //列设置
      this.$parent.columnSettings(val)
    }
  }
}
</script>