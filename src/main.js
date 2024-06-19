import {
  createApp
} from 'vue'
import App from './App.vue'
import * as config from './config.js'
import route from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './assets/scss/app.scss'
import api from './api'
import {
  install
} from './lib'
const app = createApp(App)
install(app)

app.config.globalProperties.config = config
app.config.globalProperties.apis = api
app.config.productionTip = false

app.use(route).use(store).use(Antd).mount('#app')