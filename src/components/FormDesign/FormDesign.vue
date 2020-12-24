<template>
  <div class="form-design">
    <nf-header></nf-header>
    <div class="content show-head">
      <left-side></left-side>
      <section>
        <!-- 操作区域 start -->
        <NfOperatingArea @handleReset="handleReset"></NfOperatingArea>
        <!-- 操作区域 end -->
        <NfFormPanel
          :list.sync="list"
          :UISchema="UISchema"
          :selectItem="selectItem"
          @handleSetSelectItem="handleSetSelectItem"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Header from "./Header/Header.vue";
import LeftSide from "./LeftSide/LeftSide.vue";
import OperatingArea from "./Center/OperatingArea.vue";
import FormPanel from "./Center/FormPanel.vue";

@Component({
  components: {
    "nf-header": Header,
    "left-side": LeftSide,
    NfFormPanel: FormPanel,
    NfOperatingArea: OperatingArea,
  },
})
export default class FormDesign extends Vue {
  @Prop({ type: Object, default: () => {} })
  private JSONSchema;
  @Prop({
    type: Object,
    default: () => {
      return {
        layout: "horizontal",
        labelCol: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
        wrapperCol: { xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 },
      };
    },
  })
  private UISchema;
  @Prop({ type: Object, default: () => {} })
  private formData;

  updateTime = 0;
  list = [];
  selectItem = {
    key: "",
  };

  handleReset() {
    // 清空
    this.$confirm({
      title: "警告",
      content: "是否确认清空内容?",
      okText: "是",
      okType: "danger",
      cancelText: "否",
      onOk: () => {
        this.list = [];
        this.handleSetSelectItem({});
        this.$message.success("已清空");
      },
    });
  }

  handleSetSelectItem(record) {
    // 操作间隔不能低于100毫秒
    let newTime = new Date().getTime();
    if (newTime - this.updateTime < 100) {
      return false;
    }

    this.updateTime = newTime;

    // 设置selectItem的值
    this.selectItem = record;

    // 判断是否选中控件，如果选中则弹出属性面板，否则关闭属性面板
    // if (record.key) {
    //   this.startType = record.type;
    //   this.showPropertie = true;
    // } else {
    //   this.showPropertie = false;
    // }
  }
}
</script>

<style lang="less">
.form-design {
  height: 100vh;
  overflow: hidden;

  // iconfont 样式
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  // 设计器内容样式
  .content {
    display: flex;

    &.show-head {
      margin-top: 6px;
      height: calc(100% - (56px) - 6px);
    }
  }

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
    scrollbar-arrow-color: red;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
    scrollbar-arrow-color: red;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
