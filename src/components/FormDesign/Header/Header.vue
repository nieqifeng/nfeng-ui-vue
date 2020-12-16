<template>
    <header class="header">
        <span v-if="!isEdit">{{title}}</span>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class Header extends Vue {
    @Prop({ type: String, default: "表单设计器" })
    private title

    isEdit = false
}
</script>

<style lang="less">
.header {
    height: 56px;
    text-align: center;
    background: #13c2c2;
    color: #fff;
    line-height: 56px;
    font-size: 18px;
    font-weight: 700;
}
</style>
