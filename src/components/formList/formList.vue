<template>
  <div>
    <nf-form-search :fieldOptions="fieldOptions" @submit="submitHandle"></nf-form-search>
    <nf-list
      ref="list"
      :queryFields="queryFields"
      :queryFunction="queryFunction"
      :tableColumns="tableColumns"
      :tabPanes="tabPanes"
      :tabChange="tabChange"
      :btnText="btnText"
      @btnClick="$emit('btnClick')"
    ></nf-list>
  </div>
</template>

<script>
import NfFormSearch from '../formSearch/formSearch.vue'
import NfList from './list.vue'

export default {
  components: { NfFormSearch, NfList },
  props: {
    fieldOptions: {
      type: Array,
      default() {
        return []
      }
    },
    queryFields: {
      type: Object
    },
    queryFunction: {
      type: Function
    },
    tableColumns: {
      type: Array
    },
    tabPanes: {
      type: Array,
      default() {
        return []
      }
    },
    tabChange: {
      type: Function
    },
    btnText: {
      type: String
    }
  },
  methods: {
    submitHandle(values) {
      this.$emit('submit', values)
    },
    getList() {
      this.$refs.list.getList()
    }
  }
}
</script>
