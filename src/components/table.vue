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
import { get } from '../utils/request'

export default {
  props: {
    fieldOptions: {
      type: Array,
      default() {
        return []
      }
    },
    queryUrl: {
      type: String
    },
    queryFields: {
      type: Object
    },
    tableColumns: {
      type: Array
    },
  },
  data() {
    return {
      // 表格分页的配置
      pagination: {
        size: 'small',
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      // 表格数据
      tableList: [],
      loading: true
    }
  },
  methods: {
    // 查询
    getList() {
      this.loading = true
      console.log(get)
      get(this.queryUrl, this.queryFields).then(({ list, total }) => {
        this.tableList = list.map((item, key) => {
          item.rowKey = key
          return item
        })
        this.pagination.total = total ? total : list.length
        this.loading = false
      })
    },
    // 分页
    tableChange(pagination) {
      this.queryFields.page = pagination.current
      this.queryFields.pageSize = pagination.pageSize
      this.getList()
    },
  },
  mounted() {
    this.getList()
  }
}
</script>

