import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
// import { setupProdMockServer } from './mockProdServer';

const app = createApp(App)

app.use(router)
app.mount('#app')

// production mock server
// if (process.env.NODE_ENV === 'production') {
//   console.log(111);
//   setupProdMockServer();
// }
