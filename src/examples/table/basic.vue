<!--
 * @Date: 2021-01-25 15:22:09
 * @LastEditors: N-feng
 * @LastEditTime: 2021-01-27 16:16:41
 * @FilePath: /nfeng-ui-vue/src/examples/table/basic.vue
-->
<template>
  <div class="container">
    <Table title="课时管理" :find="fetchData" :params="searchForm" :operate="operate" :columns="columns" @onPageChange="pageChange"></Table>
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
          title: "视频名称",
          dataIndex: "name",
        },
        {
          title: "视频地址",
          dataIndex: "file",
        },
        {
          title: "课程名称",
          dataIndex: "course",
        },
        {
          title: '操作',
          width: 120,
          fixed: 'right',
          slots: {
            customRender: 'operation'
          },
          operators: [
            {
              name: '编辑',
              method: 'editor'
            },
            {
              name: '删除',
              method: 'delete'
            }
          ]
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
    },
    editor() {
      console.log('editor')
    }
  }
}
</script>