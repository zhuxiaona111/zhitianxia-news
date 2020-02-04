import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'
import router from '@/permission'
import plugin from '@/utils/plugin'
import Vant, { Lazyload } from 'vant'

Vue.config.productionTip = false
Vue.use(Lazyload)
Vue.use(Vant)
Vue.use(plugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
