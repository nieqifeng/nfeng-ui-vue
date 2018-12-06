<template>
  <div class="wrap">
    <nf-form-item label="城市选择">
      <!-- <nf-input @focus="cityShow = true" v-model="cityValue" readonly="readonly"></nf-input> -->
      <div class="form-input" @click="cityShow = true">{{cityValue}}</div>
    </nf-form-item>
    <nf-form-item label="时间选择">
      <!-- <nf-input @focus="timeShow = true" v-model="timeValue" readonly="readonly"></nf-input> -->
      <div class="form-input" @click="timeShow = true">{{timeValue}}</div>
    </nf-form-item>
    
    <nf-popup :show="cityShow" @overlayClicked="cityShow = false">
      <nf-picker-city @clear="cityConfirm" @confirm="cityConfirm"></nf-picker-city>
    </nf-popup>
    <nf-popup :show="timeShow" @overlayClicked="timeShow = false">
      <nf-picker-time @clear="timeConfirm" @confirm="timeConfirm"></nf-picker-time>
    </nf-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cityValue: '',
      cityShow: false,
      timeValue: '',
      timeShow: false
    }
  },
  methods: {
    cityConfirm (value) {
      this.cityShow = false
      this.cityValue = value
    },
    timeConfirm (value) {
      this.timeShow = false
      this.timeValue = value
    }
  }
}
</script>
