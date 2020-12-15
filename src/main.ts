import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./plugins/ant-design";
import "./plugins/nfeng-ui-vue";
import "./plugins/k-form-design";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
