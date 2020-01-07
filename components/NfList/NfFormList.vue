<template>
  <div>
    <div style="background: white;padding: 20px 30px;margin-top: 18px;">
      <nf-search-form
        :fieldOptions="fieldOptions"
        @submit="submitHandle"></nf-search-form>
      <nf-list
        ref="list"
        :queryFields="queryFields"
        :queryFunction="queryFunction"
        :tableColumns="tableColumns"
        :tabPanes="tabPanes"
        :tabChange="tabChange"
        :btnText="btnText"
        @btnClick="$emit('btnClick')"></nf-list>
    </div>
  </div>
</template>

<script>
import NfSearchForm from '../NfForm/NfSearchForm.vue'
import NfList from './NfList.vue'

export default {
  name: 'NfFormList',
  components: { NfSearchForm, NfList },
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
