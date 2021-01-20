import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import 'normalize.css'
// import 'ant-design-vue/dist/antd.less'
import antdComponent from './plugins/ant-design'
import NfengUI from './plugins/nfeng-ui-vue'
import '/@/styles/index.less'
const app = createApp(App)
app.use(router)
antdComponent(app) //引入dantd组件注册
NfengUI(app)
app.mount('#app')
