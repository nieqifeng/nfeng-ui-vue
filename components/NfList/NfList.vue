<template>
  <div class="nf-list">
    <a-tabs
      class="tabs-noborder"
      :defaultActiveKey="tabPanes.legnth ? tabPanes[0].key : ''"
      @change="callback">
        <a-tab-pane
          v-for="pane in tabPanes"
          :tab="pane.title"
          :key="pane.key"
          :closable="pane.closable"></a-tab-pane>
        <a-button
          slot="tabBarExtraContent"
          type="primary"
          v-if="btnText"
          @click="$emit('btnClick')">{{btnText}}</a-button>
      </a-tabs>
    <a-table
      :columns="tableColumns"
      :dataSource="tableList"
      :loading="loading"
      :pagination="pagination"
      :rowKey="record => record.rowKey"
      @change="tableChange"
    ></a-table>
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
    },
    tabPanes: {
      type: Array,
      default: function () {
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
      this.queryFunction(this.queryFields).then(({ list, total }) => {
        this.tableList = list.map((item, key) => {
          item.rowKey = key
          return item
        })
        this.pagination.total = total
        console.log('done')
        this.loading = false
      })
    },
    // 分页
    tableChange(pagination) {
      this.queryFields.page = pagination.current
      this.queryFields.pageSize = pagination.pageSize
      this.getList()
    },
    callback(key) {
      if (this.tabChange) {
        this.tabChange(key)
      }
    }
  }
}
</script>
