<template>
  <a-table
    :columns="tableColumns"
    :dataSource="tableList"
    :loading="loading"
    :pagination="pagination"
    :rowKey="record => record.rowKey"
    @change="tableChange"
  ></a-table>
</template>

<script>
export default {
  props: {
    fieldOptions: {
      type: Array,
      default() {
        return []
      }
    },
    tabPanes: {
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
    exportBtn: {
      type: Boolean
    }
  },
  methods: {
    
  }
}
</script>

