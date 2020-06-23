<template>
  <div>
    <van-field
      readonly
      clickable
      is-link
      input-align="right"
      :value="showLabel"
      :placeholder="placeholder || '请选择'"
      @click="showPicker = true, radio = modelVal"
    >展示弹出层</van-field>
    <van-popup
      v-model="showPicker"
      round
      position="right"
      :style="{ width: '100%', height: '100%', borderRadius: 0 }"
    >
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            v-for="item in optionsData"
            :key="item[mergeConfig.itemValueField]"
            :title="item[mergeConfig.itemLabelField]"
            clickable
            @click="handleChange(item)"
          >
            <template #right-icon>
              <van-radio :name="item[mergeConfig.itemValueField]"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div style="margin: 16px;">
        <div
          class="van-button van-button--info van-button--normal van-button--block"
          style="font-size: 16px;"
          @click="onConfirm"
        >
          <div class="van-button__content">
            <span class="van-button__text">保存</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>


<script>
import _get from 'lodash-es/get'
import _cloneDeep from 'lodash-es/cloneDeep'
import ncformCommon from '@ncform/ncform-common'

const controlMixin = ncformCommon.mixins.vue.controlMixin
const ncformUtils = ncformCommon.ncformUtils

import { get } from '../../../utils/request.js'

export default {
  mixins: [controlMixin],

  data() {
    return {
      // 组件特有的配置属性
      defaultConfig: {
        multiple: false, // 是否多选
        clearable: true, // 是否出现清空选项
        filterable: false, // 是否可搜索，即可输入关键字
        filterLocal: true, // 搜索本地的还是远程的数据，当为true时，就算配了enumSourceRemote，也只会从远程取一次数据
        itemTemplate: '', // 显示项的模板
        size: '',

        itemDataKey: '', // 选中项的数据字段，可通过 {{$temp.[key]}} 取得

        itemLabelField: 'label', // 项数据表示label的字段
        itemValueField: 'value', // 项数据表示value的字段
        enumSource: [], // 本地数据源
        enumSourceRemote: {
          // 远程数据源
          remoteUrl: '', // 如果是远程访问，则填写该url
          paramName: 'keyword', // 请求参数名，默认是keyword
          otherParams: {}, // 其它请求的参数，支持字符串表达式
          resField: '', // 响应结果的字段
          selectFirstItem: false // 默认选中第一项
        }
      },

      isLocalSource: true,
      options: [],
      itemTemplate: {
        template: '',
        props: ['item']
      },

      showPicker: false,
      radio: ''
    }
  },

  props: {
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: ''
    },
  },

  computed: {
    // disabled / readonly / hidden / placeholder 你可以直接使用这些变量来控制组件的行为
    optionsData() {
      return (this.$data.isLocalSource && this.mergeConfig.enumSource.length > 0) ? this.mergeConfig.enumSource : this.$data.options
    },
    showLabel() {
      const value = this.radio || this.modelVal
      const obj = this.optionsData.find((item) => item[this.mergeConfig.itemValueField] === value) || {}
      return obj[this.mergeConfig.itemLabelField]
    }
  },

  methods: {
    remoteMethod(query) {
      if (!_get(this.mergeConfig, 'enumSourceRemote.remoteUrl')) {
        return
      }

      const options = {
        url: this.mergeConfig.enumSourceRemote.remoteUrl,
        params: _cloneDeep(_get(this.mergeConfig, 'enumSourceRemote.otherParams', {}))
      }
      if (this.mergeConfig.enumSourceRemote.paramName)
        options.params[this.mergeConfig.enumSourceRemote.paramName] = query

      get(options.url, options.params).then(res => {
        if (!res) {
          return
        }
        this.$data.options = this.mergeConfig.enumSourceRemote.resField
          ? _get(res.data, this.mergeConfig.enumSourceRemote.resField)
          : res.data
        if (
          this.mergeConfig.enumSourceRemote.selectFirstItem &&
          this.$data.options.length > 0
        ) {
          this.$data.modelVal =
            this.$data.modelVal ||
            this.$data.options[0][this.mergeConfig.itemValueField]
        }

        this._keepSelectedItem()
      })
    },

    handleChange(item) {
      this.radio = item[this.mergeConfig.itemValueField]
      this._keepSelectedItem()
    },


    _keepSelectedItem() {
      if (this.mergeConfig.itemDataKey) {
        let selectedModelVal = Array.isArray(this.$data.modelVal) ? this.optionsData.filter(item => this.$data.modelVal.indexOf(item[this.mergeConfig.itemValueField]) >= 0) : this.optionsData.find(item => item[this.mergeConfig.itemValueField] === this.$data.modelVal)
        this._setTempData(this.mergeConfig.itemDataKey, selectedModelVal)
      }
    },

    _getDataSource() {
      if (_get(this.mergeConfig, 'enumSourceRemote.remoteUrl')) {
        this.$data.isLocalSource = false
        this.remoteMethod()
        return
      }
      if (this.mergeConfig.enumSource.length == 0) {
        if (ncformUtils.getValType(this.value) == 'boolean') {
          this.$data.options = [
            {
              value: 1,
              label: 'true'
            },
            {
              value: 0,
              label: 'false'
            }
          ]
          this._keepSelectedItem()
        }
      } else {
        this.$data.options = this.mergeConfig.enumSource
        this._keepSelectedItem()
      }
    },

    onConfirm() {
      this.modelVal = this.radio
      this.showPicker = false
    },
  },

  created() {
    if (typeof this.value === 'boolean') {
      this.$data.valueType = 'boolean'
      this.$data.modelVal = this.$data.modelVal ? 1 : 0
    }
    this.$data.itemTemplate.template = this.mergeConfig.itemTemplate
    this._getDataSource()
  }
}
</script>
