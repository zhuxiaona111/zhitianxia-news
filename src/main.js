import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'
import router from '@/permission'
import plugin from '@/utils/plugin'
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(plugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
