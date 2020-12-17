<template>
  <div>
    <!-- <k-form-design :title.sync="title" @changeTitle="changeTitle" :designData="designData" @handleSaveJson="handleSaveJson"/> -->
    <nf-form-design :JSONSchema="formOption.JSONSchema"></nf-form-design>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      designData: {},
      formOption: {},
    }
  },
  methods: {
    changeTitle(title) {
      this.title = title
    },
    handleSaveJson() {
      // console.log(val)
    }
  },
}
</script>
