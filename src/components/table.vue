<template>
  <a-table
    v-if="dataSource.length"
    :columns="tableColumns"
    :dataSource="dataSource"
    :loading="loading"
    :pagination="pagination"
    :rowKey="record => record._id"
    :defaultExpandAllRows="true"
    @change="tableChange"
  >
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;" @click="$emit('row-update', record)">编辑</a>
      <a-divider type="vertical"/>
      <a-popconfirm
        v-if="dataSource.length"
        title="确定删除?"
        @confirm="() => $emit('row-del', record)"
      >
        <a href="javascript:;">删除</a>
      </a-popconfirm>
    </span>
  </a-table>
</template>

<script>
import { get } from '../utils/request'

export default {
  props: {
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
      dataSource: [],
      // 表格配置
      loading: true
    }
  },
  methods: {
    // 查询
    getList() {
      this.loading = true
      get(this.queryUrl, this.queryFields).then(({ list, total }) => {
        this.dataSource = list
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
  created() {
    if (!this.tableColumns.some(item => item.key == 'action' || item.dataIndex == 'action')) {
      this.tableColumns.push({
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
      })
    }

    this.getList()
  }
}
</script>

