<template>
  <div>
    <div class="basic-table-img__preview" v-if="imageList && imageList.length">
      <template v-for="(img, key) in imageList">
        <img :key="key" :width="size" @click="handlePreview(key)" :src="img" />
      </template>
    </div>
    <nf-preview
      :imageList="imageList"
      :show.sync="show"
      :index.sync="index"
    ></nf-preview>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NfPreview from "../Preview";

@Component({
  components: {
    "nf-preview": NfPreview,
  },
})
export default class TableImg extends Vue {
  @Prop({ type: Array })
  imageList;
  @Prop({ default: 40, type: Number })
  size;
  show = false;
  index = 0;
  handlePreview(key: number) {
    this.index = key;
    this.show = true;
  }
}
</script>

<style lang="less">
.basic-table {
  &-img__preview {
    display: flex;
    cursor: pointer;

    img {
      margin-right: 4px;
    }
  }
}
</style>
