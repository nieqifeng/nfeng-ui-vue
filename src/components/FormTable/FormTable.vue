<template>
  <div>
    <nf-form
      v-model="formData"
      :field-options="options.fieldOptions"
      @submit="options.getList"
    ></nf-form>
    <nf-table
      :formData="formData"
      :columns="options.columns"
      :getList="options.getList"
    ></nf-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NfFormSearch from "../FormSearch";
import NfTable from "../Table";

@Component({
  components: {
    "nf-form-search": NfFormSearch,
    "nf-table": NfTable,
  },
})
export default class FormTable extends Vue {
  @Prop({ required: true, type: Object })
  options;
  // 表单数据
  formData = {};
}
</script>
