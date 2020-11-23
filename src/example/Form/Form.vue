<template>
  <div class="data-display">
    <nf-form :field-options="fieldOptions" v-model="formData">
      <template slot="extra">
        <a-button
          :style="{ marginLeft: '8px', fontSize: '12px' }"
          type="primary"
          @click="showModal = true"
        >
          增加
        </a-button>
      </template>
    </nf-form>

    <a-row class="content">
      <a-col :span="12">
        <p>查询条件：</p>
        <p>{{ JSON.stringify(formData) }}</p>
      </a-col>
      <a-col :span="12">
        <p>表单数据：</p>
        <p v-for="item in fieldOptions" :key="item.label">
          {
          <br />
          <span v-for="subItem in Object.keys(item)" :key="subItem">
            {{ subItem }}: {{ item[subItem] }}
            <br />
          </span>
          }
        </p>
      </a-col>
    </a-row>

    <nf-form-modal
      :visible.sync="showModal"
      :option="option"
      @cancel="showModal = false"
      @submit="addFormItem"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface FormData {
  select: string;
}

@Component({})
export default class App extends Vue {
  expend = false;
  // 表单数据
  formData: FormData = {
    select: ''
  };
  // 显示弹窗
  showModal = false;
  option: object = {
    title: "增加表单内容",
    column: [
      {
        label: "label",
        type: "input",
        prop: "label",
      },
      {
        label: "prop",
        type: "input",
        prop: "prop",
      },
      {
        label: "type",
        type: "select",
        prop: "type",
        options: [
          {
            label: "选择框",
            value: "select",
          },
          {
            label: "输入框",
            value: "input",
          },
          {
            label: "月份选择器",
            value: "month-picker",
          },
          {
            label: "月份区间选择器",
            value: "month-range-picker",
          },
          {
            label: "日期选择器",
            value: "range-picker",
          },
        ],
      },
    ],
    rules: {
      label: [{ required: true }],
      prop: [{ required: true }],
      type: [{ required: true }],
    },
  };
  get fieldOptions() {
    return [
      {
        type: "input",
        label: "输入框",
        prop: "input",
        disabled: this.formData.select === "xxx",
      },
      {
        type: "select",
        label: "选择框",
        prop: "select",
        options: [
          {
            label: "xxx",
            value: "xxx",
          },
        ],
      },
      {
        type: "month-picker",
        label: "月份选择",
        prop: "month",
      },
      {
        type: "date-picker",
        prop: "date-picker",
        label: "日期选择"
      },
      {
        type: "month-range-picker",
        prop: "month-range-picker",
        label: "月份区间选择器",
      },
      {
        type: "range-picker",
        prop: "range-picker",
        label: "日期区间选择器",
      },
    ];
  }
  addFormItem(values) {
    if (values.type === "select") {
      values.options = [
        {
          label: Math.random(),
          value: Math.random(),
        },
        {
          label: Math.random(),
          value: Math.random(),
        },
      ];
      // values.mode = 'multiple'
    }
    this.fieldOptions.push(values);
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
.data-display {
  padding: 20px;
  .content {
    padding: 20px;
    text-align: left;
  }
}
</style>
