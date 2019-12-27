<template>
  <div class="title">{{title}}</div>
</template>

<script>
export default {
  name: 'NfTitle',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size:18px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:25px;
  margin-bottom: 25px;

  &::before {
    content: '';
    width:5px;
    height:18px;
    background:rgba(23,143,255,1);
    display: inline-block;
    margin-right: 12px;
    vertical-align: middle;
  }
}
</style>
