<template>
  <div>
    <FormItem :record="record" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import FormItem from "./FormItem.vue"

@Component({
  components: {
    FormItem
  }
})
export default class FormNode extends Vue {
  @Prop({ type: Object, default: () => {} })
  record;
}
</script>
