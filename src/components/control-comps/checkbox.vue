<template>
  <div>{{dataSource}}{{mergeConfig}}</div>
</template>

<script>
import ncformCommon from '@ncform/ncform-common'
import _get from 'lodash-es/get'

const controlMixin = ncformCommon.mixins.vue.controlMixin

export default {
  mixins: [controlMixin],

  data() {
    return {
      dataSource: [],
      isCheckAll: false,
      isIndeterminate: false,
      // 组件特有的配置属性
      defaultConfig: {
        selectAll: false, // 是否显示全选
        checkAll: false,
        arrangement: 'h', // 排列 可选值 [v | h]
        type: 'checkbox', // 显示类型，可选值：[checkbox | button]
        itemValueField: 'value', // 值字段
        itemLabelField: 'label', // 显示字段
        enumSource: [], // 可选项，默认值[{label: '是'}]
        enumSourceRemote: { // 远程数据源
          remoteUrl: '', // 如果是远程访问，则填写该url
          resField: '', // 响应结果的字段
        },
        itemDataKey: '', // 选中项的数据字段，可通过 {{$temp.[key]}} 取得
      },
      // modelVal：请使用该值来绑定实际的组件的model
    }
  },

  watch: {
    'mergeConfig.enumSourceRemote': {
      handler() {
        this._getDataSource()
      },
      deep: true
    },
    'mergeConfig.enumSource': {
      handler() {
        console.log('component watch')
        this._getDataSource()
      },
      deep: true
    }
  },

  methods: {
    getRemoteSource() {
      try {
        const vm = this
        const enumSourceRemote = vm.mergeConfig.enumSourceRemote

        this.$http({
          method: 'GET',
          url: enumSourceRemote.remoteUrl,
          // data: {},
          // headers: {
          //   'X-Requested-With':'XMLHttpRequest'
          // },
        }).then(res => {
          console.log(res)
          // console.log(enumSourceRemote.resField)
          // console.log(_get(data, enumSourceRemote.resField || '', []))
          if (res.code === 200 ) {
            // let data = res.data
            console.log(_get(res, enumSourceRemote.resField || '', []))
            vm.$data.dataSource = _get(res, enumSourceRemote.resField || '', [])
            vm._keepSelectedItem()
          }
        }).catch(() => {
          vm.$data.dataSource = []
          vm._keepSelectedItem()
        })
      } catch(err) {
        console.error(err)
      }
    },
    _keepSelectedItem() {
      if (this.mergeConfig.itemDataKey) {
        let selectedModelVal = Array.isArray(this.$data.modelVal) ? this.$data.dataSource.filter(item => this.$data.modelVal.indexOf(item[this.mergeConfig.itemValueField]) >= 0) : this.$data.dataSource.find(item => item[this.mergeConfig.itemValueField] === this.$data.modelVal)
        this._setTempData(this.mergeConfig.itemDataKey, selectedModelVal)
      }
    },
    _getDataSource() {
      const vm = this
      const enumSourceRemote = vm.mergeConfig.enumSourceRemote
      if (enumSourceRemote && enumSourceRemote.remoteUrl) {
        vm.getRemoteSource()
      } else if (!vm.mergeConfig.enumSource.length) {
        vm.$data.dataSource = [ {label: this.$nclang('yes'), value: true}]
        vm._keepSelectedItem()
      } else {
        console.log(vm.mergeConfig)
        vm.$data.dataSource = vm.mergeConfig.enumSource
        vm._keepSelectedItem()
      }
    }
  }
}
</script>

