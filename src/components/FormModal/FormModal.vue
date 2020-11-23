<template>
  <a-modal
    :visible.sync="showModal"
    :title="option.title"
    @ok="handleFormSubmit"
    @cancel="handleFormClose"
  >
    <nf-form-create
      ref="formCreate"
      :option="option"
    />
  </a-modal>
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync, Emit } from "vue-property-decorator";
import NfFormCreate from "../FormCreate";

@Component({
  components: {
    "nf-form-create": NfFormCreate,
  },
})
export default class FormModal extends Vue {
  $refs!: {
    formCreate: HTMLFormElement;
  }
  // 模态框显隐
  @PropSync("visible", { type: Boolean, default: false })
  showModal!: boolean;

  @Prop({ type: Object })
  option;

  @Emit("cancel")
  handleFormClose() {
    this.$refs.formCreate.resetForm();
    this.showModal = false;
  }

  handleFormSubmit() {
    this.$refs.formCreate.onSubmit((valid, form) => {
      if (valid) {
        this.submit(form);
      }
    });
  }

  @Emit("submit")
  submit(values) {
    return values;
  }
}
</script>
