<template>
  <div class="container">
    <MoreOperate :operate="operate"></MoreOperate>
    <Table :find="fetchData" :params="searchForm" :columns="columns" @onPageChange="pageChange"></Table>
  </div>
</template>

<script>
import MoreOperate from '../../packages/MoreOperate/MoreOperate.vue'
import {
  page
} from '/@/api/table'

export default {
  components: { MoreOperate },
  data() {
    return {
      searchForm: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
        },
        {
          title: "title",
          dataIndex: "title",
        },
        {
          title: "description",
          dataIndex: "description",
        },
        {
          title: "author",
          dataIndex: "author",
        },
        {
          title: "img",
          dataIndex: "img",
          scopedSlots: { customRender: "img" },
        },
        {
          title: "datetime",
          dataIndex: "datetime",
        },
      ],
      operate: [
        {
          title: '导出',
          operate: 'export'
        },
        {
          title: '新增',
          type: 'primary',
          operate: 'create'
        }
      ],
    }
  },
  setup() {
    const fetchData = page
    return {
      fetchData
    }
  },
  methods: {
    pageChange(page, cb) {
      this.searchForm.page = page
      cb()
    }
  }
}
</script>