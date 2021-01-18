<template>
  <div>
    <Table></Table>
  </div>
</template>

<script>
import {
  page
} from '/@/api/table'

export default {
  setup() {
    const fetchData = page
    return {
      fetchData
    }
  },
  created() {
    this.fetchData()
  }
}
</script>script