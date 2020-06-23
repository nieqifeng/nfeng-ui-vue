<template>
  <div>
    <div v-if="formSchema">
      <ncform :form-schema="formSchema" form-name="searchForm" v-model="formSchema.value"></ncform>
      <a-form-item>
        <a-button type="primary" @click="remoteMethod()">查询</a-button>
        <a-button style="margin-left: 20px;" @click="$ncformReset('searchForm')">清空</a-button>
        <slot name="formAction" v-bind="dataSource"></slot>
      </a-form-item>
    </div>
    <a-table
      v-if="dataSource"
      :columns="tableColumns"
      :dataSource="dataSource"
      :loading="loading"
      :pagination="pagination"
      :rowKey="record => record._id"
      :scroll="scroll"
      @change="tableChange"
    >
      <span slot="action" slot-scope="text, record">
        <slot name="tableAction" v-bind="record"/>
        <a href="javascript:;" @click="$emit('row-update', record, remoteMethod)">编辑</a>
        <template v-if="!record.children || !record.children.length">
          <a-divider type="vertical"/>
          <a-popconfirm
            v-if="dataSource.length"
            title="确定删除?"
            @confirm="() => $emit('row-del', record, remoteMethod)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
      <span slot="img" slot-scope="text">
        <img :src="text" width="80">
      </span>
    </a-table>
  </div>
</template>

<script>
import _get from 'lodash-es/get'
import _cloneDeep from 'lodash-es/cloneDeep'

import { post } from '../../../utils/request'

export default {
  props: {
    formSchema: {
      type: Object
    },
    remoteUrl: {
      type: String
    },
    otherParams: {
      type: Object
    },
    tableColumns: {
      type: Array
    },
    scroll: {
      type: Object
    }
  },

  data() {
    return {
      // 表格配置
      loading: true,
      // 表格分页的配置
      pagination: {
        size: 'small',
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      // 表格数据
      dataSource: null,
    }
  },
  methods: {
    // 查询
    remoteMethod() {
      if (!this.remoteUrl) {
        return
      }
      this.loading = true
      const options = {
        url: this.remoteUrl,
        params: {
          ..._cloneDeep(_get(this, 'otherParams', {})),
          ...{
            page: this.pagination.current,
            pageSize: this.pagination.pageSize
          },
          ..._cloneDeep(_get(this.formSchema, 'value', {})),
        }
      }
      post(options.url, options.params).then((res) => {
        if (res && res.data) {
          const {list, total} = res.data
          this.dataSource = list
          this.pagination.total = total ? total : list.length
          this.loading = false
        }
      })
    },
    // 分页
    tableChange(pagination) {
      this.pagination.page = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.remoteMethod()
    },
  },
  created() {
    this.remoteMethod()
  }
}
</script>

