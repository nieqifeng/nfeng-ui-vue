<template>
  <div class="wrap">
    <nf-tabs :listHeader="listHeader">
      <div class="tabs-item" style="background-color: black;"></div>
      <div class="tabs-item" style="background-color: green;"></div>
    </nf-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listHeader: ['我的社区', '推荐']
    }
  }
}
</script>

