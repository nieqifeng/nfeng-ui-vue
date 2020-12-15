<!--
 * @Description: 头部
 * @Author: kcz
 * @Date: 2019-12-30 00:37:05
 * @LastEditors: kcz
 * @LastEditTime: 2020-03-26 20:18:56
 -->
<template>
  <header class="header">
    <span v-if="!isEdit">{{title}}</span>
    <a-input style="width: 200px;" v-else :value="title" @change="onChange" placeholder="请输入标题"></a-input>
    <a-button style="color: #fff" type="link" @click="edit">{{ !isEdit ? '修改' : '确认' }}</a-button>
  </header>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "表单设计器 --by kcz"
    }
  },
  data() {
    return {
      isEdit: true,
    }
  },
  methods: {
    edit() {
      this.isEdit = !this.isEdit
    },
    onChange(e) {
      this.$emit('changeTitle', e.target.value)
    },
  },
  watch: {
    title(val) {
      this.$emit('changeTitle', val)
    }
  }
};
</script>
