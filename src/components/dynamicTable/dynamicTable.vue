<template>
  <div>
    <nf-search-form
      v-if="showFormSearch"
      :fieldOptions="fieldOptions"
      :exportBtn="exportBtn"
      :disabled="tableList.length === 0"
      @submit="(values) => { $emit('searchSubmit', values), getList() }"
      @export="$emit('export')"
    ></nf-search-form>
    <div class="nf-list">
      <a-tabs
        class="tabs-noborder clearfix"
        :defaultActiveKey="tabPanes.legnth ? tabPanes[0].key : ''"
        @change="(key) => { $emit('tabChange', key), getList() }"
      >
        <a-tab-pane
          v-for="pane in tabPanes"
          :tab="pane.title"
          :key="pane.key"
          :closable="pane.closable"
        ></a-tab-pane>
        <template slot="tabBarExtraContent">
          <slot name="tabBarExtraContent"></slot>
        </template>
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
  </div>
</template>

<script>
import NfSearchForm from '../searchForm'

export default {
  components: { NfSearchForm },
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

<style lang="scss" scoped>
.nf-list {
  background-color: white;
  padding: 20px;
  position: relative;
  z-index: 1;
}
</style>
