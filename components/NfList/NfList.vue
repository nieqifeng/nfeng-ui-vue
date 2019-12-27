<template>
  <div>
    <a-table
      :columns="tableColumns"
      :dataSource="tableList"
      :loading="loading"
      :pagination="pagination"
      :rowKey="record => record.rowKey"
      @change="tableChange"
    >
      <!-- <template v-for="(item, key) in tableColumns">
        <div :key="key" v-if="item.scopedSlots">
          <slot :name="item.scopedSlots.customRender"></slot>
        </div>
      </template> -->
      <template v-for="item in tableColumns" :slot="item.tooltip && item.scopedSlots && item.scopedSlots.customRender">
        <!-- <slot v-if="item.scopedSlots">111</slot> -->111
      </template>
      
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'NfList',
  props: {
    queryFields: {
      type: Object
    },
    queryFunction: {
      type: Function
    },
    tableColumns: {
      type: Array
    }
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
        showTotal: (total) => `共 ${total} 条`
      },
      // 表格数据
      tableList: [],
      loading: true
    }
  },
  methods: {
    // 查询
    getList(values) {
      this.loading = true
      // console.log(values)
      // if (values && values.state) {
      //   this.searchForm.stateForQuery = [values.state]
      //   delete values.state
      // } else {
      //   this.searchForm.stateForQuery = []
      // }

      // if (values && values.startAt) {
      //   this.searchForm.createAtBegin = values.startAt.format('YYYY-MM-DD')
      //   delete values.startAt
      // } else {
      //   this.searchForm.createAtBegin = ''
      // }
      // if (values && values.endAt) {
      //   this.searchForm.createAtEnd = values.endAt.format('YYYY-MM-DD')
      //   delete values.endAt
      // } else {
      //   this.searchForm.createAtEnd = ''
      // }

      // Object.assign(this.fields, values)
      this.queryFunction(this.queryFields).then(({ list, total }) => {
        this.tableList = list.map((item, key) => {
          item.rowKey = key
          return item
        })
        this.pagination.total = total
        console.log('done')
        this.loading = false
      })
      // Object.assign(this.searchForm, values)
      // getQueryList(this.searchForm)
    },
    // 分页
    tableChange(pagination) {
      this.searchForm.page = pagination.current
      this.searchForm.pageSize = pagination.pageSize
      this.getList()
    }
  }
}
</script>
