<template>
  <div>
    <template v-for="item in fieldOptions">
      <a-form-item
        :key="item.label"
        :label="item.label"
        v-bind="{ ...{ labelCol: {span: 9}, wrapperCol: {span: 15} }, ...item.formItem }"
        v-if="!('show' in item) || item.show"
      >
        <span v-if="item.type === 'text'" v-html="item.value"></span>
        <slot v-if="item.type === 'slot'" :name="item.decorator[0]"></slot>
        <a-input
          v-if="item.type === 'input' || item.type === 'number'"
          class="nf-form-input"
          :type="item.type"
          :addonAfter="item.addonAfter"
          :placeholder="item.placeholder || '请输入'"
          @change="item.change"
          v-decorator="item.decorator"
          :disabled="item.disabled"
          :maxlength="item.maxlength"
        ></a-input>
        <a-select
          v-if="item.type === 'select'"
          class="nf-form-input"
          :labelInValue="item.labelInValue"
          showSearch
          :placeholder="item.placeholder || '请选择'"
          optionFilterProp="children"
          @change="item.change"
          :filterOption="filterOption"
          v-decorator="item.decorator"
        >
          <a-select-option v-for="option in item.selectOptions" :key="option.value">{{option.text}}</a-select-option>
        </a-select>
        <a-radio-group
          v-if="item.type === 'radio'"
          v-decorator="item.decorator"
          @change="item.change"
        >
          <a-radio
            v-for="option in item.selectOptions"
            :key="option.value"
            :value="option.value"
          >{{option.text}}</a-radio>
        </a-radio-group>
        <a-checkbox-group v-if="item.type === 'checkbox'" v-decorator="item.decorator">
          <a-checkbox
            v-for="option in item.selectOptions"
            :key="option.value"
            :value="option.value"
          >{{option.text}}</a-checkbox>
        </a-checkbox-group>
        <nf-upload
          v-if="item.type === 'upload'"
          v-decorator="item.decorator"
          :buttonText="item.buttonText"
          :limit="item.limit"
          :imageList="item.value"
          :multiple="item.multiple"
        ></nf-upload>
        <nf-form-item v-if="item.childList" :fieldOptions="item.childList"></nf-form-item>
      </a-form-item>
    </template>
  </div>
</template>

<script>
import NfUpload from '../upload'

export default {
  components: { NfUpload },
  props: {
    fieldOptions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
  },
}
</script>
