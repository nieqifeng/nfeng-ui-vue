<template>
  <div>
    <Table :find="fetchData" :params="searchForm" :columns="columns" @onPageChange="pageChange"></Table>
  </div>
</template>

<script>
import {
  page
} from '/@/api/table'

export default {
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
      ]
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