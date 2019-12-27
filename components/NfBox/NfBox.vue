<template>
  <div class="nf-box">
    <nf-title :title="title" v-if="title"></nf-title>
    <div class="nf-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NfBox',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.nf-box {
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 6px 0px rgba(204,204,204,0.4);
  padding: 20px;
  margin-bottom: 20px;
}
</style>
