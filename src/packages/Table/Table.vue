<template>
  <div>Table</div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    fetchData: {
      type: Function,
      required: true
    }
  }
}
</script>