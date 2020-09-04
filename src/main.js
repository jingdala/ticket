import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/element.js"
import 'element-ui/lib/theme-chalk/index.css';


// 引入css样式
import "../src/assets/css/global.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
