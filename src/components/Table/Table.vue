<template>
  <a-table
    v-if="dataSource"
    :columns="columns"
    :rowKey="(record) => record._id"
    :dataSource="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template
      v-for="item in columns"
      :slot="item.dataIndex"
      slot-scope="text, record"
    >
      <slot :name="item.dataIndex" v-bind="record" />
    </template>
  </a-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Table extends Vue {
  // 表单数据
  @Prop({ type: Object })
  formData;
  @Prop({ type: Array })
  columns;
  @Prop({ type: Function })
  getList;
  // 表格配置
  loading = true;
  // 表格分页的配置
  pagination = {
    size: "small",
    showQuickJumper: true,
    showSizeChanger: true,
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total) => `共 ${total} 条`,
  };
  // 表格数据
  dataSource = null;
  mounted() {
    this.fetch();
  }
  handleTableChange(pagination) {
    const pager = { ...this.pagination };
    pager.current = pagination.current;
    this.pagination = pager;
    this.fetch();
  }
  fetch() {
    this.loading = true;
    if (!this.getList) return;
    this.getList({
      ...this.formData,
      pageSize: this.pagination.pageSize,
      current: this.pagination.current,
    }).then(({ data, total }) => {
      const pagination = { ...this.pagination };
      pagination.total = total;
      this.loading = false;
      this.dataSource = data.map((item, key) => {
        return { ...item, _id: key };
      });
      this.pagination = pagination;
    });
  }
}
</script>
