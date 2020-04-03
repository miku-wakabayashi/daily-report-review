import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ja'
import {MediaQueries} from 'vue-media-queries'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale});

const mediaQueries = new MediaQueries();
Vue.use(mediaQueries);

new Vue({
  render: h => h(App),
  mediaQueries: mediaQueries
}).$mount('#app')
