<template>
  <div>table</div>
</template>

<script>
import {
  page
} from '/@/api/table'

export default {
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      page()
    }
  }
}
</script>script