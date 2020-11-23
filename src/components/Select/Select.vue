<template>
  <a-select
    :value="selectValue || undefined"
    :mode="mode"
    :size="size"
    :filterOption="false"
    :placeholder="placeholder"
    :notFoundContent="notFoundContent"
    :showSearch="showSearch"
    :allowClear="allowClear"
    :disabled="disabled"
    @search="(e) => (searchValue = e)"
    @change="change"
  >
    <a-select-option
      v-if="allOptionNumber > maxShowCount"
      disabled
      value="disabled"
    >
      {{ `共${allOptionNumber}条，展示前${maxShowCount}` }}
    </a-select-option>
    <a-select-option
      v-for="(item, key) in showData"
      :key="key"
      :value="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

@Component
export default class Select extends Vue {
  @Prop({ type: [String, Number, Array] })
  value;

  // 原始数据列表
  @Prop({ default: () => [], type: Array })
  options;

  // 选择框模式
  @Prop({ default: "", type: String })
  mode;

  // 预留字文案
  @Prop({ default: "请输入搜索关键字", type: String })
  placeholder;

  // 列表为空显示文案
  @Prop({ default: "没有数据", type: String })
  notFoundContent;

  // 输入框尺寸	 medium/small/mini
  @Prop({ default: "default", type: String })
  size;

  // 默认最多展示数量（也是最多勾选的最大数量）
  @Prop({ default: 20, type: Number })
  maxShowCount;

  @Prop({ default: true, type: Boolean })
  showSearch;

  // 是否可清空
  @Prop({ default: false, type: Boolean })
  allowClear;

  // 是否禁用
  @Prop({ default: false, type: Boolean })
  disabled;

  // 搜索关键字
  searchValue = "";

  // 选中值
  selectValue: string | number | Array<object|number|string> = "";

  get selectedData() {
    return this.options;
  }
  get selectedFilterList() {
    const { selectedData, searchValue } = this;
    return this.getFilterList(selectedData, searchValue);
  }
  get selectedFilterOption() {
    const { selectedFilterList, selectValue } = this;
    const hasSelectedOption =
      this.mode === "multiple" ? selectValue : selectValue ? [selectValue] : [];
    return this.getFilterOption(selectedFilterList, hasSelectedOption);
  }
  get showData() {
    const { selectedFilterList, selectedFilterOption, maxShowCount } = this;
    return this.filterSelectedData(
      selectedFilterList,
      selectedFilterOption,
      "label",
      maxShowCount
    );
  }
  get allOptionNumber() {
    return this.selectedFilterList.length;
  }

  @Watch("value")
  onValueChanged(val: string | number | []): void {
    this.selectValue = val || "";
  }

  created() {
    if (this.mode === "multiple") {
      this.selectValue = this.value || [];
    } else {
      this.selectValue = this.value;
    }
  }

  @Emit("change")
  @Emit("input")
  change(value) {
    return value;
  }

  // 根据搜索关键字筛选
  getFilterList(data, searchKey) {
    const key = searchKey.trim();
    if (!key) return data;
    return data.filter(
      (item) =>
        (item.value
          .toString()
          .toLowerCase()
          .indexOf(key.toLowerCase()) !== -1 ||
          item.label
            .toString()
            .toLowerCase()
            .indexOf(key.toLowerCase())) !== -1
    );
  }
  // 筛选目前数据中的勾选项
  getFilterOption(data, selected) {
    const dataKeys = data.reduce((lastArr, item) => {
      lastArr.push(item["label"]);
      return lastArr;
    }, []);
    return selected.filter((item) => dataKeys.indexOf(item) > -1);
  }
  // 对源数据针对已勾选数据处理
  filterSelectedData(data, selected, key, maxCount) {
    const dataLength = data.length;
    const neededShow = JSON.parse(JSON.stringify(selected));
    if (dataLength < maxCount) return data;
    else
      return data.filter((item, index) => {
        const findIndex = neededShow.indexOf(item[key]);
        if (findIndex > -1) {
          neededShow.splice(findIndex, 1);
          return true;
        } else {
          return index < maxCount - neededShow.length;
        }
      });
  }
}
</script>
