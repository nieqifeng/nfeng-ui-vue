<template>
  <div>
    <Table :find="fetchData" :columns="columns"></Table>
  </div>
</template>

<script>
import {
  page
} from '/@/api/table'

export default {
  data() {
    return {
      total: 1,
      dataSource: [],
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
  }
}
</script>