<template>
  <div class="wrap">
    <div>
      <nf-button class="btn-margin green" @click="openOverlay">点击打开动画蒙层</nf-button>
    </div>
    <div>
      <nf-button class="btn-margin yellow" @click="openNoAniOverlay">点击打开无动画蒙层</nf-button>
    </div>

    <nf-overlay :show="show" opacity="0.6" :hasAnimation="hasAnimation" @overlayClicked="show = false"></nf-overlay>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    hasAnimation: true
  }),
  methods: {
    openOverlay () {
      this.hasAnimation = true
      this.show = true
    },
    openNoAniOverlay () {
      this.hasAnimation = false
      this.show = true
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
.btn-margin {
  color: #fff;
  width: 100%;
  margin-top: 40px;
}
</style>
