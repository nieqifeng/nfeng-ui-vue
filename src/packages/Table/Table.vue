<template>
  <div class="table-component">
    <div class="table-box">
      <a-table
        bordered
        size="middle"
        :columns="columns"
        :data-source="data"
        :row-selection="select ? rowSelection : null"
        :scroll="{ y: scrollHeight, x: 1146 }"
        :pagination="false"
        @change="handleChange"
      >
        <!--插槽 -->
        <template
          v-for="(item, tmpIndex) in slotsArr"
          :key="tmpIndex"
          v-slot:[item.slots.customRender]="{ record }"
        >
          <!-- 普通插槽 -->
          <slot
            v-if="!item.operators"
            :name="item.slots.customRender"
            :record="record"
          ></slot>
          <!-- 操作传入 -->
          <template
            v-if="item.slots.customRender === 'operation' && item.operators"
          >
            <template
              v-for="(operator, index) in operation(record, null, item.operators)"
            >
              <template v-if="index <= 2">
                <a-button
                  :key="index"
                  class="link-btn"
                  type="link"
                  @click="operatorMethod(operator.method, record)"
                >
                  <span>{{ operator.name }}</span>
                  <a-divider
                    v-if="
                      item.operators.length !== 1 &&
                      ((item.operators.length > 3 && index < 3) ||
                        (item.operators.length < 4 && index < 2))
                    "
                    type="vertical"
                  ></a-divider>
                </a-button>
              </template>
              <a-dropdown v-if="index > 2" :key="index">
                <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                  更多<DownOutlined />
                </a>
                <template v-slot:overlay>
                  <a-menu>
                    <template
                      v-for="(subOperator, subIndex) in operation(
                        record,
                        null,
                        item.operators
                      )"
                    >
                      <a-menu-item v-if="subIndex > 1" :key="subIndex">
                        <a
                          href="javascript:;"
                          @click="operatorMethod(subOperator.method, record)"
                          >{{ subOperator.name }}</a
                        >
                      </a-menu-item>
                    </template>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </template>
        </template>
      </a-table>
    </div>
    <!-- 分页 -->
    <div v-if="pageData && total > pageData.limit" class="page-box">
      <a-pagination
        v-model:current="pageData.page"
        :total="total"
        :show-total="total => `共 ${total} 条`"
        show-quick-jumper
        :page-size="pageData.limit"
        :page-size-options="pageSizeOptions ? pageSizeOptions : [pageData.limit.toString()]"
        :show-size-changer="showSizeChanger"
        @change="onPageChange"
        @showSizeChange="onShowSizeChange"
      ></a-pagination>
    </div>
  </div>
</template>

<script>
import { nextTick, ref } from 'vue'
export default {
  name: "Table",
  props: {
    columns: Array, //根据文档的配置即可
    find: {
      type: Function,
      required: true,
    },
    params: {
      type: Object,
    },
    dataSource: Array,
    select: {
      type: Boolean,
      default: false,
    },
    pageSizeOptions: Array,
    showSizeChanger: {
      type: Boolean,
      default: false
    },
    pageData: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 10
        }
      }
    },
  },
  data() {
    return {
      data: [], // 表格数据
      total: 0, // 表格数据总数
    };
  },
  computed: {
    slotsArr() {
      return this.columns.filter(v => v.slots && v.slots !== {})
    },
  },
  watch: {
    dataSource() {
      this.data &&
        this.data.forEach((item, index) => {
          item["key"] = index;
        })
      this.changeHeight()
    },
  },
  setup() {
    let scrollHeight = ref(300)
    let height = 0
    let timer = null //定时器，防抖动
    let changeHeight = async () => {
      await nextTick()
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        let tableComponents = document.querySelectorAll('.table-component')
        Array.from(tableComponents).forEach(item => {
          let tableBox = item.querySelector('.table-box')
          let pagesBox = item.querySelector('.page-box')
          if (tableBox && pagesBox) {
            height =
              pagesBox.getBoundingClientRect().top -
              tableBox.getBoundingClientRect().top -
              50
          } else if (tableBox && !pagesBox) {
            let bodyHeight = document.body.clientHeight
            height = bodyHeight - tableBox.getBoundingClientRect().top - 60
          }
          if (height < 100) {
            scrollHeight.value = 300
            if (pagesBox) {
              tableBox.style.marginBottom = '30px'
            }
          } else {
            scrollHeight.value = height
            tableBox.style.marginBottom = 0
          }
        })
      }, 100)
    }
    window.onresize = () => {
      return (() => {
        changeHeight()
      })()
    }
    return {
      changeHeight,
      scrollHeight
    }
  },
  created() {
    this.fetchDate();
  },
  mounted() {
    this.changeHeight();
  },
  methods: {
    async fetchDate() {
      if (!this.find) return
      let sendData = Object.assign({}, this.params);
      const {data} = await this.find(sendData)
      if (!data) return;
      this.data = data.list.map((item, index) => {
        return {
          ...item,
          key: index
        }
      })
      this.total = data.total
      this.$emit('update:dataSource', data.list)
    },
    //条数改变
    onShowSizeChange(current, pageSize) {
      this.$emit('onShowSizeChange', { current, pageSize })
    },
    //分页切换
    onPageChange(pageNumber) {
      this.$emit('onPageChange', pageNumber, () => {
        this.fetchDate()
      })
      this.selectedRowKeys = []
    },
    //表格筛选
    handleChange(pagination, filters, sorter) {
      this.$emit('change', pagination, filters, sorter)
    },
  },
};
</script>