import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import NfengUI from './plugins/nfeng-ui-vue'
// import { setupProdMockServer } from './mockProdServer';
const app = createApp(App)
NfengUI(app)
app.use(router)
app.mount('#app')
// production mock server
// if (process.env.NODE_ENV === 'production') {
//   console.log(111);
//   setupProdMockServer();
// }
