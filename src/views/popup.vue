<template>
  <div class="wrap">
    <div>
      <nf-button class="btn-margin green" @click="isTopShow = true">点击弹出顶部面板</nf-button>
    </div>
    <div>
      <nf-button class="btn-margin yellow" @click="isBottomShow = true">点击弹出底部面板</nf-button>
    </div>
    <div>
      <nf-button class="btn-margin red" @click="isLeftShow = true">点击弹出左侧面板</nf-button>
    </div>
    <div>
      <nf-button class="btn-margin blue" @click="isRightShow = true">点击弹出右侧面板</nf-button>
    </div>
    <div>
      <nf-button class="btn-margin gray" @click="isAutoShow = true">自动设置高度</nf-button>
    </div>
    

    <nf-popup :show="isTopShow" 
              pos="top" 
              overlayAni="fade-in-linear" 
              @overlayClicked="popupOverlayTopClick" 
              height="200">
    </nf-popup>

    <nf-popup :show="isBottomShow" 
              pos="bottom" 
              popup-color="rgb(92, 184, 92)" 
              @overlayClicked="isBottomShow = false" 
              height="200">
      <div class="wrap">
        <p>与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。</p>
      </div>
    </nf-popup>

    <nf-popup :show="isLeftShow" 
              pos="left" 
              @overlayClicked="isLeftShow = false" 
              width="200">
    </nf-popup>

    <nf-popup :show="isRightShow" 
              pos="right" 
              ref="nfPopup" 
              @overlayClicked="isRightShow = false" 
              width="300">
      <div class="wrap">
        <button @click="onHideClick" class="btn">主动隐藏试试</button>
      </div>
    </nf-popup>

    <nf-popup :show="isAutoShow" 
              pos="bottom" 
              :height="height" 
              @overlayClicked="isAutoShow = false">
    </nf-popup>

  </div>
</template>

<script>
export default {
  data: () => ({
    isBottomShow: false,
    isTopShow: false,
    isLeftShow: false,
    isRightShow: false,
    isAutoShow: false,
    height: 400
  }),
  methods: {
    popupOverlayTopClick () {
      this.isTopShow = false
    },
    onHideClick () {
      this.isRightShow = false
    }
  }
}
</script>

<style scoped>
.green {
  background-color: green;
}
.yellow {
  background-color: #ffc300;
  border-color: #ffc300;
}
.red {
  background-color: #C3413D;
  border-color: #C3413D;
}
.blue {
  background-color: #263238;
  border-color: #263238;
}
.gray {
  background-color: #9B7B56;
  color: #9B7B56;
}
.btn-margin {
  color: #fff;
  width: 100%;
  margin-top: 40px;
}
</style>

